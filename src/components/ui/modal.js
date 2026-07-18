// ============================================================
// modal.js — a single reusable modal, used site-wide to confirm
// before sending anyone to an external Google Drive folder.
// Any element with [data-external-link href="…"] is intercepted.
// ============================================================
import { refreshIcons } from "../../js/utils.js";

const MODAL_HTML = `
  <div class="modal-backdrop" id="leaveModal" hidden>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="leaveModalTitle">
      <div class="modal-icon"><i data-lucide="folder-open" aria-hidden="true"></i></div>
      <h3 id="leaveModalTitle">Opening Google Drive</h3>
      <p>You're leaving this site to view content stored on Google Drive.</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline btn-md" id="leaveModalCancel">Cancel</button>
        <a href="#" target="_blank" rel="noopener" class="btn btn-primary btn-md" id="leaveModalConfirm">
          <i data-lucide="external-link" aria-hidden="true"></i><span>Open folder</span>
        </a>
      </div>
    </div>
  </div>`;

export function mountModal() {
  if (document.getElementById("leaveModal")) return;
  document.body.insertAdjacentHTML("beforeend", MODAL_HTML);
  refreshIcons();

  const backdrop = document.getElementById("leaveModal");
  const confirm = document.getElementById("leaveModalConfirm");
  const cancel = document.getElementById("leaveModalCancel");

  const close = () => {
    backdrop.hidden = true;
    document.body.classList.remove("modal-open");
  };

  cancel.addEventListener("click", close);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !backdrop.hidden) close();
  });
  confirm.addEventListener("click", close);

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-external-link]");
    if (!link) return;
    e.preventDefault();
    confirm.href = link.href;
    backdrop.hidden = false;
    document.body.classList.add("modal-open");
  });
}
