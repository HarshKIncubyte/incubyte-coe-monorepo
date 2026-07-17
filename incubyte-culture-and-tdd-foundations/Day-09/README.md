# Day 9 – Frontend Enhancement: Chakra UI & Tailwind CSS

> Part of my Incubyte COE Learning Journey

## Overview

Enhanced the existing React + TypeScript + Apollo Client frontend with Chakra UI
as a component/theming system and Tailwind CSS for utility-first styling,
implemented light/dark mode, and split the app into separate routes using
React Router.

## Topics Covered

- Chakra UI fundamentals and philosophy
- Chakra UI theming and customization (`createSystem`, `defineConfig`)
- Responsive design with Chakra UI
- Light/dark mode implementation
- Chakra UI form components (`Field`, `Input`, `Button`, `Alert`)
- Tailwind CSS utility-first approach
- Combining Chakra UI and Tailwind CSS in the same components
- React Router for route-based separation of concerns

## Tech Stack

- Chakra UI v3.36.0
- Tailwind CSS v3.4.19
- next-themes (dark mode persistence)
- react-router-dom

## What Was Implemented

- Installed and configured Chakra UI v3 and Tailwind CSS v3 in the existing
  Vite + React + TypeScript project
- Built the dark mode toggle using Chakra's snippet pattern
  (`useColorMode`, `ColorModeProvider`) backed by `next-themes`
- Created a custom Chakra theme with brand colors and typography tokens
- Converted `Navbar`, `UserProfile`, `CreateUser`, and `UsersPage` to Chakra UI
  components, layered with Tailwind utility classes for spacing/layout
- Added React Router with two routes:
  - `/profile` — Context API demo, isolated from GraphQL data
  - `/users` — GraphQL user list + create user form
- Fixed dark/light mode contrast issues using Chakra's `{ base, _dark }`
  responsive color syntax
- Verified responsive layout across mobile/tablet/desktop breakpoints

## Key Learnings

- Chakra UI v3 significantly changed its API from v2:
  - `FormControl`/`FormLabel` → `Field.Root`/`Field.Label`
  - `Alert`/`AlertIcon` → `Alert.Root`/`Alert.Indicator`/`Alert.Title`
  - `useColorMode` is no longer built-in — generated via Chakra's CLI snippet
    system, depends on `next-themes`
  - `extendTheme` → `createSystem` + `defineConfig`
- Tailwind v4 removed the CLI `init` command and changed directive syntax;
  used Tailwind v3 for compatibility with the existing Vite setup
- Dark mode requires explicit per-component color handling — Chakra doesn't
  auto-invert hardcoded colors like `bg="white"`
- Separating Context API state (`/profile`) from GraphQL data (`/users`) into
  distinct routes made the app's data flow much easier to reason about,
  compared to having both mixed on one page

## Practical Exercise

* **Frontend Enhancement (Day 9):** https://github.com/HarshKIncubyte/graphql-learning-frontend/tree/day9
