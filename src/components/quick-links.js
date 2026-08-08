// ============================================================
// quick-links.js — "Quick Actions" section. Media, financial
// reports, committee and coordination are each a single card
// linking to their shared Google Drive folder — no year-by-year
// cards, no member names or phone numbers on the site itself.
// ============================================================
import { SectionHead } from "./ui/section-head.js";
import { Card } from "./ui/card.js";
import { LINKS } from "../js/config.js";

const ACTIONS = [
  { icon: "images", title: "Media Gallery", desc: "Every photo and video, organised by year on Google Drive.", href: LINKS.mediaDrive },
  // { icon: "receipt", title: "Financial Reports", desc: "Transparent, year-wise collection and expense records.", href: LINKS.expenseDrive },
  { icon: "users", title: "Committee Members", desc: "See who serves on this year's organising committee.", href: LINKS.committeeDrive },
  { icon: "handshake", title: "Coordination Team", desc: "Meet the volunteers coordinating this year's festival.", href: LINKS.coordinationDrive },
];

export function QuickLinks() {
  return `
    <section id="connect" class="section">
      <div class="container">
        ${SectionHead({
          eyebrow: "Quick actions",
          eyebrowIcon: "compass",
          title: "Everything about the festival",
          subtitle: "Media, reports and the people behind it all — one tap away.",
        })}
        <div class="grid grid--cards grid--quick">
          ${ACTIONS.map((a, i) => Card({ ...a, external: true, delay: i * 60 })).join("")}
        </div>
      </div>
    </section>`;
}
