// ============================================================
// announcement.js — renders the homepage "Latest Announcement"
// banner. Content comes from src/data/committee.json →
// announcement; edit that file to change or clear the message.
// ============================================================

export function announcementMarkup(announcement) {
  if (!announcement?.en) return "";
  return `
    <div class="announcement" data-reveal>
      <div class="announcement-icon"><i data-lucide="${announcement.icon || "megaphone"}" aria-hidden="true"></i></div>
      <div class="announcement-body">
        <p class="announcement-label">Latest Announcement</p>
        <p>${announcement.en}</p>
        ${announcement.odia ? `<p class="odia">${announcement.odia}</p>` : ""}
      </div>
    </div>`;
}
