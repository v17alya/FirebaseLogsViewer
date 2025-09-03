/**
 * Firebase configuration for the logs viewer application
 * @type {Object}
 */
export const firebaseConfig = {
  apiKey: "AIzaSyB1T_bGrmu7reGcsW3V70hAznbE3L_Uo8o",
  authDomain: "logexporter-42a5f.firebaseapp.com",
  databaseURL: "https://logexporter-42a5f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logexporter-42a5f",
  storageBucket: "logexporter-42a5f.firebasestorage.app",
  messagingSenderId: "334718041282",
  appId: "1:334718041282:web:857f398951dd2eddfd8f5b",
  measurementId: "G-6LGNFPT0BK"
};

/**
 * New schema constants based on firebase_logs.module.js
 * @type {Object}
 */
export const LOGS_PATH = 'logs';
export const FOLDER_ENTRIES = 'entries';
export const FOLDER_INDEXES = 'indexes';

/**
 * Index paths based on firebase_logs.module.js structure
 * @type {Object}
 */
export const INDEX_PATHS = {
  BY_PROJECT_DATE: 'byProjectDate',
  BY_USER_DATE: 'byUserDate', 
  BY_PROJ_SRV_PLAT_DATE: 'byProjSrvPlatDate',
  BY_PROJECT_USER_DATE: 'byProjectUserDate',
  BY_PROJECT_PLATFORM_DATE: 'byProjectPlatformDate',
  BY_PROJECT_SERVER_DATE: 'byProjectServerDate',
  BY_PROJECT: 'byProject',
  BY_PROJECT_SERVER: 'byProjectServer',
  BY_PROJECT_PLATFORM: 'byProjectPlatform',
  BY_PROJECT_PLATFORM_TS: 'byProjectPlatformTs',
  BY_PROJECT_SERVER_PLATFORM: 'byProjectServerPlatform',
  BY_USER: 'byUser'
};

/**
 * Available log fields based on firebase_logs.module.js
 * @type {Object}
 */
export const LOG_FIELDS = {
  PROJECT: 'project',
  SERVER: 'server',
  PLATFORM: 'platform',
  DATE: 'date',
  USER_ID: 'userId',
  SEQ: 'seq',
  NICKNAME: 'nickname',
  MESSAGE: 'message',
  TS: 'ts'
};

/**
 * Default project name from firebase_logs.module.js
 * @type {string}
 */
export const DEFAULT_PROJECT = 'Mega';
