---
title: ZappyTime
layout: default
nav_order: 8
---

# ZappyTime
{: .no_toc }

A lightweight project time tracker built with React and Tailwind CSS.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

ZappyTime is a sleek, browser-based time tracker for managing multiple projects. It runs entirely in the browser with no backend required — project data persists via localStorage.

**Live App:** [zapatify.github.io/ZappyTime](https://zapatify.github.io/ZappyTime/)

**GitHub:** [github.com/zapatify/ZappyTime](https://github.com/zapatify/ZappyTime)

## Key Features

- **Project Time Tracking** — Start, pause, and stop a timer against any project with accumulated time displayed per project
- **Project Management** — Create, rename, and delete projects with color-coded identifiers
- **Drag-and-Drop Reordering** — Rearrange projects via native HTML drag and drop with a grip handle
- **Persistent Storage** — All project data (names, colors, accumulated time, order) survives page reloads via localStorage
- **Dark Theme** — Clean dark UI with high-contrast text and color-coded controls
- **Zero Backend** — Fully static site deployed to GitHub Pages with no server dependencies

## Technical Architecture

### Technology Stack
- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Deployment:** GitHub Pages via GitHub Actions
- **Persistence:** Browser localStorage

### Component Structure

- **Timer** — Large monospace HH:MM:SS display with interval-based counting
- **TimerControls** — Start (green), Pause (yellow), and Stop (red) action buttons with state-aware rendering
- **ProjectSelector** — Interactive project list with inline editing, deletion, drag-and-drop reordering, and new project creation
- **useLocalStorage** — Custom React hook that syncs state to localStorage for data persistence

## Development Highlights

- **Figma-to-Code Workflow** — Designed in Figma Make and translated to production code, demonstrating a design-driven development process
- **No External State Libraries** — Manages all application state with React hooks and a custom localStorage hook, keeping the dependency footprint minimal
- **Native Drag and Drop** — Implements reordering without third-party drag libraries, using the browser's built-in HTML Drag and Drop API
- **Static Deployment** — Automated CI/CD pipeline via GitHub Actions builds and deploys to GitHub Pages on every push to main

---


