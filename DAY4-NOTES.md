# Day 4 Notes - Frontend with React & Apollo Client

## Apollo Client Setup

Apollo Client connects React to the GraphQL backend via `ApolloProvider` in `main.tsx`.
The client is configured in `src/apollo/client.ts` pointing to `http://localhost:3000/graphql`.

### useQuery
- Fetches data on component mount
- Returns `{ data, loading, error }` — always handle all three states
- Example: `UsersPage` fetches all users with `GET_USERS` query

### useMutation
- Returns `[mutateFunction, { loading }]`
- Call `mutateFunction` with variables to trigger the mutation
- Example: `CreateUser` uses `CREATE_USER` mutation

### Optimistic UI
Optimistic response updates the UI immediately before the server responds.
A temporary user with `id: temp-${Date.now()}` is added to the list instantly.
If the server fails, Apollo automatically rolls back to the previous state.

```ts
optimisticResponse: {
  createUser: {
    __typename: "CreateUserPayload",
    user: {
      __typename: "User",
      id: `temp-${Date.now()}`, // temporary ID
      name,
      email,
    },
    errors: [],
  },
},
```

### Apollo Cache Manual Update
Instead of `refetchQueries` (extra network call), the cache is updated manually
using `cache.readQuery` + `cache.writeQuery` — no extra network request needed.

The `update` function:
1. Reads existing users from cache
2. Removes the optimistic (temp) version of the new user
3. Writes the real server response back to cache

This keeps the UI in sync instantly without hitting the network again.

### Cache vs refetchQueries
| | refetchQueries | cache update (used here) |
|---|---|---|
| Network call | ✅ extra request | ❌ no extra request |
| UI update | After server responds | Instant (optimistic) |
| Complexity | Low | Medium |

## Context API

### What it solves
Avoids prop drilling — multiple components need the same state without passing props through every layer.

### Pattern used
- `UserProvider` — holds state, exposes controlled actions
- `useUser()` — custom hook, single null check, clean API for consumers
- `UserContext` — NOT exported, forces consumers through the hook

### Controlled actions vs raw setState
Exposing `setUser` directly allows any component to corrupt state.
Instead, expose specific actions: `updateName`, `updateEmail` — components
can only do what is explicitly allowed.

### Local state vs Context
| State | Where | Reason |
|---|---|---|
| `user` (logged-in) | Context | shared across Navbar + UserProfile |
| `inputName` | local useState | only needed inside UserProfile input |

---

## Redux vs Context API

| | Context API | Redux Toolkit |
|---|---|---|
| Best for | Auth, theme, user session | Complex shared state, many actions |
| Boilerplate | Low | Medium |
| DevTools | ❌ | ✅ |
| Performance | Re-renders all consumers | Selective re-renders |
| Used here | ✅ UserContext | ❌ not needed |

**Decision:** Used Context API because the app has simple state (single user object).
Redux would be the right choice if the app had cart, filters, notifications,
and user state all needing to interact with each other.

---

## Testing

### Jest + RTL setup
- `jest.config.ts` — ts-jest preset with jsdom environment
- `tsconfig.test.json` — separate tsconfig for tests (disables verbatimModuleSyntax)
- `setupTests.ts` — imports `@testing-library/jest-dom`

### UserProfile tests
- Wrap component in `UserProvider` as test wrapper
- Test default render + user interaction with `userEvent`

### UsersPage tests (GraphQL mocking)
- Use `MockedProvider` from `@apollo/client/testing/react`
- Mock returns controlled test data — never real DB data
- Test loading state, success state, empty state, error state
