---
description: Portfolio Project Instructions for GitHub Copilot
alwaysApply: true
applyTo: "**"
---

# 💻 Portfolio Project - Copilot Instructions

## Project Overview

Full-stack portfolio (Next.js 15 + Express.js) with project management, backlog tracking, and statistics.

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, DaisyUI 5
- **Backend**: Express.js 5.2, MongoDB, Mongoose
- **Design**: See `.github/instructions/design.instructions.md` (Curated Canvas theme)

## Project Structure

```
Portfolio/
├── frontend/
│   ├── app/
│   │   ├── components/       # React components
│   │   ├── [pages]/          # App Router pages
│   │   ├── layout.tsx
│   │   └── globals.css       # Tailwind + DaisyUI themes
│   └── package.json
├── backend/
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routes
│   └── server.js
└── .github/
    ├── instructions/
    │   ├── design.instructions.md      # Design system rules
    │   └── daisyui.instructions.md    # DaisyUI v5 components
    └── copilot-instructions.md        # This file
```

## Frontend Development

### TypeScript & Components

- All components in `/app/components`, exported as default
- Use TypeScript interfaces for props
- Use `next/image` for images, `next/link` for internal navigation

### Styling

- **Reference**: `.github/instructions/design.instructions.md` for color palette and design rules
- **Components**: Use DaisyUI classes exclusively (see `.github/instructions/daisyui.instructions.md`)
- **No custom CSS** unless DaisyUI component doesn't exist
- **Forbidden**: 1px borders for sectioning (use background color shifts instead)

### Theme System

- Themes: `curatedcanvas` (light) and `curatedcanvasdark` (dark)
- Persisted in localStorage via ThemeToggle & ThemeInitializer
- HTML `data-theme` attribute controls which theme is active

## Backend Development

### Structure

- **Models**: Mongoose schemas in `/models`
- **Routes**: Express routers in `/routes`, imported in `server.js`
- **JSON responses** with proper HTTP status codes

### Environment

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio
PORT=5000
```

## Naming Conventions

- Components: `PascalCase` (e.g., `ProjectCard.tsx`)
- Pages: lowercase with hyphens
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## Common Tasks

### Add a Page

1. Create folder in `/app` (e.g., `/my-page`)
2. Create `page.tsx` with default export

### Add a Component

1. Create `/app/components/MyComponent.tsx`
2. Export as default with TypeScript interface
3. Use DaisyUI classes only

### Add API Route

1. Create `/backend/routes/myroute.js`
2. Export Express Router
3. Import and use in `server.js`

## Debugging Checklist

- ✅ TypeScript compiles without errors
- ✅ ESLint passes (use `next/image`, proper alt text)
- ✅ Theme toggle persists in localStorage
- ✅ DaisyUI classes work (verify import in globals.css)
- ✅ API endpoints match backend routes
