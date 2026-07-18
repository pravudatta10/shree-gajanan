// ============================================================
// about.js — "About Committee" section: bilingual intro text
// plus the year-by-year history timeline. Content comes from
// src/data/committee.json.
// ============================================================
import { SectionHead } from "./ui/section-head.js";

function timelineList(timeline = []) {
  return `
    <ol class="timeline">
      ${timeline.map((t) => `
        <li class="timeline-item" data-reveal>
          <span class="timeline-year">${t.year}</span>
          <span class="timeline-text">${t.milestoneEn}</span>
        </li>`).join("")}
    </ol>`;
}

export function About({ about, timeline }) {
  return `
    <section id="about" class="section section--alt">
      <div class="container">
        ${SectionHead({
          eyebrow: "About the committee",
          eyebrowIcon: "landmark",
          title: "A festival built by the whole village",
          subtitle: about.en,
        })}
        <div class="grid grid--2" style="align-items:start;">
          <p class="odia lede">${about.odia}</p>
          ${timelineList(timeline)}
        </div>
      </div>
    </section>`;
}
