# Portfolio Spec — PATCH: Hero Section Redesign
## Apply on top of: `noor_portfolio_spec.md`

This file overrides **only the Hero section** of the original spec.
Everything else (dark state, navbar, about, skills, work, contact, footer) remains unchanged.

---

## WHAT CHANGES

1. **Two decorative street lights** added to left and right edges of the hero section — they "turn on" as part of the lights-on sequence and cast a visible light beam across the hero content.
2. **Right column** changes from an animated code snippet terminal to an **interactive Light Mood Switcher** — three buttons (Warm · Natural · Cool) that change the site's color theme in real time.
3. **Color system expands** to support three light moods, each with its own palette.

---

## 1. STREET LIGHTS — DESIGN & BEHAVIOR

### Visual Structure

Two SVG street lamp posts, one anchored to the far left edge of the hero section, one to the far right. They are decorative but animated.

```
LEFT LAMP                              RIGHT LAMP

   ┌──────╮                        ╭──────┐
   │  💡  │                        │  💡  │
   └──────╯                        ╰──────┘
     │                                  │
     │  (post)                   (post) │
     │                                  │
─────┴──────────────────────────────────┴─────
          [  HERO CONTENT CENTER  ]
```

### SVG Anatomy (build each lamp as an SVG or JSX component)

```
StreetLamp SVG structure:
  - Post:      rect, width 6px, height ~220px, color: #3A342B (dark warm brown)
  - Arm:       path curving outward and up from top of post (~60px horizontal reach)
  - Lamp head: rounded rect or pentagon shape, ~40×24px
  - Bulb:      small circle inside lamp head, color: changes per mood (see below)
  - Cone beam: SVG <polygon> or <path> projecting downward/inward from lamp head
                Shape: narrow at lamp → wide fan angle toward hero content
                Fill: radial gradient from bulb color (opacity 0.18 at source) → transparent
                Blend mode: `mix-blend-mode: screen` or `lighten`
```

### Lamp Positioning

```css
/* Left lamp */
position: absolute;
left: 0;
top: 0;           /* arm + bulb sit at roughly top 15% of hero section */
height: 100%;     /* post extends full height of section */

/* Right lamp */
position: absolute;
right: 0;
top: 0;
height: 100%;
transform: scaleX(-1);   /* mirror of left lamp */
```

The hero section itself must have `position: relative; overflow: hidden;` so lamps are clipped.

### Light Beam (cone) — SVG polygon

```
Left lamp beam points:
  Start (narrow): near the bulb position (e.g. x=80, y=120)
  End (wide fan): spreads inward across hero toward center
  Approximate polygon points: "80,120  60,500  260,500"

Right lamp beam (mirrored):
  Same shape, mirrored on X axis.
```

The two beams overlap in the center of the hero, creating a slightly brighter intersection zone — reinforcing that the content sits "in the light."

### Lights-On Sequence Update

Add these steps to the existing lights-on sequence from the original spec:

```
0ms   → [EXISTING] bulb flicker
200ms → [EXISTING] white flash
400ms → [EXISTING] background transitions
500ms → Street lamp posts fade in (opacity 0 → 1, duration 300ms)
700ms → Lamp bulbs light up: scale 0.5 → 1, opacity 0 → 1, with a small bloom pulse
800ms → Light beams sweep in: rotate or scale from 0 → full cone (400ms, ease-out)
         Suggest: animate beam polygon's points from collapsed (all near bulb) → full fan
900ms → [EXISTING] Hero content stagger reveal
1100ms → [EXISTING] Navbar slides in
```

The lamp bulbs should have a **continuous subtle flicker** after turning on — very slight opacity oscillation (0.88 → 1.0 → 0.93 → 1.0), ~6s loop, random offset between left and right lamp so they don't pulse in sync. This mimics real street lamp warmup behavior.

---

## 2. HERO LAYOUT — UPDATED

Remove the right-column code terminal. Replace with the Light Mood Switcher panel.
The left column (headline, name, tagline, CTAs) stays **identical** to the original spec.

```
┌──────────────────────────────────────────────────────────────────┐
│🏮                                                              🏮│  ← street lamps
│ ║beam                                                      beam║ │
│ ║                                                              ║ │
│     FRONTEND              ┌──────────────────────────────┐       │
│     ENGINEER.             │  ✦  LIGHT MOOD               │       │
│                           │                              │       │
│     Noor Ullah            │  ○ Warm      ◉ Natural  ○ Cool│       │
│     Pakistan · 4+ yrs     │                              │       │
│     building things       │  ████████████████░░░░  78%  │       │
│     that ship.            │  [intensity slider]          │       │
│                           │                              │       │
│  [View Work] [Say Hello]  │  "Natural White"             │       │
│                           │  Balanced · Easy on eyes     │       │
│                           └──────────────────────────────┘       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. LIGHT MOOD SWITCHER — COMPONENT SPEC

### Component: `LightMoodSwitcher.tsx`

**Panel design:**
```
Background:  rgba(26, 24, 20, 0.7)       ← semi-transparent surface
Border:      1px solid rgba(255,255,255,0.10)  ← changes tint per mood
Backdrop:    blur(16px)
Border-radius: 16px
Padding:     1.75rem
Width:       clamp(280px, 35vw, 380px)
```

A small `✦` icon + "LIGHT MOOD" label at the top in uppercase amber caption style.

---

### Three Mood Options

Display as a segmented control / radio group — horizontal pill row:

```
┌──────────┬──────────────┬──────────┐
│   Warm   │   Natural    │   Cool   │
└──────────┴──────────────┴──────────┘
```

- Unselected: background transparent, text text-muted, thin border
- Selected: background fills with the mood's accent color (muted, ~15% opacity), text uses mood accent, border mood accent
- Hover: slight background tint
- Transition: 250ms ease on all color changes

---

### Intensity Slider

Below the mood buttons:

```
Label row:  "Intensity"  ·  value% on right (e.g., "78%")
Slider:     custom styled range input
  Track:    1px solid border, background fills left of thumb with accent color
  Thumb:    12px circle, mood accent color, no border
  Default:  78%
  Range:    30% – 100%
```

The intensity value scales the opacity of:
- The lamp beam cones
- The glow effects on cards and tags
- The background ambient warmth

---

### Mood Description line

Below slider, a two-line description updates per mood:

```
Mood name in accent color, Space Grotesk 500
Short descriptor in text-muted, Inter 400 0.85rem
```

---

### Three Moods — Full Color Definitions

#### WARM (Edison Bulb / Incandescent)
```
Accent:           #F5A623   (amber gold — same as default)
Accent dim:       #C4841A
Background:       #0F0E0C   (very dark warm charcoal)
Surface:          #1A1814
Text primary:     #F0E6D3   (warm off-white)
Text secondary:   #A89880
Border:           rgba(245, 166, 35, 0.15)
Glow:             rgba(245, 166, 35, 0.10)
Lamp bulb color:  #FFD580
Beam color:       rgba(255, 200, 80, 0.15)
Mood description: "Warm White · Classic incandescent feel"
```
*This is the default — same as original spec. No change from lights-on state.*

#### NATURAL (Natural White / Daylight)
```
Accent:           #78C4A0   (soft sage/mint green)
Accent dim:       #4E9E7E
Background:       #0C0F0E   (very dark cool-neutral)
Surface:          #141A18
Text primary:     #DFF0EA   (cool off-white with slight green)
Text secondary:   #8BA89C
Border:           rgba(120, 196, 160, 0.15)
Glow:             rgba(120, 196, 160, 0.08)
Lamp bulb color:  #C8EDDC
Beam color:       rgba(180, 230, 200, 0.12)
Mood description: "Natural White · Balanced · Easy on eyes"
```

#### COOL (Cool White / Moonlight)
```
Accent:           #7EB8F7   (soft cool blue)
Accent dim:       #4A8FD4
Background:       #0A0C10   (very dark cool blue-black)
Surface:          #111420
Text primary:     #D8E8F8   (cool blue-white)
Text secondary:   #7A90AA
Border:           rgba(126, 184, 247, 0.15)
Glow:             rgba(126, 184, 247, 0.08)
Lamp bulb color:  #B0D4FF
Beam color:       rgba(140, 190, 255, 0.12)
Mood description: "Cool White · Crisp · High contrast"
```

---

## 4. THEME SWITCHING IMPLEMENTATION

### Approach: CSS Custom Properties on `:root`

When a mood is selected, update CSS variables on `document.documentElement` via JavaScript. All colors in the site reference these variables — the entire site repaints instantly.

```ts
// lib/themes.ts

export type Mood = 'warm' | 'natural' | 'cool'

export const themes: Record<Mood, Record<string, string>> = {
  warm: {
    '--accent':         '#F5A623',
    '--accent-dim':     '#C4841A',
    '--bg-primary':     '#0F0E0C',
    '--bg-surface':     '#1A1814',
    '--bg-surface-hover': '#221F1A',
    '--text-primary':   '#F0E6D3',
    '--text-secondary': '#A89880',
    '--text-muted':     '#6B5E4E',
    '--border':         'rgba(245,166,35,0.15)',
    '--glow':           'rgba(245,166,35,0.10)',
    '--beam-color':     'rgba(255,200,80,0.15)',
    '--bulb-color':     '#FFD580',
  },
  natural: {
    '--accent':         '#78C4A0',
    '--accent-dim':     '#4E9E7E',
    '--bg-primary':     '#0C0F0E',
    '--bg-surface':     '#141A18',
    '--bg-surface-hover': '#1B2420',
    '--text-primary':   '#DFF0EA',
    '--text-secondary': '#8BA89C',
    '--text-muted':     '#5A7A6E',
    '--border':         'rgba(120,196,160,0.15)',
    '--glow':           'rgba(120,196,160,0.08)',
    '--beam-color':     'rgba(180,230,200,0.12)',
    '--bulb-color':     '#C8EDDC',
  },
  cool: {
    '--accent':         '#7EB8F7',
    '--accent-dim':     '#4A8FD4',
    '--bg-primary':     '#0A0C10',
    '--bg-surface':     '#111420',
    '--bg-surface-hover': '#181D2C',
    '--text-primary':   '#D8E8F8',
    '--text-secondary': '#7A90AA',
    '--text-muted':     '#4A5E78',
    '--border':         'rgba(126,184,247,0.15)',
    '--glow':           'rgba(126,184,247,0.08)',
    '--beam-color':     'rgba(140,190,255,0.12)',
    '--bulb-color':     '#B0D4FF',
  },
}

export function applyTheme(mood: Mood, intensity: number = 78) {
  const root = document.documentElement
  const vars = themes[mood]
  const scale = intensity / 100

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // Scale beam and glow opacity by intensity
  root.style.setProperty('--intensity', String(scale))
}
```

**In globals.css** — replace all hardcoded color values with CSS variables:
```css
:root {
  --accent:          #F5A623;
  --accent-dim:      #C4841A;
  --bg-primary:      #0F0E0C;
  --bg-surface:      #1A1814;
  --bg-surface-hover:#221F1A;
  --text-primary:    #F0E6D3;
  --text-secondary:  #A89880;
  --text-muted:      #6B5E4E;
  --border:          rgba(245,166,35,0.15);
  --glow:            rgba(245,166,35,0.10);
  --beam-color:      rgba(255,200,80,0.15);
  --bulb-color:      #FFD580;
  --intensity:       0.78;
}
```

All Tailwind arbitrary values in the components that reference colors should use `var(--accent)` etc. where Tailwind's JIT allows (`text-[var(--accent)]`, `border-[var(--border)]`).

**Transition:** Add to `body` in globals.css:
```css
body {
  transition:
    background-color 600ms ease,
    color 400ms ease;
}
```
And on all card/surface elements:
```css
transition: background-color 500ms ease, border-color 400ms ease;
```
This makes mood switching feel like a room light changing — smooth, not instant.

---

## 5. STREET LAMP BEAM — REACTS TO MOOD & INTENSITY

The beam SVG polygon's fill uses `var(--beam-color)` — it automatically updates when mood changes.

The intensity slider also updates `--intensity`, and the beam's opacity is set as:
```css
/* on the beam polygon or its wrapping group */
opacity: calc(var(--intensity) * 1);
```

So at 30% intensity the beams are very faint, at 100% they're at full opacity. This also scales the ambient glow on all cards site-wide.

---

## 6. UPDATED FILE STRUCTURE (additions only)

```
components/
  Hero.tsx           ← UPDATE: remove CodeTerminal, add StreetLamp + LightMoodSwitcher
  StreetLamp.tsx     ← NEW: SVG lamp post + beam + flicker animation
  LightMoodSwitcher.tsx  ← NEW: mood buttons + intensity slider + description
lib/
  themes.ts          ← NEW: theme definitions + applyTheme()
app/
  globals.css        ← UPDATE: all color values → CSS variables
```

---

## 7. COMPLETE LLM PATCH PROMPT

Copy everything below and give it to your LLM **together with** the original `noor_portfolio_spec.md`:

---

```
PATCH — Apply these changes on top of the existing portfolio spec (noor_portfolio_spec.md).
Only the Hero section and color system change. Everything else stays the same.

────────────────────────────────
HERO SECTION — FULL REPLACEMENT
────────────────────────────────

The hero section now has:
1. Two decorative SVG street lamps (left edge + right edge of section)
2. Left column: unchanged (headline, name, tagline, CTAs from original spec)
3. Right column: replaced with a LightMoodSwitcher interactive panel

HERO SECTION LAYOUT:
  position: relative
  overflow: hidden
  min-height: 100vh

────────────────────────────────
COMPONENT 1: StreetLamp.tsx
────────────────────────────────

Build a reusable StreetLamp component. Props: { side: 'left' | 'right' }
Right lamp is the left lamp mirrored with CSS: transform: scaleX(-1)

SVG structure:
  viewBox: "0 0 120 600"
  Post: <rect x="55" y="200" width="8" height="400" fill="#3A342B"/>
  Arm: <path> curving from top of post outward ~60px and upward to lamp head position
       e.g. d="M59,200 Q59,140 20,140" stroke="#3A342B" strokeWidth="6" fill="none"
  Lamp head: <rect x="0" y="120" width="42" height="22" rx="6" fill="#2A2420"/>
  Bulb: <circle cx="21" cy="131" r="7" fill="var(--bulb-color)"/>
        Add a radial gradient behind it for the bloom effect (glow circle, 30px radius,
        center color var(--bulb-color) opacity 0.6, edge transparent)

  Light beam (cone):
    <polygon
      points="21,138  -60,600  100,600"
      fill="url(#beamGradient)"
      style={{ opacity: 'var(--intensity)', mixBlendMode: 'screen' }}
    />
    Define gradient:
    <defs>
      <linearGradient id="beamGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--bulb-color)" stopOpacity="0.20"/>
        <stop offset="100%" stopColor="var(--bulb-color)" stopOpacity="0"/>
      </linearGradient>
    </defs>

Positioning in hero:
  position: absolute, top: 0, left: 0 (or right: 0 for right lamp)
  height: 100%, width: auto (SVG scales to fill height)
  pointer-events: none

Bulb flicker animation (CSS keyframes, applied to bulb + bloom):
  @keyframes lampFlicker {
    0%, 100% { opacity: 1; }
    15%      { opacity: 0.88; }
    40%      { opacity: 0.95; }
    65%      { opacity: 0.90; }
    85%      { opacity: 1; }
  }
  Left lamp:  animation: lampFlicker 7s ease-in-out infinite;
  Right lamp: animation: lampFlicker 7s ease-in-out infinite 1.8s; (offset so they don't sync)

Lights-on entrance animation (Framer Motion):
  Post + arm: initial={{ opacity:0 }} → animate={{ opacity:1 }}, delay 0.5s, duration 0.3s
  Bulb + bloom: initial={{ scale:0.3, opacity:0 }} → animate={{ scale:1, opacity:1 }},
                delay 0.7s, duration 0.25s, ease "easeOut"
  Beam: initial={{ scaleY:0, originY: 0 }} → animate={{ scaleY:1 }},
        delay 0.85s, duration 0.5s, ease "easeOut"

────────────────────────────────
COMPONENT 2: LightMoodSwitcher.tsx
────────────────────────────────

State: mood ('warm' | 'natural' | 'cool'), intensity (number 30–100)
On mount: apply warm theme (default)
On mood change: call applyTheme(mood, intensity)
On intensity change: call applyTheme(mood, intensity)

Panel wrapper:
  background: rgba(26,24,20,0.70)
  border: 1px solid rgba(255,255,255,0.08)
  backdrop-filter: blur(16px)
  border-radius: 16px
  padding: 1.75rem
  width: clamp(260px, 32vw, 360px)

Header row:
  "✦" glyph + "LIGHT MOOD" text
  Color: var(--accent), font: Space Grotesk 500, 0.75rem, letter-spacing 0.12em

Segmented mood buttons (3 buttons in a row, full width, equal split):
  Each button: flex-1, padding 0.5rem 0
  Font: Space Grotesk 500, 0.9rem
  Labels: "Warm" · "Natural" · "Cool"
  Unselected: background transparent, color var(--text-muted), border 1px solid rgba(255,255,255,0.08)
  Selected: background rgba(var(--accent-rgb), 0.12), color var(--accent), border 1px solid var(--accent)
  First button: border-radius 8px 0 0 8px
  Middle button: border-radius 0, border-left/right: none
  Last button: border-radius 0 8px 8px 0
  Transition: all 250ms ease

Intensity slider:
  Label row: "Intensity" left · "{intensity}%" right, Inter 0.8rem, text-muted
  <input type="range" min="30" max="100" step="1" value={intensity}>
  Custom styled: accent-color: var(--accent) (modern CSS, works in all major browsers)
  Full width

Mood description:
  Mood name: Space Grotesk 500, 1rem, color var(--accent)
  Descriptor: Inter 400, 0.82rem, color var(--text-muted)
  Values per mood:
    warm:    name="Warm White"   desc="Classic incandescent · Comfortable for long sessions"
    natural: name="Natural White" desc="Balanced · Easy on eyes · True-to-life colors"
    cool:    name="Cool White"   desc="Crisp · High contrast · Focus mode"

Entrance animation (Framer Motion):
  initial={{ opacity:0, x: 30 }} → animate={{ opacity:1, x:0 }}
  delay: 1.0s (after lamps are on), duration: 0.4s

────────────────────────────────
lib/themes.ts — CREATE THIS FILE
────────────────────────────────

export type Mood = 'warm' | 'natural' | 'cool'

export const themes: Record<Mood, Record<string, string>> = {
  warm: {
    '--accent':            '#F5A623',
    '--accent-dim':        '#C4841A',
    '--bg-primary':        '#0F0E0C',
    '--bg-surface':        '#1A1814',
    '--bg-surface-hover':  '#221F1A',
    '--text-primary':      '#F0E6D3',
    '--text-secondary':    '#A89880',
    '--text-muted':        '#6B5E4E',
    '--border':            'rgba(245,166,35,0.15)',
    '--glow':              'rgba(245,166,35,0.10)',
    '--beam-color':        'rgba(255,200,80,0.15)',
    '--bulb-color':        '#FFD580',
  },
  natural: {
    '--accent':            '#78C4A0',
    '--accent-dim':        '#4E9E7E',
    '--bg-primary':        '#0C0F0E',
    '--bg-surface':        '#141A18',
    '--bg-surface-hover':  '#1B2420',
    '--text-primary':      '#DFF0EA',
    '--text-secondary':    '#8BA89C',
    '--text-muted':        '#5A7A6E',
    '--border':            'rgba(120,196,160,0.15)',
    '--glow':              'rgba(120,196,160,0.08)',
    '--beam-color':        'rgba(180,230,200,0.12)',
    '--bulb-color':        '#C8EDDC',
  },
  cool: {
    '--accent':            '#7EB8F7',
    '--accent-dim':        '#4A8FD4',
    '--bg-primary':        '#0A0C10',
    '--bg-surface':        '#111420',
    '--bg-surface-hover':  '#181D2C',
    '--text-primary':      '#D8E8F8',
    '--text-secondary':    '#7A90AA',
    '--text-muted':        '#4A5E78',
    '--border':            'rgba(126,184,247,0.15)',
    '--glow':              'rgba(126,184,247,0.08)',
    '--beam-color':        'rgba(140,190,255,0.12)',
    '--bulb-color':        '#B0D4FF',
  },
}

export function applyTheme(mood: Mood, intensity: number = 78) {
  const root = document.documentElement
  Object.entries(themes[mood]).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  root.style.setProperty('--intensity', String(intensity / 100))
}

────────────────────────────────
globals.css — REPLACE ALL HARDCODED COLORS WITH CSS VARIABLES
────────────────────────────────

:root {
  --accent:            #F5A623;
  --accent-dim:        #C4841A;
  --bg-primary:        #0F0E0C;
  --bg-surface:        #1A1814;
  --bg-surface-hover:  #221F1A;
  --text-primary:      #F0E6D3;
  --text-secondary:    #A89880;
  --text-muted:        #6B5E4E;
  --border:            rgba(245,166,35,0.15);
  --glow:              rgba(245,166,35,0.10);
  --beam-color:        rgba(255,200,80,0.15);
  --bulb-color:        #FFD580;
  --intensity:         0.78;
}

body {
  transition: background-color 600ms ease, color 400ms ease;
}

Add to all card/surface elements in their component CSS or Tailwind classes:
  transition: background-color 500ms ease, border-color 400ms ease, box-shadow 400ms ease;

In Tailwind, use arbitrary CSS variable values where hardcoded colors existed:
  text-[var(--accent)]   border-[var(--border)]   bg-[var(--bg-surface)]   etc.

────────────────────────────────
IMPORTANT IMPLEMENTATION NOTES
────────────────────────────────

1. The LightMoodSwitcher panel is in the HERO section only — it does not appear in the navbar or elsewhere.
2. The theme persists as user scrolls through the rest of the site — the mood they set in the hero applies everywhere.
3. Street lamps are hero-section-only decorations. They do not scroll with the page (they are absolute inside the hero section, not fixed to the viewport).
4. On mobile (< 768px): hide the street lamps (they're too wide), show only the top half of the lamp arm as a subtle detail OR remove entirely. The LightMoodSwitcher stacks below the left column content.
5. Mood switcher does NOT have to save to localStorage — it resets to "Warm" on page reload. That's intentional and consistent with the "turn on the lights" metaphor starting fresh each visit.
6. The intensity slider affects only --intensity CSS variable. All beam opacity and glow effects reference this variable. Do not hardcode opacity values for ambient/glow effects — always use calc(var(--intensity) * X).
7. Tailwind's JIT can use CSS variables: className="text-[var(--accent)]" works. Use this pattern throughout.
```

---

*End of patch document. Apply on top of `noor_portfolio_spec.md`.*
