# Noor Ullah — Portfolio Website: Complete Build Specification
## "Lights Off / Lights On" Concept

---

## CONCEPT OVERVIEW

The site opens in **complete darkness** — black screen, no content visible. A single **pull-string lightbulb cord** hangs from the top center of the viewport, gently swaying with a subtle CSS animation. A dim ambient glow pulses around the bulb tip. The user must **click and drag the cord downward** to "pull" it. On release, there's a flash-and-flicker animation (like a real incandescent bulb warming up), and the entire portfolio **illuminates** — revealing a warm, Edison-bulb-lit workspace aesthetic. Everything about the lit state reinforces the metaphor: warm amber tones, subtle shadows, a "workshop desk" feel — like a developer's room just came to life.

This is not a gimmick — it's the personality. You're a frontend engineer who builds things. The workshop-room metaphor carries through the entire site.

---

## TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v3 + custom CSS for animations
- **Animations:** Framer Motion (for section reveals, cord physics)
- **Icons:** Lucide React
- **Fonts:** Google Fonts — `Space Groto` (headings) + `Inter` (body)
- **Deployment:** Vercel

---

## COLOR SYSTEM

### Dark State (lights off)
```
bg-black           → #000000 (full viewport)
cord-color         → #C4A882 (rope/jute texture color)
bulb-glow          → #FFF5C0 with opacity 0.15 (ambient pre-pull glow)
hint-text          → rgba(255,255,255,0.12) (barely visible "pull the cord" hint)
```

### Light State (lights on)
```
background         → #0F0E0C (very dark warm charcoal — NOT pure black)
surface            → #1A1814 (cards, sections)
surface-hover      → #221F1A
accent-amber       → #F5A623 (primary accent — warm amber/gold)
accent-amber-dim   → #C4841A (secondary accent, borders)
text-primary       → #F0E6D3 (warm off-white)
text-secondary     → #A89880 (muted warm gray)
text-muted         → #6B5E4E (very muted)
border             → rgba(245,166,35,0.15) (amber-tinted borders)
glow               → rgba(245,166,35,0.08) (ambient card glow)
```

This is intentionally NOT a pure black/white dark theme. Every color has a warm amber undertone — the room is lit by an Edison bulb, not fluorescent light.

---

## TYPOGRAPHY

```
--font-display: 'Space Grotesk', sans-serif   → headings, name, section titles
--font-body:   'Inter', sans-serif             → body text, descriptions

Display/Hero:     Space Grotesk, 700, 4rem–6rem
Section titles:   Space Grotesk, 600, 1.75rem
Card titles:      Space Grotesk, 500, 1.1rem
Body:             Inter, 400, 1rem, line-height 1.7
Captions/tags:    Inter, 400, 0.8rem, letter-spacing 0.05em UPPERCASE
```

---

## SECTION-BY-SECTION SPECIFICATION

---

### SECTION 0: DARK STATE (Pre-interaction)

**Full viewport, black background.**

Layout:
```
┌─────────────────────────────┐
│                             │
│                             │
│           🔌 ╲              │  ← bulb hangs from top center
│            ●  │             │  ← the cord (vertical line)
│               │             │
│           ~~~╴│             │  ← cord end with small ring/knot
│                             │
│      "pull the cord"        │  ← barely visible ghost text, bottom
└─────────────────────────────┘
```

**Bulb SVG anatomy:**
- Glass teardrop shape (SVG path), stroke `#C4A882`, fill transparent
- Filament inside: two small angled lines forming the classic M-shape
- Ambient radial gradient behind it, pulsing opacity 0.1 → 0.2 → 0.1 on a 3s loop
- The cord: a `<div>` with `width: 2px`, `background: #C4A882`, extending from below the bulb down ~120px
- At the cord's tip: a small circular ring/knot element

**Sway animation (CSS keyframes):**
```css
@keyframes sway {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(3deg); }
}
/* Applied to the entire bulb+cord assembly */
/* transform-origin: top center */
/* duration: 4s, ease-in-out, infinite */
```

**Pull interaction:**
- `mousedown` / `touchstart` on the cord: begin drag tracking
- Track `deltaY` — cord stretches visually as user drags down (scale Y on cord div)
- On `mouseup` / `touchend`: if `deltaY >= 60px` → trigger lights-on sequence
- If less than 60px → cord snaps back (spring animation via Framer Motion)

**Lights-on sequence (timed):**
```
0ms   → bulb flickers (opacity 0 → 1 → 0 → 0.5 → 1 rapidly, 3 times)
200ms → full-room warm flash (white overlay, opacity 0 → 0.6 → 0)
400ms → background transitions: black → #0F0E0C
600ms → hero section fades in (Framer Motion staggerChildren)
800ms → navbar slides down from top
1000ms → rest of content becomes navigable
```

**"Pull the cord" ghost text:**
- Position: fixed bottom 10%, centered
- Text: `pull the cord ↑`
- Color: `rgba(255,255,255,0.10)` — barely visible
- Font: Space Grotesk, 0.8rem, letter-spacing wide
- Animate: slow pulse (opacity 0.08 → 0.16 → 0.08 on 2.5s loop)

---

### SECTION 1: NAVBAR (appears after lights-on)

**Sticky, slides in from top on lights-on.**

```
┌─────────────────────────────────────────────────────┐
│  NU          About  Skills  Work  Contact     [CV ↗] │
└─────────────────────────────────────────────────────┘
```

- Background: `rgba(15,14,12,0.85)` + `backdrop-filter: blur(12px)`
- Left: monogram `NU` in amber, Space Grotesk 700
- Nav links: Inter, text-secondary, hover → text-amber with a subtle underline animation
- CTA button: `Download CV` — outlined, amber border, amber text, hover fills with amber, text goes dark
- On scroll: border-bottom `1px solid rgba(245,166,35,0.12)` appears

---

### SECTION 2: HERO

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   FRONTEND                                          │
│   ENGINEER.                 ╔═══════════════╗       │
│                             ║               ║       │
│   Noor Ullah                ║  [portrait or ║       │
│   Based in Pakistan ·       ║   abstract    ║       │
│   4+ years building         ║   code visual]║       │
│   things that ship.         ╚═══════════════╝       │
│                                                     │
│   [View Work ↓]   [Say Hello →]                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Left column — text:**
- `FRONTEND` in Space Grotesk 700, ~5.5rem, text-primary
- `ENGINEER.` same size, but `ENGINEER` is text-secondary and `.` is amber accent
- Below: name, location, one-liner ("4+ years building things that ship.")
- Two CTAs: primary ghost button + secondary text link

**Right column — visual:**
Option A (no photo): An animated terminal/code block with a typewriter effect showing a snippet from actual work (e.g., the RAG pipeline code). Amber syntax highlighting on dark surface.
Option B (with photo): Noor's photo in a `border: 2px solid amber` frame with a subtle outer glow.

**Ambient detail:** a very faint large `{ }` or `</>` character in the background, color `rgba(245,166,35,0.03)`, enormous, non-distracting.

**Stagger animation on load:**
- Headline: fade up, delay 0ms
- Subtext: fade up, delay 100ms
- CTAs: fade up, delay 200ms
- Right visual: fade in, delay 300ms

---

### SECTION 3: ABOUT

**Two-column layout with a "workshop desk" metaphor — tools of the trade.**

```
┌─────────────────────────────────────────────────────┐
│  ABOUT                                              │
│  ─────                                              │
│                                                     │
│  ┌─────────────────────┐   ┌─────────────────────┐  │
│  │                     │   │  "I build frontend  │  │
│  │  [Stats cluster]    │   │  systems that are   │  │
│  │                     │   │  fast, tested, and  │  │
│  │  4+ yrs experience  │   │  built to last.     │  │
│  │  300K+ users served │   │                     │  │
│  │  92+ Lighthouse     │   │  Currently at       │  │
│  │  40K+ products      │   │  TechBazaar.pk,     │  │
│  └─────────────────────┘   │  expanding into AI  │  │
│                             │  and LLM tooling."  │  │
│                             └─────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Stat cards** (left grid):
- Each stat card: amber number (large, Space Grotesk 700), warm gray label below
- Cards have `border: 1px solid rgba(245,166,35,0.12)`, subtle amber glow on hover
- Stats to use:
  - `4+` → Years of Experience
  - `300K+` → Active Users (TechBazaar)
  - `92+` → Lighthouse Score
  - `40K+` → Live Product Listings

**Right copy:** first-person, direct. No corporate language. Reflects the CV's tone.

---

### SECTION 4: SKILLS

**Not a boring list. Organized as "toolbox shelves."**

```
┌─────────────────────────────────────────────────────┐
│  SKILLS                                             │
│  ──────                                             │
│                                                     │
│  ┌─── FRONTEND ───────────────────────────────────┐ │
│  │  React.js  Next.js  TypeScript  Tailwind CSS   │ │
│  │  Angular   JavaScript                          │ │
│  └────────────────────────────────────────────────┘ │
│  ┌─── AI & ML ─────────────────────────────────────┐ │
│  │  RAG Architecture  OpenAI API  Qdrant           │ │
│  │  Vector Embeddings  LLM Tool Calling            │ │
│  │  AI Agents  MCP Servers                        │ │
│  └────────────────────────────────────────────────┘ │
│  ┌─── BACKEND & DATA ──────────────────────────────┐ │
│  │  NestJS  Node.js  Redis  REST APIs  MicroORM   │ │
│  └────────────────────────────────────────────────┘ │
│  ┌─── TESTING & TOOLS ─────────────────────────────┐ │
│  │  Jest  RTL  Cypress  Playwright                 │ │
│  │  Git  Docker  Firebase  Postman                │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Skill tag design:**
- Pill shape: `border-radius: 9999px`
- Background: `rgba(245,166,35,0.08)`
- Border: `1px solid rgba(245,166,35,0.20)`
- Text: text-secondary
- Hover: border opacity increases, background lightens, text goes amber
- Each shelf/category has a top label in amber uppercase caption style

**Special treatment for AI & ML shelf:**
- Tags in this shelf get a slightly brighter amber glow on hover — this is the differentiator, make it feel more premium/special.
- Could have a small `✦` or `⬡` icon prefix on select AI tags.

---

### SECTION 5: WORK / PROJECTS

**Card-based, with an accordion or expandable detail panel for each project.**

```
┌─────────────────────────────────────────────────────┐
│  WORK                                               │
│  ────                                               │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  TechBazaar.pk  ·  Frontend Engineer        │   │
│  │  Sept 2022 – Present                        │   │
│  │  ─────────────────────────────────────────  │   │
│  │  [▸ Marketplace Platform]                   │   │
│  │  [▸ AI Shopping Assistant]        ← expand  │   │
│  │  [▸ POS System]                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  U2Ventures Pvt Ltd  ·  Frontend Developer  │   │
│  │  Jan 2022 – Sept 2022                       │   │
│  │  [▸ E-Agrimarket]  [▸ Finqalab]             │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Company card anatomy:**
- Card background: `surface` color (`#1A1814`)
- Top row: company name (amber, bold) · role (text-secondary) · date (text-muted, right-aligned)
- Live link badge if applicable (e.g., `techbazaar.pk ↗` in amber)
- Divider line: `border-top: 1px solid rgba(245,166,35,0.10)`
- Sub-project rows: each is a clickable row with a `▸` prefix that expands an accordion detail

**Expanded sub-project panel:**
- Smooth height animation (Framer Motion `AnimatePresence`)
- Shows: 2–3 bullet points (pulled from CV), tech stack pills
- Tech stack pills: same design as skills section tags
- Featured sub-projects (Marketplace, AI Shopping Assistant) get a slightly prominent border treatment

**Highlight card — AI Shopping Assistant:**
This is the star project. Give it special treatment:
- Label it with an amber badge: `AI · FEATURED`
- On expand: show a small architecture diagram (as a simple visual: boxes and arrows in text/ASCII or simple SVG inline)
- Mention: Next.js → NestJS → Qdrant → MySQL pipeline

---

### SECTION 6: CONTACT

**Clean, minimal. Not a form — a direct call to action.**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         Let's build something.                      │
│                                                     │
│    Have a project, role, or idea?                   │
│    I'm always open to the right conversation.       │
│                                                     │
│    [noor05869@gmail.com ↗]                          │
│                                                     │
│    ─────────────────────────────                    │
│    GitHub  ·  LinkedIn  ·  +92 332 446 8116         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Email as a large, amber-colored link — hover shows a subtle underline slide animation
- Social row: text-secondary links, hover amber
- A repeating very faint background pattern: `{}` or circuit-like dots, opacity ~0.02

---

### SECTION 7: FOOTER

```
┌─────────────────────────────────────────────────────┐
│  NU  ·  Built with Next.js + Tailwind             © 2025 │
└─────────────────────────────────────────────────────┘
```

Small, minimal. Amber monogram left, copyright right.

---

## ANIMATION SYSTEM SUMMARY

| Animation | Trigger | Library | Details |
|-----------|---------|---------|---------|
| Bulb sway | On load (dark state) | CSS keyframes | 4s ease-in-out infinite, ±3deg |
| Cord stretch | mousedown + drag | Framer Motion | scaleY on cord element |
| Cord snap-back | mouseup (< threshold) | Framer Motion spring | stiffness: 300, damping: 20 |
| Lights-on flicker | mouseup (≥ threshold) | CSS keyframes | 3 rapid opacity pulses |
| Room flash | During lights-on | CSS transition | White overlay, 300ms |
| Hero stagger | After lights-on | Framer Motion | staggerChildren 0.1s |
| Navbar slide | After lights-on | Framer Motion | y: -60 → 0 |
| Scroll reveals | On scroll into view | Framer Motion | `whileInView`, y: 30 → 0, opacity 0 → 1 |
| Skill tag hover | Hover | CSS transition | border/bg color, 200ms |
| Accordion expand | Click | Framer Motion AnimatePresence | height + opacity |
| Stat counter | On scroll into view | JS + requestAnimationFrame | Count up from 0 |

---

## FILE STRUCTURE

```
noor-portfolio/
├── app/
│   ├── layout.tsx          ← fonts, metadata
│   ├── page.tsx            ← root, manages "lightsOn" state
│   └── globals.css         ← CSS variables, keyframes, base styles
├── components/
│   ├── DarkState.tsx       ← bulb SVG, cord, pull interaction
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Work.tsx            ← company cards + accordion
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   └── data.ts             ← all portfolio content (projects, skills, stats)
├── public/
│   └── (assets)
└── tailwind.config.ts      ← custom colors, fonts
```

---

## TAILWIND CONFIG EXTENSIONS

```ts
// tailwind.config.ts
extend: {
  colors: {
    bg: {
      primary: '#0F0E0C',
      surface: '#1A1814',
      'surface-hover': '#221F1A',
    },
    amber: {
      DEFAULT: '#F5A623',
      dim: '#C4841A',
      glow: 'rgba(245,166,35,0.08)',
    },
    text: {
      primary: '#F0E6D3',
      secondary: '#A89880',
      muted: '#6B5E4E',
    },
  },
  fontFamily: {
    display: ['Space Grotesk', 'sans-serif'],
    body: ['Inter', 'sans-serif'],
  },
  animation: {
    sway: 'sway 4s ease-in-out infinite',
    pulse-glow: 'pulseGlow 3s ease-in-out infinite',
    flicker: 'flicker 0.4s steps(1) forwards',
  },
  keyframes: {
    sway: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%':       { transform: 'rotate(3deg)' },
    },
    pulseGlow: {
      '0%, 100%': { opacity: '0.10' },
      '50%':       { opacity: '0.22' },
    },
    flicker: {
      '0%':   { opacity: '1' },
      '20%':  { opacity: '0' },
      '40%':  { opacity: '0.8' },
      '60%':  { opacity: '0' },
      '80%':  { opacity: '1' },
      '100%': { opacity: '1' },
    },
  },
}
```

---

## GLOBAL CSS (globals.css additions)

```css
:root {
  --bg-primary: #0F0E0C;
  --bg-surface: #1A1814;
  --amber: #F5A623;
  --amber-dim: #C4841A;
  --text-primary: #F0E6D3;
  --text-secondary: #A89880;
  --text-muted: #6B5E4E;
  --border-amber: rgba(245, 166, 35, 0.15);
  --glow-amber: rgba(245, 166, 35, 0.08);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--amber-dim); border-radius: 2px; }

/* Selection color */
::selection { background: rgba(245,166,35,0.25); color: var(--text-primary); }
```

---

## DATA FILE (lib/data.ts)

```ts
export const personalInfo = {
  name: 'Noor Ullah',
  role: 'Frontend Engineer',
  location: 'Pakistan',
  tagline: '4+ years building things that ship.',
  email: 'noor05869@gmail.com',
  phone: '+92 3324468116',
  github: 'https://github.com/noor05869',
  linkedin: 'https://linkedin.com/in/noor-ullah-71a938193',
}

export const stats = [
  { value: '4+',    label: 'Years of Experience' },
  { value: '300K+', label: 'Active Users Served' },
  { value: '92+',   label: 'Lighthouse Score' },
  { value: '40K+',  label: 'Live Product Listings' },
]

export const skillGroups = [
  {
    label: 'FRONTEND',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Tailwind CSS'],
  },
  {
    label: 'AI & ML',
    featured: true,
    skills: ['RAG Architecture', 'OpenAI API', 'Qdrant', 'Vector Embeddings',
             'LLM Tool Calling', 'AI Agents', 'MCP Servers'],
  },
  {
    label: 'BACKEND & DATA',
    skills: ['NestJS', 'Node.js', 'Redis', 'REST APIs', 'MicroORM'],
  },
  {
    label: 'TESTING & TOOLS',
    skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright',
             'Git', 'Docker', 'Firebase', 'Postman'],
  },
]

export const workExperience = [
  {
    company: 'TechBazaar.pk',
    url: 'https://techbazaar.pk',
    role: 'Frontend Engineer',
    period: 'Sept 2022 – Present',
    projects: [
      {
        name: 'Marketplace Platform',
        featured: false,
        bullets: [
          'Built a Next.js + TypeScript marketplace now serving 300K+ active users with 40K+ live listings.',
          'Achieved 92+ Lighthouse score via server/client component architecture, code-splitting, and React Query.',
          'Managed state with Zustand across auth, listings, cart, checkout, and order flows.',
        ],
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query', 'Axios'],
      },
      {
        name: 'AI Shopping Assistant',
        featured: true,
        badge: 'AI · FEATURED',
        bullets: [
          'Built an OpenAI Assistants API agent with tool calling for autonomous multi-step reasoning: search → compare → check stock → recommend.',
          'Full pipeline: Next.js chat widget → NestJS microservice → Qdrant vector DB → MySQL, with voice input via Web Speech API.',
          'Conversational flow asks clarifying questions (budget, category, brand) before returning ranked product matches.',
        ],
        stack: ['Next.js', 'NestJS', 'OpenAI API', 'Qdrant', 'Zustand', 'Web Speech API'],
      },
      {
        name: 'RAG Conversational Search',
        featured: false,
        bullets: [
          'Replaced traditional search bar with a RAG-based system using Qdrant, OpenAI embeddings, and NestJS microservices.',
          'Built intent extraction pipeline with GPT-4o-mini outputting structured JSON filters (budget, category, brand, use case).',
          'Hybrid search: semantic vector search (ANN) + SQL filters, with Redis-backed session memory for multi-turn context.',
        ],
        stack: ['NestJS', 'Qdrant', 'OpenAI API', 'Redis', 'GPT-4o-mini'],
      },
      {
        name: 'POS System',
        featured: false,
        bullets: [
          'Web-based Point of Sale system for managing sales, purchases, and inventory.',
          'Comprehensive reporting modules for transaction history and business performance.',
        ],
        stack: ['React.js', 'TypeScript'],
      },
    ],
  },
  {
    company: 'U2Ventures Pvt Ltd',
    role: 'Frontend Developer',
    period: 'Jan 2022 – Sept 2022',
    projects: [
      {
        name: 'E-Agrimarket',
        featured: false,
        bullets: [
          'Responsive online trading platform for agriculture stakeholders.',
          'Real-time market insights dashboard with advanced product filtering.',
        ],
        stack: ['React.js', 'JavaScript'],
      },
      {
        name: 'Finqalab',
        featured: false,
        bullets: [
          'Platform for opening Investor Portfolio Securities Accounts (IPS) through NCCPL.',
        ],
        stack: ['React.js', 'JavaScript'],
      },
    ],
  },
]
```

---

## COMPLETE LLM PROMPT

Copy everything below this line and paste it to your LLM of choice (Claude, GPT-4, Cursor, etc.):

---

```
Build me a personal portfolio website for Noor Ullah, a Frontend Engineer from Pakistan with 4+ years of experience. The site uses Next.js 14 (App Router) with Tailwind CSS and Framer Motion.

────────────────────────────────
CORE CONCEPT: "Lights Off / Lights On"
────────────────────────────────

The site starts completely dark (black screen). A single hanging lightbulb with a pull cord dangles from the top center of the viewport. The user must pull the cord to "turn the lights on" — after which the full portfolio illuminates with a warm Edison-bulb aesthetic.

────────────────────────────────
DARK STATE (before pull)
────────────────────────────────

- Full black background (#000000)
- Center of screen: an SVG lightbulb (teardrop glass shape, visible filament inside) hanging from top of viewport
- Below the bulb: a vertical cord (~120px long), color #C4A882, ending in a small ring/knot
- The entire bulb + cord assembly gently sways: CSS keyframe animation rotating ±3deg from top-center origin, 4s ease-in-out infinite
- A radial gradient "pre-glow" pulses behind the bulb: opacity 0.10 → 0.22 → 0.10, 3s loop
- Bottom center: ghost text "pull the cord ↑" in rgba(255,255,255,0.10), barely visible, slow pulse

PULL INTERACTION:
- On mousedown/touchstart on the cord: begin tracking vertical drag (deltaY)
- Cord stretches visually as user drags down (increase cord div height or scaleY)
- On mouseup/touchend:
  - If deltaY >= 60px: trigger lights-on sequence
  - If deltaY < 60px: spring-snap cord back (Framer Motion spring: stiffness 300, damping 20)

LIGHTS-ON SEQUENCE (timed):
- 0ms: bulb flickers (opacity flashes 1→0→0.8→0→1 three times in 400ms)
- 200ms: full-screen white overlay flash (opacity 0 → 0.6 → 0 over 300ms)
- 400ms: body background transitions to #0F0E0C
- 600ms: Hero section fades + slides up (Framer Motion staggerChildren 0.1s delay each)
- 800ms: Navbar slides down from top (y: -60 → 0)
- State: React state variable `lightsOn` controls visibility of all sections

────────────────────────────────
AFTER LIGHTS ON — FULL SITE
────────────────────────────────

COLOR SYSTEM:
  Background:      #0F0E0C
  Surface/cards:   #1A1814
  Surface hover:   #221F1A
  Amber accent:    #F5A623
  Amber dim:       #C4841A
  Amber border:    rgba(245,166,35,0.15)
  Amber glow:      rgba(245,166,35,0.08)
  Text primary:    #F0E6D3
  Text secondary:  #A89880
  Text muted:      #6B5E4E

FONTS: Load from Google Fonts:
  Display/headings: 'Space Grotesk' (700, 600, 500)
  Body: 'Inter' (400, 500)

────────────────────────────────
NAVBAR
────────────────────────────────
- Sticky top, appears via Framer Motion (y: -60 → 0) after lights-on
- Background: rgba(15,14,12,0.85) + backdrop-filter blur(12px)
- Left: monogram "NU" in amber, Space Grotesk 700
- Links: About · Skills · Work · Contact (Inter, text-secondary, hover → amber)
- Right CTA: "Download CV" button — outlined amber, hover fills amber, text goes dark
- On scroll: bottom border rgba(245,166,35,0.12) appears

────────────────────────────────
HERO SECTION
────────────────────────────────
Two-column layout (responsive: stacks on mobile)

LEFT COLUMN:
- "FRONTEND" — Space Grotesk 700, ~5.5rem, color #F0E6D3
- "ENGINEER." — same size; "ENGINEER" in #A89880, "." in #F5A623 (amber)
- Name: "Noor Ullah" — Space Grotesk 500, 1.25rem, text-secondary
- Location + blurb: "Based in Pakistan · 4+ years building things that ship."
- Two buttons:
  1. "View Work" — ghost button, amber border + text
  2. "Say Hello →" — plain text link, amber, subtle arrow hover shift

RIGHT COLUMN:
- Animated terminal block showing a real code snippet (typewriter effect):
  Background: #1A1814, border: 1px solid rgba(245,166,35,0.15)
  Font: monospace, amber syntax highlights
  Code to show:
    // Intent extraction pipeline
    const intent = await extractIntent(query);
    const results = await hybridSearch({
      vector: await embed(query),
      filters: intent.filters,
      session: redis.getSession(userId),
    });
  Typewriter: types each line with ~40ms per character delay

BACKGROUND DETAIL: Enormous `</>` text, color rgba(245,166,35,0.025), absolute positioned, non-interactive, z-index -1

────────────────────────────────
ABOUT SECTION
────────────────────────────────
Section label: "ABOUT" in amber uppercase caption style

Left side — stat cards grid (2×2):
  Each card: background #1A1814, border 1px solid rgba(245,166,35,0.12), border-radius 8px, padding 1.25rem
  Large amber number (Space Grotesk 700, 2.5rem) + muted label below
  Hover: border glows slightly brighter
  Stats:
    "4+"    → "Years of Experience"
    "300K+" → "Active Users"
    "92+"   → "Lighthouse Score"
    "40K+"  → "Live Listings"
  Animate stat numbers counting up from 0 when scrolled into view (requestAnimationFrame)

Right side — copy:
  "I build frontend systems that are fast, tested, and built to last.
   Currently at TechBazaar.pk, where I shipped a production RAG-based conversational
   search system, an AI shopping assistant, and a marketplace serving 300K+ users.
   Recently expanded into AI agents, LLM tool calling, and MCP servers."
  Font: Inter 400, 1rem, line-height 1.8, text-secondary

────────────────────────────────
SKILLS SECTION
────────────────────────────────
Section label: "SKILLS"

Four grouped shelves. Each shelf:
  - Top label: uppercase, amber, caption size (e.g., "FRONTEND", "AI & ML")
  - Tags row: pill-shaped skill tags
    Background: rgba(245,166,35,0.07)
    Border: 1px solid rgba(245,166,35,0.18)
    Text: #A89880
    Hover: border brighter, text → #F5A623, bg slightly lighter
    Border-radius: 9999px
    Padding: 6px 14px

SHELF 1 — FRONTEND:
  React.js · Next.js · TypeScript · JavaScript · Angular · Tailwind CSS

SHELF 2 — AI & ML (featured — slightly brighter hover glow than other shelves):
  RAG Architecture · OpenAI API · Qdrant · Vector Embeddings ·
  LLM Tool Calling · AI Agents · MCP Servers

SHELF 3 — BACKEND & DATA:
  NestJS · Node.js · Redis · REST APIs · MicroORM

SHELF 4 — TESTING & TOOLS:
  Jest · React Testing Library · Cypress · Playwright ·
  Git · Docker · Firebase · Postman

────────────────────────────────
WORK SECTION
────────────────────────────────
Section label: "WORK"

Two company cards. Each card:
  Background: #1A1814
  Border: 1px solid rgba(245,166,35,0.12)
  Border-radius: 12px
  Padding: 1.5rem

Card header:
  Company name (amber, Space Grotesk 600, 1.1rem) · Role (text-secondary) · Period (text-muted, right)
  If has URL: show "techbazaar.pk ↗" badge in amber

Divider: border-top 1px solid rgba(245,166,35,0.10)

Sub-projects as accordion rows:
  Each row: "▸ Project Name" clickable, expands with Framer Motion AnimatePresence (height + opacity)
  Expanded content: bullet list (2-3 bullets) + tech stack pills (same design as skills tags)
  Featured projects get badge: background rgba(245,166,35,0.12), text amber, small

COMPANY 1: TechBazaar.pk | Frontend Engineer | Sept 2022 – Present
  Sub-projects:
  1. Marketplace Platform
     • Built with Next.js + TypeScript serving 300K+ active users and 40K+ live listings
     • 92+ Lighthouse score via SSR, code-splitting, React Query, and Zustand state management
     Stack: Next.js · TypeScript · Tailwind · Zustand · React Query

  2. AI Shopping Assistant [BADGE: "AI · FEATURED"]
     • OpenAI Assistants API agent with tool calling: search → compare → check stock → recommend
     • Pipeline: Next.js chat widget → NestJS → Qdrant vector DB → MySQL + voice input via Web Speech API
     • Asks clarifying questions (budget, brand, use case) and returns ranked real-time matches
     Stack: Next.js · NestJS · OpenAI API · Qdrant · Web Speech API

  3. RAG Conversational Search
     • Replaced search bar with RAG system: Qdrant + OpenAI embeddings + NestJS microservices
     • Intent extraction via GPT-4o-mini → structured JSON filters; Redis-backed multi-turn session memory
     Stack: NestJS · Qdrant · OpenAI API · Redis

  4. POS System
     • Web-based POS for sales, inventory, and transaction management with reporting modules
     Stack: React.js · TypeScript

COMPANY 2: U2Ventures Pvt Ltd | Frontend Developer | Jan 2022 – Sept 2022
  Sub-projects:
  1. E-Agrimarket
     • Responsive agriculture trading platform with real-time market dashboard and advanced filters
     Stack: React.js · JavaScript
  2. Finqalab
     • Platform for opening IPS investor accounts through NCCPL
     Stack: React.js · JavaScript

────────────────────────────────
CONTACT SECTION
────────────────────────────────
Centered layout, generous whitespace

Headline: "Let's build something." — Space Grotesk 700, 3rem, text-primary
Subtext: "Have a project, role, or idea? I'm always open to the right conversation."

Email link: "noor05869@gmail.com" — amber, large (1.1rem), hover: underline slides in left→right

Horizontal rule: 1px solid rgba(245,166,35,0.12), max-width 200px, centered

Social row:
  GitHub · LinkedIn · +92 332 446 8116
  Inter, text-secondary, hover → amber, gap: 2rem

────────────────────────────────
FOOTER
────────────────────────────────
Single line:
  Left: "NU" monogram in amber
  Right: "Built with Next.js + Tailwind © 2025"
  Border-top: 1px solid rgba(245,166,35,0.08)
  Text: text-muted

────────────────────────────────
SCROLL ANIMATIONS (all sections)
────────────────────────────────
Use Framer Motion `whileInView` with `viewport={{ once: true, amount: 0.2 }}`
Each section and card: initial={{ opacity: 0, y: 30 }} → animate={{ opacity: 1, y: 0 }}
transition: { duration: 0.5, ease: 'easeOut' }
Stagger children with 0.08s delay each

────────────────────────────────
FILE STRUCTURE
────────────────────────────────
app/
  layout.tsx        ← Google Fonts import, metadata, global styles
  page.tsx          ← manages lightsOn boolean state, renders DarkState or full site
  globals.css       ← CSS variables, keyframes (sway, pulseGlow, flicker), base reset
components/
  DarkState.tsx     ← SVG bulb, cord, drag interaction, lights-on sequence trigger
  Navbar.tsx
  Hero.tsx
  About.tsx
  Skills.tsx
  Work.tsx
  Contact.tsx
  Footer.tsx
lib/
  data.ts           ← all content (personalInfo, stats, skillGroups, workExperience)

────────────────────────────────
PACKAGES TO INSTALL
────────────────────────────────
npm install framer-motion lucide-react
(Google Fonts via next/font/google in layout.tsx)

────────────────────────────────
IMPORTANT NOTES FOR IMPLEMENTATION
────────────────────────────────
1. The dark state and lights-on transition MUST feel smooth — the flicker + flash is the signature moment. Don't skip or rush it.
2. The warm color palette (#0F0E0C, #1A1814, amber #F5A623) must be consistent everywhere — no cold blues or pure whites post-lights-on.
3. The cord drag mechanic: use React refs to track mousedown position, mousemove delta, mouseup release. Works for both mouse and touch events.
4. Respect prefers-reduced-motion: if enabled, skip the sway animation and instantly transition to lights-on on click.
5. Mobile: the cord should be tappable — on mobile, a simple tap (not drag) can trigger lights-on. Make the tap target at least 48×80px.
6. All section transitions use Framer Motion — no CSS transitions for content reveals.
7. The typewriter code block in Hero auto-plays once after lights-on sequence completes (600ms delay).
8. Stat counters animate from 0 to their target value when About section scrolls into view.
9. Work accordion: only one sub-project can be expanded at a time per company card.
10. Add `aria-label="Pull cord to enter site"` to the cord element for accessibility.
```

---

*End of specification. Everything above this line is the complete design + implementation document.*
