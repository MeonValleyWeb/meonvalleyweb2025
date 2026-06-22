#!/usr/bin/env node
// Accessibility / SEO smoke test. Run after every build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const issues = [];
let filesChecked = 0;

function add(rel, msg, type = 'error') {
  issues.push({ rel, msg, type });
}

function scanHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanHtml(fullPath);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    filesChecked++;
    const content = fs.readFileSync(fullPath, 'utf-8');
    const rel = path.relative(distDir, fullPath);

    // h1 count
    const h1 = content.match(/<h1[\s>]/gi) || [];
    if (h1.length !== 1) add(rel, `expected 1 <h1>, found ${h1.length}`);

    // Heading level order: heading levels must not skip (e.g. h2 -> h4)
    const headingTags = [...content.matchAll(/<(h[1-6])[\s>]/gi)].map((m) => parseInt(m[1][1]));
    if (headingTags.some((n, i) => i > 0 && n > headingTags[i - 1] + 1)) {
      add(rel, `heading levels skip (e.g. h2 -> h4)`);
    }

    // alt text
    const imgs = content.match(/<img\s+[^>]*?>/gi) || [];
    const missingAlt = imgs.filter((tag) => !/alt=/i.test(tag) && !/role\s*=\s*"presentation"/i.test(tag));
    if (missingAlt.length > 0) add(rel, `${missingAlt.length} image(s) missing alt text`);

    // Duplicate ids
    const ids = [...content.matchAll(/\sid\s*=\s*"([^"]+)"/gi)].map((m) => m[1]);
    const seen = new Set();
    const dupes = [];
    ids.forEach((id) => (seen.has(id) ? dupes.push(id) : seen.add(id)));
    if (dupes.length > 0) add(rel, `duplicate id(s): ${[...new Set(dupes)].join(', ')}`);

    // Links with no readable text or accessible name
    const links = content.match(/<a\s+[^>]*?>[^<]*(?:<[^a/][^>]*>[^<]*)*<\/a>/gi) || [];
    links.forEach((link) => {
      const text = link.replace(/<[^>]+>/g, '').trim();
      const hasAriaLabel = /aria-label\s*=/i.test(link);
      const hasSpanSr = /<span[^>]*class\s*=\s*"[^"]*sr-only/i.test(link);
      const hasImgAlt = /alt\s*=\s*"[^"]+"/i.test(link);
      if (!text && !hasAriaLabel && !hasSpanSr && !hasImgAlt) {
        add(rel, `link with no readable text or accessible name`);
      }
    });

    // Form controls without labels
    const inputs = content.match(/<(?:input|select|textarea)\s+[^>]*?>/gi) || [];
    inputs.forEach((tag) => {
      // Skip hidden form controls used for honeypots/frameworks
      if (/aria-hidden\s*=\s*"true"/i.test(tag) || /type\s*=\s*"hidden"/i.test(tag)) return;
      const type = tag.match(/type\s*=\s*"([^"]+)"/i)?.[1] || 'text';
      // Skip disabled decorative checkboxes (e.g. markdown checklist items)
      if (/disabled=""/i.test(tag) && type === 'checkbox') return;

      if (['submit', 'button', 'hidden', 'image'].includes(type)) return;
      const hasId = /id\s*=\s*"[^"]+"/i.test(tag);
      const hasAria = /aria-label\s*=/i.test(tag) || /aria-labelledby\s*=/i.test(tag);
      const hasPlaceholder = /placeholder\s*=/i.test(tag);
      let labelled = hasAria;
      if (hasId && !hasAria) {
        const id = tag.match(/id\s*=\s*"([^"]+)"/i)?.[1];
        if (id) labelled = new RegExp(`for="${id}"`, 'i').test(content);
      }
      if (!labelled && !hasPlaceholder) add(rel, `form control missing label`);
    });

    // Lang attribute
    if (!/<html[^>]*\slang\s*=/.test(content)) add(rel, `<html> missing lang attribute`, 'warning');

    // Viewport
    if (!/name\s*=\s*"viewport"/.test(content)) add(rel, `viewport meta missing`);

    // Title and meta description
    if (!/<title>/.test(content)) add(rel, `missing <title>`);
    const descTag = content.match(/<meta\s+name\s*=\s*"description"\s+content="([^"]*)"\s*\/?>/i);
    const desc = descTag ? descTag[1] : '';
    if (!desc || desc.length < 50 || desc.length > 160) {
      add(rel, `description missing or outside 50-160 char range (length=${desc.length})`);
    }
  }
}

scanHtml(distDir);

console.log(`Audited ${filesChecked} HTML files.\n`);

if (issues.length === 0) {
  console.log('No accessibility or SEO issues found.');
} else {
  let errors = 0;
  let warnings = 0;
  let currentFile = null;
  issues.forEach(({ rel, msg, type }) => {
    if (rel !== currentFile) {
      console.log(`\n${rel}`);
      currentFile = rel;
    }
    console.log(`   ${type === 'warning' ? 'WARNING' : 'ERROR'}: ${msg}`);
    type === 'warning' ? warnings++ : errors++;
  });
  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
  process.exitCode = errors > 0 ? 1 : 0;
}
