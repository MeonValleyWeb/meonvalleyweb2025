// Single source of truth for business, navigation, hosting, services and locations.
// Edit here and propagate through components/pages.

export const business = {
  name: 'Meon Valley Web',
  email: 'hello@meonvalleyweb.com',
  phone: '+44 7850 037850',
  phoneUrl: 'tel:+447****7850',
  url: 'https://meonvalleyweb.com',
  address: {
    locality: 'Meon Valley',
    region: 'Hampshire',
    country: 'GB',
  },
  geo: {
    latitude: '50.9477',
    longitude: '-1.0959',
  },
  openingHours: 'Mo-Fr 09:00-17:00',
  priceRange: '££',
  description:
    'Web design, WordPress hosting, and maintenance for small businesses in Hampshire and on the South Coast.',
  googleBusinessUrl: 'https://share.google/yGX5QX17CVURkTuGf',
} as const;

export const social = {
  twitter: '',
  facebook: '',
  linkedin: '',
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Web Development', href: '/services', description: 'Bespoke sites, ecommerce and web apps.' },
      { label: 'Web Design', href: '/web-design-hampshire', description: 'Design-first builds for local businesses.' },
      { label: 'WordPress Doctor', href: '/wordpress-doctor', description: 'Fixes, tune-ups and rescue projects.' },
      { label: 'WordPress Support', href: '/wordpress-support-south-coast', description: 'Ongoing maintenance and updates.' },
      { label: 'WordPress Hosting', href: '/hosting', description: 'Fast, secure managed hosting with plans and pricing.' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  {
    label: 'Insights',
    href: '/newsroom',
    children: [
      { label: 'Newsroom', href: '/newsroom', description: 'Client wins, partnerships and launches.' },
      { label: 'Blog', href: '/blog', description: 'Advice on speed, UX and growth.' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Charity', href: '/charity' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNavigation = {
  services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Web Design', href: '/web-design-hampshire' },
    { label: 'WordPress Hosting', href: '/hosting' },
    { label: 'WordPress Support', href: '/wordpress-support-south-coast' },
    { label: 'WordPress Doctor', href: '/wordpress-doctor' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
    { label: 'Charity Work', href: '/charity' },
  ],
} as const;

export const hosting = {
  headline: 'Managed WordPress hosting for Hampshire businesses',
  summary:
    'Fast, secure hosting on premium cloud infrastructure with Cloudflare DNS, SSL, caching rules and daily backups. UK business-hours support, with enhanced 24/7 cover on our Premium plan.',
  support: {
    hours: 'Monday–Friday, 9am–5pm (UK time)',
    premiumHours: 'Enhanced 24/7 support on the Premium plan',
    response: 'Email support during business hours',
    responseTime: 'Standard plans: within 1 business day. Priority plans: within 4 business hours.',
  },
  backups: {
    cadence: 'Daily backups',
    retention: '30 days',
    storage: 'Off-site S3 storage for WordPress sites; platform snapshots for dedicated servers',
  },
  infrastructure: [
    'Premium cloud VPS infrastructure',
    'UK and EU data-centre options (DigitalOcean / Hetzner)',
    'Cloudflare DNS, CDN and edge rules',
    'Free SSL/TLS certificates',
    'Server-level security hardening',
    '24/7 automated uptime monitoring with alerts',
  ],
  monitoring: {
    uptime: '24/7 automated uptime monitoring with instant alerts if your site goes down, on every plan.',
    analytics:
      'We use privacy-focused, cookieless analytics (Fathom and Umami) instead of Google Analytics — no cookie banners required for analytics, no user data sold to ad networks, and no impact on page speed from a bulky tracking script.',
  },
  migration: {
    price: 200,
    description:
      'A one-off £200 migration includes DNS cut-over to Cloudflare, email/DNS record transfer, WordPress files and database relocation, and post-launch testing.',
  },
  limits:
    'Fair-use resources aligned with the premium infrastructure providers. We’ll advise if your site needs a higher-tier plan.',
  astroHosting: {
    summary:
      'Static and edge-rendered Astro sites are deployed to Cloudflare Workers, Netlify or Vercel depending on your project needs — with the same backup, DNS and performance backing.',
  },
} as const;

export type PlanId = 'starter' | 'professional' | 'premium';

export const plans = [
  {
    id: 'starter' as PlanId,
    name: 'Wayfarer',
    tagline: 'Hosting Only',
    price: 25,
    frequency: 'monthly',
    isPopular: false,
    features: [
      'Premium cloud VPS hosting',
      'Cloudflare DNS & CDN',
      'Free SSL certificate',
      'Daily backups kept 30 days',
      '24/7 uptime monitoring with alerts',
      'Unmetered bandwidth (fair use)',
      'Email support during UK business hours (reply within 1 business day)',
      'No setup fee, no contract — cancel anytime',
    ],
  },
  {
    id: 'professional' as PlanId,
    name: 'Shipwright',
    tagline: 'Hosting & Maintenance',
    price: 50,
    frequency: 'monthly',
    isPopular: true,
    features: [
      'Everything in Wayfarer, plus',
      'WordPress core, theme & plugin updates',
      'Basic security monitoring',
      'Privacy-focused analytics (no Google Analytics, no cookie banner needed)',
      'Monthly performance report',
      'Priority email support (reply within 4 business hours)',
      'Small content edits on request*',
    ],
  },
  {
    id: 'premium' as PlanId,
    name: 'Monarch',
    tagline: 'Premium Hosting & Maintenance',
    price: 75,
    frequency: 'monthly',
    isPopular: false,
    features: [
      'Everything in Shipwright, plus',
      'Staging environment',
      'Advanced security hardening',
      '24/7 enhanced support cover',
      'Quarterly site health review',
      'Migration included (£200 value)',
    ],
  },
] as const;

export const topLevelServices = [
  {
    id: 'wordpress',
    title: 'WordPress Development',
    href: '/services',
    summary: 'Custom themes and functionality tailored to your business.',
    icon: 'wordpress',
  },
  {
    id: 'headless',
    title: 'Headless WordPress',
    href: '/services',
    summary: 'WordPress for content with a fast Astro frontend.',
    icon: 'bolt',
  },
  {
    id: 'astro',
    title: 'AstroJS Sites',
    href: '/services',
    summary: 'Ultra-fast static and edge sites for marketing and content.',
    icon: 'rocket',
  },
  {
    id: 'support',
    title: 'WordPress Support',
    href: '/wordpress-support-south-coast',
    summary: 'Ongoing maintenance, updates and peace of mind.',
    icon: 'shield',
  },
  {
    id: 'hosting',
    title: 'Fast Hosting',
    href: '/hosting',
    summary: 'Managed hosting with backups, SSL and UK support.',
    icon: 'server',
  },
  {
    id: 'rescue',
    title: 'WordPress Doctor',
    href: '/wordpress-doctor',
    summary: 'Rescue, repair and performance fixes for troubled sites.',
    icon: 'wrench',
  },
] as const;

export const locations = [
  { slug: 'hampshire', name: 'Hampshire' },
  { slug: 'portsmouth', name: 'Portsmouth' },
  { slug: 'southampton', name: 'Southampton' },
  { slug: 'winchester', name: 'Winchester' },
  { slug: 'petersfield', name: 'Petersfield' },
  { slug: 'basingstoke', name: 'Basingstoke' },
  { slug: 'andover', name: 'Andover' },
  { slug: 'romsey', name: 'Romsey' },
  { slug: 'eastleigh', name: 'Eastleigh' },
  { slug: 'fareham', name: 'Fareham' },
] as const;
