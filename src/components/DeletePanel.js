import { deletePath } from '../js/firebase.js';

export class DeletePanel {
  constructor() {
    this.trigger = document.getElementById('btn-delete');
    this.deleteModal = document.getElementById('delete-modal');
    this.confirmModal = document.getElementById('confirm-delete-modal');
    this.backdrop = document.getElementById('backdrop');
    this.input = document.getElementById('delete-path-input');
    this.pathPreview = document.getElementById('confirm-delete-path');
    this._bind();
  }

  _bind() {
    if (this.trigger) this.trigger.addEventListener('click', () => this._openInput());

    const closeInput = () => { this.deleteModal.close(); this.backdrop.classList.add('hidden'); };
    const closeConfirm = () => { this.confirmModal.close(); this.backdrop.classList.add('hidden'); };

    const cancelBtn = document.getElementById('delete-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeInput);

    const nextBtn = document.getElementById('delete-next');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      const path = (this.input?.value || '').trim();
      if (!path) return;
      this.pathPreview.textContent = path;
      this.deleteModal.close();
      this._openConfirm();
    });

    const confirmCancel = document.getElementById('confirm-delete-cancel');
    if (confirmCancel) confirmCancel.addEventListener('click', closeConfirm);

    const confirmDo = document.getElementById('confirm-delete-do');
    if (confirmDo) confirmDo.addEventListener('click', async () => {
      const path = this.pathPreview?.textContent || '';
      if (!path) return;
      try {
        await deletePath(path);
        closeConfirm();
        this._notify(`Deleted: ${path}`);
        this.onAfterDelete && this.onAfterDelete();
      } catch (e) {
        this._notify(`Delete failed: ${e?.message || e}`, true);
      }
    });
  }

  _openInput() {
    if (!this.deleteModal) return;
    this.input.value = '';
    this.backdrop.classList.remove('hidden');
    this.deleteModal.showModal();
  }

  _openConfirm() {
    if (!this.confirmModal) return;
    this.backdrop.classList.remove('hidden');
    this.confirmModal.showModal();
  }

  onDone(cb) {
    this.onAfterDelete = cb;
  }

  _notify(text, isError = false) {
    const el = document.getElementById('error-banner');
    if (!el) return;
    el.textContent = (isError ? 'Error: ' : '') + text;
    if (isError) {
      el.classList.remove('hidden');
    } else {
      // show success briefly
      el.classList.remove('hidden');
      setTimeout(() => { el.classList.add('hidden'); el.textContent = ''; }, 2500);
    }
  }
}



