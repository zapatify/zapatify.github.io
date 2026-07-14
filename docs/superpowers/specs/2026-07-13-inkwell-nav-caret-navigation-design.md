# Design: Make the sidebar nav caret navigate, not just expand

Date: 2026-07-13

## Problem

The Inkwell nav item (`inkwell.md`, `has_children: true`) renders two separate
click targets in the Just the Docs sidebar: the label (`a.nav-list-link`,
navigates to the page) and a caret button (`button.nav-list-expander`, only
toggles the children list open/closed via the theme's own JS, which calls
`preventDefault()` on every caret click). A visitor can browse straight into
an Inkwell essay via the caret without ever landing on `/inkwell/`.

## Fix

Add a click listener to `_includes/nav_footer_custom.html` (an existing,
official Just the Docs customization hook, already used in this repo for the
social-icon row and theme toggle). On any click that lands on
`.nav-list-expander`, it looks up the sibling `a.nav-list-link` within the
same `.nav-list-item` and navigates to its `href`.

- No Liquid templates are forked or overridden — avoids drift on future
  theme upgrades.
- Applies site-wide, to any current or future `has_children: true` nav item,
  by CSS class rather than by page.
- The theme's own expand/collapse toggle still fires; navigation is an
  additional side effect, not a replacement of the toggle.

## Out of scope

- No change to the theme's default expand/collapse visuals or animation.
- No change to nav behavior for leaf pages (items without children).

## Testing

`bundle exec jekyll serve` locally; click the Inkwell caret and confirm it
navigates to `/inkwell/` (matches clicking the label).
