# Day 6 – Elasticsearch Integration in Rails
> Part of my Incubyte COE Learning Journey

## Overview
Integrated Elasticsearch into the existing Rails GraphQL API to enable 
full-text search, filtering, and aggregations on Post data.

## Topics Covered
- Elasticsearch fundamentals and use cases
- Setup Elasticsearch with Docker
- Integrate Elasticsearch into Rails app
- Index Rails models in Elasticsearch
- Elasticsearch query DSL
- Full-text search with filters
- Aggregations and analytics

## Tech Stack
- Elasticsearch 8.13.0
- elasticsearch-model 8.0.1
- elasticsearch-rails 8.0.1
- Ruby on Rails 8.1.3
- Docker Compose

## How It Works
```text
User sends request
      ↓
GET /search?q=ruby&published=true
      ↓
SearchController
      ↓
Post.search(query) ← Elasticsearch gem
      ↓
Elasticsearch finds matching posts
      ↓
Returns results + aggregations as JSON
```

## Search Endpoint

`GET /search?q=<query>&published=<true|false>`

### Example Requests
```bash
# Basic search
curl "http://localhost:3000/search?q=ruby"

# With published filter
curl "http://localhost:3000/search?q=rails&published=true"

# Unpublished only
curl "http://localhost:3000/search?q=rails&published=false"
```

### Example Response
```json
{
  "query": "rails",
  "published_filter": null,
  "total": 3,
  "aggregations": {
    "published_breakdown": {
      "true": 2,
      "false": 1
    }
  },
  "results": [
    {
      "id": 1,
      "title": "Learning Ruby on Rails",
      "published": true,
      "user_id": 1
    }
  ]
}
```

## Key Learnings
- Elasticsearch works alongside PostgreSQL — not a replacement
- PostgreSQL is source of truth, Elasticsearch is the searchable copy
- `Elasticsearch::Model::Callbacks` auto-syncs data on create/update/delete
- `Post.import` indexes existing records into Elasticsearch
- Bool queries combine `must` (full-text) and `filter` (exact match)
- Aggregations provide analytics breakdown alongside search results
- Health checks in Docker Compose ensure correct startup order

## Practical Exercise
* **Elasticsearch Integration (Day 6):** https://github.com/HarshKIncubyte/graphql-learning/tree/day6
