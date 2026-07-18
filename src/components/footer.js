// ============================================================
// footer.js — "Location" section (organisation-level contact
// details only — no individual names or personal phone numbers,
// by design) followed by the site footer. Content comes from
// src/data/config.json → contact.
// ============================================================
import { SectionHead } from "./ui/section-head.js";
import { Card } from "./ui/card.js";
import { NAV_ITEMS } from "../js/config.js";

export function LocationSection({ contact }) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;
  return `
    <section id="location" class="section section--alt">
      <div class="container">
        ${SectionHead({
          eyebrow: "Location",
          eyebrowIcon: "map-pin",
          title: "Find and reach the committee",
          subtitle: "Organisation-level contact only — individual numbers aren't published here for everyone's privacy.",
        })}
        <div class="grid grid--cards">
          ${Card({ icon: "mail", title: "Email", desc: contact.email, reveal: true })}
          ${Card({ icon: "indian-rupee", title: "UPI for contributions", desc: contact.upi, reveal: true, delay: 60 })}
          ${Card({ icon: "map-pin", title: "Location", desc: contact.address, href: mapsHref, external: true, delay: 120 })}
        </div>
      </div>
    </section>`;
}

export function Footer({ nameOdia, nameEn, location, established }) {
  return `
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <h3 class="odia">${nameOdia}</h3>
        <p>${location} — celebrating Ganesh Puja together since ${established}.</p>
      </div>
      <nav class="footer-links" aria-label="Footer">
        ${NAV_ITEMS.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
      </nav>
    </div>
    <div class="footer-bottom">&copy; <span id="yearNow"></span> ${nameEn}. All rights reserved.</div>
  </footer>`;
}
