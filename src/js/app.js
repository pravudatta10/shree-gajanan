// ============================================================
// app.js — entry point. Boots the single-page site by handing
// off to render.js, which fetches content and mounts every
// section in order.
// ============================================================
import { renderSite } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSite().catch((err) => {
    console.error("Failed to render site:", err);
    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = `
        <div class="container" style="padding-block:var(--space-9);text-align:center;">
          <p>Something went wrong loading the page content. Please refresh, or try again shortly.</p>
        </div>`;
    }
  });
});
