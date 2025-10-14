import { formatTimestamp, truncateText } from '../utils/export-utils.js';
import { groupBySimilarErrors, groupByUserThenErrors, normalizeErrorMessage } from '../utils/grouping-utils.js';

export class LogsTable {
  constructor(containerId = 'logs-container') {
    this.container = document.getElementById(containerId);
    this.rows = [];
    this.expandedGroups = new Set();
    this.currentGroups = null;
    this.currentGroupBy = '';
  }

  updateLogs(logs = [], groupBy = '') {
    this.rows = logs;
    this.currentGroupBy = groupBy;
    document.getElementById('logs-count').textContent = String(logs.length);
    this._render(groupBy);
    if (!logs.length) {
      this.container.innerHTML = `<div class="text-center text-gray-600 py-6">No logs found. Adjust filters and try again.</div>`;
    }
  }

  getCurrentGroups() {
    return this.currentGroups;
  }

  getCurrentGroupBy() {
    return this.currentGroupBy;
  }

  _render(groupBy) {
    if (!groupBy) {
      this.currentGroups = null;
      this.container.innerHTML = this._renderTable(this.rows);
      this._bindRowActions();
      return;
    }
    
    // Smart error grouping
    if (groupBy === 'similarErrors') {
      this._renderSimilarErrorGroups();
      return;
    }
    
    // User + error grouping
    if (groupBy === 'userId') {
      this._renderUserErrorGroups();
      return;
    }
    
    // Standard grouping
    this.currentGroups = null;
    const grouped = {};
    for (const row of this.rows) {
      const key = row[groupBy] || 'Unknown';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(row);
    }
    const parts = [];
    Object.keys(grouped).sort().forEach(group => {
      parts.push(`<div class="mb-4">
        <div class="text-sm text-gray-700 font-semibold mb-2">${group} · ${grouped[group].length} logs</div>
        ${this._renderTable(grouped[group])}
      </div>`);
    });
    this.container.innerHTML = parts.join('');
    this._bindRowActions();
  }

  _renderSimilarErrorGroups() {
    const errorGroups = groupBySimilarErrors(this.rows);
    this.currentGroups = errorGroups; // Store for export
    const parts = [];
    
    let groupIndex = 0;
    for (const [normalizedMsg, logs] of errorGroups) {
      const groupId = `error-group-${groupIndex++}`;
      const isExpanded = this.expandedGroups.has(groupId);
      const sample = logs[0].message || normalizedMsg;
      
      parts.push(`
        <div class="mb-3 border rounded-lg bg-white shadow-sm">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg cursor-pointer hover:bg-gray-100" data-toggle-group="${groupId}">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="font-medium text-gray-800">${truncateText(sample, 100)}</span>
            </div>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">${logs.length}</span>
          </div>
          <div id="${groupId}" class="overflow-hidden transition-all ${isExpanded ? '' : 'hidden'}">
            ${this._renderTable(logs)}
          </div>
        </div>
      `);
    }
    
    this.container.innerHTML = parts.join('');
    this._bindGroupToggle();
    this._bindRowActions();
  }

  _renderUserErrorGroups() {
    const userErrorGroups = groupByUserThenErrors(this.rows);
    this.currentGroups = userErrorGroups; // Store for export
    const parts = [];
    
    let userIndex = 0;
    for (const [userId, errorGroups] of userErrorGroups) {
      const userGroupId = `user-group-${userIndex++}`;
      const isUserExpanded = this.expandedGroups.has(userGroupId);
      const totalLogs = Array.from(errorGroups.values()).reduce((sum, logs) => sum + logs.length, 0);
      
      // Find nickname from first log
      const firstLog = Array.from(errorGroups.values())[0]?.[0];
      const nickname = firstLog?.nickname || '';
      
      parts.push(`
        <div class="mb-4 border rounded-lg bg-white shadow-sm">
          <div class="flex items-center justify-between p-3 bg-indigo-50 rounded-t-lg cursor-pointer hover:bg-indigo-100" data-toggle-group="${userGroupId}">
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4 transition-transform ${isUserExpanded ? 'rotate-90' : ''}" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="font-medium text-gray-800">${nickname || userId}</div>
                <div class="text-xs text-gray-600 font-mono">${userId}</div>
              </div>
            </div>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">${totalLogs}</span>
          </div>
          <div id="${userGroupId}" class="overflow-hidden transition-all ${isUserExpanded ? '' : 'hidden'}">
      `);
      
      // Render error groups for this user
      let errorIndex = 0;
      for (const [normalizedMsg, logs] of errorGroups) {
        const errorGroupId = `${userGroupId}-error-${errorIndex++}`;
        const isErrorExpanded = this.expandedGroups.has(errorGroupId);
        const sample = logs[0].message || normalizedMsg;
        
        parts.push(`
          <div class="m-3 border rounded bg-gray-50">
            <div class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100" data-toggle-group="${errorGroupId}">
              <div class="flex items-center gap-2">
                <svg class="w-3 h-3 transition-transform ${isErrorExpanded ? 'rotate-90' : ''}" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-gray-700">${truncateText(sample, 80)}</span>
              </div>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">${logs.length}</span>
            </div>
            <div id="${errorGroupId}" class="overflow-hidden transition-all ${isErrorExpanded ? '' : 'hidden'}">
              ${this._renderTable(logs)}
            </div>
          </div>
        `);
      }
      
      parts.push(`
          </div>
        </div>
      `);
    }
    
    this.container.innerHTML = parts.join('');
    this._bindGroupToggle();
    this._bindRowActions();
  }

  _bindGroupToggle() {
    this.container.querySelectorAll('[data-toggle-group]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const groupId = btn.getAttribute('data-toggle-group');
        const groupDiv = document.getElementById(groupId);
        const arrow = btn.querySelector('svg');
        
        if (this.expandedGroups.has(groupId)) {
          this.expandedGroups.delete(groupId);
          groupDiv.classList.add('hidden');
          arrow.classList.remove('rotate-90');
        } else {
          this.expandedGroups.add(groupId);
          groupDiv.classList.remove('hidden');
          arrow.classList.add('rotate-90');
        }
      });
    });
  }

  _renderTable(rows) {
    return `<table class="w-full text-sm">
      <thead class="text-left border-b">
        <tr>
          <th class="py-3 pr-8">Time</th>
          <th class="py-3 pr-8">Server</th>
          <th class="py-3 pr-8">Platform</th>
          <th class="py-3 pr-8">Date</th>
          <th class="py-3 pr-8">User</th>
          <th class="py-3 pr-8">Nick</th>
          <th class="py-3 pr-8">Message</th>
          <th class="py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => this._renderRow(r)).join('')}
      </tbody>
    </table>`;
  }

  _renderRow(r) {
    const full = (r.message || '').replace(/\n/g, ' ');
    const short = truncateText(full, 120);
    return `<tr class="border-b hover:bg-gray-50">
      <td class="py-3 pr-8 whitespace-pre">${formatTimestamp(r.ts)}</td>
      <td class="py-3 pr-8">${r.server || ''}</td>
      <td class="py-3 pr-8">${r.platform || ''}</td>
      <td class="py-3 pr-8">${r.date || ''}</td>
      <td class="py-3 pr-8 font-mono text-xs">${r.userId || ''}</td>
      <td class="py-3 pr-8">${r.nickname || ''}</td>
      <td class="py-3 pr-8">
        <span class="truncate">${short}</span>
        ${full.length > short.length ? `<button class="ml-1 text-blue-600 hover:text-blue-800 text-xs" data-action="details" data-id="${r.logId}">more</button>` : ''}
      </td>
      <td class="py-3">
        <button class="text-sm text-gray-700 hover:text-gray-600" data-action="copy" data-id="${r.logId}">Copy</button>
      </td>
    </tr>`;
  }

  _bindRowActions() {
    this.container.querySelectorAll('[data-action="details"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const row = this.rows.find(r => r.logId === id);
        if (row) this._openDetails(row);
      });
    });
    this.container.querySelectorAll('[data-action="copy"]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const row = this.rows.find(r => r.logId === id);
        if (!row) return;
        const text = `[${formatTimestamp(row.ts)}] ${row.nickname || ''} (${row.userId || ''})\n${row.message || ''}`;
        try { await navigator.clipboard.writeText(text); } catch {}
      });
    });
  }

  _openDetails(row) {
    const modal = document.getElementById('details-modal');
    const backdrop = document.getElementById('backdrop');
    modal.innerHTML = `
      <div class="p-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold">Log Details</h3>
          <button id="modal-close" class="text-gray-600">✕</button>
        </div>
        <div class="space-y-2 text-sm">
          <div><span class="text-gray-500">Time:</span> ${formatTimestamp(row.ts)}</div>
          <div><span class="text-gray-500">Server:</span> ${row.server || ''}</div>
          <div><span class="text-gray-500">Platform:</span> ${row.platform || ''}</div>
          <div><span class="text-gray-500">Date:</span> ${row.date || ''}</div>
          <div><span class="text-gray-500">User:</span> <span class="font-mono text-xs">${row.userId || ''}</span></div>
          <div><span class="text-gray-500">Nick:</span> ${row.nickname || ''}</div>
          <div class="border-t pt-3 whitespace-pre-wrap">${(row.message || '')}</div>
        </div>
      </div>`;
    backdrop.classList.remove('hidden');
    modal.showModal();
    const close = () => { modal.close(); backdrop.classList.add('hidden'); };
    modal.querySelector('#modal-close').addEventListener('click', close);
    backdrop.addEventListener('click', close, { once: true });
  }
}


