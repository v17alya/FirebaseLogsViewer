/**
 * Normalize error messages by removing variable parts (numbers, positions, sizes)
 * to group similar errors together.
 * @param {string} message
 * @returns {string}
 */
export function normalizeErrorMessage(message) {
  if (!message) return '';
  
  let normalized = message.trim();
  
  // Replace specific numeric patterns in common Unity/system errors
  normalized = normalized
    // "position: 578" → "position: N"
    .replace(/position:\s*\d+/gi, 'position: N')
    // "reading: 18" → "reading: N"
    .replace(/reading:\s*\d+/gi, 'reading: N')
    // "capacity: 584" → "capacity: N"
    .replace(/capacity:\s*\d+/gi, 'capacity: N')
    // "Size=768" → "Size=N"
    .replace(/Size=\d+/gi, 'Size=N')
    // Generic standalone numbers in brackets
    .replace(/\[\d+\]/g, '[N]')
    // Hex addresses like 0x1234ABCD
    .replace(/0x[0-9a-fA-F]+/g, '0xHEX')
    // Timestamps or long numbers
    .replace(/\b\d{6,}\b/g, 'N')
    // Any other standalone numbers (be careful not to break error codes)
    .replace(/:\s*\d+/g, ': N');
  
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

