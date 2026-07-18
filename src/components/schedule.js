// ============================================================
// schedule.js — Festival Schedule
// Displays the complete Ganesh Puja Mahotsav schedule.
// Events are loaded from src/data/events.json.
// ============================================================
import { SectionHead } from "./ui/section-head.js";

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatWhen(event) {
  const start = new Date(`${event.date}T${event.time || "00:00"}`);
  const timeLabel = event.time
    ? start.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const dateLabel = DATE_FMT.format(start);

  return timeLabel ? `${dateLabel} · ${timeLabel}` : dateLabel;
}

function isPast(event) {
  const end = new Date(
    `${event.endDate || event.date}T${event.endTime || event.time || "23:59"}`
  );
  return end.getTime() < Date.now();
}

function scheduleItem(event) {
  return `
    <li class="schedule-item${isPast(event) ? " is-past" : ""}" data-reveal>
      <div class="schedule-icon">
        <i data-lucide="${event.icon || "calendar-days"}" aria-hidden="true"></i>
      </div>
      <div>
        <p class="schedule-when">${formatWhen(event)}</p>
        <h3 class="schedule-title">${event.titleEn}</h3>
        <p class="schedule-desc">${event.descriptionEn || ""}</p>
      </div>
    </li>`;
}

export function Schedule({ events = [] }) {
  return `
    <section id="schedule" class="section">
      <div class="container">
        ${SectionHead({
          eyebrow: "Festival Schedule",
          eyebrowIcon: "calendar-days",
          title: "Ganesh Puja Mahotsav Schedule 2026",
          subtitle:
            "Complete schedule of the Ganesh Puja Mahotsav, from Abahan to Visarjan.",
        })}
        <ol class="schedule-list">
          ${events.map(scheduleItem).join("")}
        </ol>
      </div>
    </section>`;
}