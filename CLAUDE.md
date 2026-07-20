# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Rails 8 API-only learning project exploring GraphQL, Elasticsearch, and Redis. It's structured as a
day-by-day learning log — see `NOTES.md` (GraphQL fundamentals), `DAY3-NOTES.md` (RSpec/VCR/Strong
Migrations), and `README.md` (Redis caching, current focus) for the reasoning behind design choices made
at each stage. When making changes, prefer patterns already established in these notes over introducing new ones.

Tests live in `spec/` (RSpec). The `test/` directory is Rails' default Minitest scaffold and is unused —
ignore it.

## Commands

Run everything through Docker Compose (services: `db` postgres, `elasticsearch`, `redis`, `web`):

```bash
docker compose up            # start full stack
docker compose exec web bash # shell into the app container
```

Local (non-Docker) equivalents, run from the app container or a machine with Postgres/Elasticsearch/Redis
running locally:

```bash
bin/setup                    # install deps, prepare db
bin/rails s                  # start the server (bin/dev is an alias for this)
bin/rails db:prepare         # create/migrate/seed db
```

Testing:

```bash
bundle exec rspec                          # full suite
bundle exec rspec spec/graphql/queries/users_query_spec.rb   # single file
bundle exec rspec spec/graphql/queries/users_query_spec.rb:12 # single example by line
```

Linting and security (also what `bin/ci` runs, in order):

```bash
bin/rubocop                  # style (rubocop-rails-omakase base config)
bin/bundler-audit            # gem vulnerability audit
bin/brakeman --quiet --no-pager --exit-on-warn --exit-on-error   # static security analysis
```

`bin/ci` runs the full pipeline (setup → rubocop → bundler-audit → brakeman → tests). Note its "Tests: Rails"
step invokes `bin/rails test` (Minitest) rather than RSpec — since `test/` is unused boilerplate, run
`bundle exec rspec` directly to actually exercise the app's tests.

## Architecture

### Request flow
Two entry points, both hitting Elasticsearch/Postgres/Redis in different ways:

- `POST /graphql` → `GraphqlController` → `GraphqlLearningSchema` → `Types::QueryType` /
  `Types::MutationType` → resolvers/mutation classes → ActiveRecord models → GraphQL types serialize the
  response. Mutations delegate to their own class (`app/graphql/mutations/*`) rather than inline resolver
  methods; each returns a `{ field_object: ..., errors: [...] }` hash so clients get validation feedback
  instead of raised exceptions.
- `GET /search` → `SearchController` → Elasticsearch query (via `elasticsearch-model`/`elasticsearch-rails`
  on `Post`) → result cached in `Rails.cache` (Redis-backed in development, `solid_cache` in production,
  `null_store` in test) for 10 minutes, keyed by query+published filter.

In development, `/graphiql` is mounted for interactively exploring the GraphQL schema (disabled in other
environments).

### GraphQL layer conventions
- Resolvers must use `find_by`, never `find`, for lookups by ID — `find` raises
  `ActiveRecord::RecordNotFound`, which Rails turns into an HTML 404 and breaks JSON parsing for GraphQL
  clients. `find_by` returns `nil`, which GraphQL serializes as `null` cleanly.
- Base classes under `app/graphql/types/base_*.rb` are GraphQL-Ruby boilerplate (excluded from SimpleCov);
  extend these rather than `GraphQL::Schema::Object` etc. directly.
- All GraphQL specs are request specs (`type: :request`, `POST /graphql`) — there's no unit-testing of
  individual resolver methods in isolation, since GraphQL's contract is the full request/response cycle.
  `spec/support/graphql_helpers.rb` provides `post_graphql`, `graphql_response`, `graphql_response_data`,
  `graphql_errors` for this.

### Redis usage (`app/services/redis_service.rb`)
Redis is used for two distinct purposes that shouldn't be conflated:
1. **Rails.cache backend** (dev only) — caches Elasticsearch search results in `SearchController`.
   Invalidated via `Post#clear_search_cache` (`after_commit` callback, deletes all `search:*` keys) whenever
   a post is created/updated/deleted.
2. **Direct Redis data structures via `RedisService`** — search analytics, independent of the cache store:
   - String (`INCR`) for per-term search counts
   - List (`LPUSH`/`LTRIM`) for recent searches (ordered, capped at 10, duplicates allowed)
   - Set (`SADD`) for unique searches (deduplicated)

   All direct Redis access should go through `RedisService`, not ad-hoc `Redis.new` calls elsewhere.

### Git conventions
Commit messages are plain, standard conventional messages — no "Co-Authored-By" trailer or any mention of
Claude/the model used.

### Testing conventions
- VCR (`spec/support/vcr.rb`, cassettes in `spec/cassettes/`) records/replays real HTTP calls for external
  services like `GithubService` — never let a spec hit a real external API; record a cassette instead.
- SimpleCov is configured in `spec/rails_helper.rb`; boilerplate (base GraphQL types, jobs, mailers) is
  filtered from coverage.
- Migrations are checked by `strong_migrations`; unsafe patterns (e.g. `add_index` without
  `algorithm: :concurrently` + `disable_ddl_transaction!`) raise at migration time rather than causing
  production downtime. `StrongMigrations.start_after` in `config/initializers` grandfathers in migrations
  predating its adoption.
