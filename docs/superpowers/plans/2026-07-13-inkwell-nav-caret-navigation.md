# Inkwell Nav Caret Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the sidebar nav caret (`.nav-list-expander`) navigate to the parent page it belongs to, instead of only toggling the children list, so visitors can't browse into Inkwell essays without ever landing on `/inkwell/`.

**Architecture:** Add a click listener to the existing `_includes/nav_footer_custom.html` (an official Just the Docs customization hook, rendered on every page inside the sidebar nav). On click of `.nav-list-expander`, it finds the sibling `a.nav-list-link` within the same `.nav-list-item` and sets `window.location.href` to that link's `href`. No Liquid templates are forked.

**Tech Stack:** Jekyll 4.3.4, Just the Docs theme 0.10.x, vanilla JS (no build step, no JS test framework in this repo — verification is manual, via `bundle exec jekyll serve`).

## Global Constraints

- No Liquid template overrides — the fix lives entirely in `_includes/nav_footer_custom.html`, which this repo already owns and customizes (per `docs/superpowers/specs/2026-07-13-inkwell-nav-caret-navigation-design.md`).
- Site-wide by CSS class (`.nav-list-expander` / `.nav-list-link`), not scoped to Inkwell specifically — must work for any current or future `has_children: true` nav item.
- Inline `<script>` blocks in this repo's `_includes` must not lead a line with `//` — the served HTML is minified and a leading `//` comments out the rest of the minified line. Use `/* */` if a comment is unavoidable (prefer no comment).
- Must not remove or alter the theme's own expand/collapse toggle behavior — navigation is an additional side effect, not a replacement.
- No PR — this repo is a personal Jekyll/GitHub Pages site with no PR-review workflow; commits land directly on `main` (existing repo convention, see recent commit history).

---

### Task 1: Add caret-navigates-to-page behavior

**Files:**
- Modify: `_includes/nav_footer_custom.html` (append a new `<script>` block after the existing theme-toggle script, before the closing `</footer>` tag)

**Interfaces:**
- Consumes: DOM structure rendered by the theme's `_includes/components/nav/links.html` (gem-vendored, not modified) — specifically `button.nav-list-expander` and its sibling `a.nav-list-link`, both direct children of the same `li.nav-list-item`.
- Produces: no new interfaces; this is a leaf behavior change with no other consumers.

- [ ] **Step 1: Add the click listener**

Open `_includes/nav_footer_custom.html`. Immediately before the closing `</footer>` tag (i.e., after the existing `<script>...</script>` block for `#theme-toggle`), add:

```html
  <script>
    (function () {
      document.addEventListener('click', function (e) {
        var expander = e.target.closest && e.target.closest('.nav-list-expander');
        if (!expander) return;
        var item = expander.parentElement;
        if (!item) return;
        var link = item.querySelector(':scope > a.nav-list-link');
        if (link && link.href) {
          window.location.href = link.href;
        }
      });
    })();
  </script>
```

The full end of the file should read:

```html
  <script>
    (function () {
      var btn = document.getElementById('theme-toggle');
      if (!btn) return;
      var current = window.__initialTheme === 'dark' ? 'dark' : 'light';
      btn.setAttribute('data-theme', current);
      btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.addEventListener('click', function () {
        current = current === 'dark' ? 'light' : 'dark';
        if (typeof jtd !== 'undefined' && jtd.setTheme) {
          jtd.setTheme(current);
        }
        try { localStorage.setItem('theme', current); } catch (e) {}
        btn.setAttribute('data-theme', current);
        btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });
    })();
  </script>

  <script>
    (function () {
      document.addEventListener('click', function (e) {
        var expander = e.target.closest && e.target.closest('.nav-list-expander');
        if (!expander) return;
        var item = expander.parentElement;
        if (!item) return;
        var link = item.querySelector(':scope > a.nav-list-link');
        if (link && link.href) {
          window.location.href = link.href;
        }
      });
    })();
  </script>
</footer>
```

- [ ] **Step 2: Build the site and confirm it compiles clean**

Run: `bundle exec jekyll build`
Expected: exits 0, no Liquid or HTML errors. Confirm `_site/inkwell/index.html` exists and contains the new `<script>` block:

```bash
grep -c "nav-list-expander" _site/inkwell/index.html
```
Expected: at least `1` (the theme's own button markup) — this just confirms the page built, not that the script logic is present (it's identical on every page via the shared footer include, so checking any built page's `<script>` tag count is equivalent). Confirm the new script text landed by:

```bash
grep -c "e.target.closest" _site/inkwell/index.html
```
Expected: `1`

- [ ] **Step 3: Manual browser verification**

Run: `bundle exec jekyll serve`
Open `http://localhost:4000/` in a browser.

Manual test script:
1. Locate "The Inkwell" in the left sidebar nav (it has a caret since `has_children: true`).
2. Click directly on the caret icon (not the "The Inkwell" text label).
3. Expected: the browser navigates to `http://localhost:4000/inkwell/` — the Inkwell landing page loads, not a same-page expand/collapse with the URL unchanged.
4. Click the browser back button, then click the "The Inkwell" text label itself.
5. Expected: same result — navigates to `/inkwell/`. (Regression check: label-click behavior is unchanged.)
6. From `/inkwell/`, confirm the sidebar still shows the two Inkwell essay child links nested under "The Inkwell" (auto-expanded because you're on that page) — confirms the theme's own ancestor-expand behavior (`activateNav()`) still works.

Stop the server (`Ctrl-C`) once verified.

- [ ] **Step 4: Commit**

```bash
git add _includes/nav_footer_custom.html
git commit -m "Make sidebar nav caret navigate instead of only expanding"
```
