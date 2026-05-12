---
name: Sanctuary Design System
colors:
  surface: "#f8f9ff"
  surface-dim: "#cbdbf5"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4ff"
  surface-container: "#e5eeff"
  surface-container-high: "#dce9ff"
  surface-container-highest: "#d3e4fe"
  on-surface: "#0b1c30"
  on-surface-variant: "#44474e"
  inverse-surface: "#213145"
  inverse-on-surface: "#eaf1ff"
  outline: "#74777f"
  outline-variant: "#c4c6cf"
  surface-tint: "#495f84"
  primary: "#000000"
  on-primary: "#ffffff"
  primary-container: "#001b3d"
  on-primary-container: "#6f84ac"
  inverse-primary: "#b1c7f2"
  secondary: "#8c5000"
  on-secondary: "#ffffff"
  secondary-container: "#fe9c2d"
  on-secondary-container: "#683a00"
  tertiary: "#010000"
  on-tertiary: "#ffffff"
  tertiary-container: "#3c0800"
  on-tertiary-container: "#ee491c"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d6e3ff"
  primary-fixed-dim: "#b1c7f2"
  on-primary-fixed: "#001b3d"
  on-primary-fixed-variant: "#31476b"
  secondary-fixed: "#ffdcbf"
  secondary-fixed-dim: "#ffb874"
  on-secondary-fixed: "#2d1600"
  on-secondary-fixed-variant: "#6a3b00"
  tertiary-fixed: "#ffdbd2"
  tertiary-fixed-dim: "#ffb4a2"
  on-tertiary-fixed: "#3c0800"
  on-tertiary-fixed-variant: "#891e00"
  background: "#f8f9ff"
  on-background: "#0b1c30"
  surface-variant: "#d3e4fe"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "500"
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is anchored in a philosophy of "Sacred Professionalism." It balances the administrative rigor required for modern church management with the warmth and accessibility essential to a community-focused organization. By moving away from cold, tech-centric purples toward a palette of deep midnight blues and harvest golds, the interface feels established and trustworthy.

The style is a refined **Corporate Modern** aesthetic. It utilizes clean lines, generous whitespace, and a clear information hierarchy to reduce cognitive load for administrators. The visual language is intentionally grounded, avoiding excessive flair in favor of functional clarity and a welcoming atmosphere.

## Colors

This design system utilizes a high-fidelity color palette derived from foundational brand assets. The **Primary Midnight (#001B3D)** provides a stable, authoritative base for navigation, headers, and primary text, replacing traditional SaaS blues with a deeper, more liturgical tone.

**Gold Accent (#FF9D2E)** is used strategically for high-priority actions and celebratory highlights, evoking warmth and light. **Vermillion (#F74F22)** is reserved for urgent notifications, energy-focused metrics, or secondary highlights.

The neutral palette leverages cool grays to maintain a crisp, professional look, ensuring that the primary gold and blue tones remain the focal points of the user experience.

## Typography

The design system exclusively employs **Inter** to ensure maximum legibility across dense administrative dashboards. The type scale is built on a modular grid, prioritizing clear vertical rhythm.

- **Headlines:** Use tighter letter spacing and semi-bold weights in the primary midnight color to establish hierarchy.
- **Body Text:** Standardized at 16px for optimal readability in long-form reports and member profiles.
- **Labels:** Set in uppercase with increased letter spacing when used for metadata or category tags to distinguish them from interactive body text.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for main content areas, with fixed-width constraints for sidebar navigation. The spacing rhythm is based on a 4px baseline, ensuring all elements—from icons to margins—align to a consistent geometric scale.

Layouts should prioritize "breathing room" around data-heavy tables. Use the `lg` (24px) spacing unit for standard padding within cards and containers to maintain a sense of openness and calm.

## Elevation & Depth

Visual depth in this design system is achieved through **Tonal Layering** and subtle **Ambient Shadows**. Instead of heavy borders, the UI uses varying shades of off-white and very light gray to separate the background from the foreground.

- **Level 0 (Background):** Solid off-white (#F8FAFC).
- **Level 1 (Cards/Surface):** Pure white (#FFFFFF) with a soft, 4% opacity neutral shadow.
- **Level 2 (Dropdowns/Modals):** Pure white with a more pronounced 12% opacity shadow to indicate a distinct "lift" from the page.

Shadows should be tinted with a hint of the primary blue to prevent them from looking "dirty" or muddy on the screen.

## Shapes

The design system uses a **Rounded** shape language to reinforce the "welcoming" brand pillar. Sharp corners are avoided to minimize the clinical feel of traditional SaaS software.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Dashboard widgets and main content areas use a 1rem (16px) radius.
- **Search Bars/Tags:** Use a fully rounded (pill) shape to distinguish them as distinct utility elements.

## Components

### Buttons

- **Primary:** Solid Midnight (#001B3D) with White text. High-emphasis actions.
- **Secondary:** Solid Gold (#FF9D2E) with Midnight text. Used for "Add New" or "Growth" actions.
- **Ghost:** Transparent background with Midnight border and text. Used for secondary navigation or tertiary actions.

### Input Fields

Inputs feature a subtle 1px border in a light neutral gray. On focus, the border transitions to Primary Midnight with a soft Gold outer glow (2px) to provide clear visual feedback without being harsh.

### Cards

Cards are the primary organizational unit. They must feature a 16px corner radius and a subtle ambient shadow. For "Highlighted" cards (e.g., upcoming events), a 4px top-border in Gold should be added.

### Chips & Tags

Used for member status (e.g., "Active," "Visitor"). These should use desaturated versions of the brand colors with high-contrast text to ensure accessibility standards are met.

### Navigation

The sidebar uses the Primary Midnight color as a background with 70% opacity white text for inactive states and 100% white text with a Gold left-indicator for active states.
