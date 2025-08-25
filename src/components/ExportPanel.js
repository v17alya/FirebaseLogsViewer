import { exportToJSON, exportToCSV, exportToTXT, groupLogs } from '../utils/export-utils.js';

/**
 * Export panel component for exporting logs
 */
export class ExportPanel {
  constructor(container) {
    this.container = container;
    this.logs = [];
    
    this.render();
  }

  /**
   * Render the export panel
   */
  render() {
    this.container.innerHTML = `
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Export & Grouping</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Export Section -->
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-3">Export Logs</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Filename</label>
                <input type="text" id="export-filename" class="input-field" value="logs" placeholder="Enter filename...">
              </div>
              
              <div class="flex gap-2">
                <button id="export-json" class="btn-primary flex-1">
                  Export JSON
                </button>
                <button id="export-csv" class="btn-primary flex-1">
                  Export CSV
                </button>
                <button id="export-txt" class="btn-primary flex-1">
                  Export TXT
                </button>
              </div>
              
              <div class="text-xs text-gray-500">
                <span id="logs-count">0</span> logs available for export
              </div>
            </div>
          </div>

          <!-- Grouping Section -->
          <div>
            <h4 class="text-md font-medium text-gray-700 mb-3">Group Logs</h4>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Group by</label>
                <select id="group-by" class="input-field">
                  <option value="">No grouping</option>
                  <option value="date">Date</option>
                  <option value="server">Server</option>
                  <option value="platform">Platform</option>
                  <option value="nickname">Nickname</option>
                </select>
              </div>
              
              <button id="apply-grouping" class="btn-secondary w-full">
                Apply Grouping
              </button>
              
              <div class="text-xs text-gray-500">
                Group logs to see patterns and statistics
              </div>
            </div>
          </div>
        </div>

        <!-- Grouped Results -->
        <div id="grouped-results" class="mt-6 hidden">
          <h4 class="text-md font-medium text-gray-700 mb-3">Grouped Results</h4>
          <div id="grouped-content" class="space-y-4">
            <!-- Grouped content will be inserted here -->
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Attach event listeners to export panel elements
   */
  attachEventListeners() {
    const exportJsonBtn = this.container.querySelector('#export-json');
    const exportCsvBtn = this.container.querySelector('#export-csv');
    const exportTxtBtn = this.container.querySelector('#export-txt');
    const applyGroupingBtn = this.container.querySelector('#apply-grouping');

    exportJsonBtn.addEventListener('click', () => this.exportLogs('json'));
    exportCsvBtn.addEventListener('click', () => this.exportLogs('csv'));
    exportTxtBtn.addEventListener('click', () => this.exportLogs('txt'));
    applyGroupingBtn.addEventListener('click', () => this.applyGrouping());
  }

  /**
   * Update logs data
   * @param {Array} logs - Array of log entries
   */
  updateLogs(logs) {
    this.logs = logs;
    this.updateLogsCount();
  }

  /**
   * Update logs count display
   */
  updateLogsCount() {
    const countElement = this.container.querySelector('#logs-count');
    countElement.textContent = this.logs.length;
  }

  /**
   * Export logs in specified format
   * @param {string} format - Export format ('json', 'csv', 'txt')
   */
  exportLogs(format) {
    if (this.logs.length === 0) {
      alert('No logs to export');
      return;
    }

    const filename = this.container.querySelector('#export-filename').value || 'logs';
    const timestamp = new Date().toISOString().split('T')[0];

    try {
      switch (format) {
        case 'json':
          exportToJSON(this.logs, `${filename}-${timestamp}.json`);
          break;
        case 'csv':
          exportToCSV(this.logs, `${filename}-${timestamp}.csv`);
          break;
        case 'txt':
          exportToTXT(this.logs, `${filename}-${timestamp}.txt`);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(`Failed to export logs: ${error.message}`);
    }
  }

  /**
   * Apply grouping to logs
   */
  applyGrouping() {
    const groupBy = this.container.querySelector('#group-by').value;
    
    if (!groupBy) {
      this.hideGroupedResults();
      return;
    }

    if (this.logs.length === 0) {
      alert('No logs to group');
      return;
    }

    const grouped = groupLogs(this.logs, groupBy);
    this.displayGroupedResults(grouped, groupBy);
  }

  /**
   * Display grouped results
   * @param {Object} grouped - Grouped logs object
   * @param {string} groupBy - Field used for grouping
   */
  displayGroupedResults(grouped, groupBy) {
    const groupedResults = this.container.querySelector('#grouped-results');
    const groupedContent = this.container.querySelector('#grouped-content');

    const groups = Object.keys(grouped).sort();
    
    groupedContent.innerHTML = groups.map(group => {
      const logs = grouped[group];
      const totalMessages = logs.length;
      const uniqueUsers = new Set(logs.map(log => log.nickname)).size;
      
      return `
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="flex justify-between items-center mb-3">
            <h5 class="font-medium text-gray-800">
              ${group === 'Unknown' ? 'Unknown' : group}
            </h5>
            <div class="text-sm text-gray-600">
              ${totalMessages} messages from ${uniqueUsers} users
            </div>
          </div>
          
          <div class="space-y-2 max-h-40 overflow-y-auto">
            ${logs.slice(0, 10).map(log => `
              <div class="text-sm text-gray-700 border-l-2 border-blue-200 pl-3">
                <span class="font-medium">${log.nickname || 'Unknown'}:</span>
                ${log.message ? (log.message.length > 100 ? log.message.substring(0, 100) + '...' : log.message) : 'No message'}
              </div>
            `).join('')}
            ${logs.length > 10 ? `
              <div class="text-sm text-gray-500 italic">
                ... and ${logs.length - 10} more messages
              </div>
            ` : ''}
          </div>
          
          <div class="mt-3 pt-3 border-t border-gray-100">
            <button class="text-blue-600 hover:text-blue-800 text-sm" 
                    onclick="exportPanel.exportGroup('${group}', '${groupBy}')">
              Export this group
            </button>
          </div>
        </div>
      `;
    }).join('');

    groupedResults.classList.remove('hidden');
  }

  /**
   * Hide grouped results
   */
  hideGroupedResults() {
    const groupedResults = this.container.querySelector('#grouped-results');
    groupedResults.classList.add('hidden');
  }

  /**
   * Export specific group
   * @param {string} group - Group name
   * @param {string} groupBy - Grouping field
   */
  exportGroup(group, groupBy) {
    const grouped = groupLogs(this.logs, groupBy);
    const groupLogs = grouped[group] || [];
    
    if (groupLogs.length === 0) {
      alert('No logs in this group');
      return;
    }

    const filename = this.container.querySelector('#export-filename').value || 'logs';
    const timestamp = new Date().toISOString().split('T')[0];
    const safeGroup = group.replace(/[^a-zA-Z0-9]/g, '_');
    
    try {
      exportToJSON(groupLogs, `${filename}-${groupBy}-${safeGroup}-${timestamp}.json`);
    } catch (error) {
      console.error('Export group error:', error);
      alert(`Failed to export group: ${error.message}`);
    }
  }
}
