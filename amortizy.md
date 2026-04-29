---
title: Amortizy
layout: default
nav_order: 6
---

# Amortizy
{: .no_toc }

A Ruby gem for loan amortization schedules — and now, commercial financing disclosures.
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Amortizy is a Ruby gem for generating loan amortization schedules. It supports monthly, bi-weekly, weekly, and daily payment frequencies; grace periods; interest-only payment phases; federal bank holidays; and multiple interest calculation methods. As of v2.1.0, it also includes a `Disclosure` module that computes the data elements required by California SB 1235 and similar state commercial financing disclosure laws — including APR by the Regulation Z actuarial method.

**RubyGems:** [rubygems.org/gems/amortizy](https://rubygems.org/gems/amortizy)
**GitHub:** [github.com/zapatify/amortizy](https://github.com/zapatify/amortizy)

## Why I Built This

One of the challenges we faced at IOU Financial is that our amortization engine wasn't flexible — and every feature the business asked for required a hefty lift that never quite reached the top of the priority list. I wanted to see if I could build a feature-rich amortization engine from the ground up, and release it as a gem that any SMB lender could drop in and use today.

The v2.x line is the result of treating it like a real product: dynamic payment counts instead of a hardcoded lookup table, a clean public API, a CLI, and a disclosure module for the regulatory side of commercial lending that most off-the-shelf calculators ignore entirely.

## Key Features

- **Four payment frequencies**: Monthly, bi-weekly, weekly, and daily
- **Flexible loan terms**: Any term length in months, or specify an exact `num_payments`
- **Two interest methods**: Simple (accrued daily) or precomputed (fixed per payment)
- **Grace periods**: Configurable grace period before the first payment, with automatic interest capitalization
- **Interest-only periods**: Initial interest-only payment phases of any length
- **Fee handling**: Origination fees and additional fees with three treatment options (distributed, added to principal, or collected as a separate first payment)
- **Bank day calculations**: Skip weekends and US Federal Reserve holidays automatically (powered by the `holidays` gem)
- **Multiple output formats**: Console table or CSV export
- **Public API**: Frozen schedule arrays, summary hashes, and convenience methods (`#total_interest`, `#total_paid`, `#payment_amount`, `#end_date`)
- **Commercial financing disclosure module**: Reg Z APR, finance charge, amount financed, recipient funds, term display, average monthly cost, and prepayment info — see below
- **Interactive CLI**: `amortizy` command for running examples or entering loans manually

## Installation

```ruby
# Gemfile
gem 'amortizy'
```

Or install directly:

```bash
gem install amortizy
```

Requires Ruby 3.0+.

## Usage Example

### Generate a Monthly Amortization Schedule

```ruby
require 'amortizy'

schedule = Amortizy::AmortizationSchedule.new(
  start_date:  "2026-01-15",
  principal:   100_000.00,
  term_months: 12,
  annual_rate: 10.0,
  frequency:   :monthly
)

schedule.payment_amount   # => 8791.59
schedule.total_interest   # => 5499.06
schedule.total_paid       # => 105499.06
schedule.end_date         # => #<Date: 2027-01-15>

# Frozen array of payment hashes
schedule.schedule.each do |payment|
  puts "#{payment[:date]} - $#{'%.2f' % payment[:total_payment]}"
end

# Or render directly
schedule.generate                                          # console table
schedule.generate(output: :csv, csv_path: "schedule.csv")  # CSV file
```

### Specify an Exact Payment Count

```ruby
schedule = Amortizy::AmortizationSchedule.new(
  start_date:   "2026-01-15",
  principal:    50_000.00,
  num_payments: 26,
  annual_rate:  12.0,
  frequency:    :biweekly
)

schedule.schedule.length    # => 26
```

### Complex Commercial Loan

```ruby
schedule = Amortizy::AmortizationSchedule.new(
  start_date:               "2026-01-15",
  principal:                250_000.00,
  term_months:              18,
  annual_rate:              14.5,
  frequency:                :daily,
  origination_fee:          25_000.00,
  additional_fee:           5_000.00,
  additional_fee_treatment: :distributed,
  bank_days_only:           true,
  interest_only_periods:    20,
  grace_period_days:        5,
  interest_method:          :simple
)
```

## Commercial Financing Disclosures (v2.1.0)

A growing number of states (California SB 1235, New York, Georgia, and counting) now require commercial lenders to issue Truth-in-Lending–style disclosures on small business loans. The math is non-trivial — APR alone requires the Regulation Z actuarial method, which is a Newton-Raphson solve, not a closed-form formula.

The `Amortizy::Disclosure` class wraps an `AmortizationSchedule` and computes nine disclosure elements with the regulation-correct labels:

```ruby
disclosure = Amortizy::Disclosure.new(schedule)

disclosure.apr                   # => 12.3 (Reg Z actuarial, 10 bps precision)
disclosure.finance_charge        # => 11119.65
disclosure.amount_financed       # => 49500.0
disclosure.total_payment_amount  # => 60619.65
disclosure.recipient_funds       # => 49500.0
disclosure.term_display          # => "3 years, 0.20 months"
disclosure.average_monthly_cost  # => nil (monthly frequency)
disclosure.prepayment            # => { has_non_interest_charges: false, ... }
```

Output is available as a flat hash (`#to_h`) or with regulation-correct labels per CA SB 1235 §910 (`#to_labeled_h`). Values are jurisdiction-agnostic — computed per the most stringent methodology, usable for any state's commercial financing disclosure requirements.

The gem computes the numbers; your application handles the document layout.

## Technical Architecture

### Public API

The v2.0 release pulled `AmortizationSchedule` apart from its formatters (`ConsoleFormatter`, `CsvFormatter`), so the engine class is now focused purely on amortization math. The public surface returns immutable, frozen data:

| Method | Returns |
|--------|---------|
| `#schedule` | Frozen array of payment hashes (date, principal, interest, balance, etc.) |
| `#summary` | Hash with start/end dates, principal, payment count, frequency, totals |
| `#payment_amount` | Regular periodic payment |
| `#total_interest` | Sum of all interest payments |
| `#total_paid` | Sum of all payments |
| `#end_date` | Date of the last payment |

### APR Calculation

APR is computed using the actuarial method per Appendix J of Regulation Z (12 CFR Part 1026 §940), with a Newton-Raphson solver and bisection fallback for tricky cases (grace periods, interest-only, near-zero rates). APR is rounded to the nearest 10 basis points per §901(a)(5), and accuracy is within 1/8 of 1 percentage point per §955.

### Internal Consistency

Finance charge is derived from the Reg Z identity:

```
finance_charge = total_payment_amount - amount_financed
```

This guarantees the three core disclosure values are always internally consistent — no risk of presenting numbers that don't add up.

## Development Highlights

This project demonstrates:

1. **Gem development end-to-end**: gemspec, semantic versioning, RubyGems publishing, GitHub Actions CI
2. **Domain depth**: Loan mathematics, day-count conventions, federal holiday handling, regulatory APR methodology
3. **API design**: Dual input model (`term_months` vs `num_payments`), frozen returns, named keyword arguments
4. **Test discipline**: 120 RSpec examples covering every frequency, fee treatment, and disclosure element, plus Reg Z identity verification across modes
5. **Backward-compatibility communication**: v2.0 introduced breaking changes to daily-frequency payment counts; the upgrade path is documented explicitly in CHANGELOG with `bank_days_only: true` as the bridge for callers relying on v1 behavior
6. **Regulatory translation**: Reading the actual statute (CA SB 1235 §900, §901, §910, §940, §943, §955) and turning it into code that other lenders can use

## Version History

- **v1.0.0** (Dec 2024): Initial release. Daily and weekly frequencies. Fixed terms (6/9/12/15/18 months). Simple and precomputed interest. Grace periods, interest-only, fees, bank days.
- **v2.0.0** (Apr 2026): Monthly and bi-weekly frequencies. Dynamic payment counts for any term length. New `num_payments` input. Public API extracted from formatters. Min Ruby 3.0.
- **v2.1.0** (Apr 2026): `Amortizy::Disclosure` class. Reg Z APR, finance charge, amount financed, recipient funds, term display, average monthly cost, prepayment info. Nine disclosure elements per CA SB 1235.

Full changelog: [CHANGELOG.md](https://github.com/zapatify/amortizy/blob/main/CHANGELOG.md)

## Real-World Use Cases

- **SMB lending platforms**: payment schedule generation and customer-facing loan tools
- **Commercial financing compliance**: drop-in disclosure data for CA, NY, GA, and other states adopting Truth-in-Lending–style requirements
- **Mortgage and consumer loan calculators**
- **Internal financial planning and modeling tools**
- **Educational tools**: a working reference implementation of loan amortization and Reg Z APR
