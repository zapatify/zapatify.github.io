# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Rich Zapata, built with Jekyll and the [Just the Docs](https://just-the-docs.github.io/just-the-docs/) theme. Deployed to GitHub Pages at https://zapatify.github.io via GitHub Actions (push to `main` triggers deploy).

## Commands

```bash
bundle install              # Install dependencies
bundle exec jekyll serve    # Local dev server at http://localhost:4000
bundle exec jekyll build    # Build site to _site/
```

## Architecture

- **Theme:** `just-the-docs` gem v0.10.0 (gem-based, not vendored)
- **Jekyll:** 4.3.4
- **Pages:** Top-level `.md` files with YAML frontmatter become site pages. Navigation order is controlled by `nav_order` in frontmatter.
- **Customizations:** `_includes/head_custom.html` injects Plausible Analytics. No custom layouts or other overrides.
- **Analytics:** Plausible (not Google Analytics)
- **CI:** Two GitHub Actions workflows — `pages.yml` (build + deploy to GitHub Pages) and `ci.yml` (build-only, runs on PRs)

## Adding a New Page

Create a `.md` file at the project root with frontmatter:

```yaml
---
title: Page Title
layout: default
nav_order: 7
---
```

Use `nav_order` to control navigation position. Existing pages use orders 1-6.

## Conventions

- `.gitignore` must include `.DS_Store`
- The `_site/` directory is gitignored — never commit built output
- Content pages use Just the Docs markup classes (e.g., `{: .no_toc }`, `{: .fs-6 .fw-300 }`)
- Some pages embed external scripts (Buzzsprout podcast player) — preserve these when editing
