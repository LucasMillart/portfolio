# Design System Documentation: The Curated Canvas

## 1. Overview & Creative North Star

This design system is built upon the **"Curated Canvas"** philosophy. While inspired by the utility-first efficiency of systems like daisyUI, it transcends standard frameworks by treating every interface as a high-end editorial layout.

The goal is to provide a "Utility-Plus" experience: the speed and clarity of a functional tool paired with the intentionality of a premium digital gallery. We break the "template" look by utilizing heavy horizontal breathing room, intentional asymmetry in content blocks, and a sophisticated hierarchy of layered surfaces rather than rigid structural lines.

**Creative North Star: The Curated Canvas**

- **Intentionality over Density:** Every element must earn its place.
- **Atmospheric Depth:** Depth is achieved through light and tone, not just shadows.
- **Editorial Authority:** Typography isn't just readable; it's a structural element that guides the eye.

---

## 2. Colors & Surface Philosophy

We utilize a warm, muted palette that trades high-vibrancy "tech" colors for organic, professional tones. The foundation is a soft, neutralized gray that allows our primary accent—a sophisticated, muted orange—to feel authoritative yet friendly.

### The "No-Line" Rule

To achieve a high-end editorial feel, **1px solid borders are prohibited for sectioning.** Boundaries between major UI sections must be defined solely through background color shifts. For example, a sidebar using `surface-container-low` should sit against a `surface` background without a stroke.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of fine paper. Use the Material tiers to define importance through "Tonal Layering":

- **Base Layer:** `surface` (#f8f9fb) – The global background.
- **Mid Layer:** `surface-container-low` (#f1f4f7) – Used for secondary content areas or background groupings.
- **Top Layer (Cards):** `surface-container-lowest` (#ffffff) – Reserved for primary cards and interactive elements to provide maximum "lift."

### The "Glass & Gradient" Rule

For floating elements (modals, dropdowns, or sticky headers), utilize **Glassmorphism**. Apply `surface-container-lowest` at 80% opacity with a `backdrop-blur` of 12px. To add "soul" to the primary CTAs, use a subtle linear gradient transitioning from `primary` (#914d00) at the top left to `primary_container` (#fe932c) at the bottom right.

---

## 3. Typography

We use **Inter** exclusively. Its neutral, architectural quality provides the "utility" feel while our specific scale provides the "editorial" polish.

- **Display & Headlines:** Use `display-md` and `headline-lg` for hero sections. These should be tight-leading (tracking -0.02em) to feel like a magazine masthead.
- **Titles:** `title-lg` (1.375rem) is our standard for card headers. It provides a clear anchor for the content below.
- **Body:** `body-md` (0.875rem) is the workhorse. It ensures high information density without sacrificing legibility.
- **Labels:** Use `label-md` for all-caps metadata or small tags to create a "technical" utility look that balances the large editorial headlines.

---

## 4. Elevation & Depth

Depth in this system is a result of light physics, not CSS defaults.

### The Layering Principle

Achieve hierarchy by "stacking" tones. Place a `surface-container-lowest` card atop a `surface-container-low` background. This creates a soft, natural lift that feels integrated into the environment.

### Ambient Shadows

Shadows should be felt, not seen. When a floating effect is required:

- **Blur:** 24px - 40px.
- **Opacity:** 4% - 6%.
- **Color:** Use a tinted version of `on-surface` (#2d3337) to mimic natural ambient occlusion.

### The "Ghost Border" Fallback

If a border is required for accessibility (e.g., in forms), use a **Ghost Border**. Apply `outline-variant` at 15% opacity. Never use 100% opaque borders for decorative containment.

---

## 5. Components

### Buttons

- **Primary:** A rounded-lg (`1rem`) container using the Primary-to-Primary-Container gradient. Text is `on-primary` (#fff7f4).
- **Secondary:** `surface-container-high` background with `on-surface` text. No border.
- **Interaction:** On hover, primary buttons should shift +2px upward with an increased ambient shadow.

### Cards (The Core Aesthetic)

- **Style:** Background `surface-container-lowest` (#ffffff).
- **Radius:** `rounded-lg` (1rem).
- **Rule:** **Forbid divider lines.** Separate internal card content (e.g., header vs. body) using vertical white space (1.5rem to 2rem) or a subtle shift to `surface-container` for the footer.

### Input Fields

- **Structure:** Background `surface-container-lowest`.
- **Border:** 1px Ghost Border (`outline-variant` at 20%).
- **Focus State:** The border transitions to `primary` at 100% opacity with a soft 4px `primary-fixed-dim` outer glow.

### Chips & Tags

- **Visual:** Use `secondary-container` with `on-secondary-container` text.
- **Shape:** `full` (pill-shaped) to contrast against the `rounded-lg` cards.

---

## 6. Do's and Don'ts

### Do

- **Do** use asymmetrical layouts. If you have a 3-column grid, let one column be 50% wider than the others to create visual interest.
- **Do** use "Optical Centering." Items inside cards should often have more padding on the bottom than the top to feel visually balanced.
- **Do** leverage `title-sm` for small labels that need to feel authoritative.

### Don't

- **Don't** use black (#000000) for text. Always use `on-surface` (#2d3337) to maintain the soft gray aesthetic.
- **Don't** use standard shadows. If the shadow looks like a "drop shadow," it is too dark. It should look like a "glow of darkness."
- **Don't** cram content. If a section feels "busy," increase the background contrast between the section and the base `surface` instead of adding lines.

---

## 7. Token Summary Reference

| Category           | Token   | Value           |
| :----------------- | :------ | :-------------- |
| **Foundation**     | Surface | #f8f9fb         |
| **Primary Accent** | Primary | #914d00         |
| **Rounding**       | lg      | 1rem (16px)     |
| **Type**           | Body-md | Inter, 0.875rem |
| **Container**      | Lowest  | #ffffff         |
