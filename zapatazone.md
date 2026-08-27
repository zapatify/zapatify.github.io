---
title: ZapataZone
layout: default
nav_order: 7
---

# ZapataZone
{: .no_toc }

A Private Photo Archive, Twenty Years in the Making
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

ZapataZone is a photo archive sharing a decade-spanning collection of photographs, taken around Atlanta since 2005, with family and friends. Tens of thousands of images, browsable by year, with comments, likes, tags, and per-photo sharing. Browsing is open; participating is not. Accounts are invitation-only, because storage and bandwidth for a collection this size cost real money, and the conversation around these pictures belongs to the people in them.

**Live at:** [zapatazone.net](https://zapatazone.net)

## The Story

This project is older than most of my resume. I started building ZapataZone around 2005, back when putting your photos online meant writing everything yourself, and I did: the uploads, the galleries, the accounts, all of it from scratch. Then life moved, the site went quiet, and the project sat abandoned while the photo collection it was built for kept growing.

In 2026 it came back, for the original reason: I wanted all of these photographs online, where my friends and family could actually see themselves 20 years ago. But this time I rebuilt it as the most architecturally complete thing I have shipped solo, on the same governed, spec-driven AI workflow I use for client work. The 2026 rebuild went from first commit to inviting my first beta testers in about three weeks, and it has kept growing ever since.

## Architecture

ZapataZone is a two-part application, deliberately decoupled:

- **API:** Rails 8.1 in API mode (Ruby 3.3.8) with PostgreSQL. Handles authentication, authorization, photo metadata, and all business logic.
- **SPA:** React 19 with TypeScript, built on Vite, styled with Tailwind CSS 4. Talks to the API over JSON.
- **Photos:** Stored on Cloudflare R2 object storage and served through a CDN on a dedicated photos domain, so image traffic never touches the application servers.

## Technology

**Backend**

- Rails 8.1 (API mode), PostgreSQL
- bcrypt with database-backed sessions for auth; Action Policy for authorization
- Solid Queue for background jobs
- libvips for image processing; EXIF extraction via ExifTool
- MaxMind GeoLite2 for geo lookup; Resend for email
- Deployed with Kamal (Docker) to a DigitalOcean droplet, zero-downtime container swaps behind kamal-proxy with Let's Encrypt

**Frontend**

- React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7
- TanStack Query for server state, TanStack Virtual for virtualized photo grids that stay smooth at tens of thousands of images
- Blurhash placeholders, so the grid paints instantly while full images stream in
- Deployed as static files to Cloudflare Pages

## Engineering Notes

The parts I would point another engineer at:

- **Virtualized browsing at scale.** The photo grid renders a window over the collection rather than the collection, which is the difference between a snappy archive and a browser tab that dies at year three of ten.
- **An ingestion pipeline, not an upload form.** Photos flow through background processing: EXIF extraction, libvips derivatives, blurhash generation, and R2 placement, all off the request path via Solid Queue.
- **Authorization as policy, not conditionals.** Action Policy boundaries separate what anyone may browse from what invited members may do, which matters in an app built around one family's collection and conversation.
- **Infrastructure priced for a family project.** One droplet, object storage, and a CDN. The architecture is the same shape you would use at much larger scale, running at a cost a personal project can carry.
