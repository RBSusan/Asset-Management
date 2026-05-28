# Red Beacon Asset Management

[![Deploy to GitHub Pages](https://github.com/RBSusan/Asset-Management/actions/workflows/deploy.yml/badge.svg)](https://github.com/RBSusan/Asset-Management/actions/workflows/deploy.yml)

**Live site: https://rbsusan.github.io/Asset-Management/**

![Site screenshot](screenshot.png)

A responsive one-page marketing website for Red Beacon Asset Management — an institutional ESG investment firm specialising in sustainability assets, green bonds, and renewable infrastructure. Built with vanilla HTML, CSS, and JavaScript; no frameworks or build step required.

## Features

- Sticky navigation with deep-forest green design system and leaf logo mark
- Hero section with animated counters (green assets deployed, ESG-rated portfolio %, years of impact investing)
- Four ESG-focused USP cards with sustainability icons (leaf, trending-up, shield-check, globe)
- Testimonials carousel on a natural-linen background with auto-advance and manual controls
- Contact / enquiry form with client-side validation and async submission via [FormSubmit](https://formsubmit.co)
- Dark / light theme toggle — persists to `localStorage`, respects `prefers-color-scheme` on first visit
- Scroll-triggered fade-in animations via IntersectionObserver
- Fully responsive — mobile, tablet, and desktop
- WCAG-accessible: focus rings, ARIA labels, reduced-motion support

## Design System

The stylesheet uses a full sustainability token set in `:root` — deep forest greens (`--primary`, `--primary-dark`, `--primary-mid`), spring-leaf accent (`--accent: #6ab04c`), earth/stone neutrals, and natural-linen surfaces. All colours, spacing, shadows, and motion are referenced via CSS variables; no raw values are hardcoded outside `:root`.

## Project Structure

```
index.html       # Page structure and ESG-focused content
styles.css       # Mobile-first stylesheet with sustainability design tokens
script.js        # Vanilla JS — nav, counters, carousel, form, animations
.github/workflows/deploy.yml   # GitHub Actions — deploys to GitHub Pages on push to main
```

## Running Locally

No build step required. Open `index.html` directly in a browser:

```powershell
Invoke-Item "index.html"
```

Changes to any file are visible immediately on browser refresh.

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.
