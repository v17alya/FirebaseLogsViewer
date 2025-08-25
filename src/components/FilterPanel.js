/**
 * Filter panel component for log filtering
 */
export class FilterPanel {
  constructor(container, onFiltersChange) {
    this.container = container;
    this.onFiltersChange = onFiltersChange;
    this.filters = {
      server: '',
      platform: '',
      date: '',
      userId: '',
      nickname: '',
      message: ''
    };
    this.filterOptions = {
      servers: [],
      platforms: [],
      dates: [],
      userIds: []
    };
    
    this.render();
  }

  /**
   * Render the filter panel
   */
  render() {
    this.container.innerHTML = `
      <div class="card mb-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Server Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Server</label>
            <select id="server-filter" class="input-field">
              <option value="">All Servers</option>
            </select>
          </div>

          <!-- Platform Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select id="platform-filter" class="input-field">
              <option value="">All Platforms</option>
            </select>
          </div>

          <!-- Date Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <select id="date-filter" class="input-field">
              <option value="">All Dates</option>
            </select>
          </div>

          <!-- User ID Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <select id="userid-filter" class="input-field">
              <option value="">All Users</option>
            </select>
          </div>

          <!-- Nickname Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nickname</label>
            <input type="text" id="nickname-filter" class="input-field" placeholder="Search by nickname...">
          </div>

          <!-- Message Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <input type="text" id="message-filter" class="input-field" placeholder="Search in messages...">
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button id="apply-filters" class="btn-primary">
            Apply Filters
          </button>
          <button id="clear-filters" class="btn-secondary">
            Clear All
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Attach event listeners to filter elements
   */
  attachEventListeners() {
    const applyBtn = this.container.querySelector('#apply-filters');
    const clearBtn = this.container.querySelector('#clear-filters');
    
    applyBtn.addEventListener('click', () => this.applyFilters());
    clearBtn.addEventListener('click', () => this.clearFilters());

    // Auto-apply filters on input change
    const inputs = this.container.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('change', () => this.applyFilters());
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          this.applyFilters();
        }
      });
    });
  }

  /**
   * Apply current filters
   */
  applyFilters() {
    this.filters = {
      server: this.container.querySelector('#server-filter').value,
      platform: this.container.querySelector('#platform-filter').value,
      date: this.container.querySelector('#date-filter').value,
      userId: this.container.querySelector('#userid-filter').value,
      nickname: this.container.querySelector('#nickname-filter').value,
      message: this.container.querySelector('#message-filter').value
    };

    this.onFiltersChange(this.filters);
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.filters = {
      server: '',
      platform: '',
      date: '',
      userId: '',
      nickname: '',
      message: ''
    };

    // Reset form elements
    this.container.querySelector('#server-filter').value = '';
    this.container.querySelector('#platform-filter').value = '';
    this.container.querySelector('#date-filter').value = '';
    this.container.querySelector('#userid-filter').value = '';
    this.container.querySelector('#nickname-filter').value = '';
    this.container.querySelector('#message-filter').value = '';

    this.onFiltersChange(this.filters);
  }

  /**
   * Update filter options
   * @param {Object} options - Filter options
   */
  updateOptions(options) {
    this.filterOptions = { ...this.filterOptions, ...options };
    
    // Update server options
    const serverSelect = this.container.querySelector('#server-filter');
    serverSelect.innerHTML = '<option value="">All Servers</option>';
    this.filterOptions.servers.forEach(server => {
      const option = document.createElement('option');
      option.value = server;
      option.textContent = server;
      serverSelect.appendChild(option);
    });

    // Update platform options
    const platformSelect = this.container.querySelector('#platform-filter');
    platformSelect.innerHTML = '<option value="">All Platforms</option>';
    this.filterOptions.platforms.forEach(platform => {
      const option = document.createElement('option');
      option.value = platform;
      option.textContent = platform;
      platformSelect.appendChild(option);
    });

    // Update date options
    const dateSelect = this.container.querySelector('#date-filter');
    dateSelect.innerHTML = '<option value="">All Dates</option>';
    this.filterOptions.dates.forEach(date => {
      const option = document.createElement('option');
      option.value = date;
      option.textContent = date;
      dateSelect.appendChild(option);
    });

    // Update user ID options
    const userIdSelect = this.container.querySelector('#userid-filter');
    userIdSelect.innerHTML = '<option value="">All Users</option>';
    this.filterOptions.userIds.forEach(userId => {
      const option = document.createElement('option');
      option.value = userId;
      option.textContent = userId;
      userIdSelect.appendChild(option);
    });
  }

  /**
   * Get current filters
   * @returns {Object} Current filters
   */
  getFilters() {
    return this.filters;
  }
}
