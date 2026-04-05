---
applyTo: "**/*.{ts,tsx,js,mjs,cjs,md}"
description: "Code review standards and pull request quality checks"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/code-review-generic.instructions.md -->

# Code review standards

Apply the repository-wide guidance from ../copilot-instructions.md to all reviews.

## Review Priorities

- Critical: security flaws, correctness bugs, data integrity risks, and breaking contract changes.
- Important: missing tests on critical flows, clear performance regressions, and architecture drift.
- Suggestion: readability improvements, minor refactors, and documentation quality enhancements.

## Review Expectations

- Validate behavior first, style second.
- Require clear test evidence for changed behavior.
- Check error handling and user-facing failure modes.
- Confirm that documentation and naming reflect the final design.

## Portfolio-Specific Focus

- Verify frontend and backend contracts remain aligned.
- Ensure route behavior, model assumptions, and dashboard metrics remain coherent.
- Confirm adherence to design.instructions.md and daisyui.instructions.md for UI-related work.
- Check that new dependencies or patterns fit existing repository conventions.

## Pull Request Hygiene

- Keep changes scoped, reviewable, and logically grouped.
- Require clear problem statement and implementation summary.
- Flag hidden side effects and undocumented assumptions.
- Ensure linting and tests are green before approval.
