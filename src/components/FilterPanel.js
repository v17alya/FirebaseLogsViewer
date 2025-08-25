import { DEFAULT_PROJECT } from '../config/firebase-config.js';
import { fetchDistinct, fetchProjects } from '../js/firebase.js';

export class FilterPanel {
  constructor() {
    this.el = {
      project: document.getElementById('project'),
      projectSelect: document.getElementById('projectSelect'),
      server: document.getElementById('server'),
      serverText: document.getElementById('serverText'),
      platform: document.getElementById('platform'),
      platformText: document.getElementById('platformText'),
      date: document.getElementById('date'),
      userId: document.getElementById('userId'),
      nickname: document.getElementById('nickname'),
      message: document.getElementById('message'),
      limit: document.getElementById('limit'),
      apply: document.getElementById('btn-apply'),
      clear: document.getElementById('btn-clear')
    };

    this.el.project.value = DEFAULT_PROJECT;
  }

  async loadInitialOptions() {
    const project = this._getProject();
    const [projects, servers, platforms] = await Promise.all([
      fetchProjects().catch(() => []),
      fetchDistinct('server', project),
      fetchDistinct('platform', project)
    ]);
    this._fillSelect(this.el.projectSelect, projects);
    this._fillSelect(this.el.server, servers);
    this._fillSelect(this.el.platform, platforms);
    this.el.projectSelect.addEventListener('change', () => {
      if (this.el.projectSelect.value) this.el.project.value = this.el.projectSelect.value;
      this.refreshServerPlatform();
    });
  }

  async refreshServerPlatform() {
    const project = this._getProject();
    const [servers, platforms] = await Promise.all([
      fetchDistinct('server', project),
      fetchDistinct('platform', project)
    ]);
    this._fillSelect(this.el.server, servers);
    this._fillSelect(this.el.platform, platforms);
  }

  _fillSelect(selectEl, items) {
    selectEl.innerHTML = '<option value="">Any</option>' + items.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  getFilters() {
    const project = this._getProject();
    const server = this.el.serverText.value.trim() || this.el.server.value.trim();
    const platform = this.el.platformText.value.trim() || this.el.platform.value.trim();
    return {
      project,
      server,
      platform,
      date: this.el.date.value.trim(),
      userId: this.el.userId.value.trim(),
      nickname: this.el.nickname.value.trim(),
      message: this.el.message.value.trim(),
      limit: Number(this.el.limit.value) || 200
    };
  }

  _getProject() {
    return (this.el.project.value || this.el.projectSelect.value || DEFAULT_PROJECT).trim();
  }

  onApply(cb) {
    this.el.apply.addEventListener('click', cb);
  }

  onClear(cb) {
    this.el.clear.addEventListener('click', () => {
      this.el.server.value = '';
      this.el.platform.value = '';
      this.el.date.value = '';
      this.el.userId.value = '';
      this.el.nickname.value = '';
      this.el.message.value = '';
      cb();
    });
  }
}


