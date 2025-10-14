import { exportToJSON, exportToCSV, exportToTXT, exportGroupsToJSON, exportGroupsToCSV, exportGroupsToTXT } from '../utils/export-utils.js';

export class ExportPanel {
  constructor(logsTableInstance) {
    this.btn = document.getElementById('btn-export');
    this.logs = [];
    this.logsTable = logsTableInstance;
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
    const exportGroupsCheckbox = document.getElementById('export-groups');
    
    input.value = base;
    
    // Check if we have groups to export
    const groups = this.logsTable?.getCurrentGroups();
    const groupBy = this.logsTable?.getCurrentGroupBy();
    const hasGroups = groups && (groupBy === 'similarErrors' || groupBy === 'userId');
    
    // Show/hide checkbox based on grouping
    const checkboxContainer = document.getElementById('export-groups-container');
    if (hasGroups) {
      checkboxContainer.classList.remove('hidden');
      exportGroupsCheckbox.checked = true;
    } else {
      checkboxContainer.classList.add('hidden');
      exportGroupsCheckbox.checked = false;
    }
    
    const close = () => { modal.close(); backdrop.classList.add('hidden'); };
    
    document.getElementById('export-close').onclick = close;
    
    document.getElementById('export-json').onclick = () => {
      if (exportGroupsCheckbox.checked && hasGroups) {
        exportGroupsToJSON(groups, `${input.value || base}_groups.json`);
      } else {
        exportToJSON(this.logs, `${input.value || base}.json`);
      }
      close();
    };
    
    document.getElementById('export-csv').onclick = () => {
      if (exportGroupsCheckbox.checked && hasGroups) {
        exportGroupsToCSV(groups, `${input.value || base}_groups.csv`);
      } else {
        exportToCSV(this.logs, `${input.value || base}.csv`);
      }
      close();
    };
    
    document.getElementById('export-txt').onclick = () => {
      if (exportGroupsCheckbox.checked && hasGroups) {
        exportGroupsToTXT(groups, `${input.value || base}_groups.txt`);
      } else {
        exportToTXT(this.logs, `${input.value || base}.txt`);
      }
      close();
    };
    
    backdrop.classList.remove('hidden');
    modal.showModal();
  }
}


