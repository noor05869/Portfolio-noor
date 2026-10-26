# Noor Portfolio — Build Progress

Last updated: 2026-06-26

## Source of truth

- Primary specification: `noor_portfolio_spec.md`
- Build approach: spec-first, with this file serving as the resumable task ledger.
- Repository state at start: greenfield; only the specification was present.
- `.agents` guidance was requested and checked, but the directory was not visible on disk at the time of scaffolding. Recheck it before future major changes.

## Current milestone

CV asset routing is complete after the hero redesign and base specification build.

## Hero redesign task board

- [x] Read and map the complete hero patch document.
- [x] Audit the current hero and color implementation.
- [x] Replace the terminal with the interactive Light Mood Switcher.
- [x] Add animated, mood-aware street lamps to the desktop hero.
- [x] Convert the site palette to shared CSS-variable-backed Tailwind tokens.
- [x] Make beam and glow intensity react to the slider.
- [x] Preserve the original hero copy, CTAs, mobile stacking, reduced-motion behavior, and all non-hero sections.
- [x] Pass typecheck, lint, production build, and desktop/mobile browser QA.

## Task board

- [x] Read and inventory the complete specification.
- [x] Audit the repository and confirm this is a greenfield build.
- [x] Create persistent task/progress tracking.
- [x] Scaffold Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, and Lucide React.
- [x] Implement shared data, color tokens, typography, animation primitives, and responsive shell.
- [x] Implement accessible dark state, mouse/touch cord pull, flicker/flash sequence, and reduced-motion behavior.
- [x] Implement navbar and hero with terminal typewriter.
- [x] Implement About counters and Skills shelves.
- [x] Implement Work company cards, single-open accordions, featured AI treatment, and architecture visual.
- [x] Implement Contact and Footer.
- [x] Add metadata, keyboard/focus behavior, responsive navigation, and accessibility polish.
- [x] Install dependencies and pass lint/type/build validation.
- [x] Run browser QA at desktop and mobile widths; verify the signature light transition and interactions.

## Spec decisions and assumptions

- The terminal/code visual was used for the initial build; the hero patch now explicitly replaces it with the mood switcher.
- Keep all portfolio content in `lib/data.ts`, as specified.
- The CV button targets `/noor-ullah-cv.pdf`, served from `public/noor-ullah-cv.pdf`.
- GitHub and LinkedIn URLs come directly from the spec data block.
- The footer year will be dynamic so it does not become stale, while retaining the specified wording.
- Mobile users can tap the cord; pointer dragging remains available across mouse, pen, and touch.

## Resume here

The base specification, hero redesign patch, and CV asset routing are complete. For the next iteration, review any newly added `.agents` guidance and use this file to record requested polish or deployment work.

## Validation log

- Dependency resolution completed with a reproducible `package-lock.json`. npm initially timed out during extraction; the two incomplete TypeScript ESLint packages were repaired explicitly.
- `npm run typecheck` — passed.
- `npm run lint` — passed with zero warnings or errors.
- `next build` — passed; the home route is statically prerendered (48.2 kB route, 135 kB first load in this build).
- Browser QA — passed at 1280×720 and 390×844.
- Verified: dark-state composition, keyboard entrance, lights-on transition, desktop/mobile hero layout, mobile menu, animated stat targets (`4+`, `300K+`, `92+`, `40K+`), single-open project accordion, featured AI architecture flow, and zero console warnings/errors.
- Hero redesign validation: typecheck passed; lint passed with zero warnings; production build passed and statically prerendered `/` (49.9 kB route, 137 kB first load in this build).
- Hero redesign browser QA: verified desktop street lamps and intersecting beams, Warm/Natural/Cool full-site palette changes, slider propagation to `--intensity` (`78%` to `30%`), responsive stacked panel at 390×844, hidden mobile lamps, zero horizontal overflow, and zero console warnings/errors.

## Known external dependencies

- None currently known.

## CV routing update

- Copied `lib/NoorUllah_CV (3).pdf` to `public/noor-ullah-cv.pdf`.
- Existing desktop and mobile navbar CV links use `personalInfo.cv`, which already points to `/noor-ullah-cv.pdf`.

## Project showcase redesign — 2026-10-14

- Replaced nested company/project cards with four screenshot-first app showcases and a compact supporting engineering section.
- Added concise summaries and existing impact metrics; surfaced TechBazaar and Pixels Galaxy live app links.
- Preserved all project descriptions, technology stacks, architecture, and employment context behind native details disclosures.
- Added full-screen screenshot viewing, 200% zoom, swipe navigation, keyboard arrows, Escape dismissal, focus restoration, and scroll locking.
- Screenshots retain their complete aspect ratio and load lazily.
- Validation: production build (including lint/type validation) passed; standalone typecheck and changed-file lint passed; desktop and 390px mobile browser checks passed with no horizontal overflow or captured console errors/warnings.
- Build requires execution outside the filesystem sandbox because Node promises.realpath returns EPERM for installed dependency files inside it.
- Preview: http://localhost:3100/#work


## Complete Portfolio Revamp & "AI Slop" Removal — 2026-10-23

- **Research & Framework Guidance**: Applied principles from `uupm.cc` (UI/UX Pro Max), `impeccable.style` (Paul Bakaus), and `tasteskill.dev` (Leon Lin), alongside Emil Kowalski's tactile design engineering standards.
- **AI Slop Purged**:
  - Removed `DarkState.tsx` (pull-cord curtain blocking entrance).
  - Removed `HeroBulb3D.tsx` (heavy Three.js WebGL bulb canvas).
  - Removed `StreetLamp.tsx` (dual Victorian street lamps with artificial beam cones).
  - Removed `LightMoodSwitcher.tsx` (mood switcher / slider widget).
  - Removed `CustomCursor.tsx` (mouse cursor hijack with trailing text badge).
  - Removed `CursorSpotlight.tsx` and `GrainOverlay.tsx` (default AI radial spotlight and noise texture).
  - Removed `ThreeBackground.tsx` (random floating WebGL particle field).
  - Removed `InteractiveTerminal.tsx` (fake bash terminal widget).
  - Removed `AudioToggle.tsx` and `lib/sound.ts` (Web Audio API hover beeps and relay clicks).
  - Uninstalled bloat dependencies: `three`, `@types/three`, `gsap`, `@gsap/react`, `lenis`.
- **New Obsidian-Precision Design & Architecture**:
  - **Navbar**: Streamlined sticky header with `NU` monogram, live status indicator (`● Available for remote roles`), smooth jump links, and direct CV download.
  - **Hero**: Authoritative editorial headline highlighting high-scale commerce and production AI systems.
  - **Interactive Architecture & Systems Hub**: Replaced the 3D bulb with an interactive engineering inspector featuring Noor's real systems:
    - TechVault AI Search (FastAPI -> Gemini Intent Extraction -> Local HuggingFace Embeddings -> Qdrant Vector Retrieval).
    - TechBazaar.pk 92+ Lighthouse Performance & Core Web Vitals telemetry.
    - Enterprise POS Operations Engine (11,000+ sales processed).
  - **Telemetry Bar**: Tabular telemetry cards for 4+ Years, 300K+ Users, 40K+ Listings, and 92+ Lighthouse score.
  - **Work & Screenshot Walkthrough**: Crisp production showcase with full-screen zoom, keyboard navigation, and architecture chains.
  - **Engineering Systems Toolkit**: Replaced generic bento tags with an architectural matrix categorized by system responsibility.
  - **About**: Engineering principles manifesto ("Performance as an Architectural Constraint", "Defensive Boundaries") and career trajectory.
  - **Contact**: Clean 1-click clipboard copy with visual confirmation, direct mailto, LinkedIn, and GitHub links.
- **Validation**:
  - `npm run typecheck` — passed with 0 errors.
  - `npm run lint` — passed with 0 warnings.
  - `next build` — passed and statically prerendered all routes (First Load JS: 148 kB).


## 3D Interactive Portrait Integration — 2026-10-27

- **Photo Asset**: Imported and optimized Noor's authentic portrait into [`public/noor-ullah.png`](file:///d:/Portfolio-noor/public/noor-ullah.png).
- **New Component ([`ProfileCard3D.tsx`](file:///d:/Portfolio-noor/components/ProfileCard3D.tsx))**:
  - Implemented 60fps/120fps spring physics with Framer Motion (`rotateX`, `rotateY`, `perspective: 1200px`).
  - Added dynamic specular glare overlay that follows the cursor across the card.
  - Multi-layer spatial parallax: floating badges (`● Open for roles`, `NU // 4+ YOE`, `Pakistan (Remote)`) rendered at `translateZ(30px)` and `translateZ(38px)`.
  - Ambient responsive glow and Emil Kowalski tactile depth styling.
- **Hero Integration ([`Hero.tsx`](file:///d:/Portfolio-noor/components/Hero.tsx))**:
  - Placed the 3D card alongside the editorial introduction in an asymmetric grid on desktop.
  - Stacks naturally and compactly on mobile/tablet viewports.
- **Validation**:
  - `npm run typecheck` — passed with 0 errors.
  - `npm run lint` — passed with 0 warnings.
  - Next.js dev server live at `http://localhost:3001` (HTTP 200 OK).
