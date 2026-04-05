---
applyTo: "**/*.{ts,tsx,js,mjs,cjs}"
description: "Security best practices based on OWASP principles"
---

<!-- Based on/Inspired by: https://github.com/github/awesome-copilot/blob/main/instructions/security-and-owasp.instructions.md -->

# Security standards

Apply the repository-wide guidance from ../copilot-instructions.md to all code.

## Core Security Principles

- Default to least privilege and deny-by-default authorization decisions.
- Treat all external input as untrusted and validate before processing.
- Prefer safe defaults for configuration, transport, and error handling.
- Make security-relevant decisions explicit in route and data-access layers.

## Input and Output Safety

- Validate and sanitize request payloads, query parameters, and route params.
- Prevent injection risks by avoiding direct string interpolation into queries or commands.
- Avoid rendering unsanitized user-controlled HTML in frontend code.
- Enforce strict schema expectations at API boundaries.

## Secrets and Sensitive Data

- Never hardcode secrets, tokens, credentials, or internal endpoints.
- Use environment variables and secure configuration handling for secrets.
- Avoid logging sensitive data in plain text.
- Ensure error responses do not leak internals while retaining useful diagnostics in server logs.

## Auth, Access, and Dependency Hygiene

- Verify authentication and authorization checks for protected routes.
- Apply rate limiting or abuse controls on sensitive endpoints where needed.
- Keep dependencies current and monitor known vulnerabilities.
- Review security impact for any new third-party service or package.
