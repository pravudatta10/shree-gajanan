// ============================================================
// hero-slider.js — auto-rotating hero banner track. Renders the
// dot indicators for N slides (already in the DOM, one per
// festival year — typography/gradient only, no photos) and
// wires up dots, prev/next and a pause-on-interaction auto-advance.
// ============================================================
import { HERO_INTERVAL_MS } from "./config.js";
import { qsa } from "./utils.js";

/**
 * @param {string} trackId
 * @param {number} slideCount
 */
export function initHeroSlider(trackId, slideCount) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const dotsWrap = track.parentElement.querySelector("[data-banner-dots]");
  let index = 0;
  let timer = null;

  const dots = Array.from({ length: slideCount }, (_, i) =>
    `<button type="button" class="banner-dot" data-index="${i}" aria-label="Show slide ${i + 1}"></button>`
  ).join("");
  if (dotsWrap) dotsWrap.innerHTML = dots;
  const dotEls = dotsWrap ? qsa(".banner-dot", dotsWrap) : [];

  function show(i) {
    index = (i + slideCount) % slideCount;
    qsa(".banner-slide", track).forEach((el, n) => el.classList.toggle("is-active", n === index));
    dotEls.forEach((el, n) => el.classList.toggle("is-active", n === index));
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, HERO_INTERVAL_MS);
  }

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  document.querySelector("[data-banner-prev]")?.addEventListener("click", () => { prev(); restart(); });
  document.querySelector("[data-banner-next]")?.addEventListener("click", () => { next(); restart(); });
  dotEls.forEach((el) => el.addEventListener("click", () => { show(Number(el.dataset.index)); restart(); }));

  show(0);
  if (!prefersReducedMotion) restart();
}
