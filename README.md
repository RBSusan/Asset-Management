# Asset Management

[![Deploy to GitHub Pages](https://github.com/RBSusan/Asset-Management/actions/workflows/deploy.yml/badge.svg)](https://github.com/RBSusan/Asset-Management/actions/workflows/deploy.yml)

**Live site: https://rbsusan.github.io/Asset-Management/**

![Site screenshot](screenshot.png)

A responsive one-page marketing website for an asset management firm. Built with vanilla HTML, CSS, and JavaScript - no frameworks or dependencies.

## Features

- Sticky navigation with smooth scrolling
- Hero section with animated counters (AUM, clients, years)
- USP cards with hover effects
- Testimonials carousel with auto-advance and manual controls
- Contact form with client-side validation and async submission via [FormSubmit](https://formsubmit.co)
- Scroll-triggered fade-in animations
- Fully responsive - mobile, tablet, and desktop

## Project Structure

```
index.html       # Page structure and content
styles.css       # Mobile-first stylesheet with CSS variables
script.js        # Vanilla JS - nav, counters, carousel, form
.github/workflows/deploy.yml   # GitHub Actions - deploys to GitHub Pages on push to main
```

## Running Locally

No build step required. Open `index.html` directly in a browser:

```powershell
Invoke-Item "index.html"
```

Changes to any file are visible immediately on browser refresh.

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

## Contact Form Setup

Before going live, replace `your-email@example.com` in the `<form action>` attribute (`index.html` line 304) with the real destination address. FormSubmit will send an activation email on the first submission - that link must be clicked before enquiries are delivered.
