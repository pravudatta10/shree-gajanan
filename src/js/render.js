// ============================================================
// render.js — fetches every content JSON file once, then
// assembles the whole single-page site in order:
//
//   Navbar → Hero (+ countdown) → Announcement → Quick Actions
//   → About → Schedule → Location → Footer
//
// Add a new section by writing one component + one line here —
// nothing else in the app needs to change.
// ============================================================
import { fetchJSON, refreshIcons, initReveal } from "./utils.js";
import { TopNav, BottomTabBar, initScrollSpy } from "../components/navbar.js";
import { Hero } from "../components/hero.js";
import { announcementMarkup } from "./announcement.js";
import { QuickLinks } from "../components/quick-links.js";
import { About } from "../components/about.js";
import { Schedule } from "../components/schedule.js";
import { LocationSection, Footer } from "../components/footer.js";
import { mountModal } from "../components/ui/modal.js";
import { initTheme } from "./theme.js";
import { initHeroSlider } from "./hero-slider.js";
import { startCountdown, getNextEvent, renderCountdownUnits } from "./countdown.js";
import { HERO_YEARS } from "./config.js";

export async function renderSite() {
  const [{ site, contact }, committee, eventsData] = await Promise.all([
    fetchJSON("src/data/config.json"),
    fetchJSON("src/data/committee.json"),
    fetchJSON("src/data/events.json"),
  ]);

  // ---- chrome: nav, footer, leave-site modal ----
  document.getElementById("navRoot").innerHTML = TopNav(site.nameOdia);
  document.getElementById("tabBarRoot").innerHTML = BottomTabBar();
  document.getElementById("footerRoot").innerHTML =
    LocationSection({ contact }) +
    Footer({ nameOdia: site.nameOdia, nameEn: site.nameEn, location: site.location, established: site.established });

  const yearEl = document.getElementById("yearNow");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initTheme({ dark: site.themeColorDark, light: site.themeColorLight });
  mountModal();

  // ---- main content ----
  const app = document.getElementById("app");
  app.innerHTML =
    Hero({ nameOdia: site.nameOdia, nameEn: site.nameEn, location: site.location, established: site.established }) +
    `<section class="section section--tight"><div class="container">
    ${announcementMarkup(committee.announcement)}</div></section>` +
    Schedule({ events: eventsData.events }) +
    QuickLinks() +
    About({ about: committee.about, timeline: committee.timeline });

  refreshIcons();
  initReveal(document);
  initScrollSpy();
  initHeroSlider("heroTrack", HERO_YEARS.length);

  // ---- live countdown, sourced from the same events list ----
  const next = getNextEvent(eventsData.events);
  const countdownRoot = document.getElementById("heroCountdown");
  if (next && countdownRoot) {
    countdownRoot.innerHTML = `
      <p class="hero-countdown-label"><i data-lucide="bell-ring" aria-hidden="true"></i> ${next.titleEn}</p>
      <div class="countdown-units">${renderCountdownUnits(next.ts)}</div>`;
    refreshIcons();
    startCountdown("#heroCountdown .countdown-units", next.ts);
  } else if (countdownRoot) {
    countdownRoot.innerHTML = `<p class="hero-countdown-label">No upcoming events scheduled right now.</p>`;
  }
}
