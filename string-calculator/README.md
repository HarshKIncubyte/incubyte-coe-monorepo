# String Calculator Kata

A Ruby implementation of the [String Calculator Kata](https://osherove.com/tdd-kata-1) built as part of the Incubyte onboarding exercise, following strict TDD.

---

## Ruby Version

ruby-3.3.6

---

## How to run

```bash
bundle install
bundle exec rspec
```

---

## What it does

Takes a string of numbers and returns their sum.

```ruby
StringCalculator.add("")          # => 0
StringCalculator.add("1")         # => 1
StringCalculator.add("1,2")       # => 3
StringCalculator.add("1\n2,3")    # => 6
StringCalculator.add("//;\n1;2")  # => 3
StringCalculator.add("//[***]\n1***2***3")  # => 6
StringCalculator.add("//[*][%]\n1*2%3")     # => 6
StringCalculator.add("1,-2,3")    # => raises ArgumentError: negative numbers not allowed: -2
StringCalculator.add("2,1001")    # => 2 (numbers > 1000 are ignored)
```

---

## Approach

Followed strict TDD throughout — no production code was written without a failing test first. The git history reflects each Red → Green → Refactor cycle as separate commits.

Commit prefixes used:
- `test:` — failing test (Red)
- `feat:` — minimum code to pass (Green)
- `refactor:` — cleanup without behaviour change (Refactor)
- `chore:` — setup and configuration

---
 
## A note on AI usage

Used Claude as a pair programming assistant during this exercise. AI suggested code and explanations but every decision was mine — I questioned each step, pushed back where needed, and made sure I understood everything before moving forward. The TDD cycle, commit discipline, and design choices were driven by me.