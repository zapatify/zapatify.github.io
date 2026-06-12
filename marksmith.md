---
title: Marksmith
layout: default
nav_order: 5
---

# Marksmith
{: .no_toc }

A native macOS markdown editor. $2.99, forever.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Marksmith is a focused, native macOS markdown editor built in Swift and SwiftUI. Open a `.md` file or a folder of them, edit with syntax highlighting, preview rendered GitHub Flavored Markdown, and save back to the same file. No vaults, no proprietary databases, no import/export ceremony. Your files stay your files.

**Live on the Mac App Store:** [Marksmith on the App Store](https://apps.apple.com/us/app/marksmith/id6762143551?mt=12)

## Why I Built This

Given all the AI development I'm doing and because AI lives in the markdown world, I wanted a markdown editor that behaves like a Mac app should. The market is split between over-engineered tools (Obsidian, Bear, iA Writer) and broken ones. For example, there's an editor in the Mac App Store right now that once you install it and open it, you can't move the window. I just wanted something simple that opens a file, lets me edit/preview it, and gets out of the way.

I also wanted to prove a pricing point: **$2.99, forever**. Buy it once, own it forever. No subscriptions, no v2 repurchase, no paid upgrades. Bug fixes and thoughtful features are part of owning the product, not a reason to charge again.

This was also my first real Swift/SwiftUI project, a chance to learn the native Apple stack the same way I've learned every other platform: by shipping something with it.

## What Makes It Different

- **One-time $2.99 purchase** — no subscription, no upgrade fees, ever
- **Native SwiftUI** — no Electron, no web view wrapper, fast cold start
- **Plain `.md` files** — no proprietary format, no vault, no database
- **Sandboxed and offline-only** — no network entitlement, your files never leave your machine
- **Document-based architecture** — auto-save, version history, and undo/redo come from macOS itself
- **Folder mode** — open a directory and get a sidebar tree of just the markdown files

## Key Features

- **Edit / Preview Toggle**: Switch between syntax-highlighted source and fully rendered GitHub Flavored Markdown with `Cmd+E`
- **Folder Sidebar**: Open a folder, get a tree view of just the `.md` files. Non-markdown files and empty folders are hidden automatically
- **GFM Support**: Headings, bold/italic, tables, task lists, fenced code blocks, blockquotes, strikethrough, images, links
- **In-Document Find**: `Cmd+F` to search within the open document (added in v1.1.0)
- **Standard macOS Shortcuts**: `Cmd+N`, `Cmd+O`, `Cmd+S`, `Cmd+Shift+S`, `Cmd+Z`, `Cmd+Shift+Z`, all where you'd expect them
- **Friendly Onboarding**: Optional "Set as Default" prompt on first launch, dismissible with one click

## Pricing

| Tier | Price |
|------|-------|
| **One-time purchase** | $2.99 |

Lifetime updates included. No subscription. No paid upgrades. No v2 repurchase.

## Development Highlights

This project demonstrates:

1. **Native Apple Stack**: Swift 5.9+, SwiftUI throughout, no AppKit fallbacks, targeting macOS 13+ (Ventura)
2. **Document-Based Architecture**: Leverages the macOS Document model for free auto-save, version history, and undo
3. **Mac App Store Readiness**: Sandboxed, signed, and shipped with the proper entitlements, with no network access required or requested
4. **Async Markdown Rendering**: Preview pipeline runs off the main thread to keep the editor responsive on large files
5. **Pre-Ship QA Discipline**: XCTest coverage plus a documented manual test script covering Unicode, large files, empty files, and deeply nested folders
