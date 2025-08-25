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
      let logsRef = this.baseRef;
      
      // Apply path filters
      if (filters.server) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}`);
      }
      
      if (filters.platform && filters.server) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}/${filters.platform}`);
      }
      
      if (filters.date && filters.server && filters.platform) {
        logsRef = ref(this.database, `${DATABASE_PATH}/${filters.server}/${filters.platform}/${filters.date}`);
      }

      const snapshot = await get(logsRef);
      
      if (!snapshot.exists()) {
        return [];
      }

      const logs = [];
      const data = snapshot.val();

      // Recursively traverse the data structure to find log entries
      this.extractLogs(data, logs, filters);

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

      // Apply filters
      if (this.matchesFilters(logEntry, filters)) {
        logs.push(logEntry);
      }
    } else {
      // Continue traversing
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
    if (filters.server && logEntry.server !== filters.server) return false;
    if (filters.platform && logEntry.platform !== filters.platform) return false;
    if (filters.date && logEntry.date !== filters.date) return false;
    if (filters.userId && logEntry.userId !== filters.userId) return false;
    if (filters.nickname && !logEntry.nickname.toLowerCase().includes(filters.nickname.toLowerCase())) return false;
    if (filters.message && !logEntry.message.toLowerCase().includes(filters.message.toLowerCase())) return false;
    
    // Date range filter
    if (filters.monthsBack) {
      const logDate = new Date(logEntry.timestamp);
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - filters.monthsBack);
      
      if (logDate < cutoffDate) return false;
    }
    
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
