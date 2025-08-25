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
 * Available log fields
 * @type {Object}
 */
export const LOG_FIELDS = {
  MESSAGE: 'message',
  NICKNAME: 'nickname',
  TIMESTAMP: 'timestamp'
};
