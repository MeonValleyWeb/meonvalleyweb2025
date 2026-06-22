# Accessibility checklist

Continuous checks after every content or component change.

## Automated tests

```bash
npm run build
node scripts/accessibility-audit.js
```

The audit checks:

- valid `<!DOCTYPE html>`, `lang` attribute, and viewport meta
- every page has exactly one `<h1>`
- heading levels do not skip (`h1` → `h3` etc.)
- every image has an `alt` attribute
- every interactive element has accessible text
- no duplicate `id`s
- every form input has a label (`<label for>` or `aria-label`)
- visible focus styles are declared
- meta descriptions are 50–160 characters

## Manual checks

- [ ] Tab through header mega-menu with keyboard (ArrowDown, Escape, Tab, Enter).
- [ ] Open/close the lead-magnet popup with keyboard only.
- [ ] Submit the contact form and confirm the success page is announced if the form redirects.
- [ ] Verify reduced-motion does not break layout: `prefers-reduced-motion` should disable animations, not content.
- [ ] Run macOS VoiceOver on home, contact, and one service page.

## Known patterns

- Honeypot inputs use `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"`.
- Mobile menus announce state with `aria-live="polite"`.
- Breadcrumbs expose `BreadcrumbList` schema and `aria-label="Breadcrumb"`.

## Tooling

- Astro Components + Tailwind 4
- `scripts/accessibility-audit.js` — custom post-build smoke test
- (Optional) `pa11y-ci` against a local static server after deploy
