/**
 * Utility functions for exporting logs in different formats
 */

/**
 * Export logs to JSON format
 * @param {Array} logs - Array of log entries to export
 * @param {string} filename - Name of the file to save
 */
export function exportToJSON(logs, filename = 'logs.json') {
  const dataStr = JSON.stringify(logs, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}

/**
 * Export logs to CSV format
 * @param {Array} logs - Array of log entries to export
 * @param {string} filename - Name of the file to save
 */
export function exportToCSV(logs, filename = 'logs.csv') {
  if (logs.length === 0) {
    alert('No logs to export');
    return;
  }

  const headers = ['Timestamp', 'Server', 'Platform', 'Date', 'User ID', 'Nickname', 'Message', 'Path'];
  const csvContent = [
    headers.join(','),
    ...logs.map(log => [
      `"${log.timestamp || ''}"`,
      `"${log.server || ''}"`,
      `"${log.platform || ''}"`,
      `"${log.date || ''}"`,
      `"${log.userId || ''}"`,
      `"${log.nickname || ''}"`,
      `"${(log.message || '').replace(/"/g, '""')}"`,
      `"${log.path || ''}"`
    ].join(','))
  ].join('\n');

  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}

/**
 * Export logs to TXT format
 * @param {Array} logs - Array of log entries to export
 * @param {string} filename - Name of the file to save
 */
export function exportToTXT(logs, filename = 'logs.txt') {
  if (logs.length === 0) {
    alert('No logs to export');
    return;
  }

  const textContent = logs.map(log => {
    return `[${log.timestamp || 'N/A'}] ${log.nickname || 'Unknown'}: ${log.message || ''}
  Server: ${log.server || 'N/A'} | Platform: ${log.platform || 'N/A'} | Date: ${log.date || 'N/A'} | User ID: ${log.userId || 'N/A'}
  Path: ${log.path || 'N/A'}
  ${'-'.repeat(80)}`;
  }).join('\n\n');

  const dataBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}

/**
 * Group logs by specified field
 * @param {Array} logs - Array of log entries
 * @param {string} groupBy - Field to group by ('date', 'server', 'nickname')
 * @returns {Object} Grouped logs
 */
export function groupLogs(logs, groupBy) {
  const grouped = {};
  
  logs.forEach(log => {
    const key = log[groupBy] || 'Unknown';
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(log);
  });
  
  return grouped;
}

/**
 * Format timestamp for display
 * @param {string} timestamp - Raw timestamp
 * @returns {string} Formatted timestamp
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A';
  
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    return timestamp;
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
