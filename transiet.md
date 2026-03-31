---
title: Transiet
layout: default
nav_order: 3
---

# Transiet
{: .no_toc }

Privacy-First Web Analytics for Indie Devs
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Transiet is a lightweight web analytics service designed for solo devs, small sites, and people who just want to know if anyone is visiting their site. 

It's simple, bare-bones traffic data analysis for $3/month — without complexity or cookies.

**Live at:** [https://transiet.com](https://transiet.com)

## Why I Built This

When I first built this portfolio, I included the link in my job applications. I was curious if anybody was actually clicking on the links (if you're reading this and you're a hiring manager or recruiter, thank you!🙏).  I tried plausible.io but that trial period ran out pretty quick.  Plausible charges $9 a month, but if you pay a year in advance ($90) you can bring it down to $7.50.  I thought it was just a little too much to pay for very basic tracking.  This portfolio isn't a SaaS product. So, I looked around for cheaper alternatives but ultimately decided to build my own, and transiet was born.  

Why the name transiet?  I bought the domain with another project in mind, but that project never materialized. Since I already owned the domain, and the meaning fit perfectly, it was fate.  

## What Makes It Different

- **No cookies, localStorage, or sessionStorage**
- **No raw IP addresses or user agents stored**
- **Visitor hashes rotate daily** and are scoped per-site
- **Country-level geolocation only** (never city/region)
- **Cross-site tracking is architecturally impossible**
- **One ~1KB script tag** to install
- **Server-rendered dashboard** via Hotwire — no client-side JS framework
- **GPDR Compliant by architecture** 

## Key Features

- **Real-Time Dashboard**: Live visitor counts, page views, and trends via server-rendered Hotwire
- **Privacy by Architecture**: SHA256 visitor hashing with daily rotation — no PII stored
- **Multi-Site Support**: Track up to 3 sites per account
- **Traffic Insights**: Top pages, referrer sources, device/browser breakdown, country-level geo
- **Chartkick Visualizations**: Clean, interactive charts powered by Chartkick + Groupdate
- **Lightweight Tracking Script**: ~1KB async script that won't slow down your site
- **Stripe Billing**: $3/month with 14-day free trial, managed via Stripe Customer Portal


### Ingestion Pipeline

When a visitor loads a tracked page, the ~1KB script fires a `POST /ingest` request. The server fingerprints the visitor using a daily-rotating SHA256 hash (no raw IP or user agent stored), resolves the session, parses geolocation from MaxMind's local database, and records the page view — all without cookies or client-side storage.

### Privacy Architecture

Privacy isn't a feature toggle. It's baked into the data model:

- **Visitor fingerprints** are SHA256 hashes that rotate daily and are scoped per-site
- **IP addresses** are used only in-memory for geo lookup, never persisted
- **User agents** are parsed into device/browser categories, then discarded
- **No cross-site correlation** is possible by design
- **Country-level geo only** no city, region, or coordinates

## Development Highlights

This project demonstrates:

1. **SaaS Architecture**: Multi-tenant analytics platform with Stripe billing and subscription lifecycle management
2. **Privacy Engineering**: Architecting a system where privacy violations are structurally impossible, not just policy
3. **Rails 8 Modern Stack**: Solid Queue, Solid Cache, Solid Cable.  All PostgreSQL-backed, no Redis dependency, PGFTW! ❤️🐘
4. **Kamal 2 Deployment**: Docker-based zero-downtime deploys to a single DigitalOcean droplet
5. **Domain-Driven Design**: Clean service objects (VisitorFingerprint, SessionResolver, GeoResolver, DeviceParser, ReferrerParser)
6. **Hotwire-First Frontend**: Server-rendered real-time dashboard without a JavaScript framework


