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

  const headers = ['Timestamp', 'Server', 'Platform', 'Date', 'User ID', 'Nickname', 'Message', 'Project', 'Sequence', 'Log ID'];
  const csvContent = [
    headers.join(','),
    ...logs.map(log => [
      `"${formatTimestamp(log.ts || log.timestamp) || ''}"`,
      `"${log.server || ''}"`,
      `"${log.platform || ''}"`,
      `"${log.date || ''}"`,
      `"${log.userId || ''}"`,
      `"${log.nickname || ''}"`,
      `"${(log.message || '').replace(/"/g, '""')}"`,
      `"${log.project || ''}"`,
      `"${log.seq || ''}"`,
      `"${log.logId || ''}"`
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
    return `[${formatTimestamp(log.ts || log.timestamp) || 'N/A'}] ${log.nickname || 'Unknown'}: ${log.message || ''}
  Server: ${log.server || 'N/A'} | Platform: ${log.platform || 'N/A'} | Date: ${log.date || 'N/A'} | User ID: ${log.userId || 'N/A'}
  Project: ${log.project || 'N/A'} | Sequence: ${log.seq || 'N/A'} | Log ID: ${log.logId || 'N/A'}
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
 * @param {string} groupBy - Field to group by ('date', 'server', 'nickname', 'project')
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
 * @param {string|number} timestamp - Raw timestamp (can be ts field from firebase_logs.module.js)
 * @returns {string} Formatted timestamp
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A';
  
  try {
    // Handle both string timestamps and numeric ts from firebase_logs.module.js
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    return String(timestamp);
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

/**
 * Export grouped data to JSON format
 * @param {Map|Object} groups - Map or object of grouped data
 * @param {string} filename - Name of the file to save
 */
export function exportGroupsToJSON(groups, filename = 'groups.json') {
  const groupsArray = [];
  
  if (groups instanceof Map) {
    for (const [key, value] of groups) {
      if (value instanceof Map) {
        // Nested groups (user -> errors)
        const subGroups = [];
        for (const [subKey, subValue] of value) {
          subGroups.push({
            pattern: subKey,
            count: subValue.length,
            sample: subValue[0]?.message || subKey
          });
        }
        groupsArray.push({
          group: key,
          totalCount: Array.from(value.values()).reduce((sum, arr) => sum + arr.length, 0),
          errorGroups: subGroups
        });
      } else {
        // Simple groups (error patterns)
        groupsArray.push({
          pattern: key,
          count: value.length,
          sample: value[0]?.message || key
        });
      }
    }
  }
  
  const dataStr = JSON.stringify(groupsArray, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}

/**
 * Export grouped data to CSV format
 * @param {Map|Object} groups - Map or object of grouped data
 * @param {string} filename - Name of the file to save
 */
export function exportGroupsToCSV(groups, filename = 'groups.csv') {
  const rows = [];
  
  if (groups instanceof Map) {
    for (const [key, value] of groups) {
      if (value instanceof Map) {
        // Nested groups (user -> errors)
        for (const [subKey, subValue] of value) {
          rows.push([
            `"${key}"`,
            `"${subKey}"`,
            subValue.length,
            `"${(subValue[0]?.message || subKey).replace(/"/g, '""')}"`
          ].join(','));
        }
      } else {
        // Simple groups (error patterns)
        rows.push([
          `"${key}"`,
          value.length,
          `"${(value[0]?.message || key).replace(/"/g, '""')}"`
        ].join(','));
      }
    }
  }
  
  const headers = rows[0]?.split(',').length === 4 
    ? ['User/Group', 'Error Pattern', 'Count', 'Sample Message']
    : ['Error Pattern', 'Count', 'Sample Message'];
  
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}

/**
 * Export grouped data to TXT format
 * @param {Map|Object} groups - Map or object of grouped data
 * @param {string} filename - Name of the file to save
 */
export function exportGroupsToTXT(groups, filename = 'groups.txt') {
  const lines = [];
  
  if (groups instanceof Map) {
    for (const [key, value] of groups) {
      if (value instanceof Map) {
        // Nested groups (user -> errors)
        const totalCount = Array.from(value.values()).reduce((sum, arr) => sum + arr.length, 0);
        lines.push(`\n${'='.repeat(80)}`);
        lines.push(`USER: ${key}`);
        lines.push(`TOTAL LOGS: ${totalCount}`);
        lines.push(`${'-'.repeat(80)}`);
        
        for (const [subKey, subValue] of value) {
          lines.push(`\n  Error Pattern (${subValue.length} occurrences):`);
          lines.push(`  ${subValue[0]?.message || subKey}`);
        }
      } else {
        // Simple groups (error patterns)
        lines.push(`\n${'='.repeat(80)}`);
        lines.push(`COUNT: ${value.length}`);
        lines.push(`PATTERN: ${key}`);
        lines.push(`SAMPLE: ${value[0]?.message || key}`);
      }
    }
  }
  
  const textContent = lines.join('\n');
  
  const dataBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(link.href);
}
