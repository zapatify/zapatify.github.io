---
title: Macros Calculator
layout: default
nav_order: 9
---

# Macros Calculator
{: .no_toc }

Calculate your daily calories and macro breakdown based on body weight and goals.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

A simple calculator that tells you how many calories you need per day and how to split them across protein, fat, and carbs. Enter your weight, height, age, and gender, slide to your activity level, set a weight loss goal (up to 10 lbs per month), and get your numbers.

## Calculator

<iframe src="{{ '/assets/macros-calculator.html' | relative_url }}" style="width: 100%; height: 1100px; border: none; border-radius: 4px;" title="Macros Calculator"></iframe>

---

## How the Math Works

**BMR (Basal Metabolic Rate)**: The number of calories your body burns at rest. Calculated using the Mifflin-St Jeor equation: (4.536 x weight in lbs) + (15.875 x height in inches) - (5 x age) + 5 for men, or - 161 for women.

Those two coefficients are just the published metric equation converted: 10 per kilogram becomes 4.536 per pound, and 6.25 per centimetre becomes 15.875 per inch.

**TDEE (Total Daily Energy Expenditure)**: Your BMR multiplied by an activity factor. A sedentary person (x1.2) burns fewer calories than someone who exercises regularly (x1.55) or has a physical job (x1.9). This is your true maintenance number, and the activity factor is the single biggest lever in the whole calculation, so it is worth being honest about which one you are.

**Caloric Deficit**: A pound of body fat holds roughly 3,500 calories, so losing N pounds in a month means running a deficit of N x 3,500 / 30 calories per day. One pound a month is about 117 a day. Ten pounds a month is about 1,167 a day, which is a lot.

**The floor**: the calculator will not recommend eating below 1,500 calories a day for men or 1,200 for women. If your goal would push you under that line, the deficit is held at the floor and the page tells you what you would actually lose instead. A goal of 10 pounds in a month is genuinely out of reach for a sedentary person, and the calculator says so rather than printing a number that cannot work.

**Macro Split**:
- **Protein**: 1 gram per pound of body weight. Each gram has 4 calories.
- **Fat**: 0.35 grams per pound of body weight. Each gram has 9 calories.
- **Carbs**: Whatever calories are left after protein and fat, divided by 4 calories per gram.

### Example (200 lbs, 5'10", age 35, male, sedentary, 4 lb loss goal)

| | Grams | Calories |
|---|---|---|
| BMR | | 1,848 |
| TDEE (x1.2 sedentary) | | 2,218 |
| Deficit | | -467 |
| **Daily Target** | | **1,751** |
| Protein | 200g | 800 cal |
| Fat | 70g | 630 cal |
| Carbs | 80g | 321 cal |

Every figure in that table is produced by the same functions the calculator runs, so it cannot drift from the implementation.

---

