# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static family website (darringer.com) with no build system. There is no npm, no bundler, no framework — just HTML, CSS, and vanilla JS (plus one committed jQuery 3.4.1 for the racegame). Editing a file and pushing to `main` is all it takes to deploy.

## Deployment

Pushing to `main` on GitHub automatically propagates changes to darringer.com. No build step, no CI pipeline.

## Architecture

The site is organized by person/section, each in its own subdirectory with its own `index.html` and `{name}-styles.css`:

- `/` — Main homepage (red background, logo, nav links)
- `/theo/` — Go-kart designs and DIY articles (largest content section)
- `/chris/` — Chris's section; contains `/chris/flashcards/` Polish language flashcard game
- `/sally/` — Sally's page (clean, phone-friendly design)
- `/racegame/` — jQuery-based retro racing game
- `/stockpicks/` — HTTP redirect to external Wix site
- `/carta/`, `/julia/`, `/nico/`, `/philip/`, `/frances/` — Other person pages (some are stubs)

## Conventions

**Styling:** Each section uses its own CSS file. Main site uses red background (`#c41e3a`) and Gill Sans font. Newer pages (Sally, flashcards) use responsive design with media queries; older pages (contact, games) use HTML 4.01 transitional doctype and lack responsiveness.

**JavaScript:** The flashcards app (`chris/flashcards/flashcards.js`) is the most modern JS in the repo — vanilla ES6, no dependencies. The racegame uses jQuery 3.4.1 (committed directly as `jquery-3.4.1.js`). `theo/code.js` is a small jQuery snippet for copy-to-clipboard.

**Polish accent normalization:** The flashcard game normalizes Polish diacritics for answer checking (ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź/ż→z) so players can type without special characters.

**Google AdSense:** Some pages integrate AdSense (client ID: `ca-pub-1485467950222751`). Check existing pages before adding/removing ad slots.

**Navigation:** All nav links are manual — there is no CMS or router.
