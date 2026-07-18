// ============================================================
// section-head.js — consistent eyebrow + heading + subtitle
// wrapper. Each top-level component (about, schedule, quick-
// links...) renders its own <section id="…">; this only builds
// the heading block inside it, so every section stays visually
// consistent without copy-pasting markup.
// ============================================================

/**
 * @param {Object} opts
 * @param {string} [opts.eyebrow]
 * @param {string} [opts.eyebrowIcon]
 * @param {string} opts.title
 * @param {string} [opts.subtitle]
 */
export function SectionHead({ eyebrow, eyebrowIcon, title, subtitle }) {
  return `
    <div class="section-head" data-reveal>
      ${eyebrow ? `<span class="eyebrow">${eyebrowIcon ? `<i data-lucide="${eyebrowIcon}" aria-hidden="true"></i> ` : ""}${eyebrow}</span>` : ""}
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>`;
}
