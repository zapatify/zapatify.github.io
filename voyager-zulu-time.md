---
title: Voyager Zulu Time
layout: default
nav_order: 7
---

# Voyager Zulu Time
{: .no_toc }

A [real-time clock](#live-clock) for the furthest human-made object in existence.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## What Is This?

Voyager 1 has been hurtling through space since September 5, 1977. It's now over 160 AU from Earth — so far away that a radio signal traveling at the speed of light takes more than 22 hours to reach it. At that distance, "what time is it?" becomes a surprisingly interesting question.

Voyager Zulu Time (VZT) is an experimental timekeeping system I built that measures time from Voyager 1's perspective. Instead of hours, minutes, and seconds, VZT uses a single decimal unit called an **Arc (Va)** — one full Arc equals exactly 8,833,536 Earth seconds (about 102 days). Time is expressed as a continuously ticking decimal, with each digit representing a progressively smaller slice of time, from deci-arcs (~10 days) down to femto-arcs (~0.88 seconds).

## Why I Built It

I've always been fascinated by the idea that our measurement of time is completely arbitrary — hours, minutes, seconds are human conventions tied to Earth's rotation. Voyager 1 doesn't care about any of that. It's been flying in a straight line through interstellar space for nearly 50 years, indifferent to our calendars.

I wanted to build a clock that felt like *Voyager's* clock — one that started ticking the moment it launched and measures time in units that relate to its journey, not ours. The epoch is the exact launch moment (1977-09-05 12:56:00 UTC), and the base unit is derived from the spacecraft's trajectory.

Beyond the concept, this was also a fun technical challenge: building a real-time, animated dashboard with live distance calculations, light-time delay, and a twinkling starfield — all running at ~11 frames per second in the browser.

## How It Works

The clock below is live. It's calculating VZT right now based on the elapsed seconds since Voyager 1's launch. The distance figures use a linearized model of Voyager's velocity (approximately 3.57 AU per year, or 17 km/s), and the one-way light time shows how long it would take a signal to travel between Earth and Voyager at this moment.

### Technical Details

- **Epoch**: September 5, 1977 at 12:56:00 UTC (Voyager 1 launch)
- **Base Unit**: 1 Arc (Va) = 8,833,536 seconds (~102.24 days)
- **Precision**: 10 decimal places, updating every 88ms
- **Distance Model**: Linearized at 3.57 AU/year
- **Built With**: React, HTML5 Canvas (starfield animation), real-time state management

---

## Live Clock

<iframe src="{{ '/assets/vzt-clock.html' | relative_url }}" style="width: 100%; height: 850px; border: none; border-radius: 4px;" title="Voyager Zulu Time Clock"></iframe>

---

## Source Code

The full React source for this clock is available on [GitHub](https://github.com/zapatify).

---

*This project combines my interest in space exploration with frontend development. It's a reminder that even something as fundamental as "time" is just a construct — and building your own version of it is a pretty fun exercise.*
