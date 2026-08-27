# Hampshire Growth Sprint

Prepared for Meon Valley Web on 27 August 2026.

## Objective

Increase qualified enquiries from Hampshire businesses by combining a stronger website, clearer local proof, useful search content and a tightly controlled Facebook and Instagram campaign.

The first paid test is capped at **£168**. It is designed to learn which message earns qualified enquiries, not to maximise reach.

## Verified website baseline

- Astro static site with 45 generated pages.
- XML sitemap, canonical URLs and local business structured data present.
- Mobile Lighthouse baseline before the redesign: SEO 100, accessibility 92 and best practices 96.
- Live lab baseline before the redesign: LCP 258ms and CLS 0.00.
- Four public lead forms protected by Cloudflare Turnstile and handled by the shared Worker.
- Current primary conversion offer: free website improvement report.

## This sprint's website work

- Replace unsupported counters, badges and recent-project notifications.
- Rebuild the homepage around real work, direct local support and one primary audit offer.
- Expand `/web-design-hampshire` into the main commercial search page.
- Strengthen the Two Dogs and an Awning, Saints Disabled Supporters' Association and Wessex Whisky Club case studies.
- Name Andrew as the author of advice content and provide a relevant biography.
- Repair broken internal links and duplicate route warnings.
- Preserve all established public URLs, navigation labels, form fields and legal wording.

## Search Console handoff

These actions require Andrew's private Google session. Do not share account credentials.

### Capture the baseline before release

1. Open Search Console and select `meonvalleyweb.com`.
2. Set the Performance report to the last 16 months.
3. Export Queries, Pages, Countries and Devices.
4. Record the current figures for:
   - `web design hampshire`
   - `hampshire web design`
   - `web designer hampshire`
   - `/`
   - `/web-design-hampshire`
5. Save total clicks, impressions, click-through rate and average position.

### After release

1. Inspect `/` and `/web-design-hampshire` using URL Inspection.
2. Confirm the rendered page and canonical URL are correct.
3. Request indexing for those two URLs.
4. Confirm `https://meonvalleyweb.com/sitemap-index.xml` remains submitted.
5. Add a weekly comparison covering the same queries and landing pages.

## Google Business Profile handoff

These actions also require Andrew's private Google session.

- Confirm the primary category accurately describes a web design business.
- Complete the web design, hosting, WordPress support and website audit services.
- Use the same business name, phone, website and Hampshire service details as the website.
- Add current project images rather than generic technology graphics.
- Ask recent clients for honest reviews without incentives.
- Reply to every review in a natural, specific way.
- Add a website link using `utm_source=google&utm_medium=organic&utm_campaign=google_business_profile`.
- Record calls, website clicks and searches once per week.

## £168 Meta campaign

### Campaign settings

- Objective: Leads.
- Conversion location: Website.
- Destination: `https://meonvalleyweb.com/free-site-audit`.
- Budget: £6 per day for 28 days.
- Structure: one campaign, one prospecting ad set, three ads.
- Geography: Hampshire and a realistic service radius around the Meon Valley.
- Audience: broad local adults likely to own or influence a business website decision.
- Placements: Advantage+ placements, with every creative supplied in placement-safe formats.
- Optimisation event: Lead, once the consent-gated Meta Pixel is configured and verified.

Do not create separate cold, warm and retargeting campaigns at this budget. Build the website-engagement and video-view audiences now, but activate retargeting only when the audience is large enough to deliver consistently.

### Advertising consent and tracking

The existing banner currently names Google Ads only. Before a Meta Pixel is added:

1. Obtain a Meta Pixel ID from Events Manager.
2. Approve an update to the cookie banner and privacy wording that clearly names Meta advertising.
3. Load the Pixel only after the visitor accepts advertising cookies.
4. Test that choosing Essential only prevents Meta scripts and requests.
5. Track a Lead only after a successful form redirect.
6. If Conversions API is added later, use the same event ID in browser and server events to prevent double counting.

No Pixel or Conversions API credential should be pasted into chat. Authentication and private account steps remain with Andrew.

### UTM convention

Use this pattern for every paid link:

`https://meonvalleyweb.com/free-site-audit?utm_source=meta&utm_medium=paid_social&utm_campaign=hampshire_audit_2026&utm_content={creative_name}`

Creative names:

- `portfolio_reel`
- `audit_static`
- `andrew_story`

### Ad 1: Real work reel

Format: 9:16 video, 15-20 seconds, plus 4:5 feed version.

Visual sequence:

1. Two Dogs and an Awning homepage.
2. Saints Disabled Supporters' Association homepage.
3. Wessex Whisky Club homepage.
4. Meon Valley Web free audit page.

On-screen script:

> Your website has seconds to earn trust.
>
> Clear message. Real proof. Fast on mobile.
>
> Built and supported in Hampshire.
>
> Request a free website audit.

Primary text:

> Is your website helping people choose your business, or making the decision harder? Meon Valley Web builds fast, accessible websites and provides direct local support across Hampshire. Request a free, practical review of your current site.

Headline: `What should your website fix first?`

Call to action: `Learn More`

### Ad 2: Audit offer

Format: 4:5 static image and 9:16 story version.

Visual: a real screenshot of the free audit page next to a short list containing Speed, Search visibility, Accessibility and Trust.

Primary text:

> A new website is not always the first answer. Send us your current URL and receive a short, prioritised improvement report covering speed, search visibility, accessibility and conversion clarity. Free for Hampshire businesses.

Headline: `Free website improvement report`

Call to action: `Learn More`

### Ad 3: Andrew's story

Format: direct-to-camera 9:16 video, 20-30 seconds.

Script:

> I am Andrew from Meon Valley Web. I have worked on websites since before 2007, from national travel and financial brands to Hampshire businesses and charities. If your current website feels dated, slow or unclear, send me the URL. I will tell you the most useful improvement to make first.

Primary text:

> Direct advice from the person who will review and build the work. No sales team, no generic automated score and no pressure to replace a site that can sensibly be improved.

Headline: `A clearer next step for your website`

Call to action: `Learn More`

## Four-week organic campaign

### Week 1: Establish the new position

- Monday: New homepage launch with a screen recording of the project montage.
- Wednesday: Short video, “The three jobs your homepage must complete.”
- Friday: Two Dogs and an Awning case study and client quote.

### Week 2: Demonstrate useful expertise

- Monday: Practical post on why a fast site feels more trustworthy.
- Wednesday: Saints Disabled Supporters' Association accessibility story.
- Friday: Free website audit invitation using the audit static creative.

### Week 3: Answer buying questions

- Monday: Hampshire website pricing guide.
- Wednesday: Short video explaining when WordPress or Astro is the better fit.
- Friday: Wessex Whisky Club membership and events case study.

### Week 4: Make the business personal

- Monday: Andrew's experience and the earlier national brands.
- Wednesday: Sophie’s Gift Ball and the charity website programme.
- Friday: Client quote followed by a final free audit invitation.

For each post, reply to genuine comments promptly and record useful questions that can become future articles or videos.

## Measurement

The primary metric is a qualified enquiry, not a cheap form completion.

A qualified lead should:

- Represent a real business or organisation.
- Have an existing website or a defined need for one.
- Be located within the service area or be suitable for remote delivery.
- Have a genuine problem Meon Valley Web can solve.

Record weekly:

- Spend.
- Landing page visits.
- Audit forms submitted.
- Qualified leads.
- Booked calls.
- Calls attended.
- Proposals sent.
- Work won.
- Revenue and expected gross profit.

Do not make daily creative changes. Review after seven days for technical problems, then make the first performance decision after 14 days. With a £168 budget, concentrating the data is more valuable than creating many ad sets.

## Release checklist

- Production build passes.
- Internal link verification passes.
- Homepage and Hampshire page checked at desktop and mobile widths.
- Reduced-motion mode checked.
- Accessibility and Lighthouse checks completed.
- Search Console baseline exported before deployment.
- Meta Pixel remains disabled until the consent copy and Pixel ID are ready.
- Paid campaign remains draft until the new site is live and the successful form journey is verified.
