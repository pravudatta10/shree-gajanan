// ============================================================
// theme.js — light/dark mode. Colour values themselves live in
// src/css/theme.css as custom properties; this file only knows
// the mode names, how to pick a default, and how to apply/toggle
// the mode on the document.
// ============================================================
import { STORAGE_KEYS } from "./config.js";
import { refreshIcons } from "./utils.js";

export const THEME_MODES = { DARK: "dark", LIGHT: "light" };
const DEFAULT_THEME = THEME_MODES.DARK;

function getPreferredTheme(storedValue) {
  if (storedValue === THEME_MODES.DARK || storedValue === THEME_MODES.LIGHT) {
    return storedValue;
  }
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
  return prefersLight ? THEME_MODES.LIGHT : DEFAULT_THEME;
}

function applyTheme(mode, themeColors) {
  document.documentElement.setAttribute("data-theme", mode);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && themeColors) {
    meta.setAttribute("content", mode === THEME_MODES.LIGHT ? themeColors.light : themeColors.dark);
  }
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(mode === THEME_MODES.LIGHT));
    toggle.innerHTML = `<i data-lucide="${mode === THEME_MODES.LIGHT ? "moon" : "sun"}" aria-hidden="true"></i>`;
    refreshIcons();
  }
}

// themeColors: { dark, light } hex strings from config.json, used to
// keep the browser chrome (meta theme-color) in sync with the toggle.
export function initTheme(themeColors) {
  const stored = localStorage.getItem(STORAGE_KEYS.theme);
  const mode = getPreferredTheme(stored);
  applyTheme(mode, themeColors);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT;
    localStorage.setItem(STORAGE_KEYS.theme, next);
    applyTheme(next, themeColors);
  });
}
