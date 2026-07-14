# Design: Publish "No Points for Points", sort Inkwell by date, add a "New" tag

Date: 2026-07-13

## Problem

Three asks, bundled because the last two depend on the first:

1. Publish a new essay, "No Points for Points" (source: `~/Desktop/no-points-for-points.md`), into the Inkwell section.
2. The Inkwell landing page (`inkwell.md`) currently lists essays by `nav_order` and shows no publish date. It should default to newest-first and show each essay's published date.
3. Essays published less than 2 weeks ago should carry a visible "New" tag.

(2) and (3) require a `date` on every essay, but neither existing essay (`have-desk-will-commute.md`, `heres-what-im-thinking.md`) currently has one.

## Fix

### Article placement

New file: `inkwell/no-points-for-points.md`. Frontmatter matches the existing two essays' shape:

```yaml
title: "No Points for Points"
layout: default
parent: The Inkwell
nav_order: 3
date: 2026-07-13
summary: "There are no points for points."
description: "<one/two sentence SEO description>"
permalink: /inkwell/no-points-for-points/
```

Body is the source markdown as-is, with the leading `# No Points for Points` H1 kept (matches the existing two essays' pattern of repeating the title as an H1).

### Backfill `date` on existing essays

Neither existing essay has a `date` field. Backfill from the commit that actually added each file (confirmed via `git log --follow --diff-filter=A`):

- `have-desk-will-commute.md` → `date: 2026-06-17`
- `heres-what-im-thinking.md` → `date: 2026-06-19`

### Landing page: sort, date display, "New" badge

In `inkwell.md`:

- Change the Liquid query from `sort: "nav_order"` to sort by `date` descending (Liquid's `sort` is ascending-only, so `| sort: "date" | reverse`).
- Add a small muted line under each card's dek: `Published {{ article.date | date: "%B %-d, %Y" }}`.
- Add a badge element next to each title, hidden by default, carrying the raw date: `<span class="inkwell-badge-new" data-published="{{ article.date | date: '%Y-%m-%d' }}" hidden>New</span>`.
- Add an inline `<script>` at the bottom of `inkwell.md` that, on page load, finds every `[data-published]` element and un-hides it if the parsed date is within the last 14 days of `new Date()` (the visitor's browser clock, evaluated at page-load time).

Client-side (not build-time Liquid) is the deliberate choice here: GitHub Pages only rebuilds this site on push, so a build-time-only badge could stay visible past 14 days if the next push comes later than that. Computing the age in the browser means the badge is always correct regardless of deploy cadence.

## Out of scope

- The theme's left-sidebar nav order (controlled by `nav_order`, theme-managed) is unchanged — this only affects the on-page card list in `inkwell.md`. `nav_order` stays present on all three essays for the sidebar's own ordering.
- No change to the stale "© 2025" footer copyright — noted separately, not part of this ask.
- No `_posts`/`_drafts` restructuring — these stay plain pages, consistent with the existing two essays.

## Testing

`bundle exec jekyll build`, then `bundle exec jekyll serve` and visually confirm on `/inkwell/`:
- Cards list newest-first ("No Points for Points" on top, then "Here's What I'm Thinking...", then "Have Desk, Will Commute").
- Each card shows its published date.
- Only "No Points for Points" (published today) shows the "New" badge; the other two (26+ and 24+ days old) do not.
