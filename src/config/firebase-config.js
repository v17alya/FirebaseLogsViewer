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
 * Database path structure for logs
 * @type {string}
 */
export const DATABASE_PATH = 'StreamersMegagames';

/**
 * New schema constants
 * @type {Object}
 */
export const LOGS_PATH = 'logs';
export const INDEX_PATHS = {
  PROJECT_DATE: 'idx_by_project_date',
  USER_DATE: 'idx_by_user_date',
  PROJECT_SERVER_PLATFORM_DATE: 'idx_by_proj_srv_plat_date',
  PROJECT_USER_DATE: 'idx_by_project_user_date',
  PROJECT_TS: 'idx_by_project_ts',
  PROJECT_PLATFORM_DATE: 'idx_by_project_platform_date',
  PROJECT_PLATFORM_TS: 'idx_by_project_platform_ts'
};

/**
 * Available log fields (updated for new schema)
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
