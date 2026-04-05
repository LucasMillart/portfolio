# Frontend Application

Next.js App Router interface for browsing projects and viewing project backlog timelines.

## Routes

- `/` -> re-exports the projects page.
- `/projects` -> project list page.
- `/project/[id]` -> project detail page with latest backlog updates.

Note: `/all-backlogs` and `/stats` are not implemented in the current app router tree.

## Main Components

- `app/projects/components/ProjectsHeader.tsx`
- `app/projects/components/ProjectsSidebar.tsx`
- `app/projects/components/ProjectsGrid.tsx`
- `app/projects/components/ProjectsFooter.tsx`
- `app/components/TimelineView.tsx`
- `app/components/ThemeToggle.tsx`
- `app/components/ThemeInitializer.tsx`

## Styling and Theme

- Tailwind CSS v4 + daisyUI 5
- Custom themes in `app/globals.css`:
  - `curatedcanvas` (light)
  - `curatedcanvasdark` (dark)

Theme behavior:

- Theme is stored in `localStorage`.
- Stored values are validated against allowed theme names.

## Environment Variables

Create `frontend/.env.local` (or copy from `frontend/.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The app uses this base URL for API fetches (for example `/projects`, `/backlogs/project/:id`).

## Run

```bash
npm run dev
```

App URL: `http://localhost:3000`

## Build

```bash
npm run build
npm start
```
