import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, query, orderByKey, startAt, endAt, limitToFirst } from 'firebase/database';
import { firebaseConfig, DATABASE_PATH, LOGS_PATH, INDEX_PATHS, LOG_FIELDS } from '../config/firebase-config.js';

/**
 * Firebase service for handling database operations with new schema
 */
class FirebaseService {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.project = DATABASE_PATH;
  }

  /**
   * Fetch logs with optional filtering using new schema
   * @param {Object} filters - Filter options
   * @param {string} filters.server - Server filter
   * @param {string} filters.platform - Platform filter
   * @param {string} filters.date - Date filter (YYYY-MM-DD)
   * @param {string} filters.userId - User ID filter
   * @param {string} filters.quickUserId - Quick user search
   * @param {string} filters.nickname - Nickname filter
   * @param {string} filters.message - Message content filter
   * @param {number} filters.monthsBack - Number of months to look back (default: 3)
   * @returns {Promise<Array>} Array of log entries
   */
  async fetchLogs(filters = {}) {
    try {
      console.log('Firebase: Fetching logs with filters:', filters);
      
      // Get log IDs based on filters
      const logIds = await this.getLogIds(filters);
      console.log('Firebase: Found log IDs:', logIds.length);
      
      if (logIds.length === 0) {
        return [];
      }
      
      // Fetch actual log data
      const logs = await this.fetchLogsByIds(logIds);
      console.log('Firebase: Fetched logs:', logs.length);
      
      // Apply text filters (nickname, message, quickUserId)
      const filteredLogs = this.applyTextFilters(logs, filters);
      console.log('Firebase: After text filtering:', filteredLogs.length);
      
      return filteredLogs;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw new Error(`Failed to fetch logs: ${error.message}`);
    }
  }

  /**
   * Get log IDs based on filters using appropriate index
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Array of log IDs
   */
  async getLogIds(filters) {
    try {
      let indexPath = '';
      
      // Determine which index to use based on available filters
      if (filters.server && filters.platform && filters.date) {
        // Use project + server + platform + date index
        indexPath = `${INDEX_PATHS.PROJECT_SERVER_PLATFORM_DATE}/${this.project}/${filters.server}/${filters.platform}/${filters.date}`;
        console.log('Firebase: Using PROJECT_SERVER_PLATFORM_DATE index:', indexPath);
      } else if (filters.platform && filters.date) {
        // Use project + platform + date index
        indexPath = `${INDEX_PATHS.PROJECT_PLATFORM_DATE}/${this.project}/${filters.platform}/${filters.date}`;
        console.log('Firebase: Using PROJECT_PLATFORM_DATE index:', indexPath);
      } else if (filters.date) {
        // Use project + date index
        indexPath = `${INDEX_PATHS.PROJECT_DATE}/${this.project}/${filters.date}`;
        console.log('Firebase: Using PROJECT_DATE index:', indexPath);
      } else if (filters.quickUserId && filters.date) {
        // Use user + date index
        const sanitizedUserId = this.sanitizeUserId(filters.quickUserId);
        indexPath = `${INDEX_PATHS.USER_DATE}/${sanitizedUserId}/${filters.date}`;
        console.log('Firebase: Using USER_DATE index:', indexPath);
      } else if (filters.quickUserId) {
        // For user search without date, we need to search across multiple dates
        // This is a simplified approach - in production you might want to limit the date range
        const sanitizedUserId = this.sanitizeUserId(filters.quickUserId);
        const recentDates = this.getRecentDates(filters.monthsBack || 3);
        const allLogIds = [];
        
        for (const date of recentDates) {
          const dateIndexPath = `${INDEX_PATHS.USER_DATE}/${sanitizedUserId}/${date}`;
          const dateLogIds = await this.getLogIdsFromIndex(dateIndexPath);
          allLogIds.push(...dateLogIds);
        }
        
        return allLogIds;
      } else {
        // Default: use project + date for last 3 months
        const recentDates = this.getRecentDates(filters.monthsBack || 3);
        const allLogIds = [];
        
        for (const date of recentDates) {
          const dateIndexPath = `${INDEX_PATHS.PROJECT_DATE}/${this.project}/${date}`;
          const dateLogIds = await this.getLogIdsFromIndex(dateIndexPath);
          allLogIds.push(...dateLogIds);
        }
        
        return allLogIds;
      }
      
      return await this.getLogIdsFromIndex(indexPath);
    } catch (error) {
      console.error('Error getting log IDs:', error);
      return [];
    }
  }

  /**
   * Get log IDs from a specific index path
   * @param {string} indexPath - Index path
   * @returns {Promise<Array>} Array of log IDs
   */
  async getLogIdsFromIndex(indexPath) {
    try {
      const indexRef = ref(this.database, indexPath);
      const snapshot = await get(indexRef);
      
      if (!snapshot.exists()) {
        return [];
      }
      
      const logIds = Object.keys(snapshot.val());
      console.log('Firebase: Found log IDs from index:', logIds.length);
      return logIds;
    } catch (error) {
      console.error('Error getting log IDs from index:', error);
      return [];
    }
  }

  /**
   * Fetch logs by their IDs
   * @param {Array} logIds - Array of log IDs
   * @returns {Promise<Array>} Array of log entries
   */
  async fetchLogsByIds(logIds) {
    try {
      const logs = [];
      const batchSize = 100; // Firebase has limits on concurrent requests
      
      for (let i = 0; i < logIds.length; i += batchSize) {
        const batch = logIds.slice(i, i + batchSize);
        const batchPromises = batch.map(logId => this.fetchLogById(logId));
        const batchResults = await Promise.all(batchPromises);
        logs.push(...batchResults.filter(log => log !== null));
      }
      
      return logs;
    } catch (error) {
      console.error('Error fetching logs by IDs:', error);
      return [];
    }
  }

  /**
   * Fetch a single log by ID
   * @param {string} logId - Log ID
   * @returns {Promise<Object|null>} Log entry or null
   */
  async fetchLogById(logId) {
    try {
      const logRef = ref(this.database, `${LOGS_PATH}/${logId}`);
      const snapshot = await get(logRef);
      
      if (!snapshot.exists()) {
        return null;
      }
      
      const logData = snapshot.val();
      return {
        ...logData,
        logId,
        timestamp: logData.ts // Convert ts to timestamp for compatibility
      };
    } catch (error) {
      console.error('Error fetching log by ID:', logId, error);
      return null;
    }
  }

  /**
   * Apply text filters to logs
   * @param {Array} logs - Array of log entries
   * @param {Object} filters - Filter options
   * @returns {Array} Filtered logs
   */
  applyTextFilters(logs, filters) {
    return logs.filter(log => {
      if (filters.nickname && !log.nickname.toLowerCase().includes(filters.nickname.toLowerCase())) {
        return false;
      }
      if (filters.message && !log.message.toLowerCase().includes(filters.message.toLowerCase())) {
        return false;
      }
      if (filters.quickUserId && !log.userId.toLowerCase().includes(filters.quickUserId.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  /**
   * Sanitize user ID for use in paths
   * @param {string} userId - User ID
   * @returns {string} Sanitized user ID
   */
  sanitizeUserId(userId) {
    return userId.replace(/[.#$[\]]/g, '_');
  }

  /**
   * Get recent dates for the last N months
   * @param {number} monthsBack - Number of months to look back
   * @returns {Array} Array of date strings (YYYY-MM-DD)
   */
  getRecentDates(monthsBack) {
    const dates = [];
    const now = new Date();
    
    for (let i = 0; i < monthsBack * 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  }

  /**
   * Fetch available servers using new schema
   * @returns {Promise<Array>} Array of server names
   */
  async fetchServers() {
    try {
      console.log('Firebase: Fetching servers using new schema');
      
      // Get recent dates to search for servers
      const recentDates = this.getRecentDates(3);
      const serverSet = new Set();
      
      for (const date of recentDates) {
        const indexPath = `${INDEX_PATHS.PROJECT_DATE}/${this.project}/${date}`;
        const logIds = await this.getLogIdsFromIndex(indexPath);
        
        // Fetch a sample of logs to extract server names
        const sampleLogIds = logIds.slice(0, 10);
        const sampleLogs = await this.fetchLogsByIds(sampleLogIds);
        
        sampleLogs.forEach(log => {
          if (log.server) {
            serverSet.add(log.server);
          }
        });
      }
      
      const servers = Array.from(serverSet).sort();
      console.log('Firebase: Servers found:', servers);
      return servers;
    } catch (error) {
      console.error('Firebase: Error fetching servers:', error);
      return [];
    }
  }

  /**
   * Fetch platforms for a specific server using new schema
   * @param {string} server - Server name
   * @returns {Promise<Array>} Array of platform names
   */
  async fetchPlatforms(server) {
    try {
      console.log('Firebase: Fetching platforms for server:', server);
      
      // Get recent dates to search for platforms
      const recentDates = this.getRecentDates(3);
      const platformSet = new Set();
      
      for (const date of recentDates) {
        const indexPath = `${INDEX_PATHS.PROJECT_SERVER_PLATFORM_DATE}/${this.project}/${server}/${date}`;
        const logIds = await this.getLogIdsFromIndex(indexPath);
        
        // Fetch a sample of logs to extract platform names
        const sampleLogIds = logIds.slice(0, 10);
        const sampleLogs = await this.fetchLogsByIds(sampleLogIds);
        
        sampleLogs.forEach(log => {
          if (log.platform) {
            platformSet.add(log.platform);
          }
        });
      }
      
      const platforms = Array.from(platformSet).sort();
      console.log('Firebase: Platforms found:', platforms);
      return platforms;
    } catch (error) {
      console.error('Error fetching platforms:', error);
      return [];
    }
  }

  /**
   * Fetch dates for a specific server and platform using new schema
   * @param {string} server - Server name
   * @param {string} platform - Platform name
   * @returns {Promise<Array>} Array of date strings
   */
  async fetchDates(server, platform) {
    try {
      console.log('Firebase: Fetching dates for server:', server, 'platform:', platform);
      
      // Get recent dates and check which ones have data
      const recentDates = this.getRecentDates(6);
      const availableDates = [];
      
      for (const date of recentDates) {
        const indexPath = `${INDEX_PATHS.PROJECT_SERVER_PLATFORM_DATE}/${this.project}/${server}/${platform}/${date}`;
        const logIds = await this.getLogIdsFromIndex(indexPath);
        
        if (logIds.length > 0) {
          availableDates.push(date);
        }
      }
      
      console.log('Firebase: Dates found:', availableDates);
      return availableDates;
    } catch (error) {
      console.error('Error fetching dates:', error);
      return [];
    }
  }

  /**
   * Fetch user IDs for a specific server, platform, and date using new schema
   * @param {string} server - Server name
   * @param {string} platform - Platform name
   * @param {string} date - Date string
   * @returns {Promise<Array>} Array of user IDs
   */
  async fetchUserIds(server, platform, date) {
    try {
      console.log('Firebase: Fetching user IDs for server:', server, 'platform:', platform, 'date:', date);
      
      const indexPath = `${INDEX_PATHS.PROJECT_SERVER_PLATFORM_DATE}/${this.project}/${server}/${platform}/${date}`;
      const logIds = await this.getLogIdsFromIndex(indexPath);
      
      if (logIds.length === 0) {
        return [];
      }
      
      // Fetch logs to extract unique user IDs
      const logs = await this.fetchLogsByIds(logIds);
      const userIdSet = new Set();
      
      logs.forEach(log => {
        if (log.userId) {
          userIdSet.add(log.userId);
        }
      });
      
      const userIds = Array.from(userIdSet).sort();
      console.log('Firebase: User IDs found:', userIds.length);
      return userIds;
    } catch (error) {
      console.error('Error fetching user IDs:', error);
      return [];
    }
  }




}

export default FirebaseService;
