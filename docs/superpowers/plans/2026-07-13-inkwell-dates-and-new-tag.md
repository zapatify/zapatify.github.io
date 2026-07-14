# Inkwell Dates and New Tag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish "No Points for Points" as a new Inkwell essay, make the Inkwell landing page list essays newest-first with a visible published date, and show a self-expiring "New" badge on essays published in the last 14 days.

**Architecture:** One new content page (`inkwell/no-points-for-points.md`) plus a `date` frontmatter field backfilled onto the two existing essays. `inkwell.md`'s existing Liquid card-list loop changes its sort key from `nav_order` to `date` (descending), gains a date line and a hidden `New` badge per card, and a small inline script (client-side, evaluated at page-load using the visitor's browser clock) un-hides the badge for any essay dated within the last 14 days.

**Tech Stack:** Jekyll 4.3.4, Just the Docs theme 0.10.x, Liquid templating, vanilla JS (no build step, no JS test framework in this repo — verification is manual, via `bundle exec jekyll serve`).

## Global Constraints

- Per `docs/superpowers/specs/2026-07-13-inkwell-dates-and-new-tag-design.md`: the "New" badge freshness check must run client-side (in the visitor's browser via `Date.now()`/`new Date()`), not purely at Jekyll build time — GitHub Pages only rebuilds on push, so a build-time-only check could leave a stale badge visible past 14 days.
- `nav_order` stays on all three essay files unchanged — it still drives the theme's own left-sidebar ordering (out of scope for this change). Only the on-page card list in `inkwell.md` switches to date-based sorting.
- New essay frontmatter shape must match the two existing essays exactly (`title`, `layout: default`, `parent: The Inkwell`, `nav_order`, `date`, `summary`, `description`, `permalink`).
- No PR — this repo is a personal Jekyll/GitHub Pages site with no PR-review workflow; commits land directly on `main` (existing repo convention).
- Accent color for the "New" badge must reuse the theme's existing link/accent purple, `#7253ed` (Just the Docs `$purple-000`, confirmed at `_sass/support/_variables.scss:40` in the installed `just-the-docs-0.10.1` gem) — not a new color introduced for this one element.

---

### Task 1: Publish the new essay

**Files:**
- Create: `inkwell/no-points-for-points.md`

**Interfaces:**
- Consumes: nothing.
- Produces: a page with `parent: The Inkwell` and a `date` field — Task 3's Liquid loop (`site.html_pages | where: "parent", page.title`) picks it up automatically, no code reference needed between tasks.

- [ ] **Step 1: Create the file**

Create `inkwell/no-points-for-points.md` with this frontmatter followed by the full body of `~/Desktop/no-points-for-points.md` unchanged (the source file already opens with `# No Points for Points` as its first line, matching the existing essays' pattern of repeating the title as an H1):

```yaml
---
title: "No Points for Points"
layout: default
parent: The Inkwell
nav_order: 3
date: 2026-07-13
summary: "There are no points for points."
description: "How to actually gauge an engineer's performance: delivery, craft, and impact, not story points, t-shirt sizes, or hours logged, and why DORA metrics measure a system, not a person."
permalink: /inkwell/no-points-for-points/
---
```

Then append the entire body of `~/Desktop/no-points-for-points.md` (all content from `# No Points for Points` through the end of the Sources/footnotes section) below the frontmatter, verbatim.

- [ ] **Step 2: Build and confirm the page renders**

Run: `bundle exec jekyll build`
Expected: exits 0, no Liquid/HTML errors. Confirm the page built:

```bash
test -f _site/inkwell/no-points-for-points/index.html && echo OK
```
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add inkwell/no-points-for-points.md
git commit -m "Add Inkwell essay: No Points for Points"
```

---

### Task 2: Backfill publish dates on the existing essays

**Files:**
- Modify: `inkwell/have-desk-will-commute.md:1-9` (frontmatter block)
- Modify: `inkwell/heres-what-im-thinking.md:1-9` (frontmatter block)

**Interfaces:**
- Consumes: nothing.
- Produces: a `date` field on both pages, consumed by Task 3's sort and date-display Liquid.

- [ ] **Step 1: Add `date` to `have-desk-will-commute.md`**

Current frontmatter:

```yaml
---
title: Have Desk, Will Commute
layout: default
parent: The Inkwell
nav_order: 1
summary: I want my commute back.
description: "A case for returning to the office. What the return-to-office debate misses: mentorship, workplace friendship, and the hidden costs of remote work for young engineers."
permalink: /inkwell/have-desk-will-commute/
---
```

Change to (add `date: 2026-06-17` after `nav_order: 1`, matching the commit that added this file — `git log --follow --diff-filter=A -- inkwell/have-desk-will-commute.md`):

```yaml
---
title: Have Desk, Will Commute
layout: default
parent: The Inkwell
nav_order: 1
date: 2026-06-17
summary: I want my commute back.
description: "A case for returning to the office. What the return-to-office debate misses: mentorship, workplace friendship, and the hidden costs of remote work for young engineers."
permalink: /inkwell/have-desk-will-commute/
---
```

- [ ] **Step 2: Add `date` to `heres-what-im-thinking.md`**

Current frontmatter:

```yaml
---
title: "Here's What I'm Thinking..."
layout: default
parent: The Inkwell
nav_order: 2
summary: The special sauce between product and engineering.
description: "What makes the product and engineering relationship work: shared authorship of decisions while they are still soft, why involving engineers early prevents scope explosions, and the cost of throwing requirements over the fence."
permalink: /inkwell/heres-what-im-thinking/
---
```

Change to (add `date: 2026-06-19` after `nav_order: 2`, matching `git log --follow --diff-filter=A -- inkwell/heres-what-im-thinking.md`):

```yaml
---
title: "Here's What I'm Thinking..."
layout: default
parent: The Inkwell
nav_order: 2
date: 2026-06-19
summary: The special sauce between product and engineering.
description: "What makes the product and engineering relationship work: shared authorship of decisions while they are still soft, why involving engineers early prevents scope explosions, and the cost of throwing requirements over the fence."
permalink: /inkwell/heres-what-im-thinking/
---
```

- [ ] **Step 3: Build and confirm both dates are present**

Run: `bundle exec jekyll build`
Expected: exits 0.

```bash
grep -c "^date: 2026-06-17" inkwell/have-desk-will-commute.md
grep -c "^date: 2026-06-19" inkwell/heres-what-im-thinking.md
```
Expected: `1` for each.

- [ ] **Step 4: Commit**

```bash
git add inkwell/have-desk-will-commute.md inkwell/heres-what-im-thinking.md
git commit -m "Backfill publish dates on existing Inkwell essays"
```

---

### Task 3: Sort by date, show published date, add self-expiring New badge

**Files:**
- Modify: `inkwell.md:17-61` (style block and card-list loop)

**Interfaces:**
- Consumes: `article.date` on every page returned by `site.html_pages | where: "parent", page.title` — produced by Task 1 (new essay) and Task 2 (backfilled dates on existing essays). All three pages now have this field, so no nil-date handling is required for the sort itself; the date-display line still guards with `{% if article.date %}` for defensiveness against a future fourth essay published without one.
- Produces: nothing consumed by later tasks — this is the last task.

- [ ] **Step 1: Add badge and date CSS to the existing `<style>` block**

In `inkwell.md`, inside the existing `<style>` block (currently lines 17-46), add these two rules immediately before the closing `</style>` tag (after the existing `.inkwell-dek` rule):

```css
  .inkwell-badge-new {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #fff;
    background: #7253ed;
    vertical-align: middle;
  }
  .inkwell-date {
    display: block;
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 0.25rem;
  }
```

- [ ] **Step 2: Replace the card-list loop**

Current block (lines 48-61):

```html
<ul class="inkwell-list">
{% assign inkwell_articles = site.html_pages | where: "parent", page.title | sort: "nav_order" %}
{% for article in inkwell_articles %}
  <li>
    <a class="inkwell-card" href="{{ article.url | relative_url }}">
      <span class="inkwell-bar" aria-hidden="true"></span>
      <span class="inkwell-body">
        <span class="inkwell-title">{{ article.title }}</span>
        {% if article.summary %}<span class="inkwell-dek">{{ article.summary }}</span>{% endif %}
      </span>
    </a>
  </li>
{% endfor %}
</ul>
```

Replace with:

```html
<ul class="inkwell-list">
{% assign inkwell_articles = site.html_pages | where: "parent", page.title | sort: "date" | reverse %}
{% for article in inkwell_articles %}
  <li>
    <a class="inkwell-card" href="{{ article.url | relative_url }}">
      <span class="inkwell-bar" aria-hidden="true"></span>
      <span class="inkwell-body">
        <span class="inkwell-title">
          {{ article.title }}
          <span class="inkwell-badge-new" data-published="{{ article.date | date: '%Y-%m-%d' }}" hidden>New</span>
        </span>
        {% if article.summary %}<span class="inkwell-dek">{{ article.summary }}</span>{% endif %}
        {% if article.date %}<span class="inkwell-date">Published {{ article.date | date: "%B %-d, %Y" }}</span>{% endif %}
      </span>
    </a>
  </li>
{% endfor %}
</ul>

<script>
  (function () {
    var TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
    var now = new Date();
    var badges = document.querySelectorAll('.inkwell-badge-new[data-published]');
    for (var i = 0; i < badges.length; i++) {
      var badge = badges[i];
      var published = new Date(badge.getAttribute('data-published') + 'T00:00:00');
      if (!isNaN(published.getTime()) && (now - published) <= TWO_WEEKS_MS) {
        badge.hidden = false;
      }
    }
  })();
</script>
```

- [ ] **Step 3: Build and confirm the new markup and script landed**

Run: `bundle exec jekyll build`
Expected: exits 0.

```bash
grep -c "inkwell-badge-new" _site/inkwell/index.html
grep -c "inkwell-date" _site/inkwell/index.html
grep -c "TWO_WEEKS_MS" _site/inkwell/index.html
```
Expected: each `>= 1`.

- [ ] **Step 4: Manual browser verification**

Run: `bundle exec jekyll serve`
Open `http://localhost:4000/inkwell/`.

Manual test script:
1. Confirm card order top-to-bottom: "No Points for Points", "Here's What I'm Thinking...", "Have Desk, Will Commute" (newest to oldest).
2. Confirm each card shows a "Published <Month D, YYYY>" line under its dek, with the correct date per essay (July 13, 2026 / June 19, 2026 / June 17, 2026).
3. Confirm "No Points for Points" shows a "New" badge next to its title; confirm the other two do **not**.
4. Click into "No Points for Points" and confirm the essay renders correctly end-to-end (frontmatter didn't break the body).

Stop the server (`Ctrl-C`) once verified.

- [ ] **Step 5: Commit**

```bash
git add inkwell.md
git commit -m "Sort Inkwell by date, show published date, add New badge"
```

---

### Task 4: Push

**Files:** none (git operation only).

**Interfaces:** none.

- [ ] **Step 1: Confirm all three commits are present and working tree is clean**

```bash
git status --short
git log --oneline -4
```
Expected: working tree clean; the three commits from Tasks 1-3 appear at the top of the log.

- [ ] **Step 2: Push (only after explicit go-ahead — this deploys the live site)**

```bash
git push origin main
```
