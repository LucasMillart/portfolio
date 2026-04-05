---
applyTo: "**/*.{ts,tsx,js,mjs,cjs}"
description: "Development standards for TypeScript and Node.js in this repository"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/nextjs-tailwind.instructions.md -->
<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/nodejs-javascript-vitest.instructions.md -->

# TypeScript and Node.js coding standards

Apply the repository-wide guidance from ../copilot-instructions.md to all code.

## General Guidelines

- Prefer TypeScript for frontend and shared logic, with strict typing and explicit interfaces at boundaries.
- Keep Express backend modules focused and predictable, with clear separation of route, validation, and data access concerns.
- Use idiomatic async patterns and avoid mixed callback and promise styles.
- Keep code readable and composable; prefer small functions and explicit naming over implicit behavior.

## Next.js App Router

- Default to server components where client-only behavior is not required.
- Keep client components narrow and focused on interactivity.
- Ensure loading, error, and empty states are consistently handled at route level.
- Follow existing route and component folder conventions before introducing new patterns.

## Type Safety and Validation

- Treat external input as untrusted and validate at API boundaries before business logic.
- Use explicit return types for exported functions and public module APIs.
- Avoid any and unchecked casts unless justified by a documented constraint.
- Use consistent domain naming between frontend types and backend model contracts.

## UI and Styling Discipline

- Follow design guidance from design.instructions.md and component rules from daisyui.instructions.md.
- Prefer existing UI building blocks before introducing new styling patterns.
- Keep styling decisions semantic and theme-compatible.
- Preserve responsive behavior as a default requirement for all UI updates.
