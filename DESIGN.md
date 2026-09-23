---
name: StudentIS
description: A precise academic operations interface built around connected records.
colors:
  academic-cobalt: "#0b63f3"
  academic-cobalt-deep: "#084dcc"
  registrar-ink: "#102a43"
  porcelain-workspace: "#f4f7fb"
  paper-white: "#ffffff"
  ruled-line: "#d8e2ef"
  field-line: "#cbd8e7"
  body-ink: "#20304a"
  secondary-ink: "#60728a"
typography:
  headline:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  control: "8px"
  surface: "12px"
spacing:
  control-x: "16px"
  control-y: "8px"
  surface: "24px"
  page: "32px"
components:
  button-primary:
    backgroundColor: "{colors.academic-cobalt}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
    height: "40px"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.surface}"
    padding: "24px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
    height: "40px"
---

# Design System: StudentIS

## Overview

**Creative North Star: "The Registrar's Dossier"**

StudentIS translates the precision of an academic examination packet and registrar dossier into a modern operational interface. Ruled structure, compact labels, tabular rhythm, and an ink-like navigation rail make information feel ordered without turning the product into a paper imitation.

The system is restrained, trustworthy, and dense enough for repeated administrative use. Familiar controls stay familiar. Visual character comes from the relationship between deep registrar ink, porcelain workspace surfaces, cobalt marks, and disciplined rules.

**Key Characteristics:**

- One dark navigation rail against a quiet light workspace.
- Cobalt appears only for action, selection, focus, and active state.
- Continuous ruled groups replace grids of floating statistic cards.
- One humanist sans family carries interface, labels, and data.

## Colors

The palette behaves like ink on cool institutional paper, with a single saturated mark color.

### Primary

- **Academic Cobalt:** Primary actions, active navigation, focus, and selected state only.
- **Academic Cobalt Deep:** Hover and pressed emphasis for the primary action family.

### Neutral

- **Registrar Ink:** Navigation, high-emphasis headings, and dark institutional surfaces.
- **Porcelain Workspace:** The application canvas behind content surfaces.
- **Paper White:** Forms, ledgers, cards, and utility chrome.
- **Ruled Line:** Structural dividers and surface borders.
- **Body Ink:** Default readable foreground.
- **Secondary Ink:** Supporting copy and metadata.

**The Cobalt Mark Rule.** Cobalt identifies what is actionable, selected, or focused. It is not decorative fill.

## Typography

**Display Font:** Self-hosted Source Sans 3 with system sans fallback  
**Body Font:** Self-hosted Source Sans 3 with system sans fallback

**Character:** A single humanist sans keeps dense product information familiar and calm. Weight, spacing, and rules establish hierarchy instead of a decorative display face.

### Hierarchy

- **Headline** (600, 2rem, 1.15): Page titles with tight tracking.
- **Title** (600, 1.125rem, 1.4): Surface and section headings.
- **Body** (400, 0.875rem, 1.5): Interface copy and table content.
- **Label** (600, 0.75rem, 1.4): Navigation groups, metadata, and compact controls.

**The One-Family Rule.** Product hierarchy comes from scale and weight, never from mixing display and body families.

## Layout

The desktop shell uses a fixed 17rem navigation rail and a fluid workspace capped at 1600px. Pages use 32px desktop edges, 24px tablet edges, and 16px mobile edges. Dense records stay horizontally scrollable rather than collapsing into ambiguous cards. Below the large breakpoint, navigation becomes an off-canvas drawer and the workspace returns to the full viewport.

Metric summaries form one ruled band. Data tables use a quiet header field and 56px body rows. Forms group related information into clear surfaces with a 16px internal grid.

## Elevation & Depth

The interface is flat by default. Borders and tonal separation establish structure; a very soft, offset ambient shadow is reserved for white surfaces and temporary overlays. No colored halos or double border-plus-heavy-shadow treatment.

**The Ruled Surface Rule.** Prefer one hairline border to multiple layers of decorative elevation.

## Shapes

Controls use gently curved 8px corners. Surfaces use 12px corners. Status badges use a compact 6px rounded rectangle rather than a pill. Circular geometry is reserved for avatars and true point indicators.

## Components

### Buttons

- **Shape:** Compact 8px corners with a 40px minimum height.
- **Primary:** Academic cobalt, white text, and restrained ambient depth.
- **Hover / Focus:** Deepen cobalt on hover; use a visible two-pixel cobalt focus ring. Press feedback scales to 0.97 for 160ms.
- **Secondary / Ghost:** White ruled secondary controls and quiet tonal ghost controls.

### Chips

- **Style:** Compact status rectangles with semantic tint, matching text, and an inset hairline ring.
- **State:** Semantic colors communicate actual state only.

### Cards / Containers

- **Corner Style:** 12px.
- **Background:** Paper white on porcelain workspace.
- **Shadow Strategy:** Soft ambient shadow only where separation needs help.
- **Border:** One ruled-line border.
- **Internal Padding:** 20px to 24px.

### Inputs / Fields

- **Style:** White field, field-line stroke, 8px corner, and 40px minimum height.
- **Focus:** Cobalt focus ring with a white offset.
- **Error / Disabled:** Semantic red for validation; quiet gray-blue fill and text for disabled state.

### Navigation

The deep registrar-ink rail uses blue-tinted white labels. The active route becomes a solid cobalt marker with white type; inactive items use a quiet tonal hover. Group labels are compact uppercase metadata, not page-heading eyebrows.

### Metric Ledger

Dashboard statistics share one continuous ruled surface. Each metric owns a cell, not a floating card, and uses tabular numerals for fast comparison.

## Do's and Don'ts

### Do:

- **Do** reserve cobalt for action and state.
- **Do** group related metrics and records with shared rules.
- **Do** keep tables dense, legible, and horizontally scrollable on narrow screens.
- **Do** provide loading, empty, error, disabled, hover, focus, and success states.

### Don't:

- **Don't** use gradients, glass surfaces, or purple accents.
- **Don't** rebuild dense records as stacks of decorative cards.
- **Don't** animate data the user is reading; motion exists for feedback and spatial state.
- **Don't** mix corner systems or introduce a second icon language.
