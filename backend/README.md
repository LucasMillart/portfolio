# 🔧 Backend API

Express.js + MongoDB REST API for portfolio management.

## 📌 Environment Setup

Create `.env` file:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio
PORT=5000
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` — Get all projects
- `GET /api/projects/:id` — Get project details
- `POST /api/projects` — Create project
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Backlogs
- `GET /api/backlogs` — Get all backlogs
- `GET /api/backlogs/:projectId` — Get backlogs for project
- `POST /api/backlogs` — Create backlog
- `PUT /api/backlogs/:id` — Update backlog
- `DELETE /api/backlogs/:id` — Delete backlog

### Statistics
- `GET /api/stats` — Get portfolio statistics

## 📊 Database Models

### Project
```javascript
{
  name: String,
  description: String,
  imageUrl: String,
  videoUrl: String,
  technologies: [String],
  status: String, // Planning, In Progress, Completed, On Hold
  startDate: Date,
  endDate: Date,
  github: String,
  liveUrl: String
}
```

### Backlog
```javascript
{
  projectId: ObjectId,
  items: [{
    title: String,
    description: String,
    videoUrl: String,
    status: String, // Todo, In Progress, Done
    changes: [{
      description: String,
      createdAt: Date
    }]
  }]
}
```

## 🚀 Start Development

```bash
npm run dev
```

Runs on `http://localhost:5000`
