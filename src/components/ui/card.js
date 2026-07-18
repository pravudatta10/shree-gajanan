// ============================================================
// card.js — the one reusable "tile" used for quick actions and
// festival highlights.
// ============================================================

/**
 * @param {Object} opts
 * @param {string} opts.icon    - lucide icon name
 * @param {string} opts.title
 * @param {string} opts.desc
 * @param {string} [opts.href]      - makes the whole card a link
 * @param {boolean} [opts.external] - outbound link, routes through the leave-site modal
 * @param {boolean} [opts.reveal]   - opt into scroll-reveal animation
 * @param {number} [opts.delay]     - ms stagger for reveal
 */
export function Card({ icon, title, desc, href, external = false, reveal = true, delay = 0 }) {
  const tag = href ? "a" : "div";
  const linkAttrs = href
    ? external
      ? `data-external-link href="${href}" target="_blank" rel="noopener"`
      : `href="${href}"`
    : "";
  const revealAttrs = reveal ? `data-reveal style="transition-delay:${delay}ms"` : "";
  return `
    <${tag} class="card${href ? " card--link" : ""}" ${linkAttrs} ${revealAttrs}>
      <div class="card-icon"><i data-lucide="${icon}" aria-hidden="true"></i></div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${desc}</p>
      ${href ? '<span class="card-arrow"><i data-lucide="arrow-up-right" aria-hidden="true"></i></span>' : ""}
    </${tag}>
  `;
}
