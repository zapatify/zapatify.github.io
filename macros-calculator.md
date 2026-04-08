---
title: Macros Calculator
layout: default
nav_order: 8
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

A simple calculator that tells you how many calories you need per day and how to split them across protein, fat, and carbs. Enter your weight, height, and age, select your activity level, set a weight loss goal (up to 10 lbs per month), and get your numbers.

## Calculator

<iframe src="{{ '/assets/macros-calculator.html' | relative_url }}" style="width: 100%; height: 1100px; border: none; border-radius: 4px;" title="Macros Calculator"></iframe>

---

## How the Math Works

**BMR (Basal Metabolic Rate)**: The number of calories your body burns at rest. Calculated using the Mifflin-St Jeor equation: (4.536 x weight in lbs) + (12.7 x height in inches) - (5 x age) + 5.

**TDEE (Total Daily Energy Expenditure)**: Your BMR multiplied by an activity factor. A sedentary person (x1.2) burns fewer calories than someone who exercises regularly (x1.55) or has a physical job (x1.9). This is your true maintenance number.

**Caloric Deficit**: For every 10 lbs you want to lose per month, you subtract 500 calories per day from your TDEE. Want to lose 5 lbs? That's a 250 calorie daily deficit. The cap is 10 lbs per month (500 calorie deficit).

**Macro Split**:
- **Protein**: 1 gram per pound of body weight. Each gram has 4 calories.
- **Fat**: 0.35 grams per pound of body weight. Each gram has 9 calories.
- **Carbs**: Whatever calories are left after protein and fat, divided by 4 calories per gram.

### Example (200 lbs, 5'10", age 35, sedentary, 10 lb loss goal)

| | Grams | Calories |
|---|---|---|
| BMR | | 1,797 |
| TDEE (x1.2 sedentary) | | 2,156 |
| Deficit | | -500 |
| **Daily Target** | | **1,656** |
| Protein | 200g | 800 cal |
| Fat | 70g | 630 cal |
| Carbs | 57g | 226 cal |

---

