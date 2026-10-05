---
name: animate
description: Builds an animation from scratch by making the decisions in the order that determines whether it feels right. Enforces Emil Kowalski's motion philosophy, hardware acceleration, spring configs, and reduced motion.
---

# Building Animations

A construction skill. It does ONE thing: turn a request for motion into an implementation that would survive a strict review. It enforces Emil Kowalski's animation philosophy.

## Operating Posture
- Write animations so they pass review the first time.
- Two failure modes to avoid:
  1. Animating something that shouldn't animate (keyboard shortcuts, 100+/day frequent actions).
  2. Animating the right thing with the wrong ingredients: `ease-in` on an entrance, `scale(0)`, keyframes on rapidly triggered elements, sluggish durations > 300ms.

## Hard Rules
1. **Run the sequence in order**: Step 1 (Should this animate?) and Step 2 (Purpose) gate everything.
2. **No approximated values**: Every curve, duration, and spring config comes from defined tokens. Never invent arbitrary cubic-beziers.
3. **Extend tokens, don't fork them**: If `--ease-out` or duration scale exists, use it.
4. **Reduced motion and pointer gating ship with the animation**, not as a follow-up.
5. **Cheapest tool that works**: CSS transitions for hovers/states, WAAPI or CSS animation for predetermined off-main-thread motion, Motion (`motion/react` or `framer-motion`) for springs, layout transitions, exits, and gestural physics.

## The Build Sequence
1. **Should this animate?**
   - 100+ times/day (shortcuts, frequent toggles): No animation.
   - Tens of times/day (hover effects, list navigation): Near-imperceptible, fast (<150ms).
   - Occasional (modals, drawers, sheets): Standard animation (180–250ms).
   - Rare / first-time: Delight budget.
2. **What is the purpose?** Name it:
   - Feedback
   - Spatial consistency
   - State indication
   - Preventing jarring change
   - Delight (rare only)
3. **Pick the properties**:
   - `transform` and `opacity` only. Skip layout and paint, run on GPU.
   - Never `scale(0)`. Start from `scale(0.95)` + `opacity: 0`.
   - `transform-origin` at trigger for popovers/dropdowns.
4. **Easing and duration**:
   - Entering / exiting: `ease-out` or `cubic-bezier(0.23, 1, 0.32, 1)`
   - On-screen morphing: `ease-in-out` or `cubic-bezier(0.77, 0, 0.175, 1)`
   - Never `ease-in` on UI entrances.
   - UI animations stay under 300ms (150–250ms sweet spot).
   - Springs for gestures/touch: `{ type: 'spring', duration: 0.45, bounce: 0.15 }`.
5. **Interruption and exit**:
   - Transitions, not keyframes, for anything triggered rapidly.
   - Exit symmetric to entrance.
6. **Accessibility & Pointer**:
   - Always include `@media (prefers-reduced-motion: reduce)` or `useReducedMotion()`.
   - Hover gating: `@media (hover: hover) and (pointer: fine)`.
