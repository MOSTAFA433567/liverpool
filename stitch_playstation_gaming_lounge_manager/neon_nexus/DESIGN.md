# Design System Strategy: High-End Cyber-Glow Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Ether."** 

This system moves away from the static, "flat" web of the past and into a high-performance, atmospheric environment. It is designed to feel like a high-end command deck—where the UI doesn't just sit on the screen but emanates light and depth. By utilizing intentional asymmetry, overlapping glass panels, and high-contrast typography, we break the "template" look. We treat the management of a gaming lounge not as a spreadsheet task, but as a tactical operation.

### Breaking the Template
*   **Asymmetry:** Use the wide desktop grid to allow for "hero" stats to break alignment, creating a dynamic, editorial flow.
*   **Atmospheric Depth:** Layers are not separated by lines, but by the "glow" and "blur" of the gaming world.
*   **Intentional Friction:** High-contrast typography scales (Space Grotesk for technical precision, Inter for utility) ensure that the most critical lounge data commands immediate attention.

---

## 2. Colors & Surface Logic

This design system utilizes a palette of "Deep Space" neutrals punctuated by "Neon Kinetic" accents.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through:
1.  **Background Color Shifts:** A `surface_container_low` section sitting against a `surface` background.
2.  **Tonal Transitions:** Using subtle gradients to suggest the end of one zone and the beginning of another.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, frosted glass panels. 
*   **Base Layer:** `surface` (#131315) for the main application background.
*   **Sectional Layers:** Use `surface_container_low` for large sidebar or navigation areas.
*   **Interactive Layers:** Use `surface_container_high` and `highest` for cards or modals. 
*   **Nesting Rule:** To create "lift," an inner container must always be at least one tier "brighter" or "dimmer" than its parent (e.g., a `surface_container_lowest` card placed on a `surface_container_low` section).

### The "Glass & Gradient" Rule
To move beyond a "standard" dark mode, use **Glassmorphism** for all floating elements (modals, dropdowns, hovered cards).
*   **Visual Soul:** Apply a subtle linear gradient to main Action Buttons, transitioning from `primary` (#a4e6ff) to `primary_container` (#00d1ff) at a 135-degree angle. This mimics the refraction of light on a premium hardware chassis.

---

## 3. Typography: The Technical Editorial
We use a dual-font approach to balance "Gamer Aesthetic" with "Managerial Utility."

*   **Display & Headlines (Space Grotesk):** This is our "Technical" voice. It’s bold, geometric, and feels engineered. Use `display-lg` for lounge capacity and `headline-md` for station categories.
*   **Body & Labels (Inter):** This is our "Utility" voice. It provides maximum legibility for customer names, timestamps, and system logs.
*   **Hierarchy Tip:** Pair a `headline-sm` in all-caps with a wide letter-spacing (0.1em) alongside a `body-md` to create a high-end, editorial look for metadata.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering**. Avoid traditional shadows on static elements. Instead, let the difference between `surface_container_lowest` and `surface_container_high` create the "stack."

### Ambient Shadows & "Neon Bleed"
When an element must "float" (like a dragged reservation or a tactical pop-up):
*   **Shadow Specs:** Large blur (24px–40px) at low opacity (8%).
*   **Tinting:** The shadow color must be a tinted version of `primary` (#00D1FF) rather than black. This creates a "glow" effect that mimics RGB lighting reflecting off a desk.

### The "Ghost Border" Fallback
If containment is required for accessibility, use a **Ghost Border**:
*   **Token:** `outline_variant` at 15% opacity.
*   **Constraint:** Never use 100% opaque borders; they shatter the "Ether" illusion.

---

## 5. Components

### Buttons: The "Power-On" State
*   **Primary:** Solid `primary_container` (#00d1ff). On `:hover`, apply a "Heavy Glow" (`box-shadow: 0 0 20px rgba(0, 209, 255, 0.5)`).
*   **Secondary:** Ghost Border style with `secondary` (#BD00FF) text.
*   **Active State:** When clicked, use a brief "RGB Flash"—a 200ms transition that shifts the border color from Neon Blue to Neon Purple.

### Cards: The "Station Panel"
*   **Style:** `8px` radius (`lg`). No borders.
*   **Background:** Use a backdrop-filter blur (12px) with a semi-transparent `surface_container_highest`.
*   **Content:** Forbid the use of divider lines. Separate "Current Player" from "Time Remaining" using `spacing-xl` (vertical white space).

### Status Indicators: The "Pulse"
*   **Available (Green):** #4CAF50.
*   **Reserved (Yellow):** #FFC107.
*   **In Use (Red):** #F44336.
*   **Rule:** Status colors should always be accompanied by a 2px "Soft Glow" to maintain the Cyber-Glow aesthetic.

### Input Fields: "Command Line"
*   **Style:** Sharp `4px` radius (`sm`). Deepest background (`surface_container_lowest`).
*   **Focus State:** The border glows `primary` (#00D1FF) and the internal text shifts to `on_surface_variant`.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace negative space. The "Wide Desktop Grid" requires room to breathe to feel premium.
*   **Do** use gradients for primary interactions to give the UI "pulse."
*   **Do** use the custom line icons at 24px with a 1.5px stroke weight for a refined, technical feel.

### Don't:
*   **Don't** use pure white (#FFFFFF) for text. Use `on_surface` (#e5e1e4) to reduce eye strain in dark environments.
*   **Don't** use rounded corners larger than 8px. This system is "Sharp & Aggressive," not "Soft & Bubbly."
*   **Don't** use traditional "Drop Shadows" (Black/Grey). If it doesn't glow, it shouldn't have a shadow.
*   **Don't** use divider lines. If content needs separation, use a background tone shift or 24px of white space.