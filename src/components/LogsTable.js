import { formatTimestamp, truncateText } from '../utils/export-utils.js';

/**
 * Logs table component for displaying log entries
 */
export class LogsTable {
  constructor(container) {
    this.container = container;
    this.logs = [];
    this.currentPage = 1;
    this.itemsPerPage = 50;
    this.sortField = 'timestamp';
    this.sortDirection = 'desc';
    
    this.render();
  }

  /**
   * Render the logs table
   */
  render() {
    this.container.innerHTML = `
      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Logs</h3>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Sort by:</label>
              <select id="sort-field" class="input-field text-sm">
                <option value="timestamp">Timestamp</option>
                <option value="server">Server</option>
                <option value="platform">Platform</option>
                <option value="nickname">Nickname</option>
                <option value="message">Message</option>
              </select>
              <button id="sort-direction" class="btn-secondary text-sm">
                ↓
              </button>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Show:</label>
              <select id="items-per-page" class="input-field text-sm">
                <option value="25">25</option>
                <option value="50" selected>50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Server</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Platform</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">User ID</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Nickname</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Message</th>
                <th class="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody id="logs-tbody">
              <!-- Log entries will be inserted here -->
            </tbody>
          </table>
        </div>

        <div id="pagination" class="flex justify-between items-center mt-4">
          <!-- Pagination controls will be inserted here -->
        </div>

        <div id="no-logs" class="text-center py-8 text-gray-500 hidden">
          No logs found matching the current filters.
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Attach event listeners to table elements
   */
  attachEventListeners() {
    const sortField = this.container.querySelector('#sort-field');
    const sortDirection = this.container.querySelector('#sort-direction');
    const itemsPerPage = this.container.querySelector('#items-per-page');

    sortField.addEventListener('change', (e) => {
      this.sortField = e.target.value;
      this.currentPage = 1;
      this.renderLogs();
    });

    sortDirection.addEventListener('click', () => {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      sortDirection.textContent = this.sortDirection === 'asc' ? '↑' : '↓';
      this.currentPage = 1;
      this.renderLogs();
    });

    itemsPerPage.addEventListener('change', (e) => {
      this.itemsPerPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.renderLogs();
    });
  }

  /**
   * Update logs data and re-render
   * @param {Array} logs - Array of log entries
   */
  updateLogs(logs) {
    this.logs = logs;
    this.currentPage = 1;
    this.renderLogs();
  }

  /**
   * Render logs in the table
   */
  renderLogs() {
    const tbody = this.container.querySelector('#logs-tbody');
    const noLogs = this.container.querySelector('#no-logs');

    if (this.logs.length === 0) {
      tbody.innerHTML = '';
      noLogs.classList.remove('hidden');
      this.renderPagination();
      return;
    }

    noLogs.classList.add('hidden');

    // Sort logs
    const sortedLogs = [...this.logs].sort((a, b) => {
      let aVal = a[this.sortField] || '';
      let bVal = b[this.sortField] || '';

      if (this.sortField === 'timestamp') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }

      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Paginate logs
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedLogs = sortedLogs.slice(startIndex, endIndex);

    // Render log entries
    tbody.innerHTML = paginatedLogs.map(log => `
      <tr class="border-b border-gray-100 hover:bg-gray-50">
        <td class="py-3 px-4 text-gray-600 font-mono text-xs">
          ${formatTimestamp(log.timestamp)}
        </td>
        <td class="py-3 px-4 text-gray-700">
          ${log.server || 'N/A'}
        </td>
        <td class="py-3 px-4 text-gray-700">
          ${log.platform || 'N/A'}
        </td>
        <td class="py-3 px-4 text-gray-700">
          ${log.date || 'N/A'}
        </td>
        <td class="py-3 px-4 text-gray-600 font-mono text-xs">
          ${truncateText(log.userId || 'N/A', 20)}
        </td>
        <td class="py-3 px-4 text-gray-700 font-medium">
          ${log.nickname || 'Unknown'}
        </td>
        <td class="py-3 px-4 text-gray-800">
          <div class="max-w-xs">
            ${truncateText(log.message || '', 80)}
            ${(log.message || '').length > 80 ? 
              `<button class="text-blue-600 hover:text-blue-800 ml-1" onclick="showFullMessage('${this.escapeHtml(log.message || '')}')">...</button>` : 
              ''
            }
          </div>
        </td>
        <td class="py-3 px-4">
          <button class="text-blue-600 hover:text-blue-800 text-sm" onclick="showLogDetails('${this.escapeHtml(JSON.stringify(log))}')">
            Details
          </button>
        </td>
      </tr>
    `).join('');

    this.renderPagination();
  }

  /**
   * Render pagination controls
   */
  renderPagination() {
    const pagination = this.container.querySelector('#pagination');
    const totalPages = Math.ceil(this.logs.length / this.itemsPerPage);
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, this.logs.length);

    if (totalPages <= 1) {
      pagination.innerHTML = `
        <div class="text-sm text-gray-600">
          Showing ${this.logs.length} of ${this.logs.length} logs
        </div>
      `;
      return;
    }

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    pagination.innerHTML = `
      <div class="text-sm text-gray-600">
        Showing ${startItem}-${endItem} of ${this.logs.length} logs
      </div>
      <div class="flex items-center gap-1">
        <button class="btn-secondary text-sm px-3 py-1 ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="logsTable.goToPage(1)" ${this.currentPage === 1 ? 'disabled' : ''}>
          First
        </button>
        <button class="btn-secondary text-sm px-3 py-1 ${this.currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="logsTable.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
          Previous
        </button>
        
        ${pages.map(page => `
          <button class="btn-secondary text-sm px-3 py-1 ${page === this.currentPage ? 'bg-blue-600 text-white' : ''}" 
                  onclick="logsTable.goToPage(${page})">
            ${page}
          </button>
        `).join('')}
        
        <button class="btn-secondary text-sm px-3 py-1 ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="logsTable.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>
          Next
        </button>
        <button class="btn-secondary text-sm px-3 py-1 ${this.currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
                onclick="logsTable.goToPage(${totalPages})" ${this.currentPage === totalPages ? 'disabled' : ''}>
          Last
        </button>
      </div>
    `;
  }

  /**
   * Go to specific page
   * @param {number} page - Page number
   */
  goToPage(page) {
    const totalPages = Math.ceil(this.logs.length / this.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderLogs();
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Get current logs count
   * @returns {number} Number of logs
   */
  getLogsCount() {
    return this.logs.length;
  }
}
