/**
 * Normalize error messages by removing variable parts (numbers, positions, sizes)
 * to group similar errors together.
 * @param {string} message
 * @returns {string}
 */
export function normalizeErrorMessage(message) {
  if (!message) return '';
  
  let normalized = message.trim();
  
  // Replace all numeric patterns to group similar errors
  normalized = normalized
    // Hex addresses like 0x1234ABCD
    .replace(/0x[0-9a-fA-F]+/gi, '0xHEX')
    // Negative numbers (including decimals) like -21, -84.5
    .replace(/-\d+(\.\d+)?/g, 'N')
    // Positive numbers (including decimals) like 578, 10264, 3.14
    .replace(/\b\d+(\.\d+)?\b/g, 'N')
    // Clean up multiple N's with operators between them (optional: makes output cleaner)
    .replace(/N\s*([>=<]+)\s*N/g, 'N $1 N')
    .replace(/N\s*(&&|\|\|)\s*N/g, 'N $1 N');
  
  return normalized;
}

/**
 * Extract error type/category from message (e.g., "InvalidOperationException", "OutOfMemoryException")
 * @param {string} message
 * @returns {string}
 */
export function extractErrorType(message) {
  if (!message) return 'Unknown';
  
  // Look for common exception/error patterns
  const exceptionMatch = message.match(/\b(\w*Exception|\w*Error)\b/i);
  if (exceptionMatch) {
    return exceptionMatch[1];
  }
  
  // Look for [error], [warning], etc.
  const tagMatch = message.match(/^\[(\w+)\]/);
  if (tagMatch) {
    return tagMatch[1];
  }
  
  return 'Other';
}

/**
 * Group logs by similar error messages
 * @param {Array<object>} logs
 * @returns {Map<string, Array<object>>} Map of normalized message to logs
 */
export function groupBySimilarErrors(logs) {
  const groups = new Map();
  
  for (const log of logs) {
    const normalized = normalizeErrorMessage(log.message || '');
    if (!groups.has(normalized)) {
      groups.set(normalized, []);
    }
    groups.get(normalized).push(log);
  }
  
  return groups;
}

/**
 * Group logs by user, then by similar errors within each user
 * @param {Array<object>} logs
 * @returns {Map<string, Map<string, Array<object>>>}
 */
export function groupByUserThenErrors(logs) {
  const userGroups = new Map();
  
  for (const log of logs) {
    const userId = log.userId || 'Unknown';
    if (!userGroups.has(userId)) {
      userGroups.set(userId, []);
    }
    userGroups.get(userId).push(log);
  }
  
  // Now group each user's logs by similar errors
  const result = new Map();
  for (const [userId, userLogs] of userGroups) {
    result.set(userId, groupBySimilarErrors(userLogs));
  }
  
  return result;
}

