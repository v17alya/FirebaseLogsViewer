/**
 * Mock data for testing the UI when Firebase is not available
 */

/**
 * Generate mock log entries
 * @param {number} count - Number of log entries to generate
 * @returns {Array} Array of mock log entries
 */
export function generateMockLogs(count = 50) {
  const servers = ['SHOLAHEYSERVER', 'TESTINGSERVER', 'PRODSERVER'];
  const platforms = ['Linux', 'Windows', 'macOS'];
  const nicknames = ['Player1', 'Player2', 'Admin', 'Moderator', 'User123', 'GamerPro'];
  const messages = [
    'User joined the game',
    'User left the game',
    'Chat message sent',
    'Command executed',
    'Error occurred',
    'Warning message',
    'Info message',
    'Debug information',
    'User authenticated',
    'User disconnected'
  ];

  const logs = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const date = timestamp.toISOString().split('T')[0];
    
    logs.push({
      timestamp: timestamp.toISOString(),
      server: servers[Math.floor(Math.random() * servers.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      date: date,
      userId: `user-${Math.random().toString(36).substr(2, 9)}`,
      nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
      message: messages[Math.floor(Math.random() * messages.length)] + ` (${i + 1})`,
      path: `StreamersMegagames/${servers[Math.floor(Math.random() * servers.length)]}/${platforms[Math.floor(Math.random() * platforms.length)]}/${date}/user-${Math.random().toString(36).substr(2, 9)}/${i}`
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Mock Firebase service for testing
 */
export class MockFirebaseService {
  constructor() {
    this.mockLogs = generateMockLogs(100);
  }

  /**
   * Mock fetch logs method
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Promise resolving to filtered logs
   */
  async fetchLogs(filters = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    let filteredLogs = [...this.mockLogs];

    // Apply filters
    if (filters.server) {
      filteredLogs = filteredLogs.filter(log => log.server === filters.server);
    }
    if (filters.platform) {
      filteredLogs = filteredLogs.filter(log => log.platform === filters.platform);
    }
    if (filters.date) {
      filteredLogs = filteredLogs.filter(log => log.date === filters.date);
    }
    if (filters.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
    }
    if (filters.nickname) {
      filteredLogs = filteredLogs.filter(log => 
        log.nickname.toLowerCase().includes(filters.nickname.toLowerCase())
      );
    }
    if (filters.message) {
      filteredLogs = filteredLogs.filter(log => 
        log.message.toLowerCase().includes(filters.message.toLowerCase())
      );
    }

    return filteredLogs;
  }

  /**
   * Mock get unique values method
   * @param {string} field - Field to get unique values for
   * @returns {Promise<Array>} Promise resolving to unique values
   */
  async getUniqueValues(field) {
    await new Promise(resolve => setTimeout(resolve, 200));

    const values = new Set();
    
    this.mockLogs.forEach(log => {
      if (log[field]) {
        values.add(log[field]);
      }
    });

    return Array.from(values).sort();
  }
}
