import { DEFAULT_PROJECT } from '../config/firebase-config.js';
import { fetchLogs, debugIndexes } from './firebase.js';
import { FilterPanel } from '../components/FilterPanel.js';
import { LogsTable } from '../components/LogsTable.js';
import { ExportPanel } from '../components/ExportPanel.js';
import { DeletePanel } from '../components/DeletePanel.js';

const filterPanel = new FilterPanel();
const logsTable = new LogsTable('logs-container');
const exportPanel = new ExportPanel(logsTable);
const deletePanel = new DeletePanel();

async function init() {
  try {
    await filterPanel.loadInitialOptions();
    attachHandlers();
    deletePanel.onDone(() => applyFilters());
    await applyFilters();
  } catch (e) {
    showError(e);
  }
}

function attachHandlers() {
  document.getElementById('btn-refresh').addEventListener('click', applyFilters);
  filterPanel.onApply(applyFilters);
  filterPanel.onClear(applyFilters);
  const groupBy = document.getElementById('groupBy');
  const uniqueness = document.getElementById('uniqueness');
  groupBy.addEventListener('change', () => {
    logsTable.updateLogs(currentLogs, groupBy.value);
  });
  uniqueness.addEventListener('change', applyFilters);
}

let currentLogs = [];

async function applyFilters() {
  clearError();
  try {
    const filters = filterPanel.getFilters();
    const limit = filters.limit || 200;
    let rows = await fetchLogs(filters, limit);
    // Uniqueness filtering
    const uniqMode = document.getElementById('uniqueness').value;
    if (uniqMode === 'message') {
      const seen = new Set();
      rows = rows.filter(r => {
        const key = (r.message || '').trim();
        if (!key) return true;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    } else if (uniqMode === 'perUserMessage') {
      const seen = new Set();
      rows = rows.filter(r => {
        const key = `${r.userId || ''}|${(r.message || '').trim()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    currentLogs = rows;
    const groupBy = document.getElementById('groupBy').value;
    logsTable.updateLogs(rows, groupBy);
    exportPanel.updateLogs(rows);
  } catch (e) {
    showError(e);
  }
}

function showError(e) {
  const el = document.getElementById('error-banner');
  if (!el) return;
  el.textContent = `Error: ${e?.message || e}`;
  el.classList.remove('hidden');
}

function clearError() {
  const el = document.getElementById('error-banner');
  if (!el) return;
  el.textContent = '';
  el.classList.add('hidden');
}

// Debug function to help troubleshoot missing logs
window.debugLogs = async function() {
  console.log('=== DEBUG LOGS ===');
  
  // Check available indexes
  console.log('1. Checking available indexes...');
  await debugIndexes();
  
  // Check project-specific indexes
  const project = filterPanel.getFilters().project || DEFAULT_PROJECT;
  console.log('2. Checking project indexes for:', project);
  await debugIndexes(`byProject/${project}`);
  
  // Check date-specific indexes for 2024-09-25
  console.log('3. Checking date indexes for 2024-09-25...');
  await debugIndexes(`byProjectDate/${project}/2024-09-25`);
  
  // Check user-specific indexes
  console.log('4. Checking user indexes...');
  await debugIndexes('byUser');
  
  console.log('=== END DEBUG ===');
};

init().catch(console.error);


