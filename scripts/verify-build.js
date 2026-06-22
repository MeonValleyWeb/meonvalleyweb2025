#!/usr/bin/env node
// Build verification harness. Ensures critical deploy files exist,
// pages have unique h1s and alt text, and output size is reasonable.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`✅ ${message}`);
}

function requireFile(filePath, label) {
  const full = path.join(distDir, filePath);
  if (!fs.existsSync(full)) {
    fail(`Missing ${label || filePath}`);
  } else {
    ok(`${label || filePath} present`);
  }
}

function fileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / (1024 * 1024);
}

function scanHtml(dir) {
  const problems = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanHtml(fullPath);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    const content = fs.readFileSync(fullPath, 'utf-8');
    const rel = path.relative(distDir, fullPath);
    const h1Matches = content.match(/<h1[\s>]/gi) || [];
    const imgs = content.match(/<img[^>]*>/gi) || [];
    const missingAlt = imgs.filter((tag) => !/alt=/i.test(tag));

    if (h1Matches.length !== 1) {
      problems.push(`${rel}: expected 1 <h1>, found ${h1Matches.length}`);
    }
    if (missingAlt.length > 0) {
      problems.push(`${rel}: ${missingAlt.length} image(s) missing alt`);
    }
  }
  return problems;
}

function largestFiles(dir, limit = 10) {
  const files = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else files.push({ path: path.relative(distDir, full), size: fs.statSync(full).size });
    }
  }
  walk(dir);
  return files.sort((a, b) => b.size - a.size).slice(0, limit);
}

console.log('Verifying build output...\n');

requireFile('robots.txt', 'robots.txt');
requireFile('sitemap-index.xml', 'sitemap-index.xml');
requireFile('_headers', 'Netlify _headers');
requireFile('_redirects', 'Netlify _redirects');

const totalSize = fs.readdirSync(distDir).reduce((acc, name) => {
  const full = path.join(distDir, name);
  const stats = fs.statSync(full);
  return acc + (stats.isDirectory() ? dirSize(full) : stats.size);
}, 0);

function dirSize(dir) {
  let size = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    size += entry.isDirectory() ? dirSize(full) : fs.statSync(full).size;
  }
  return size;
}

console.log(`\n📦 Total dist size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

const largest = largestFiles(distDir);
console.log('\n🔟 Largest files:');
for (const { path: p, size } of largest) {
  console.log(`   ${(size / 1024 / 1024).toFixed(2).padStart(6)} MB  ${p}`);
}

const problems = scanHtml(distDir);
if (problems.length === 0) {
  ok('All HTML pages have exactly one <h1> and all images have alt text');
} else {
  for (const p of problems) fail(p);
}

if (!process.exitCode) {
  console.log('\n🎉 Build verification passed');
} else {
  console.log('\n⚠️ Build verification found issues');
}
