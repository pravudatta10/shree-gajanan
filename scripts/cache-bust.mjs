#!/usr/bin/env node
// ============================================================
// cache-bust.mjs
//
// Builds a deployable copy of the site into ./dist with a
// version query string (?v=<hash>) appended to every internal
// CSS file, JS file, ES-module import, and JSON fetch() call.
//
// Why: the site has no bundler — index.html links CSS/JS
// directly, and app.js uses native ES module `import` plus
// fetch() for the JSON data files. Every one of those is a
// separate URL the browser (and GitHub Pages' CDN) caches on
// its own. Changing file *contents* without changing the URL
// means visitors keep getting the old cached copy. Appending a
// version string that changes on every deploy forces a fresh
// fetch for all of them, automatically, with no manual bumping.
//
// Usage:
//   node scripts/cache-bust.mjs [version]
//
// If no version is passed, one is derived from GITHUB_SHA (set
// automatically in GitHub Actions) or, failing that, a hash of
// the source files themselves (useful for local testing).
// ============================================================

import { createHash } from "node:crypto";
import { cpSync, readFileSync, writeFileSync, rmSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// Folders/files that should never be copied into the deployed build.
const EXCLUDE = new Set([".git", ".github", "node_modules", "scripts", "dist", ".gitignore", "README.md"]);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function computeVersion() {
  const explicit = process.argv[2];
  if (explicit) return explicit;

  const fromEnv = process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv.slice(0, 8);

  // Local fallback: hash the contents of every source file so the
  // version still changes whenever something actually changes.
  const hash = createHash("sha256");
  for (const file of walk(ROOT).sort()) {
    hash.update(readFileSync(file));
  }
  return hash.digest("hex").slice(0, 8);
}

function rewriteHtml(content, version) {
  // href="src/css/foo.css"  ->  href="src/css/foo.css?v=XXXX"
  // src="src/js/app.js"     ->  src="src/js/app.js?v=XXXX"
  // Skips absolute URLs (http/https) and anything already versioned.
  return content.replace(
    /(href|src)=(["'])((?!https?:\/\/)[^"']+\.(?:css|js))\2/g,
    (match, attr, quote, url) => `${attr}=${quote}${url}?v=${version}${quote}`
  );
}

function rewriteJs(content, version) {
  let out = content;

  // Static imports: import X from "./foo.js";  /  export { X } from "../bar.js";
  out = out.replace(
    /(from\s+)(["'])(\.[^"']+\.js)\2/g,
    (match, kw, quote, url) => `${kw}${quote}${url}?v=${version}${quote}`
  );

  // Dynamic imports: import("./foo.js")
  out = out.replace(
    /(import\()(\s*)(["'])(\.[^"']+\.js)\3/g,
    (match, kw, ws, quote, url) => `${kw}${ws}${quote}${url}?v=${version}${quote}`
  );

  // fetchJSON("src/data/foo.json") / fetch("src/data/foo.json")
  out = out.replace(
    /(fetch(?:JSON)?\(\s*)(["'])([^"']+\.json)\2/g,
    (match, kw, quote, url) => `${kw}${quote}${url}?v=${version}${quote}`
  );

  return out;
}

function build() {
  if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });

  const version = computeVersion();
  console.log(`Building with version: ${version}`);

  for (const file of walk(ROOT)) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(DIST, rel);
    mkdirSync(path.dirname(dest), { recursive: true });
    cpSync(file, dest, { force: true });
  }

  // Rewrite HTML and JS files in place inside dist/.
  for (const file of walk(DIST)) {
    if (file.endsWith(".html")) {
      const content = readFileSync(file, "utf8");
      writeFileSync(file, rewriteHtml(content, version));
    } else if (file.endsWith(".js")) {
      const content = readFileSync(file, "utf8");
      writeFileSync(file, rewriteJs(content, version));
    }
  }

  console.log(`Build complete: ${DIST}`);
}

build();
