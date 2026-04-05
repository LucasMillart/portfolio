---
applyTo: "**/*.{ts,tsx,js,mjs,cjs}"
description: "Testing standards for frontend and backend changes"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/code-review-generic.instructions.md -->

# Testing standards

Apply the repository-wide guidance from ../copilot-instructions.md to all tests.

## Test Scope

- Add or update tests for every behavior change in routes, UI state transitions, and business logic.
- Prioritize critical flows first: project CRUD, backlog operations, and dashboard/statistics calculations.
- Cover success, failure, and edge-case paths for each changed behavior.
- Keep tests independent, deterministic, and suitable for CI execution.

## Test Quality

- Use descriptive test names that state expected behavior.
- Keep each test focused on a single behavior or rule.
- Assert outcomes that matter to users or API consumers, not internal implementation details.
- Avoid brittle coupling to non-public internals unless unavoidable and documented.

## Frontend Testing

- Validate rendering states and user interactions for modified components and pages.
- Verify accessibility-relevant behavior for form controls, navigation, and dynamic content.
- Include responsive or layout-related assertions when behavior differs across breakpoints.
- Ensure theme-dependent UI behavior remains correct after style or component changes.

## Backend Testing

- Validate request parsing, input validation, and response contract shape.
- Assert status codes and error payload consistency for invalid and exceptional inputs.
- Isolate data-layer behavior where possible and protect against regression in route logic.
- Ensure tests do not rely on hidden state from other tests.
