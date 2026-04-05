---
applyTo: "**/*.{ts,tsx,js,mjs,cjs}"
description: "Performance optimization standards for frontend and backend"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/performance-optimization.instructions.md -->

# Performance standards

Apply the repository-wide guidance from ../copilot-instructions.md to all code.

## General Principles

- Measure before optimizing and target verified bottlenecks.
- Prefer simple, maintainable solutions that meet performance goals.
- Optimize high-traffic paths first across pages, APIs, and database operations.
- Guard against regressions by validating performance-sensitive changes.

## Frontend Performance

- Favor efficient rendering paths and avoid unnecessary client-side work.
- Keep page payloads and assets lean, especially for initial route loads.
- Use framework-native optimizations for images, fonts, and route transitions.
- Preserve responsive performance and perceived speed with proper loading states.

## Backend and API Performance

- Avoid blocking operations in request paths and keep handlers focused.
- Minimize over-fetching and large payload transfers.
- Use pagination and bounded queries for list endpoints.
- Apply caching and memoization selectively where data access is expensive and stable.

## Database and Data Access

- Prevent repeated query anti-patterns by batching or restructuring access.
- Ensure query patterns align with index strategy and expected scale.
- Keep data transformations efficient and close to the most appropriate layer.
- Monitor and review query-heavy endpoints regularly as data volume grows.
