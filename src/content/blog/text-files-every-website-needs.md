---
title: "The Text Files Every Website Needs in 2026 (robots.txt, ads.txt, llms.txt & More)"
description: "A plain-English guide to the small text files sitting at the root of your website — what they do, which ones you actually need, and why AI crawlers have added a new one to the list."
date: 2026-08-15
author: "Meon Valley Web"
category: "Hosting"
featured: true
image: "/site-health-bar.webp"
imageAlt: "Website health and configuration checklist"
tags: ["seo", "hosting", "security", "ai"]
---

Most business owners never think about the handful of small text files that live at the root of their website — yoursite.com/robots.txt and its relatives. They're not glamorous, nobody sees them on the page, and it's easy to assume your web host or CMS just "sorts that out." Often it doesn't.

These files matter because they're the first thing search engines, ad networks, AI crawlers and security researchers check before they do anything else with your site. Getting them right — or even just having them — is a quiet but real part of how trustworthy and well-configured your site looks to the systems deciding whether to rank it, trust it, or crawl it at all.

Here's what's worth knowing about each one.

## robots.txt — the one everyone's heard of

`robots.txt` tells search engines and other automated crawlers which parts of your site they're allowed to visit. Every serious website should have one, sitting at the root — `yoursite.com/robots.txt`.

A basic, sensible robots.txt does three things: allows crawling of your public pages, blocks anything you don't want indexed (admin areas, staging environments, thank-you pages), and points crawlers to your sitemap so they can find everything efficiently. Get this wrong and you can accidentally block Google from your entire site — it happens more often than you'd think, usually after a site migration.

## llms.txt — the new one

This is the file most business owners haven't heard of yet, because it's genuinely new. As AI tools like ChatGPT, Claude and Perplexity increasingly answer questions by reading websites directly rather than just linking to them, `llms.txt` has emerged as a way to guide that process — a plain-language summary of what your site is, what its most important pages are, and how an AI system should understand it.

It's not yet a universal standard the way robots.txt is, and not every AI crawler reads it. But adoption is growing quickly, and for businesses that want to show up well when someone asks an AI assistant "who does web design in Hampshire," having one costs very little and can only help.

Related to this: robots.txt now also supports an emerging **Content-Signal** directive, which lets you separately control whether AI systems can train on your content, use it as input for live answers, or just index it for regular search — three different permissions that used to be lumped together as one crawl/no-crawl decision.

## security.txt — for anyone who finds a problem

`security.txt` (found at `/.well-known/security.txt`) gives security researchers a clear, official way to report a vulnerability they've found on your site, rather than guessing at an email address or giving up. For a small business site this might feel unnecessary, but it costs nothing to add and means a well-intentioned researcher has a proper channel instead of no channel at all.

## ads.txt — only if you run display advertising

`ads.txt` (Authorized Digital Sellers) is specific to sites that sell advertising space — it lists which ad networks are allowed to sell inventory on your behalf, and exists to stop fraudsters spoofing your domain to sell fake ad space elsewhere. If you don't run display ads through a network like Google AdSense, you don't need this one. If you do, missing it can mean real lost ad revenue, since major ad exchanges increasingly won't bid on unlisted inventory.

## sitemap.xml — not a text file, but part of the same family

Technically XML rather than plain text, but it belongs in the same conversation: your sitemap lists every page you want indexed, with metadata about when each was last updated. Most modern site builders (including the Astro setup we build on) generate this automatically, but it's worth confirming yours actually exists and is current.

## Why this matters more than it looks like it should

None of these files affect how your site looks to a visitor. What they affect is how your site is understood by everything that isn't a visitor — search engines deciding what to index, AI tools deciding what to summarise, ad networks deciding what to trust, and security researchers deciding whether you're worth reporting a problem to responsibly. Collectively, they're part of the quiet technical hygiene that separates a well-maintained site from one nobody's looked after since launch.

We check and maintain these files as standard on every site we build and host — robots.txt with a proper Content-Signal policy, an llms.txt where it's useful, and a security.txt on every project, ads.txt added if you run display advertising. If you're not sure what your current site has, it's a five-minute check.

If your hosting setup hasn't been looked at in a while, our [WordPress hosting plans](/hosting) include this kind of technical maintenance as standard, or get in touch for a quick site review.
