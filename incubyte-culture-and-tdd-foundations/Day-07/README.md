# Day 7 – Backend Enhancement: Redis Caching
> Part of my Incubyte COE Learning Journey

## Overview
Integrated Redis into the existing Rails GraphQL API to implement caching,
cache invalidation, and Redis data structures for analytics tracking.

## Topics Covered
- Redis fundamentals and use cases
- Setup Redis with Docker
- Rails caching with Redis cache store
- Cache expensive search queries
- Cache invalidation with after_commit callbacks
- Redis data structures (String, List, Set)

## Tech Stack
- Redis 7.2
- redis gem 5.4.1
- Ruby on Rails 8.1.3
- Docker Compose

## What Was Implemented

### 1. Redis Cache Store
Configured Rails to use Redis as cache store instead of memory store.

### 2. Search Result Caching
Search results cached in Redis with 10 minute TTL.
- First request → hits Elasticsearch (1.0s)
- Second request → hits Redis cache (0.039s)
- **25x faster on cache hit!**

### 3. Cache Invalidation
Cache automatically cleared when Post is created, updated or deleted
using `after_commit` callback.

### 4. Redis Data Structures
- **String** — search counter per term
- **List** — recent searches (last 10)
- **Set** — unique search terms (no duplicates)

### Note on Session Storage
This is an API-only Rails app (`config.api_only = true`).
Sessions are disabled by design. JWT tokens are the correct
authentication approach for API-only apps, not cookie sessions.

## Example Response
```json
{
  "query": "ruby",
  "total": 2,
  "search_count": 2,
  "recent_searches": ["ruby", "docker", "rails"],
  "unique_searches": ["ruby", "rails", "docker"],
  "results": [...]
}
```

## Key Learnings
- Redis is an in-memory store — much faster than PostgreSQL for cached data
- `Rails.cache.fetch` checks cache first, only runs block on cache miss
- TTL based expiry automatically cleans up stale cache
- `after_commit` is cleaner than separate after_create/update/destroy callbacks
- Redis List allows duplicates, Set automatically deduplicates
- API-only Rails apps use tokens not sessions

## Practical Exercise
* **Redis Caching (Day 7):** https://github.com/HarshKIncubyte/graphql-learning/tree/day7

