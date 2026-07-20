# Incubyte COE — Rails API Project
> Part of my **Incubyte COE Learning Journey**

## Overview
This repository contains a **Ruby on Rails API-only application** built
progressively across multiple days of the Incubyte COE program.

Starting with GraphQL on Day 2, the project evolved through testing,
Docker, Elasticsearch, Redis caching, AI-assisted development with
Claude Code plugins, and OOP principles with service object extraction.

- **Name the smell first** — once you name it, the fix is obvious.
- **Smells come in clusters** — find one, you'll find two or three more nearby.
- **The cure is almost always extraction** — long method → extract method. Large class → extract class.
- **Refactoring is not rewriting** — small, safe, incremental steps. Tests green at every step.
- **The squint test is free** — no tool needed. Just squint. If the shape looks wrong, it is wrong.

## Branch Guide

| Branch | Day | Topic | Notes |
|--------|-----|-------|-------|
| [day2](https://github.com/HarshKIncubyte/graphql-learning/tree/day2) | Day 2 | Ruby on Rails API with GraphQL | [Notes](./docs/day2-rails-graphql.md) |
| [day3](https://github.com/HarshKIncubyte/graphql-learning/tree/day3) | Day 3 | Testing GraphQL with RSpec & VCR | [Notes](./docs/day3-rspec-vcr.md) |
| [day5](https://github.com/HarshKIncubyte/graphql-learning/tree/day5) | Day 5 | Dockerizing Rails Application | [Notes](./docs/day5-docker.md) |
| [day6](https://github.com/HarshKIncubyte/graphql-learning/tree/day6) | Day 6 | Elasticsearch Integration in Rails | [Notes](./docs/day6-elasticsearch.md) |
| [day7](https://github.com/HarshKIncubyte/graphql-learning/tree/day7) | Day 7 | Backend Enhancement: Redis Caching | [Notes](./docs/day7-redis-caching.md) |
| [day8](https://github.com/HarshKIncubyte/graphql-learning/tree/day8) | Day 8 | AI Integration: Bee & Learn Plugins | [Notes](./docs/day8-bee-learn.md) |
| [day10](https://github.com/HarshKIncubyte/graphql-learning/tree/day10) | Day 10 | OOP Principles & Service Object Extraction | [Notes](./docs/day10-oop-refactoring.md) |

## What I Built

### Code Smells Found

| Technology | Version | Purpose |
|------------|---------|---------|
| Ruby | 3.3.6 | Language |
| Rails | 8.1.3 | API Framework |
| PostgreSQL | 14.23 | Primary Database |
| GraphQL | — | API Query Language |
| RSpec | — | Testing Framework |
| Docker | — | Containerization |
| Elasticsearch | 8.13.0 | Full-text Search |
| Redis | 7.2 | Caching & Data Structures |
| Claude Code + Bee | — | AI-assisted spec-driven development |

### Extracted PostSearchService

## Getting Started with Docker

```bash
git clone https://github.com/HarshKIncubyte/graphql-learning.git
cd graphql-learning
git checkout day10  # latest branch with all features
docker compose up --build
```

Visit `http://localhost:3000/graphiql` to explore the GraphQL API.
