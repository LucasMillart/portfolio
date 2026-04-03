# 🎨 Frontend Application

Next.js 15 portfolio interface with DaisyUI components.

## 📋 Pages

- `/` — Home page with portfolio overview
- `/projects` — Projects grid with search/filtering
- `/projects/[id]` — Project details with backlog timeline
- `/all-backlogs` — Global backlogs view with filters
- `/stats` — Statistics dashboard

## 🎯 Components

- `Navbar` — Navigation with theme toggle
- `ProjectCard` — Reusable project card
- `TimelineView` — Vertical timeline for backlog changes
- `ThemeToggle` — Light/dark mode switcher
- `ThemeInitializer` — Theme persistence

## 🎨 Design System

**Theme**: "Curated Canvas"
- Light mode: Warm, muted colors
- Dark mode: High contrast, sophisticated palette

**DaisyUI Components Used**:
- Navbar, Card, Hero, Timeline, Stats, Badge, Button, Divider, etc.

## ⚙️ Configuration

- `globals.css` — Tailwind v4 + DaisyUI themes
- `tailwind.config.ts` — Tailwind configuration
- `next.config.ts` — Next.js configuration

## 🌐 API Integration

Frontend fetches from backend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Start Development

```bash
npm run dev
```

Runs on `http://localhost:3000`

## 🔄 Build & Deploy

```bash
npm run build
npm start
```
