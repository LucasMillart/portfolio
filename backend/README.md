# Backend API

Express + MongoDB REST API for projects and backlogs.

## Environment Setup

Create `backend/.env` (or copy from `backend/.env.example`):

Important:

- `MONGODB_URI` is required. Server startup fails if missing.
- `CORS_ORIGIN` controls allowed frontend origin.

## Run

```bash
npm run dev
```

Server base URL: `http://localhost:5000`

Health check:

- `GET /api/health`

## API Endpoints

### Projects

- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Backlogs

- `GET /api/backlogs`
- `GET /api/backlogs/project/:projectId`
- `POST /api/backlogs`
- `POST /api/backlogs/:backlogId/items`
- `PUT /api/backlogs/:backlogId/items/:itemId`
- `DELETE /api/backlogs/:backlogId/items/:itemId`

Note: There is currently no `/api/stats` endpoint.

## Data Models

### Project

```js
{
  name: String,
  description: String,
  imageUrl: String | null,
  videoUrl: String | null,
  technologies: string[],
  status: "planning" | "in-progress" | "completed" | "on-hold",
  startDate?: Date,
  endDate?: Date,
  github?: String,
  liveUrl?: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Backlog

```js
{
  projectId: ObjectId,
  items: [
    {
      title: String,
      description: String,
      videoUrl: String | null,
      status: "todo" | "in-progress" | "done",
      changes: [{ change: String, timestamp: Date }],
      createdAt: Date,
      updatedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Seed Test Data

```bash
npm run seed:test-data
```
