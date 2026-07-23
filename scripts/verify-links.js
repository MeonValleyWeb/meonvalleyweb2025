#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const failures = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith('.html')) checkHtml(fullPath);
  }
}

function checkHtml(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relativePage = path.relative(distDir, filePath);
  const matches = html.matchAll(/(?:href|src)=["']([^"']+)["']/gi);

  for (const match of matches) {
    const target = match[1];
    if (!target.startsWith('/') || target.startsWith('//')) continue;
    const pathname = target.split(/[?#]/, 1)[0];
    const targetPath = pathname === '/' ? 'index.html' : pathname.slice(1);
    const candidates = [
      targetPath,
      `${targetPath}.html`,
      path.join(targetPath, 'index.html'),
    ];
    if (!candidates.some((candidate) => fs.existsSync(path.join(distDir, candidate)))) {
      failures.push(`${relativePage}: ${target}`);
    }
  }
}

walk(distDir);

if (failures.length) {
  console.error('Broken internal links or assets:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('All internal links and assets resolve in dist.');
