# Day 4 - Frontend with React & Apollo Client

React + TypeScript frontend application built as part of the Incubyte COE program.
Connects to the GraphQL backend from [graphql-learning](https://github.com/HarshKIncubyte/graphql-learning).

## Tech Stack

- React 18 + TypeScript
- Vite
- Apollo Client v4
- Context API
- Jest + React Testing Library

## Project Structure

```
src/
├── apollo/
├── components/      
│   ├── Navbar.tsx
│   ├── UserProfile.tsx
│   └── CreateUser.tsx
├── context/         
│   └── UserContext.tsx
├── graphql/         
│   └── queries/
├── pages/           
│   └── UsersPage.tsx
└── types/           
    └── user.ts
```


## Prerequisites

- Node.js 18+
- GraphQL backend running from [graphql-learning](https://github.com/HarshKIncubyte/graphql-learning)

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/HarshKIncubyte/graphql-learning-frontend.git
cd graphql-learning-frontend
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

## What's covered

- `useQuery` — fetch users list from GraphQL API
- `useMutation` — create new user
- Context API — shared user state across Navbar and UserProfile
- Jest + RTL — component tests
- MockedProvider — GraphQL API mock tests
