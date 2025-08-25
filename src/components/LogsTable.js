import { formatTimestamp, truncateText } from '../utils/export-utils.js';

export class LogsTable {
  constructor(containerId = 'logs-container') {
    this.container = document.getElementById(containerId);
    this.rows = [];
  }

  updateLogs(logs = [], groupBy = '') {
    this.rows = logs;
    document.getElementById('logs-count').textContent = String(logs.length);
    this._render(groupBy);
    if (!logs.length) {
      this.container.innerHTML = `<div class="text-center text-gray-600 py-6">No logs found. Adjust filters and try again.</div>`;
    }
  }

  _render(groupBy) {
    if (!groupBy) {
      this.container.innerHTML = this._renderTable(this.rows);
      this._bindRowActions();
      return;
    }
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


