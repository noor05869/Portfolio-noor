---
name: taste-skill
description: Anti-slop frontend skill that infers design direction from the brief and ships interfaces that do not look templated. Enforces crisp typography, dial configurations, and high craft.
---

# Taste Skill: Anti-Slop Frontend

Built for landing pages, portfolios, and redesigns. Reads the room, infers the right design direction rather than defaulting to generic templates, and eliminates blurry fog, purple gradient meshes, and copy-paste card slop.

## 0. Brief Inference & Anti-Default Discipline
- **Infer page kind & audience**: e.g., Senior engineer portfolio for technical recruiters and hiring managers.
- **Anti-default discipline**:
  - Do NOT default to AI-purple/murky mesh gradients.
  - Do NOT cover content with artificial barriers or blurry fog.
  - Do NOT make 3 equal generic cards with shallow descriptions.
  - Do NOT use low-contrast text on muddy backgrounds.
  - Deliver crisp contrast, sharp typography, and authentic visual proof of work (real screenshots, live architecture, demonstrable metrics).

## 1. The Three Dials
- `DESIGN_VARIANCE: 7` (Refined, structured with purposeful asymmetry)
- `MOTION_INTENSITY: 5` (Snappy, purposeful, <250ms, hardware-accelerated)
- `VISUAL_DENSITY: 4` (Generous breathing room, clear typographic hierarchy)

## 2. Core Frontend Rules
1. **Typography & Legibility**:
   - High contrast foreground text (`#F9FAFB`, `#F3F4F6`, `#E5E7EB`).
   - Clear secondary labels and monospace meta tags (`text-xs uppercase tracking-wider`).
   - Eliminate washed out or muddy text.
2. **Visual Proof Over Generic Placeholders**:
   - Showcase real application screenshots with high resolution, zoom lightbox, and multi-view gallery tabs.
   - Show concrete deliverables: architecture flows, stack tags, business scale, real metrics.
3. **Restraint & Craftsmanship**:
   - Every border is subtle and intentional (`border-white/10` or fine accent tint).
   - Shadows are soft, directional, and deep (`shadow-2xl` with dark ambient occlusion).
   - Micro-interactions feel crisp and tactile rather than floaty.
