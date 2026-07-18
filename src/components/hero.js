// ============================================================
// hero.js — the homepage hero. One banner slider, rotating
// through festival years. Each slide shows a photo for that
// year (assets/hero/<year>.jpg) with the year rendered on top;
// if a photo hasn't been added yet, the <img> quietly removes
// itself and the slide falls back to the gradient background.
// A "toran" bunting motif strings across the top, echoing the
// marigold garlands hung over every pandal.
// ============================================================
import { HERO_YEARS } from "../js/config.js";
import { Button } from "./ui/button.js";
import { LINKS } from "../js/config.js";

function toranSvg() {
  // A row of alternating triangular bunting flags — the signature motif.
  const flagCount = 14;
  const flags = Array.from({ length: flagCount }, (_, i) => {
    const x = i * 40;
    const tone = i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--accent-2)" : "var(--accent-3)";
    return `<path d="M${x} 0 L${x + 20} 0 L${x + 10} 26 Z" fill="${tone}" opacity="0.92" />`;
  }).join("");
  return `
  <svg class="toran" viewBox="0 0 ${flagCount * 40} 30" preserveAspectRatio="none" aria-hidden="true">
    <line x1="0" y1="0" x2="${flagCount * 40}" y2="0" stroke="var(--border-strong)" stroke-width="1.5" />
    ${flags}
  </svg>`;
}

function slideMarkup(year, index) {
  return `
    <div class="banner-slide${index === 0 ? " is-active" : ""}" data-hero-slide="${year}">
      <img
        class="banner-slide-img"
        src="assets/hero/${year}.png"
        alt="Ganesh Puja celebration, ${year}"
        loading="${index === 0 ? "eager" : "lazy"}"
        decoding="async"
        onerror="this.remove()"
      >
      <span class="hero-slide-year">${year}</span>
    </div>`;
}

export function Hero({ nameOdia, nameEn, location, established }) {
  return `
  <section class="hero" id="hero">
    ${toranSvg()}
    <div class="hero-banner">
      <div class="banner-track" id="heroTrack">
        ${HERO_YEARS.map(slideMarkup).join("")}
      </div>
    </div>
    <div class="hero-content">
      <span class="hero-badge"><i data-lucide="flame" aria-hidden="true"></i> Est. ${established}</span>
      <h1 class="hero-title odia">${nameOdia}</h1>
      <p class="hero-subtitle">${nameEn} · ${location}</p>
      <p class="hero-greeting odia">ଗଣପତି ବାପ୍ପା ମୋରିୟା 🙏</p>

      <div class="hero-countdown" id="heroCountdown" data-countdown-root>
        <p class="hero-countdown-label">Loading next event…</p>
      </div>

      <div class="btn-row">
        ${Button({ label: "Media Gallery", href: LINKS.mediaDrive, icon: "images", variant: "primary", external: true })}
        ${Button({ label: "Festival Schedule", href: "#schedule", icon: "calendar-days", variant: "outline" })}
      </div>
    </div>
    <div class="banner-nav">
      <button type="button" class="banner-arrow" data-banner-prev aria-label="Previous year"><i data-lucide="chevron-left" aria-hidden="true"></i></button>
      <div class="banner-dots" data-banner-dots></div>
      <button type="button" class="banner-arrow" data-banner-next aria-label="Next year"><i data-lucide="chevron-right" aria-hidden="true"></i></button>
    </div>
  </section>`;
}
