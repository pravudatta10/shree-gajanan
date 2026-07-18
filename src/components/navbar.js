// ============================================================
// navbar.js — top bar (brand + anchor nav + theme toggle) and a
// fixed bottom tab bar for one-handed mobile use. Both link to
// in-page section ids and use native smooth scrolling — there
// is no page routing on this site.
// ============================================================
import { NAV_ITEMS } from "../js/config.js";

export function TopNav(siteName) {
  return `
  <header class="nav">
    <div class="container nav-inner">
      <a href="#hero" class="nav-brand">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 4c2 2.5 2 5 0 7-2-2-2-4.5 0-7Z"/></svg>
        <span class="odia">${siteName}</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        ${NAV_ITEMS.map((item) => `<a href="${item.href}" data-nav-key="${item.key}">${item.label}</a>`).join("")}
      </nav>
      <button class="icon-btn" id="themeToggle" aria-label="Toggle light and dark theme" aria-pressed="false">
        <i data-lucide="sun" aria-hidden="true"></i>
      </button>
    </div>
  </header>`;
}

export function BottomTabBar() {
  return `
  <nav class="tab-bar" aria-label="Primary">
    ${NAV_ITEMS.map(
      (item) => `
      <a href="${item.href}" data-nav-key="${item.key}" class="tab-item">
        <i data-lucide="${item.icon}" aria-hidden="true"></i>
        <span>${item.label}</span>
      </a>`
    ).join("")}
  </nav>`;
}

// Highlights whichever nav link matches the section currently in
// view, in both the top bar and the bottom tab bar.
export function initScrollSpy() {
  const sections = NAV_ITEMS.map((item) => document.getElementById(item.key)).filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (key) => {
    document.querySelectorAll("[data-nav-key]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.navKey === key);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((el) => io.observe(el));
}
