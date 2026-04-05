# Project Structure

This document describes the current folder organization and ownership boundaries.

## Repository Root

- `README.md`: main entry point for setup and navigation.
- `ARCHITECTURE.md`: system design and runtime interactions.
- `PROJECT-STRUCTURE.md`: repository map and responsibilities.
- `.github/`: repository instructions, skills, and contribution automation.
- `frontend/`: Next.js web application.
- `backend/`: Express + MongoDB API.

## Frontend (`frontend/`)

Configuration and tooling:

- `package.json`: scripts (`dev`, `build`, `start`, `lint`).
- `tsconfig.json`: TypeScript configuration.
- `eslint.config.mjs`: linting rules.
- `postcss.config.mjs`: PostCSS/Tailwind integration.
- `next.config.ts`: Next.js configuration.

Application code:

- `app/layout.tsx`: global layout and theme initialization.
- `app/globals.css`: Tailwind + daisyUI setup and custom themes.
- `app/page.tsx`: root route redirect/export.
- `app/components/`: shared UI components.
- `app/projects/`: projects list route and local components.
- `app/project/[id]/`: project detail route.

Public assets:

- `public/`: static assets served by Next.js.

## Backend (`backend/`)

Runtime and scripts:

- `server.js`: API server bootstrap.
- `package.json`: scripts (`dev`, `start`, `seed:test-data`).
- `scripts/seed-test-data.js`: local DB seeding utility.

Domain models:

- `models/Project.js`: project schema/model.
- `models/Backlog.js`: backlog and nested backlog item schema/model.

HTTP API routes:

- `routes/projects.js`: projects CRUD endpoints.
- `routes/backlogs.js`: backlog retrieval and nested item operations.

## Ownership Boundaries

- Frontend should not contain backend persistence logic.
- Backend should not include frontend rendering concerns.
- Cross-layer contracts are expressed through API payloads and environment variables.

## Environment Files

- `backend/.env.example`: backend required/optional variables.
- `frontend/.env.example`: frontend API base URL variable.

## Practical Navigation

When changing UI screens:

1. Start in `frontend/app/projects/` or `frontend/app/project/[id]/`.
2. Follow imports into `frontend/app/components/`.

When changing API behavior:

1. Update route handler in `backend/routes/`.
2. Align schema in `backend/models/` if data shape changes.
3. Reflect contract changes in frontend fetch logic.
