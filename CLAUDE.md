# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

No build step. Open `index.html` directly in a browser:

```powershell
Invoke-Item "index.html"
```

There is no dev server, bundler, or package manager — changes to any file are visible immediately on browser refresh.

## Architecture

Three files, no dependencies beyond Google Fonts (loaded via CDN):

- **[index.html](index.html)** — single-page structure with six landmark sections: `#home` (hero), `#why-us` (USP cards), `#testimonials` (carousel), `#contact` (form), plus sticky `<header>` and `<footer>`. All section IDs are anchor targets for nav links.
- **[styles.css](styles.css)** — mobile-first, single stylesheet. Design tokens live in `:root` CSS variables at the top of the file. Breakpoints: `768px` (tablet) and `1024px` (desktop). The `.fade-in` / `.visible` class pair drives all scroll animations — JS adds `.visible` via `IntersectionObserver`.
- **[script.js](script.js)** — six `init*` functions called on `DOMContentLoaded`: `initNav`, `initSmoothScroll`, `initCounters`, `initCarousel`, `initAnimations`, `initForm`. Each is self-contained with no shared state between them.

### Key conventions

- **CSS variables first** — colours, fonts, shadows, and spacing all reference `--var` tokens; never hardcode raw values.
- **Scroll offset** — smooth-scroll in `initSmoothScroll()` reads `#navbar.offsetHeight` at click time to compensate for the sticky bar. Any nav height changes must remain in CSS only (`--nav-h: 72px`); JS reads the live DOM value.
- **Counter data attributes** — hero stat counters use `data-target`, `data-prefix`, and `data-suffix` on `.counter` elements. The animation runs once per element via `IntersectionObserver` with `unobserve` after trigger.
- **Carousel state** — `initCarousel` manages a single `current` index integer and a `setInterval` timer. Pauses on `mouseenter`/`focusin`, resumes on `mouseleave`/`focusout`. Timer is reset by any manual navigation.
- **Form submission** — uses `fetch` with `Accept: application/json` to POST to FormSubmit.co without a page reload. The `_next` hidden input is only used as a fallback when JS is disabled.

## FormSubmit activation (before going live)

Replace `your-email@example.com` in the `<form action>` attribute ([index.html:304](index.html#L304)) with the real destination address. FormSubmit sends an activation email on the first submission — that link must be clicked before any enquiries are delivered.
