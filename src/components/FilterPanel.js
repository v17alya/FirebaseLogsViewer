/**
 * Filter panel component for log filtering
 */
export class FilterPanel {
  constructor(container, onFiltersChange, onLoadOptions) {
    this.container = container;
    this.onFiltersChange = onFiltersChange;
    this.onLoadOptions = onLoadOptions;
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
            <div class="relative">
              <input type="text" id="server-search" class="input-field pr-8 opacity-50 cursor-not-allowed" placeholder="Loading servers..." disabled>
              <select id="server-filter" class="input-field mt-2 opacity-50 cursor-not-allowed" disabled>
                <option value="">Loading servers...</option>
              </select>
            </div>
          </div>

          <!-- Platform Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <div class="relative">
              <input type="text" id="platform-search" class="input-field pr-8 opacity-50 cursor-not-allowed" placeholder="Select server first..." disabled>
              <select id="platform-filter" class="input-field mt-2 opacity-50 cursor-not-allowed" disabled>
                <option value="">Select server first</option>
              </select>
            </div>
          </div>

          <!-- Date Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div class="relative">
              <input type="text" id="date-search" class="input-field pr-8 opacity-50 cursor-not-allowed" placeholder="Select platform first..." disabled>
              <select id="date-filter" class="input-field mt-2 opacity-50 cursor-not-allowed" disabled>
                <option value="">Select platform first</option>
              </select>
            </div>
          </div>

                      <!-- User ID Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <div class="relative">
                <input type="text" id="userid-search" class="input-field pr-8 opacity-50 cursor-not-allowed" placeholder="Select date first..." disabled>
                <select id="userid-filter" class="input-field mt-2 opacity-50 cursor-not-allowed" disabled>
                  <option value="">Select date first</option>
                </select>
              </div>
            </div>

            <!-- Quick User Search -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quick User Search</label>
              <input type="text" id="quick-user-search" class="input-field" placeholder="Search by User ID (anywhere)...">
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

          <!-- Date Range Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select id="months-back" class="input-field">
              <option value="1">Last 1 month</option>
              <option value="3" selected>Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
              <option value="0">All time</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button id="load-logs" class="btn-primary">
            Load Logs
          </button>
          <button id="apply-filters" class="btn-secondary">
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
    const loadBtn = this.container.querySelector('#load-logs');
    const applyBtn = this.container.querySelector('#apply-filters');
    const clearBtn = this.container.querySelector('#clear-filters');
    
    loadBtn.addEventListener('click', () => this.loadLogs());
    applyBtn.addEventListener('click', () => this.applyFilters());
    clearBtn.addEventListener('click', () => this.clearFilters());

    // Auto-apply filters only on text input changes (nickname, message, quick user search)
    const textInputs = this.container.querySelectorAll('#nickname-filter, #message-filter, #quick-user-search');
    textInputs.forEach(input => {
      input.addEventListener('change', () => this.applyFilters());
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          this.applyFilters();
        }
      });
    });

    // Progressive loading for dropdowns
    const serverSelect = this.container.querySelector('#server-filter');
    const platformSelect = this.container.querySelector('#platform-filter');
    const dateSelect = this.container.querySelector('#date-filter');
    const userIdSelect = this.container.querySelector('#userid-filter');

    serverSelect.addEventListener('change', async (e) => {
      const server = e.target.value;
      console.log('Server selected:', server);
      
      if (server && server !== '') {
        // Clear and disable dependent dropdowns
        platformSelect.value = '';
        dateSelect.value = '';
        userIdSelect.value = '';
        this.updateSelectOptions('platform', []);
        this.updateSelectOptions('date', []);
        this.updateSelectOptions('userid', []);
        this.disableDependentFields();
        
        console.log('Loading platforms for server:', server);
        // Load platforms for selected server
        await this.loadPlatforms(server);
        this.enablePlatformFields();
        console.log('Platforms loaded and fields enabled');
      } else {
        console.log('Server cleared, disabling dependent fields');
        this.disableDependentFields();
      }
    });

    platformSelect.addEventListener('change', async (e) => {
      const platform = e.target.value;
      const server = serverSelect.value;
      console.log('Platform selected:', platform, 'for server:', server);
      
      if (platform && platform !== '' && server && server !== '') {
        // Clear dependent dropdowns
        dateSelect.value = '';
        userIdSelect.value = '';
        this.updateSelectOptions('date', []);
        this.updateSelectOptions('userid', []);
        
        // Disable date and user ID fields
        const dateSearch = this.container.querySelector('#date-search');
        const userIdSearch = this.container.querySelector('#userid-search');
        
        dateSearch.disabled = true;
        dateSearch.classList.add('opacity-50', 'cursor-not-allowed');
        dateSearch.placeholder = 'Select platform first...';
        dateSelect.disabled = true;
        dateSelect.classList.add('opacity-50', 'cursor-not-allowed');
        
        userIdSearch.disabled = true;
        userIdSearch.classList.add('opacity-50', 'cursor-not-allowed');
        userIdSearch.placeholder = 'Select date first...';
        userIdSelect.disabled = true;
        userIdSelect.classList.add('opacity-50', 'cursor-not-allowed');
        
        console.log('Loading dates for server:', server, 'platform:', platform);
        // Load dates for selected server and platform
        await this.loadDates(server, platform);
        this.enableDateFields();
        console.log('Dates loaded and fields enabled');
      } else if (platform === '' || platform === undefined) {
        console.log('Platform cleared, disabling dependent fields');
        this.disableDependentFields();
      }
    });

    dateSelect.addEventListener('change', async (e) => {
      const date = e.target.value;
      const server = serverSelect.value;
      const platform = platformSelect.value;
      console.log('Date selected:', date, 'for server:', server, 'platform:', platform);
      
      if (date && date !== '' && server && server !== '' && platform && platform !== '') {
        // Clear dependent dropdowns
        userIdSelect.value = '';
        this.updateSelectOptions('userid', []);
        
        // Disable user ID fields
        const userIdSearch = this.container.querySelector('#userid-search');
        
        userIdSearch.disabled = true;
        userIdSearch.classList.add('opacity-50', 'cursor-not-allowed');
        userIdSearch.placeholder = 'Select date first...';
        userIdSelect.disabled = true;
        userIdSelect.classList.add('opacity-50', 'cursor-not-allowed');
        
        console.log('Loading user IDs for server:', server, 'platform:', platform, 'date:', date);
        // Load user IDs for selected server, platform, and date
        await this.loadUserIds(server, platform, date);
        this.enableUserIdFields();
        console.log('User IDs loaded and fields enabled');
      } else if (date === '' || date === undefined) {
        console.log('Date cleared, disabling user ID fields');
        // Disable user ID fields
        const userIdSearch = this.container.querySelector('#userid-search');
        
        userIdSearch.disabled = true;
        userIdSearch.classList.add('opacity-50', 'cursor-not-allowed');
        userIdSearch.placeholder = 'Select date first...';
        userIdSelect.disabled = true;
        userIdSelect.classList.add('opacity-50', 'cursor-not-allowed');
      }
    });
  }

  /**
   * Load logs with current filters
   */
  loadLogs() {
    this.filters = {
      server: this.container.querySelector('#server-filter').value,
      platform: this.container.querySelector('#platform-filter').value,
      date: this.container.querySelector('#date-filter').value,
      userId: this.container.querySelector('#userid-filter').value,
      quickUserId: this.container.querySelector('#quick-user-search').value,
      nickname: this.container.querySelector('#nickname-filter').value,
      message: this.container.querySelector('#message-filter').value,
      monthsBack: parseInt(this.container.querySelector('#months-back').value) || 3
    };

    console.log('Loading logs with filters:', this.filters);
    this.onFiltersChange(this.filters);
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
      quickUserId: this.container.querySelector('#quick-user-search').value,
      nickname: this.container.querySelector('#nickname-filter').value,
      message: this.container.querySelector('#message-filter').value,
      monthsBack: parseInt(this.container.querySelector('#months-back').value) || 3
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
      quickUserId: '',
      nickname: '',
      message: '',
      monthsBack: 3
    };

    // Reset form elements
    this.container.querySelector('#server-filter').value = '';
    this.container.querySelector('#platform-filter').value = '';
    this.container.querySelector('#date-filter').value = '';
    this.container.querySelector('#userid-filter').value = '';
    this.container.querySelector('#quick-user-search').value = '';
    this.container.querySelector('#nickname-filter').value = '';
    this.container.querySelector('#message-filter').value = '';
    this.container.querySelector('#months-back').value = '3';

    this.onFiltersChange(this.filters);
  }

  /**
   * Update filter options
   * @param {Object} options - Filter options
   */
  updateOptions(options) {
    // Store current values before updating (only non-empty values)
    const currentServer = this.container.querySelector('#server-filter').value;
    const currentPlatform = this.container.querySelector('#platform-filter').value;
    const currentDate = this.container.querySelector('#date-filter').value;
    const currentUserId = this.container.querySelector('#userid-filter').value;
    
    console.log('updateOptions: Stored values - Server:', currentServer, 'Platform:', currentPlatform, 'Date:', currentDate, 'UserID:', currentUserId);
    
    this.filterOptions = { ...this.filterOptions, ...options };
    
    // Update server options
    this.updateSelectOptions('server', this.filterOptions.servers);
    this.updateSelectOptions('platform', this.filterOptions.platforms);
    this.updateSelectOptions('date', this.filterOptions.dates);
    this.updateSelectOptions('userid', this.filterOptions.userIds);
    
    // Restore current values after updating (only if they were not empty)
    if (currentServer && currentServer !== '') {
      this.container.querySelector('#server-filter').value = currentServer;
      console.log('updateOptions: Restored server value to:', currentServer);
    }
    if (currentPlatform && currentPlatform !== '') {
      this.container.querySelector('#platform-filter').value = currentPlatform;
      console.log('updateOptions: Restored platform value to:', currentPlatform);
    }
    if (currentDate && currentDate !== '') {
      this.container.querySelector('#date-filter').value = currentDate;
      console.log('updateOptions: Restored date value to:', currentDate);
    }
    if (currentUserId && currentUserId !== '') {
      this.container.querySelector('#userid-filter').value = currentUserId;
      console.log('updateOptions: Restored userId value to:', currentUserId);
    }
  }

  /**
   * Load servers initially
   */
  async loadInitialData() {
    console.log('Loading initial servers...');
    if (this.onLoadOptions) {
      const servers = await this.onLoadOptions('servers');
      console.log('Servers loaded:', servers);
      this.updateOptions({ servers });
      this.enableServerFields();
      console.log('Server fields enabled');
    }
  }

  /**
   * Load platforms when server is selected
   * @param {string} server - Selected server
   */
  async loadPlatforms(server) {
    console.log('Loading platforms for server:', server);
    if (this.onLoadOptions && server) {
      const platforms = await this.onLoadOptions('platforms', server);
      console.log('Platforms loaded:', platforms);
      this.updateOptions({ platforms });
    }
  }

  /**
   * Load dates when platform is selected
   * @param {string} server - Selected server
   * @param {string} platform - Selected platform
   */
  async loadDates(server, platform) {
    console.log('Loading dates for server:', server, 'platform:', platform);
    if (this.onLoadOptions && server && platform) {
      const dates = await this.onLoadOptions('dates', server, platform);
      console.log('Dates loaded:', dates);
      this.updateOptions({ dates });
    }
  }

  /**
   * Load user IDs when date is selected
   * @param {string} server - Selected server
   * @param {string} platform - Selected platform
   * @param {string} date - Selected date
   */
  async loadUserIds(server, platform, date) {
    console.log('Loading user IDs for server:', server, 'platform:', platform, 'date:', date);
    if (this.onLoadOptions && server && platform && date) {
      const userIds = await this.onLoadOptions('userIds', server, platform, date);
      console.log('User IDs loaded:', userIds);
      this.updateOptions({ userIds });
    }
  }

  /**
   * Enable server fields
   */
  enableServerFields() {
    const serverSearch = this.container.querySelector('#server-search');
    const serverSelect = this.container.querySelector('#server-filter');
    
    serverSearch.disabled = false;
    serverSearch.classList.remove('opacity-50', 'cursor-not-allowed');
    serverSearch.placeholder = 'Search servers...';
    
    serverSelect.disabled = false;
    serverSelect.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  /**
   * Enable platform fields
   */
  enablePlatformFields() {
    const platformSearch = this.container.querySelector('#platform-search');
    const platformSelect = this.container.querySelector('#platform-filter');
    
    platformSearch.disabled = false;
    platformSearch.classList.remove('opacity-50', 'cursor-not-allowed');
    platformSearch.placeholder = 'Search platforms...';
    
    platformSelect.disabled = false;
    platformSelect.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  /**
   * Enable date fields
   */
  enableDateFields() {
    const dateSearch = this.container.querySelector('#date-search');
    const dateSelect = this.container.querySelector('#date-filter');
    
    dateSearch.disabled = false;
    dateSearch.classList.remove('opacity-50', 'cursor-not-allowed');
    dateSearch.placeholder = 'Search dates...';
    
    dateSelect.disabled = false;
    dateSelect.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  /**
   * Enable user ID fields
   */
  enableUserIdFields() {
    const userIdSearch = this.container.querySelector('#userid-search');
    const userIdSelect = this.container.querySelector('#userid-filter');
    
    userIdSearch.disabled = false;
    userIdSearch.classList.remove('opacity-50', 'cursor-not-allowed');
    userIdSearch.placeholder = 'Search user IDs...';
    
    userIdSelect.disabled = false;
    userIdSelect.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  /**
   * Disable all dependent fields
   */
  disableDependentFields() {
    const platformSearch = this.container.querySelector('#platform-search');
    const platformSelect = this.container.querySelector('#platform-filter');
    const dateSearch = this.container.querySelector('#date-search');
    const dateSelect = this.container.querySelector('#date-filter');
    const userIdSearch = this.container.querySelector('#userid-search');
    const userIdSelect = this.container.querySelector('#userid-filter');

    // Disable platform fields
    platformSearch.disabled = true;
    platformSearch.classList.add('opacity-50', 'cursor-not-allowed');
    platformSearch.placeholder = 'Select server first...';
    platformSelect.disabled = true;
    platformSelect.classList.add('opacity-50', 'cursor-not-allowed');

    // Disable date fields
    dateSearch.disabled = true;
    dateSearch.classList.add('opacity-50', 'cursor-not-allowed');
    dateSearch.placeholder = 'Select platform first...';
    dateSelect.disabled = true;
    dateSelect.classList.add('opacity-50', 'cursor-not-allowed');

    // Disable user ID fields
    userIdSearch.disabled = true;
    userIdSearch.classList.add('opacity-50', 'cursor-not-allowed');
    userIdSearch.placeholder = 'Select date first...';
    userIdSelect.disabled = true;
    userIdSelect.classList.add('opacity-50', 'cursor-not-allowed');
  }

  /**
   * Update select options with search functionality
   * @param {string} field - Field name
   * @param {Array} options - Available options
   */
  updateSelectOptions(field, options) {
    const select = this.container.querySelector(`#${field}-filter`);
    const searchInput = this.container.querySelector(`#${field}-search`);
    
    // Store original options
    select.dataset.originalOptions = JSON.stringify(options);
    
    // Update select with all options
    select.innerHTML = '<option value="">All ' + field.charAt(0).toUpperCase() + field.slice(1) + 's</option>';
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });

    // Add search functionality
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const originalOptions = JSON.parse(select.dataset.originalOptions || '[]');
        
        // Filter options based on search term
        const filteredOptions = originalOptions.filter(option => 
          option.toLowerCase().includes(searchTerm)
        );
        
        // Update select with filtered options
        select.innerHTML = '<option value="">All ' + field.charAt(0).toUpperCase() + field.slice(1) + 's</option>';
        filteredOptions.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option;
          optionElement.textContent = option;
          select.appendChild(optionElement);
        });
      });
    }
  }

  /**
   * Get current filters
   * @returns {Object} Current filters
   */
  getFilters() {
    return this.filters;
  }
}
