# Day 9 - Frontend Enhancement: Chakra UI & Tailwind CSS

React + TypeScript frontend application built as part of the Incubyte COE program.
Connects to the GraphQL backend from [graphql-learning](https://github.com/HarshKIncubyte/graphql-learning).

## What Was Built

- Installed and configured **Chakra UI v3** (`@chakra-ui/react`, `@emotion/react`,
  `@emotion/styled`, `framer-motion`)
- Installed and configured **Tailwind CSS v3** (Vite + PostCSS)
- Implemented **light/dark mode** using Chakra's snippet pattern with `next-themes`
- Created a **custom Chakra theme** (`src/theme.ts`) with brand colors and
  typography tokens via `createSystem`
- Added **React Router** with separate routes:
  - `/profile` — Context API demo (`ProfilePage.tsx`)
  - `/users` — GraphQL user management (`UsersPage.tsx`)
- Converted existing components to Chakra UI:
  - `Navbar.tsx` — layout + dark mode toggle + route links
  - `UserProfile.tsx` — `Field`, `Input`, `Button`
  - `CreateUser.tsx` — `Field`, `Input`, `Button`, `Alert`
  - `UsersPage.tsx` — `SimpleGrid` responsive layout
- Fixed dark mode contrast using Chakra's `{ base, _dark }` color object syntax
- Verified responsive behavior across mobile/tablet/desktop breakpoints
- Removed old plain CSS files in favor of Chakra + Tailwind styling

## Tech Stack

- React 19 + TypeScript
- Vite
- Apollo Client v4
- React Router — client-side routing
- Chakra UI v3 — component library + theming
- Tailwind CSS v3 — utility-first styling
- next-themes — light/dark mode
- Context API
- Jest + React Testing Library

## Routes

| Path | Page | Description |
|---|---|---|
| `/profile` | ProfilePage | Context API demo — edit local user name/email |
| `/users` | UsersPage | GraphQL user management — list + create users |

## Project Structure

```
src/
├── apollo/
│   └── client.ts
├── components/
│   ├── ui/
│   │   └── color-mode.tsx
│   ├── Navbar.tsx
│   ├── UserProfile.tsx
│   └── CreateUser.tsx
├── context/
│   └── UserContext.tsx
├── graphql/
│   ├── mutations/
│   └── queries/
├── pages/
│   ├── ProfilePage.tsx
│   └── UsersPage.tsx
├── theme.ts
└── types/
└── user.ts
```

## Prerequisites

- Node.js 18+
- GraphQL backend running from [graphql-learning](https://github.com/HarshKIncubyte/graphql-learning) (day8 branch)

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/HarshKIncubyte/graphql-learning-frontend.git
cd graphql-learning-frontend
git checkout day9
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the GraphQL backend
```bash
# In your Rails backend repo
bundle install
rails s
# Runs on http://localhost:3000/graphql
```

### 4. Start the frontend
```bash
npm run dev
# Runs on http://localhost:5173
```

## Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

## Key Learnings

- Chakra UI v3 API changes from v2:
  - `FormControl`/`FormLabel` → `Field.Root`/`Field.Label`
  - `Alert`/`AlertIcon` → `Alert.Root`/`Alert.Indicator`/`Alert.Title`
  - `useColorMode` isn't built-in anymore — generated via Chakra CLI
    (`npx @chakra-ui/cli snippet add color-mode`), depends on `next-themes`
  - `extendTheme` → `createSystem` + `defineConfig`
- Tailwind v4 removed the CLI `init` command and changed the directive syntax —
  used Tailwind v3 for compatibility with this project's existing setup
- Dark mode needs explicit per-component color handling; Chakra doesn't
  auto-invert hardcoded `bg="white"` values
- Splitting Context API (`/profile`) and GraphQL data (`/users`) into separate
  routes made the app's data flow much clearer than having both on one page

## Tech Stack Additions (Day 9)

| Technology | Version | Purpose |
|---|---|---|
| Chakra UI | 3.36.0 | Component library + theming |
| Tailwind CSS | 3.4.19 | Utility-first styling |
| next-themes | latest | Dark mode persistence |
| react-router-dom | latest | Client-side routing |
| framer-motion | 12.x | Animations (Chakra dependency) |
