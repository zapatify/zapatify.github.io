---
title: Amortizy
layout: default
nav_order: 3
---

# Amortizy
{: .no_toc }

Ruby Gem for Loan Amortization Calculations
{: .fs-6 .fw-300 }

---

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Amortizy is a production-ready Ruby gem that provides precise loan amortization calculations. Originally developed as an internal engine for fintech applications, it has been extracted, polished, and published to RubyGems for the Ruby community.

**RubyGems:** [https://rubygems.org/gems/amortizy](https://rubygems.org/gems/amortizy)  
**GitHub:** [https://github.com/zapatify/amortizy](https://github.com/zapatify/amortizy)

## Key Features

- **Accurate Calculations**: Precise loan payment schedules with proper rounding
- **Flexible Inputs**: Support for various loan types and payment frequencies
- **Amortization Schedules**: Complete payment breakdowns over loan lifetime
- **Payment Frequency Options**: Monthly, bi-weekly, weekly payments
- **Early Payoff Scenarios**: Calculate savings from additional payments
- **Remaining Balance**: Calculate outstanding balance at any point
- **Interest Calculations**: Accurate interest computation per payment period
- **Clean API**: Simple, intuitive interface for developers

## Installation

```ruby
# Add to Gemfile
gem 'amortizy'

# Or install directly
gem install amortizy
```

## Usage Examples

### Basic Amortization Schedule

```ruby
require 'amortizy'

loan = Amortizy::Loan.new(
  principal: 250_000,      # $250,000 loan
  annual_rate: 4.5,        # 4.5% APR
  term_months: 360         # 30-year loan
)

# Get monthly payment
loan.monthly_payment
# => 1266.71

# Generate full amortization schedule
schedule = loan.amortization_schedule

# Access specific payment
schedule[0]
# => {
#   payment_number: 1,
#   payment_amount: 1266.71,
#   principal: 328.96,
#   interest: 937.50,
#   balance: 249_671.04
# }
```

### Early Payoff Analysis

```ruby
# Calculate savings from extra payments
loan.extra_payment_analysis(extra: 200)
# => {
#   months_saved: 89,
#   interest_saved: 54_320.18,
#   total_paid: 392_358.82
# }
```

### Remaining Balance

```ruby
# Balance after 5 years (60 payments)
loan.remaining_balance(after_payments: 60)
# => 233_139.46
```

## Technical Architecture

### Core Algorithm

The gem implements the standard amortization formula with careful attention to:

- **Precision**: BigDecimal for financial calculations
- **Rounding**: Proper rounding to avoid cumulative errors
- **Edge Cases**: Handling of final payment adjustments
- **Performance**: Efficient calculation for large loan terms

### Mathematical Foundation

```
M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]

Where:
M = Monthly payment
P = Principal loan amount
i = Monthly interest rate
n = Number of payments
```

### Design Principles

- **Immutability**: Loan objects are immutable after creation
- **No Side Effects**: Pure functions for calculations
- **Type Safety**: Input validation and type checking
- **Documentation**: Comprehensive RDoc documentation
- **Testing**: 100% test coverage with RSpec

## Development Highlights

This project demonstrates:

1. **Gem Development**: Complete lifecycle from code to published gem
2. **Financial Domain**: Deep understanding of loan mathematics
3. **API Design**: Clean, developer-friendly interfaces
4. **Open Source**: Community contribution and maintenance
5. **Documentation**: Professional documentation and examples
6. **Testing**: Rigorous test suite with edge cases
7. **Versioning**: Semantic versioning and changelog maintenance

## Publishing Process

Successfully published to RubyGems with:

- **Gemspec Configuration**: Proper metadata and dependencies
- **Version Management**: Semantic versioning
- **Documentation**: README, CHANGELOG, and RDoc
- **Licensing**: MIT license for open use
- **CI/CD**: Automated testing with GitHub Actions
- **Release Process**: Tagged releases with notes

## Real-World Applications

Amortizy powers calculations in:

- **Loan Origination Systems**: Payment schedule generation
- **Financial Planning Tools**: Mortgage calculators
- **Banking Applications**: Customer-facing loan tools
- **Personal Finance Apps**: Debt payoff planning
- **Educational Tools**: Teaching loan amortization concepts

## Fintech Experience

This gem reflects my experience building:

- Credit decisioning engines at IOU Financial
- Loan servicing platforms
- Payment processing systems
- Financial compliance tools
- Regulatory reporting systems

## Code Quality

- **Test Coverage**: 100% with comprehensive edge cases
- **Rubocop Compliant**: Follows Ruby style guide
- **Documentation**: Full RDoc coverage
- **Type Checking**: Optional Sorbet type signatures
- **Performance**: Benchmarked and optimized

## Version History

- **v1.0.0**: Initial release with basic amortization
- **v1.1.0**: Added extra payment analysis
- **v1.2.0**: Payment frequency options
- **v1.3.0**: Remaining balance calculations

## Challenges Solved

- **Floating Point Precision**: Used BigDecimal to avoid rounding errors
- **Final Payment Adjustment**: Properly handled final payment rounding
- **API Simplicity**: Balanced power with ease of use
- **Backward Compatibility**: Maintained API stability across versions
- **Performance**: Optimized for large amortization schedules

## Community Adoption

- **Downloads**: [Add actual download stats from RubyGems]
- **Dependents**: Used by [number] Ruby projects
- **Stars**: [GitHub stars]
- **Contributors**: [Number of contributors]
- **Issues Resolved**: [Number of issues closed]

## Future Enhancements

- Variable interest rate loans
- Adjustable-rate mortgage (ARM) support
- Balloon payment calculations
- Interest-only period handling
- Refinancing analysis tools
- Loan comparison utilities
- Tax deduction calculations
- PMI (Private Mortgage Insurance) inclusion

## Educational Value

Amortizy serves as:

- Learning tool for understanding loan mechanics
- Reference implementation for financial calculations
- Teaching resource for Ruby gem development
- Example of financial domain modeling

---

