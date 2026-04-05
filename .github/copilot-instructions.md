---
description: Portfolio repository-wide Copilot instructions
applyTo: "**"
---

# Portfolio - Copilot Instructions

## Project Overview

This repository is a full-stack portfolio platform with project management, backlog tracking, and statistics dashboards.

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS v4, DaisyUI 5
- Backend: Node.js, Express 5, MongoDB, Mongoose
- Tooling: ESLint, TypeScript strict checks
- Design system: Curated Canvas theme and DaisyUI component rules

## Conventions

- Naming:
  - React components use PascalCase.
  - Functions and variables use camelCase.
  - Constants use UPPER_SNAKE_CASE.
  - Route folders in Next.js use lowercase and hyphen-separated names.
- Structure:
  - Frontend code lives in frontend with App Router pages under frontend/app.
  - Shared UI components live in frontend/app/components.
  - Backend API routes live in backend/routes and models in backend/models.
  - Keep frontend and backend concerns separated.
- Error handling:
  - API routes return structured JSON with appropriate HTTP status codes.
  - Validate external input before database or business logic execution.
  - Avoid swallowing exceptions; return safe messages and keep diagnostic detail in logs.

## Workflow

- Prefer small, focused pull requests with clear scope.
- Branch naming convention: feature/<short-description>, fix/<short-description>, chore/<short-description>.
- Use Conventional Commits for commit messages.
- Ensure linting and tests pass before opening or merging pull requests.

Reference instruction files for detailed standards:

- Language guidelines: .github/instructions/typescript.instructions.md
- Testing: .github/instructions/testing.instructions.md
- Security: .github/instructions/security.instructions.md
- Documentation: .github/instructions/documentation.instructions.md
- Performance: .github/instructions/performance.instructions.md
- Code review: .github/instructions/code-review.instructions.md

Project-specific design guidance:

- .github/instructions/design.instructions.md
- .github/instructions/daisyui.instructions.md
