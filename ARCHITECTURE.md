# Architecture Overview

This repository is a full-stack portfolio platform split into two deployable applications:

- Frontend: Next.js App Router UI for project browsing and detail views.
- Backend: Express API backed by MongoDB for projects and backlogs.

## High-Level Design

The frontend consumes the backend over HTTP JSON APIs.

- Frontend runtime:
  - Server-rendered page for project listing.
  - Client-rendered page for project detail and timeline updates.
- Backend runtime:
  - REST endpoints for projects and backlogs.
  - Mongoose models for persistence.

Data flow:

1. User opens `/projects`.
2. Frontend calls `GET /api/projects`.
3. User opens `/project/[id]`.
4. Frontend calls `GET /api/backlogs/project/:projectId`.
5. API returns populated backlog + related project.

## Frontend Architecture

Entry points:

- `frontend/app/page.tsx` re-exports the projects page.
- `frontend/app/projects/page.tsx` fetches projects on the server side.
- `frontend/app/project/[id]/page.tsx` fetches backlog details on the client.

UI composition for `/projects`:

- `ProjectsHeader`
- `ProjectsSidebar`
- `ProjectsGrid`
- `ProjectsFooter`

Shared UI behavior:

- `ThemeInitializer` applies persisted theme at app startup.
- `ThemeToggle` switches between `curatedcanvas` and `curatedcanvasdark`.
- `TimelineView` renders project backlog item history.

Styling and theming:

- Tailwind CSS v4 with daisyUI 5.
- Custom daisyUI themes declared in `frontend/app/globals.css`.
- Semantic color usage (`primary`, `base-*`, etc.) is preferred.

## Backend Architecture

Server entry point:

- `backend/server.js` configures middleware, DB connection, and route mounting.

Route modules:

- `backend/routes/projects.js`
- `backend/routes/backlogs.js`

Model modules:

- `backend/models/Project.js`
- `backend/models/Backlog.js`

Key API contracts:

- Projects CRUD at `/api/projects`.
- Backlog retrieval and nested item operations at `/api/backlogs`.
- Health endpoint at `/api/health`.

## Security and Configuration Constraints

Required backend environment variables:

- `MONGODB_URI` (required; app fails fast if missing)

Optional backend environment variables:

- `PORT` (default: `5000`)
- `CORS_ORIGIN` (default: `http://localhost:3000`)

Required frontend environment variable:

- `NEXT_PUBLIC_API_URL` (recommended explicit value, e.g. `http://localhost:5000/api`)

Notes:

- CORS is restricted through `CORS_ORIGIN`.
- Theme persistence uses `localStorage` with allowed theme validation.

## Operational Expectations

Local development:

1. Start backend first (`npm run dev` in `backend`).
2. Start frontend (`npm run dev` in `frontend`).
3. Verify `/projects` and `/project/[id]` API integration.

Failure modes:

- Backend startup fails when `MONGODB_URI` is absent.
- Frontend project list shows API error messages when backend is unavailable.

## Current Limitations

- No authentication/authorization layer currently enforced in routes.
- No dedicated test suite yet (`backend` test script is placeholder).
- API validation is schema-driven in Mongoose, not centralized request validation middleware.
