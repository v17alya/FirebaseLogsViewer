import FirebaseService from './firebase.js';
import { FilterPanel } from '../components/FilterPanel.js';
import { LogsTable } from '../components/LogsTable.js';
import { ExportPanel } from '../components/ExportPanel.js';

/**
 * Main application class
 */
class FirebaseLogsViewer {
  constructor() {
    this.firebaseService = new FirebaseService();
    this.filterPanel = null;
    this.logsTable = null;
    this.exportPanel = null;
    this.currentLogs = [];
    this.isLoading = false;
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      this.setupComponents();
      this.setupGlobalFunctions();
      this.showLoadingState();
      
      // Load initial data
      await this.loadFilterOptions();
      await this.loadLogs();
      
      this.hideLoadingState();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError('Failed to initialize application. Please check your connection and try again.');
    }
  }

  /**
   * Setup UI components
   */
  setupComponents() {
    const filterContainer = document.getElementById('filter-panel');
    const logsContainer = document.getElementById('logs-table');
    const exportContainer = document.getElementById('export-panel');

    if (!filterContainer || !logsContainer || !exportContainer) {
      throw new Error('Required containers not found');
    }

    this.filterPanel = new FilterPanel(filterContainer, (filters) => {
      this.onFiltersChange(filters);
    });

    this.logsTable = new LogsTable(logsContainer);
    this.exportPanel = new ExportPanel(exportContainer);
  }

  /**
   * Setup global functions for table interactions
   */
  setupGlobalFunctions() {
    // Make table instance globally accessible for pagination
    window.logsTable = this.logsTable;
    window.exportPanel = this.exportPanel;

    // Global functions for modal interactions
    window.showFullMessage = (message) => {
      this.showModal('Full Message', `
        <div class="max-w-2xl">
          <pre class="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border">${message}</pre>
        </div>
      `);
    };

    window.showLogDetails = (logJson) => {
      try {
        const log = JSON.parse(logJson);
        this.showModal('Log Details', `
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Timestamp</label>
              <div class="text-sm text-gray-900">${log.timestamp || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Server</label>
              <div class="text-sm text-gray-900">${log.server || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Platform</label>
              <div class="text-sm text-gray-900">${log.platform || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <div class="text-sm text-gray-900">${log.date || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">User ID</label>
              <div class="text-sm text-gray-900 font-mono">${log.userId || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nickname</label>
              <div class="text-sm text-gray-900">${log.nickname || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <div class="text-sm text-gray-900 whitespace-pre-wrap">${log.message || 'N/A'}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Path</label>
              <div class="text-sm text-gray-900 font-mono">${log.path || 'N/A'}</div>
            </div>
          </div>
        `);
      } catch (error) {
        console.error('Error parsing log details:', error);
        this.showError('Failed to display log details');
      }
    };
  }

  /**
   * Load filter options from Firebase
   */
  async loadFilterOptions() {
    try {
      const [servers, platforms, dates, userIds] = await Promise.all([
        this.firebaseService.getUniqueValues('server'),
        this.firebaseService.getUniqueValues('platform'),
        this.firebaseService.getUniqueValues('date'),
        this.firebaseService.getUniqueValues('userId')
      ]);

      this.filterPanel.updateOptions({
        servers,
        platforms,
        dates,
        userIds
      });
    } catch (error) {
      console.error('Failed to load filter options:', error);
      // Continue without filter options
    }
  }

  /**
   * Load logs with current filters
   */
  async loadLogs() {
    try {
      this.showLoadingState();
      this.updateStatus('Loading logs...');
      
      const filters = this.filterPanel.getFilters();
      const startTime = Date.now();
      
      const logs = await this.firebaseService.fetchLogs(filters);
      
      const loadTime = Date.now() - startTime;
      this.currentLogs = logs;
      this.logsTable.updateLogs(logs);
      this.exportPanel.updateLogs(logs);
      
      this.updateStatus(`Loaded ${logs.length} logs in ${loadTime}ms`);
    } catch (error) {
      console.error('Failed to load logs:', error);
      this.showError(`Failed to load logs: ${error.message}`);
    } finally {
      this.hideLoadingState();
    }
  }

  /**
   * Handle filter changes
   * @param {Object} filters - New filter values
   */
  async onFiltersChange(filters) {
    if (this.isLoading) return;
    
    try {
      this.isLoading = true;
      this.updateStatus('Loading logs...');
      
      const logs = await this.firebaseService.fetchLogs(filters);
      
      this.currentLogs = logs;
      this.logsTable.updateLogs(logs);
      this.exportPanel.updateLogs(logs);
      
      this.updateStatus(`Found ${logs.length} logs matching filters`);
    } catch (error) {
      console.error('Failed to apply filters:', error);
      this.showError(`Failed to apply filters: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.classList.remove('hidden');
    }
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.classList.add('hidden');
    }
  }

  /**
   * Update status message
   * @param {string} message - Status message
   */
  updateStatus(message) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showError(message) {
    this.showModal('Error', `
      <div class="text-red-600">
        <p>${message}</p>
      </div>
    `);
  }

  /**
   * Show modal dialog
   * @param {string} title - Modal title
   * @param {string} content - Modal content
   */
  showModal(title, content) {
    // Remove existing modal
    const existingModal = document.getElementById('modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
          <button onclick="this.closest('#modal').remove()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          ${content}
        </div>
        <div class="flex justify-end p-6 border-t border-gray-200">
          <button onclick="this.closest('#modal').remove()" class="btn-secondary">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function closeModal(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', closeModal);
      }
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FirebaseLogsViewer();
});
