# 🚀 React Concepts + Mini Project (Vite + React)

Hands-on React concept modules **plus a small polished mini project** you can run locally. Use it as a refresher, interview prep, or a quick React patterns cookbook.

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Concept Modules](#concept-modules)
5. [Mini Project](#mini-project)
6. [Key Concepts Checklist](#key-concepts-checklist)
7. [Best Practices](#best-practices)
8. [Resources](#resources)

## 🎯 Project Overview

This learning app provides:

- **Concept modules** (interactive UI + code snippets)
- **Mini project** that ties multiple concepts together
- **A clean UI** for quick navigation

## 🔧 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn/pnpm)

### Install

Note: this repo currently contains a folder named `react-practice ` (with a trailing space).

```bash
cd "react-practice "
npm install
```

### Run

```bash
npm run dev
```

Open the URL printed in the terminal.

## 🏗️ Project Structure

```bash
react-practice/
├── src/
│   ├── concepts/          # Learning modules (1..N)
│   ├── mini-project/      # TaskFlow mini project
│   ├── App.jsx            # Navigation + module renderer
│   ├── main.jsx           # React entry
│   └── index.css          # Shared styles
├── index.html
└── vite.config.js
```

## 📖 Concept Modules

Use the top navigation in the running app.

- **1) JSX & Components** (`src/concepts/1-BasicConcepts.jsx`)
- **2) State Management** (`src/concepts/2-StateManagement.jsx`)
- **3) Effects & Side Effects** (`src/concepts/3-EffectsAndSideEffects.jsx`)
- **4) Component Composition** (`src/concepts/4-ComponentComposition.jsx`)
- **5) Form Handling** (`src/concepts/5-FormHandling.jsx`)
- **6) API Integration** (`src/concepts/6-APIIntegration.jsx`)
- **7) Custom Hooks** (`src/concepts/7-CustomHooks.jsx`)
- **8) Context API** (`src/concepts/8-ContextAPI.jsx`)
- **9) Performance** (`src/concepts/9-Performance.jsx`)

## 🧩 Mini Project

**TaskFlow** (`src/mini-project/TaskFlow.jsx`) is a tiny task board with a nicer UI that demonstrates:

- `useReducer` for state transitions
- Derived state with `useMemo` (filters + columns)
- Memoized component (`React.memo`) and stable handlers (`useCallback`)
- Form submission + async simulation
- Side effects (`useEffect`) + persistence (localStorage)
- `useRef` as an “escape hatch” for fast input

## ✅ Key Concepts Checklist

This repo covers many fundamentals. For a “complete” senior-level React toolkit, the next topics to add are:

- **Rendering model**: reconciliation, keys, list rendering, StrictMode behavior
- **State**: co-locating state, lifting state, derived state, reducers
- **Effects**: lifecycle, cleanup, avoiding stale closures
- **Refs**: DOM access + non-rendering values
- **Portals**: modals/tooltips
- **Error boundaries**: runtime UI recovery
- **Routing**: `react-router-dom`, nested routes, data routers
- **Data fetching**: caching, retries, abort/cancel, optimistic updates
- **Performance**: memoization, virtualization, code-splitting, suspense
- **Testing**: React Testing Library + Vitest
- **TypeScript**: props typing, reducer unions, hook typing
- **Accessibility**: focus management, keyboard nav, ARIA patterns

## ✨ Best Practices

- Keep components small and focused
- Keep state minimal; prefer derived values (memoize only if expensive)
- Update objects/arrays immutably (create new references)
- Handle loading/error states for async work
- Optimize after measuring (don’t “prematurely memoize”)

## 📚 Resources

- [React Official Documentation](https://react.dev/)
- [React Hooks Reference](https://react.dev/reference/react)
- [Vite Documentation](https://vitejs.dev/)