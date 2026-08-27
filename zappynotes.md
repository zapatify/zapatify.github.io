---
title: ZappyNotes
layout: default
nav_order: 12
---

# ZappyNotes
{: .no_toc }

Open-source, self-hosted note-taking built on Rails 8.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

ZappyNotes is a self-hosted note-taking app I built when my Evernote subscription jumped in price. It's a clean Rails 8 codebase with a WYSIWYG markdown editor, notebook organization, auto-save, image uploads, and a tiered subscription scaffold wired up to Stripe.

I've since put the project on hiatus and released it as **open source under the MIT license**. There's no hosted version to sign up for. Anyone who wants the features can fork the repo and run their own.

**GitHub:** [github.com/zapatify/zappynotes](https://github.com/zapatify/zappynotes)

## Why It's Open Source Now

I built ZappyNotes for myself, and once I shipped Marksmith and shifted focus to other projects, keeping a SaaS note-taking app online stopped making sense. Rather than let it rot on a Heroku dyno, I open-sourced the whole thing: Stripe billing, subscription tiers, admin panel, and all. It's a working starting point for anyone who wants to host their own notes app or learn how a tiered Rails SaaS is wired together end to end.

## What's in the Box

- **WYSIWYG Markdown Editor** via Toast UI — real-time formatting with paste-or-upload image support
- **Auto-Save** — notes save on blur and on a 60-second timer
- **Notebook Organization** — color-coded notebooks for grouping notes
- **Tiered Subscriptions** — Free / Plus / Pro plans with notebook, note, and storage limits enforced server-side; Stripe billing already wired up
- **Email Confirmation** — verify email addresses on signup to prevent abuse
- **Rate Limiting** — Rack::Attack rules for DDoS protection
- **Admin Panel** — Motor Admin for full database management
- **Responsive Design** — works on desktop and mobile

## Tech Stack

- **Framework:** Ruby on Rails 8.1.1
- **Ruby:** 3.3.8
- **Database:** PostgreSQL 18
- **CSS:** Tailwind CSS v4
- **JavaScript:** Importmap, Stimulus, Turbo
- **Editor:** Toast UI Editor
- **UI Components:** Flowbite
- **Payments:** Stripe
- **Testing:** RSpec, FactoryBot
- **Security:** Rack::Attack
- **License:** MIT

## Use It as a Starting Point

The codebase is structured so you can fork it and either run it as-is or strip out the parts you don't need. A few common starting points:

- **Want a personal notes app?** Disable Stripe, set everyone to the Pro plan, and you have a free self-hosted Evernote alternative
- **Want a SaaS template?** The subscription tiers, billing flow, usage tracking, and admin panel are all wired up. Swap out the "notes" domain for whatever you're building
- **Want a Rails 8 reference project?** It's a small but complete app that exercises Importmap, Turbo, Stimulus, ActionMailer, ActiveStorage, Stripe webhooks, and Rack::Attack

## Development Highlights

This project demonstrates:

1. **Full SaaS scaffolding in Rails 8** — subscriptions, billing, admin, rate limiting, email confirmation
2. **Per-tier resource enforcement** — server-side limits on notebooks, notes per notebook, and storage
3. **Stripe integration** — checkout, webhooks, plan changes, cancellation
4. **Toast UI Editor integration** — markdown editor with image paste and auto-save
5. **Open-source release discipline** — MIT license, contribution guidelines, and a codebase clean enough to hand off
