// ============================================================
// utils.js — small, dependency-free helpers shared by every
// component and script in the app.
// ============================================================

export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

export async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

// Re-renders lucide icons for any newly-injected markup.
export function refreshIcons() {
  window.lucide?.createIcons();
}

// Wires up IntersectionObserver-based scroll reveals for any
// element carrying [data-reveal] inside the given root.
export function initReveal(root = document) {
  const items = qsa("[data-reveal]", root);
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}
