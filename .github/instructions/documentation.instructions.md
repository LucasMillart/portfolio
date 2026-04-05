---
applyTo: "**/*.{md,ts,tsx,js,mjs,cjs}"
description: "Documentation and maintainability standards"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/markdown-content-creation.instructions.md -->

# Documentation standards

Apply the repository-wide guidance from ../copilot-instructions.md to all documentation updates.

## General Guidelines

- Update documentation when behavior, setup, architecture, or workflow changes.
- Keep docs concise, accurate, and aligned with the current repository structure.
- Prefer practical explanations of intent and constraints over verbose narrative.
- Use consistent terminology across frontend, backend, and project management vocabulary.

## Code Documentation

- Document non-obvious business rules, assumptions, and cross-layer contracts.
- Keep comments focused on why and tradeoffs, not obvious implementation details.
- Ensure public modules and key flows are discoverable through clear naming and file organization.
- Remove stale comments and outdated TODO notes during related changes.

## Markdown Quality

- Use clear headings and short sections to improve scanability.
- Keep lists action-oriented and unambiguous.
- Ensure links and file references point to existing project artifacts.
- Maintain consistent formatting conventions across markdown files.

## Change Communication

- Reflect major feature updates in README files where users or contributors rely on them.
- Capture known limitations, risks, and migration notes when introducing structural changes.
- Document expected inputs and outputs for APIs and automation scripts.
- Keep onboarding guidance aligned with current commands and prerequisites.
