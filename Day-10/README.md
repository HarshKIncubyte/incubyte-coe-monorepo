# Day 10 – OOP Principles & TDD Reflection with Sandi Metz
> Part of my Incubyte COE Learning Journey

## Overview
Watched Sandi Metz's RailsConf talks, identified genuine code smells in the
existing Rails codebase, and refactored by extracting service objects.

## Topics Covered
- Code smells and their 5 categories (Bloaters, OO Abusers, Change Preventers, Dispensables, Couplers)
- Sandi Metz: shameless green, squint test, shape and color of code
- Single Responsibility Principle in practice
- Service object extraction
- Refactoring vs rewriting

## Tech Stack
- Ruby on Rails, RSpec, Rubocop

## What Was Implemented
- Identified 3 genuine code smells in `SearchController` and `GithubService`
- Extracted `PostSearchService` — moved ES query, execution, and serialization out of controller
- Added `RedisService.track` — consolidated 3 Redis calls into one method
- Extracted `SearchCacheInvalidator` — `Post` model no longer handles cache logic
- Fixed `GithubService` — added `read_timeout: 5` and response status checks
- Fixed all Rubocop offenses across the codebase

## Key Learnings
- Name the smell before touching the code — once named, the fix is obvious
- Smells come in clusters — find one, find two or three more nearby
- Make the change easy, then make the easy change
- Duplication is cheaper than the wrong abstraction

## Practical Exercise
* **OOP Principles & Refactoring (Day 10):** https://github.com/HarshKIncubyte/graphql-learning/tree/day10
