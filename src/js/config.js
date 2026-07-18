// ============================================================
// config.js — every external URL lives here. Never hardcode a
// URL anywhere else in the codebase; import LINKS instead.
//
// Site identity (name, location, established year) and contact
// details (email, UPI, address) are content, not app config —
// edit those in src/data/config.json instead.
// ============================================================

export const LINKS = {
  mediaDrive: "https://drive.google.com/drive/folders/1bJqxYEkp4VPXwW1Vokb0CsTgAkzf_IEh?usp=sharing",
  expenseDrive: "https://drive.google.com/drive/folders/1D43vhxzhFGkbd2HMhf57IrHEKipf0OF9?usp=sharing",
  committeeDrive: "https://drive.google.com/drive/folders/1Q741GjlgbhSI2bzwB_X1qji9-3OUmnxH?usp=sharing",
  coordinationDrive: "https://drive.google.com/drive/folders/1Q741GjlgbhSI2bzwB_X1qji9-3OUmnxH?usp=sharing",
};

// In-page sections the nav (top bar + mobile tab bar) links to.
// Add/remove an entry here and both nav bars update automatically.
export const NAV_ITEMS = [
  { href: "#hero", label: "Home", key: "hero", icon: "home" },
   { href: "#schedule", label: "Schedule", key: "schedule", icon: "calendar-days" },
  { href: "#connect", label: "Connect", key: "connect", icon: "compass" },
  { href: "#about", label: "About", key: "about", icon: "landmark" }, 
  { href: "#location", label: "Location", key: "location", icon: "map-pin" },
];

// Years the hero banner slider rotates through. Typographic only — no photos.
export const HERO_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

export const STORAGE_KEYS = {
  theme: "gpc_theme",
};

export const HERO_INTERVAL_MS = 6000;
