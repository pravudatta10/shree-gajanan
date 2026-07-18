// ============================================================
// countdown.js — finds the next upcoming event and drives any
// [data-countdown-root] element with a live ticking display.
// ============================================================

export function getNextEvent(events = []) {
  const now = Date.now();
  const upcoming = events
    .map((e) => ({ ...e, ts: new Date(`${e.date}T${e.time || "00:00"}`).getTime() }))
    .filter((e) => e.ts >= now)
    .sort((a, b) => a.ts - b.ts);
  return upcoming[0] || null;
}

function unitsBetween(targetTs) {
  const diff = Math.max(0, targetTs - Date.now());
  const day = 86400000, hour = 3600000, min = 60000;
  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / hour),
    minutes: Math.floor((diff % hour) / min),
    seconds: Math.floor((diff % min) / 1000),
  };
}

export function renderCountdownUnits(targetTs) {
  const u = unitsBetween(targetTs);
  const pad = (n) => String(n).padStart(2, "0");
  return `
    <div class="countdown-unit"><span class="countdown-num">${u.days}</span><span class="countdown-label">Days</span></div>
    <div class="countdown-unit"><span class="countdown-num">${pad(u.hours)}</span><span class="countdown-label">Hrs</span></div>
    <div class="countdown-unit"><span class="countdown-num">${pad(u.minutes)}</span><span class="countdown-label">Min</span></div>
    <div class="countdown-unit"><span class="countdown-num">${pad(u.seconds)}</span><span class="countdown-label">Sec</span></div>
  `;
}

// Starts a self-updating countdown inside every element matching
// the given selector. Returns a stop() function.
export function startCountdown(selector, targetTs) {
  const els = [...document.querySelectorAll(selector)];
  if (!els.length || !targetTs) return () => {};
  const tick = () => els.forEach((el) => (el.innerHTML = renderCountdownUnits(targetTs)));
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}
