# Design System Specification: The Kinetic Vault

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Vault."** 

This is not a static interface; it is a high-performance environment where light is the primary architect. We are moving away from the "boxy" nature of standard web apps toward a digital space that feels like a high-end gaming HUD crossed with a luxury editorial layout. We achieve this through **Atmospheric Depth**—using soft neon glows and glassmorphism to create a sense of infinite space behind the screen.

To break the "template" look, designers must embrace intentional asymmetry. Large, aggressive headlines should be offset by generous negative space, and interactive elements should feel like they are floating in a pressurized, dark vacuum.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, void-like foundation, punctuated by high-energy neon pulses.

### Surface Hierarchy & The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to define sections. 
Boundaries must be created through **Tonal Transitions**. 
*   **Base Layer:** Use `surface` (#131316) for the main background.
*   **Recessed Elements:** Use `surface-container-lowest` (#0e0e11) for input fields or areas that should feel "carved out" of the interface.
*   **Elevated Elements:** Use `surface-container-low` (#1b1b1e) or `surface-container` (#1f1f22) for cards to create a soft, natural lift.

### The "Glass & Gradient" Rule
To achieve the "High-End Gaming" feel, standard flat containers are insufficient.
*   **Signature Gradients:** For primary CTAs and Hero moments, use a linear gradient from `primary` (#a4e6ff) to `primary-container` (#00d1ff) at a 135-degree angle.
*   **Atmospheric Glow:** Use the `secondary` token (PlayStation Purple) as a soft, blurred background orb (150px - 300px blur) behind major components to provide "soul" to the dark mode.

---

## 3. Typography: The Tech-Editorial Edge
We pair the brutalist, tech-forward geometry of **Space Grotesk** with the hyper-legibility of **Inter**.

*   **Display & Headlines (Space Grotesk):** Use `display-lg` to `headline-sm` for high-impact messaging. These should be tracked slightly tighter (-2% to -4%) to feel like a high-end magazine header.
*   **Body & Utility (Inter):** Use `body-md` for general content. Inter provides the necessary "techy" neutrality that balances the aggressive headlines.
*   **Information Density:** Use `label-md` in all-caps with 5% letter spacing for status indicators and technical metadata to mimic a flight-simulator HUD.

---

## 4. Elevation & Depth
Depth in this design system is achieved through light emission, not physical shadows.

*   **The Layering Principle:** Stack `surface-container` tiers. A `surface-container-highest` (#353438) card sitting on a `surface-container-low` (#1b1b1e) background creates a sophisticated, understated hierarchy.
*   **Ambient Glows:** Instead of black shadows, use a glow effect for floating elements. Use the `primary` color at 10% opacity with a 20px-40px blur. This makes the component look like it is emitting light onto the surface below.
*   **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use the `outline-variant` (#3c494e) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism Specs:** 
    *   Background: `surface-container-low` at 60% opacity.
    *   Backdrop Blur: 12px to 20px.
    *   Edge: A top-down 1px gradient stroke (White at 10% to White at 0%) to simulate a light catch on a glass edge.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. Corner radius: `md` (0.375rem). No border. High-density shadow using a 10% `primary` glow.
*   **Secondary:** Ghost style. `outline` border at 20% opacity. Text in `primary`.
*   **Tertiary:** No background. Text in `on_surface_variant`. Underline only on hover.

### Cards
*   **Rule:** Forbid divider lines.
*   **Style:** Use `surface-container-low` with a `lg` (0.5rem) corner radius. Separate internal content groups using 24px–32px of vertical white space.
*   **Interactive State:** On hover, shift the background to `surface-container-high` and increase the `primary` ambient glow.

### Status Indicators
Status is communicated through "Neon Pips"—small, glowing circles accompanied by label-sm text.
*   **Available:** `Green` (custom) with a 4px outer glow.
*   **In Use:** `primary_container` (#00d1ff).
*   **Reserved:** `tertiary_container` (#feb127).
*   **Maintenance:** `outline` (#859399) with 50% opacity on the parent container.

### Input Fields
*   **Style:** Recessed appearance using `surface-container-lowest`. 
*   **Focus State:** The "Ghost Border" becomes `primary` at 50% opacity, and a subtle `primary` inner-shadow (4px blur) is applied to make the field feel "activated."

### Gaming-Specific: The "HUD" Header
Use a thin, full-width `surface-container-highest` bar at the top of sections, but instead of a bottom border, use a 2px tall `primary` line that only spans 10% of the width, positioned asymmetrically to the left or right to indicate "system loading" or "active focus."

---

## 6. Do's and Don'ts

### Do:
*   **Do** use overlapping elements. A card can slightly overlap a headline to create a sense of three-dimensional space.
*   **Do** use subtle motion. Hover states should feel "pressurized"—slight scales (1.02x) and glow intensifications.
*   **Do** use `surface-bright` for moments of extreme importance to break the dark aesthetic.

### Don't:
*   **Don't** use pure black (#000000). Use `surface` (#131316) to maintain tonal depth.
*   **Don't** use 100% opaque borders. They kill the "Atmospheric" vibe.
*   **Don't** use standard drop shadows. If it doesn't look like it's emitting light, it doesn't belong in the Vault.
*   **Don't** crowd the UI. The high-end gaming aesthetic relies on the "luxury of space." If in doubt, add 16px of padding.