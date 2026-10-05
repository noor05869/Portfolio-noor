---
name: emilkowalski-skills
description: Emil Kowalski's design engineering philosophy on UI polish, component design, animation vocabulary, tactile feedback, and invisible details.
---

# Emil Kowalski's Design Engineering Principles

Encodes Emil Kowalski's philosophy on UI craft, component polish, tactile micro-interactions, and invisible details that turn functional software into delightful experiences.

## Core Tenets
1. **The Invisible Details**:
   - Spacing, baseline rhythm, and visual balance matter more than decorative fluff.
   - Transitions feel instant yet smooth: 150ms–220ms durations with snappy easing.
   - Interactive elements must provide instantaneous feedback on hover and active states.
2. **Component Polish**:
   - Cards have subtle border highlights (`inset 0 1px 0 rgba(255,255,255,0.06)`).
   - Dialogs and modals anchor smoothly with spring curves or snappy transform-origin.
   - Badges, tabs, and tags have crisp paddings, legible mono typography, and tactile pill shapes.
3. **Motion Vocabulary & Physics**:
   - Feedback: Confirming input (active states, press depth `scale(0.98)`).
   - Spatial continuity: Elements transition between views with layout animation or directional transforms.
   - No floating or disconnected animations.
