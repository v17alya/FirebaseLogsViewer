import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, query, orderByKey, limitToLast, child } from 'firebase/database';
import { firebaseConfig, LOGS_PATH, FOLDER_ENTRIES, FOLDER_INDEXES, INDEX_PATHS, DEFAULT_PROJECT } from '../config/firebase-config.js';

let app = null;
let db = null;

/**
 * Ensure Firebase app/database singletons exist.
 * @returns {import('firebase/database').Database}
 */
export function ensureFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig, 'viewerApp');
    db = getDatabase(app);
    console.log('[FirebaseService] Initialized app and database');
  }
  return db;
}

/**
 * Build a database path from parts.
 * @param {Array<string>} parts
 * @returns {string}
 */
function makePath(parts) {
  return parts.filter(Boolean).join('/');
}

/**
 * Derive pure logId from index key. Some indexes store keys as "ts_logId".
 * @param {string} key
 * @returns {string}
 */
function extractLogIdFromIndexKey(key) {
  if (!key) return key;
  // If key contains an underscore and the suffix looks like a composed logId with '|', treat as tsKey_logId
  const underscore = key.indexOf('_');
  if (underscore > 0) {
    const suffix = key.slice(underscore + 1);
    if (suffix.includes('|')) return suffix;
  }
  return key;
}

/**
 * Fetch log entries via an index subtree.
 * @param {string} indexPath - Index path under logs/indexes
 * @param {number} [limit=200] - Max items to read
 * @returns {Promise<Array<object>>}
 */
export async function fetchByIndexPath(indexPath, limit = 200) {
  ensureFirebase();
  console.log('[FirebaseService] Query index:', indexPath, 'limit:', limit);
  const idxRef = ref(db, makePath([LOGS_PATH, FOLDER_INDEXES, indexPath]));
  const q = query(idxRef, orderByKey(), limitToLast(limit));
  const snap = await get(q);
  const ids = snap.exists() ? Object.keys(snap.val()) : [];
  console.log('[FirebaseService] Index IDs count:', ids.length);
  if (ids.length === 0) return [];

  // Normalize keys to pure logIds when index stores keys as "ts_logId"
  const logIds = ids.map(extractLogIdFromIndexKey);

  const entriesRef = ref(db, makePath([LOGS_PATH, FOLDER_ENTRIES]));
  const reads = logIds.map(id => get(child(entriesRef, id)));
  const results = await Promise.allSettled(reads);
  const entries = results
    .filter(r => r.status === 'fulfilled' && r.value.exists())
    .map(r => ({ ...r.value.val(), logId: r.value.key }))
    .sort((a, b) => a.ts - b.ts);
  console.log('[FirebaseService] Entries fetched:', entries.length);
  // Fallback: if index has keys but entries are missing (stale index), try fetching by date bucket when present in path
  if (entries.length === 0 && /\/\d{4}-\d{2}-\d{2}$/.test(indexPath)) {
    const parts = indexPath.split('/');
    const date = parts[parts.length - 1];
    const entriesDateRef = ref(db, makePath([LOGS_PATH, FOLDER_ENTRIES]));
    // Without reverse index mapping, we cannot resolve logIds from date alone unless entries are nested by date (they aren't), so just log a hint
    console.warn('[FirebaseService] Index appears stale (no entries found). Verify entries/{logId} exist for', date);
  }
  return entries;
}

/**
 * Fetch logs by selecting the most specific index based on filters.
 * Supports legacy project alias 'StreamersMegagames' → 'Mega'.
 * @param {object} filters
 * @param {string} [filters.project]
 * @param {string} [filters.server]
 * @param {string} [filters.platform]
 * @param {string} [filters.date] - YYYY-MM-DD
 * @param {string} [filters.userId]
 * @param {string} [filters.nickname]
 * @param {string} [filters.message]
 * @param {number} [limit=200]
 * @returns {Promise<Array<object>>}
 */
export async function fetchLogs(filters = {}, limit = 200) {
  const project = (filters.project || DEFAULT_PROJECT).trim();
  console.log('[FirebaseService] Project used as-is:', project);
  const server = (filters.server || '').trim();
  const platform = (filters.platform || '').trim();
  const date = (filters.date || '').trim();
  const userId = (filters.userId || '').trim();

  let indexPath = '';
  if (project && server && platform && date) {
    indexPath = `${INDEX_PATHS.BY_PROJ_SRV_PLAT_DATE}/${project}/${server}/${platform}/${date}`;
  } else if (project && server && date) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_SERVER_DATE}/${project}/${server}/${date}`;
  } else if (project && platform && date) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_PLATFORM_DATE}/${project}/${platform}/${date}`;
  } else if (project && userId && date) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_USER_DATE}/${project}/${userId}/${date}`;
  } else if (project && date) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_DATE}/${project}/${date}`;
  } else if (userId && date) {
    indexPath = `${INDEX_PATHS.BY_USER_DATE}/${userId}/${date}`;
  } else if (userId && !date) {
    indexPath = `${INDEX_PATHS.BY_USER}/${userId}`;
  } else if (project && server && platform && !date) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_SERVER_PLATFORM}/${project}/${server}/${platform}`;
  } else if (project && server && !platform) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_SERVER}/${project}/${server}`;
  } else if (project && platform && !server) {
    indexPath = `${INDEX_PATHS.BY_PROJECT_PLATFORM}/${project}/${platform}`;
  } else if (project) {
    indexPath = `${INDEX_PATHS.BY_PROJECT}/${project}`;
  } else {
    console.warn('[FirebaseService] No suitable index for filters', filters);
    return [];
  }

  console.log('[FirebaseService] Using indexPath:', indexPath);
  const entries = await fetchByIndexPath(indexPath, limit).catch(err => {
    console.error('[FirebaseService] fetchByIndexPath error:', err);
    throw err;
  });

  // client-side post filters for nickname/message text inclusions
  const nickname = (filters.nickname || '').trim().toLowerCase();
  const messageText = (filters.message || '').trim().toLowerCase();
  let filtered = entries;
  if (nickname) filtered = filtered.filter(x => (x.nickname || '').toLowerCase().includes(nickname));
  if (messageText) filtered = filtered.filter(x => (x.message || '').toLowerCase().includes(messageText));
  console.log('[FirebaseService] After client filters:', filtered.length);
  return filtered;
}

/**
 * Fetch distinct values for a field within recent project entries.
 * @param {('server'|'platform'|'userId'|'nickname'|'date')} field
 * @param {string} [project=DEFAULT_PROJECT]
 * @returns {Promise<Array<string>>}
 */
export async function fetchDistinct(field, project = DEFAULT_PROJECT) {
  // pull latest slice and extract uniques; cheap and simple for now
  const entries = await fetchByIndexPath(`${INDEX_PATHS.BY_PROJECT}/${project}`, 500);
  const set = new Set(entries.map(e => e[field]).filter(Boolean));
  return Array.from(set).sort();
}

/**
 * Fetch distinct project names by scanning index root when available.
 * @returns {Promise<Array<string>>}
 */
export async function fetchProjects() {
  ensureFirebase();
  const byProjectRef = ref(db, makePath([LOGS_PATH, FOLDER_INDEXES, INDEX_PATHS.BY_PROJECT]));
  const snap = await get(byProjectRef);
  if (!snap.exists()) return [];
  return Object.keys(snap.val()).sort();
}


