import { exportToJSON, exportToCSV, exportToTXT } from '../utils/export-utils.js';

export class ExportPanel {
  constructor() {
    this.btn = document.getElementById('btn-export');
    this.logs = [];
    this.btn.addEventListener('click', () => this._openModal());
  }

  updateLogs(logs) {
    this.logs = logs || [];
  }

  _openModal() {
    if (!this.logs.length) return;
    const modal = document.getElementById('export-modal');
    const backdrop = document.getElementById('backdrop');
    const base = `logs_${new Date().toISOString().slice(0,10)}`;
    const input = document.getElementById('export-filename');
    input.value = base;
    const close = () => { modal.close(); backdrop.classList.add('hidden'); };
    document.getElementById('export-close').onclick = close;
    document.getElementById('export-json').onclick = () => { exportToJSON(this.logs, `${input.value || base}.json`); close(); };
    document.getElementById('export-csv').onclick = () => { exportToCSV(this.logs, `${input.value || base}.csv`); close(); };
    document.getElementById('export-txt').onclick = () => { exportToTXT(this.logs, `${input.value || base}.txt`); close(); };
    backdrop.classList.remove('hidden');
    modal.showModal();
  }
}


