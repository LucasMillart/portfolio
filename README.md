# Portfolio

Full-stack portfolio platform with project catalog and backlog timeline tracking.

## What This Repository Contains

- `frontend`: Next.js app (App Router, React 19, TypeScript, Tailwind v4, daisyUI 5)
- `backend`: Express API with MongoDB + Mongoose
- `.github`: repository instructions and workflow conventions

## Documentation Map

- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Structure: [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md)
- Frontend details: [frontend/README.md](./frontend/README.md)
- Backend API details: [backend/README.md](./backend/README.md)

## Quick Start

Prerequisites:

- Node.js 20+
- npm 10+
- MongoDB instance (local or cloud)

1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

2. Configure environment files

Backend `.env` (from `backend/.env.example`):

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

Frontend `.env.local` (from `frontend/.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run backend

```bash
cd backend
npm run dev
```

4. Run frontend

```bash
cd frontend
npm run dev
```

5. Open app

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:5000/api/health`

## Runtime Behavior

- `/` serves the projects experience through `app/page.tsx` re-export.
- `/projects` fetches projects from `GET /api/projects`.
- `/project/[id]` fetches backlog detail from `GET /api/backlogs/project/:projectId`.

## API Surface (Current)

- `GET /api/health`
- Projects: `GET /api/projects`, `GET /api/projects/:id`, `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`
- Backlogs: `GET /api/backlogs`, `GET /api/backlogs/project/:projectId`, `POST /api/backlogs`, `POST /api/backlogs/:backlogId/items`, `PUT /api/backlogs/:backlogId/items/:itemId`, `DELETE /api/backlogs/:backlogId/items/:itemId`

## Operational Notes

- Backend startup fails fast if `MONGODB_URI` is missing.
- CORS allowed origin is controlled by `CORS_ORIGIN`.
- Frontend theme is persisted in `localStorage` with allowed-theme validation.
