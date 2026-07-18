// ============================================================
// button.js — one function, every button on the site.
// ============================================================

/**
 * @param {Object} opts
 * @param {string} opts.label
 * @param {string} [opts.href]      - if present, renders an <a>
 * @param {string} [opts.icon]      - lucide icon name
 * @param {"primary"|"outline"|"ghost"} [opts.variant]
 * @param {"sm"|"md"|"lg"} [opts.size]
 * @param {boolean} [opts.external] - marks as an outbound link (triggers the leave-site modal)
 * @param {boolean} [opts.block]    - full width
 * @param {string} [opts.id]
 */
export function Button({
  label,
  href,
  icon,
  variant = "primary",
  size = "md",
  external = false,
  block = false,
  id = "",
}) {
  const classes = ["btn", `btn-${variant}`, `btn-${size}`, block ? "btn-block" : ""]
    .filter(Boolean)
    .join(" ");
  const iconHtml = icon ? `<i data-lucide="${icon}" aria-hidden="true"></i>` : "";
  const idAttr = id ? `id="${id}"` : "";

  if (href) {
    const externalAttrs = external
      ? `data-external-link href="${href}" target="_blank" rel="noopener"`
      : `href="${href}"`;
    return `<a ${idAttr} class="${classes}" ${externalAttrs}>${iconHtml}<span>${label}</span></a>`;
  }
  return `<button ${idAttr} type="button" class="${classes}">${iconHtml}<span>${label}</span></button>`;
}
