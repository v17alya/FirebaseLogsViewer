import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { firebaseConfig, DATABASE_PATH, LOG_FIELDS } from '../config/firebase-config.js';

/**
 * Firebase service for handling database operations
 */
class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.baseRef = ref(this.database, DATABASE_PATH);
  }

  /**
   * Fetch logs with optional filtering
   * @param {Object} filters - Filter options
   * @param {string} filters.server - Server filter
   * @param {string} filters.platform - Platform filter
   * @param {string} filters.date - Date filter (YYYY-MM-DD)
   * @param {string} filters.userId - User ID filter
   * @param {string} filters.nickname - Nickname filter
   * @param {string} filters.message - Message content filter
   * @param {number} filters.monthsBack - Number of months to look back (default: 3)
   * @returns {Promise<Array>} Array of log entries
   */
  async fetchLogs(filters = {}) {
    try {
      console.log('Firebase: Fetching logs with filters:', filters);
      
      let logsRef = this.baseRef;
      
      // Apply path filters
      if (filters.server) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}`);
        console.log('Firebase: Using server path:', logsRef.toString());
      }
      
      if (filters.platform && filters.server) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}/${filters.platform}`);
        console.log('Firebase: Using platform path:', logsRef.toString());
      }
      
      if (filters.date && filters.server && filters.platform) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}/${filters.platform}/${filters.date}`);
        console.log('Firebase: Using date path:', logsRef.toString());
      }
      
      if (filters.userId && filters.server && filters.platform && filters.date) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}/${filters.platform}/${filters.date}/${filters.userId}`);
        console.log('Firebase: Using userId path:', logsRef.toString());
      }

      console.log('Firebase: Final path for fetching:', logsRef.toString());
      const snapshot = await get(logsRef);
      
      if (!snapshot.exists()) {
        console.log('Firebase: No data found at path');
        return [];
      }

      const logs = [];
      const data = snapshot.val();
      console.log('Firebase: Data structure at path:', Object.keys(data || {}));

      // Recursively traverse the data structure to find log entries
      this.extractLogs(data, logs, filters);
      console.log('Firebase: Extracted logs count:', logs.length);

      return logs;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw new Error(`Failed to fetch logs: ${error.message}`);
    }
  }

  /**
   * Fetch available servers only
   * @returns {Promise<Array>} Array of server names
   */
  async fetchServers() {
    try {
      console.log('Firebase: Fetching servers from', this.baseRef.toString());
      const snapshot = await get(this.baseRef);
      if (!snapshot.exists()) {
        console.log('Firebase: No servers found');
        return [];
      }
      const servers = Object.keys(snapshot.val()).sort();
      console.log('Firebase: Servers found:', servers);
      return servers;
    } catch (error) {
      console.error('Firebase: Error fetching servers:', error);
      return [];
    }
  }

  /**
   * Fetch platforms for a specific server
   * @param {string} server - Server name
   * @returns {Promise<Array>} Array of platform names
   */
  async fetchPlatforms(server) {
    try {
      const serverRef = ref(this.database, `${DATABASE_PATH}/${server}`);
      const snapshot = await get(serverRef);
      if (!snapshot.exists()) {
        return [];
      }
      return Object.keys(snapshot.val()).sort();
    } catch (error) {
      console.error('Error fetching platforms:', error);
      return [];
    }
  }

  /**
   * Fetch dates for a specific server and platform
   * @param {string} server - Server name
   * @param {string} platform - Platform name
   * @returns {Promise<Array>} Array of date strings
   */
  async fetchDates(server, platform) {
    try {
      const platformRef = ref(this.database, `${DATABASE_PATH}/${server}/${platform}`);
      const snapshot = await get(platformRef);
      if (!snapshot.exists()) {
        return [];
      }
      return Object.keys(snapshot.val()).sort();
    } catch (error) {
      console.error('Error fetching dates:', error);
      return [];
    }
  }

  /**
   * Fetch user IDs for a specific server, platform, and date
   * @param {string} server - Server name
   * @param {string} platform - Platform name
   * @param {string} date - Date string
   * @returns {Promise<Array>} Array of user IDs
   */
  async fetchUserIds(server, platform, date) {
    try {
      const dateRef = ref(this.database, `${DATABASE_PATH}/${server}/${platform}/${date}`);
      const snapshot = await get(dateRef);
      if (!snapshot.exists()) {
        return [];
      }
      return Object.keys(snapshot.val()).sort();
    } catch (error) {
      console.error('Error fetching user IDs:', error);
      return [];
    }
  }

  /**
   * Extract log entries from nested data structure
   * @param {Object} data - Data to traverse
   * @param {Array} logs - Array to store extracted logs
   * @param {Object} filters - Current filters
   * @param {Array} path - Current path in the data structure
   */
  extractLogs(data, logs, filters, path = []) {
    if (!data || typeof data !== 'object') {
      return;
    }

    // Check if this level contains log fields
    if (data[LOG_FIELDS.MESSAGE] || data[LOG_FIELDS.NICKNAME] || data[LOG_FIELDS.TIMESTAMP]) {
      const logEntry = {
        message: data[LOG_FIELDS.MESSAGE] || '',
        nickname: data[LOG_FIELDS.NICKNAME] || '',
        timestamp: data[LOG_FIELDS.TIMESTAMP] || '',
        path: path.join('/'),
        ...this.extractPathInfo(path)
      };

      console.log('Firebase: Found log entry at path:', path.join('/'), 'with data:', logEntry);

      // Apply filters
      if (this.matchesFilters(logEntry, filters)) {
        console.log('Firebase: Log entry matches filters, adding to results');
        logs.push(logEntry);
      } else {
        console.log('Firebase: Log entry does not match filters');
      }
    } else {
      // Continue traversing
      console.log('Firebase: Traversing path:', path.join('/'), 'with keys:', Object.keys(data));
      Object.keys(data).forEach(key => {
        this.extractLogs(data[key], logs, filters, [...path, key]);
      });
    }
  }

  /**
   * Extract server, platform, date, and userId from path
   * @param {Array} path - Path array
   * @returns {Object} Path information
   */
  extractPathInfo(path) {
    return {
      server: path[0] || '',
      platform: path[1] || '',
      date: path[2] || '',
      userId: path[3] || '',
      logIndex: path[4] || ''
    };
  }

  /**
   * Check if log entry matches all applied filters
   * @param {Object} logEntry - Log entry to check
   * @param {Object} filters - Filters to apply
   * @returns {boolean} True if log matches all filters
   */
  matchesFilters(logEntry, filters) {
    console.log('Firebase: Checking filters for log entry:', logEntry);
    console.log('Firebase: Applied filters:', filters);
    
    if (filters.server && logEntry.server !== filters.server) {
      console.log('Firebase: Server filter failed - expected:', filters.server, 'got:', logEntry.server);
      return false;
    }
    if (filters.platform && logEntry.platform !== filters.platform) {
      console.log('Firebase: Platform filter failed - expected:', filters.platform, 'got:', logEntry.platform);
      return false;
    }
    if (filters.date && logEntry.date !== filters.date) {
      console.log('Firebase: Date filter failed - expected:', filters.date, 'got:', logEntry.date);
      return false;
    }
    if (filters.userId && logEntry.userId !== filters.userId) {
      console.log('Firebase: UserId filter failed - expected:', filters.userId, 'got:', logEntry.userId);
      return false;
    }
    
    // Quick user search - search in userId field
    if (filters.quickUserId && !logEntry.userId.toLowerCase().includes(filters.quickUserId.toLowerCase())) {
      console.log('Firebase: QuickUserId filter failed');
      return false;
    }
    
    if (filters.nickname && !logEntry.nickname.toLowerCase().includes(filters.nickname.toLowerCase())) {
      console.log('Firebase: Nickname filter failed');
      return false;
    }
    if (filters.message && !logEntry.message.toLowerCase().includes(filters.message.toLowerCase())) {
      console.log('Firebase: Message filter failed');
      return false;
    }
    
    // Date range filter
    if (filters.monthsBack) {
      const logDate = new Date(logEntry.timestamp);
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - filters.monthsBack);
      
      if (logDate < cutoffDate) {
        console.log('Firebase: Date range filter failed - log date:', logDate, 'cutoff:', cutoffDate);
        return false;
      }
    }
    
    console.log('Firebase: All filters passed');
    return true;
  }

  /**
   * Get unique values for filter options
   * @param {string} field - Field to get unique values for
   * @returns {Promise<Array>} Array of unique values
   */
  async getUniqueValues(field) {
    try {
      const snapshot = await get(this.baseRef);
      if (!snapshot.exists()) {
        return [];
      }

      const values = new Set();
      const data = snapshot.val();
      
      this.extractUniqueValues(data, values, field);
      
      return Array.from(values).sort();
    } catch (error) {
      console.error(`Error getting unique values for ${field}:`, error);
      return [];
    }
  }

  /**
   * Extract unique values for a specific field
   * @param {Object} data - Data to traverse
   * @param {Set} values - Set to store unique values
   * @param {string} field - Field to extract
   * @param {Array} path - Current path
   */
  extractUniqueValues(data, values, field, path = []) {
    if (!data || typeof data !== 'object') {
      return;
    }

    if (path.length === 0 && field === 'server') {
      Object.keys(data).forEach(key => values.add(key));
    } else if (path.length === 1 && field === 'platform') {
      // Platform level contains both platforms and dates
      Object.keys(data).forEach(key => values.add(key));
    } else if (path.length === 2 && field === 'date') {
      // Date level contains user IDs
      Object.keys(data).forEach(key => values.add(key));
    } else if (path.length === 3 && field === 'userId') {
      // User ID level
      Object.keys(data).forEach(key => values.add(key));
    } else {
      Object.keys(data).forEach(key => {
        this.extractUniqueValues(data[key], values, field, [...path, key]);
      });
    }
  }
}

export default FirebaseService;
