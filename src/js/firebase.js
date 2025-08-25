import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, query, orderByChild, startAt, endAt } from 'firebase/database';
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
      Object.keys(data).forEach(key => values.add(key));
    } else if (path.length === 2 && field === 'date') {
      Object.keys(data).forEach(key => values.add(key));
    } else if (path.length === 3 && field === 'userId') {
      Object.keys(data).forEach(key => values.add(key));
    } else {
      Object.keys(data).forEach(key => {
        this.extractUniqueValues(data[key], values, field, [...path, key]);
      });
    }
  }
}

export default FirebaseService;
