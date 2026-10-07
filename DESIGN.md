---
name: Soft Water Technologies
description: A Karnataka family's gruhapravesha water corner, told in scroll, from new borewell to hard water to soft water.
colors:
  oxide: "#7a2418"
  oxide-900: "#4a150e"
  oxide-950: "#2e0c07"
  oxide-600: "#94321f"
  marigold: "#f2a516"
  marigold-300: "#ffc94d"
  leaf: "#2f6b2a"
  leaf-800: "#173a15"
  kumkum: "#b3122e"
  wall: "#c6dc9a"
  steel: "#c9d0d4"
  steel-600: "#8a959b"
  steel-800: "#3f484d"
  copper: "#b5653a"
  scale: "#e8e5d8"
  dusk: "#1b2340"
  deep: "#0c3a45"
  aqua: "#5cc8d8"
  aqua-200: "#bfeef3"
  ink-on-dark: "#fff3e6"
  ink-on-dark-soft: "#f3d9c4"
  ink-on-light: "#2e0c07"
  ink-on-light-soft: "#5d3427"
  whatsapp: "#25d366"
  whatsapp-ink: "#07301a"
  field: "#f4f8f1"
typography:
  display:
    fontFamily: "'Baloo Tamma 2', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0"
  headline:
    fontFamily: "'Baloo Tamma 2', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.8rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Baloo Tamma 2', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  spoken:
    fontFamily: "'Baloo Tamma 2', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "'Hind Mysuru', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Baloo Tamma 2', 'Noto Sans Kannada', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  tag: "6px"
  field: "14px"
  panel: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section-y: "clamp(5rem, 12vw, 9rem)"
  pipe-clearance: "1.5rem"
  content-max: "78rem"
components:
  button-primary:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.oxide-950}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem 0.6rem"
    height: "3.25rem"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.whatsapp-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem 0.6rem"
    height: "3.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem 0.6rem"
    height: "3.25rem"
  button-dark:
    backgroundColor: "{colors.oxide-950}"
    textColor: "{colors.marigold-300}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.4rem 0.6rem"
    height: "3.25rem"
  chip:
    backgroundColor: "transparent"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1rem 0.45rem"
    height: "2.6rem"
  chip-selected:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.oxide-950}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink-on-light}"
    rounded: "{rounded.field}"
    padding: "0.75rem 1rem"
    height: "3.1rem"
  form-panel:
    backgroundColor: "{colors.leaf}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.5rem, 3vw, 2.5rem)"
  steel-tag:
    backgroundColor: "{colors.steel}"
    textColor: "{colors.steel-800}"
    rounded: "{rounded.tag}"
    padding: "0.15rem 0.85rem 0 0.35rem"
    height: "2.25rem"
  nav-link:
    textColor: "{colors.ink-on-dark}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.85rem"
---

# Design System: Soft Water Technologies

## Overview

**Creative North Star: "The Gruhapravesha Water Corner"**

The whole site is one family's new home, seen at the place where its water lives: a red-oxide floor, a mango-leaf thoranam over the door, two polished steel kodas, a copper kalasha and a chombu on a ledge. Nothing is stock or photographic. Every object is authored flat SVG illustration with lit metal gradients, and the only "product shots" are those vessels getting crusted with white scale and polished clean again. The drama comes from a scroll-performed story in pinned, scrubbed acts: housewarming, borewell, hard water, softener, joy.

Grounds are drenched, full-bleed colour fields, one per act: red oxide for the home, dusk indigo for sadness, deep teal for the softener, marigold for joy, painted-wall pista for services, mango-leaf green for the enquiry. Type is a hand-painted-signboard rounded display (Baloo Tamma 2) carrying Kannada and English at the same weight, over a quiet Hind Mysuru body. Kannada carries feeling (spoken lines, headlines); English carries information.

Density is low and theatrical in the story acts, then tightens into ruled lists for services and process. Calls to action are fat pills: WhatsApp green is the one foreign colour in the world, and it is allowed in because it is the conversion.

**Key Characteristics:**
- Drenched colour-field grounds that change per act; no white page, no card grid.
- Steel, copper and calcium-scale white are the only "materials"; scale is the enemy, aqua is the cure.
- One rounded Kannada-capable display face for both scripts; `lang="kn"` on every Kannada run.
- Pinned, scrubbed GSAP acts with Lenis smooth scroll; every act has a static reduced-motion layout.
- A page-long steel pipe on the left edge is the progress timeline; its water turns from cloudy scale to aqua after the softener act.
- Pill buttons, steel price tags, valve-wheel steps and thoranam garlands are the house components.

## Colors

A warm South Indian home palette (oxide, marigold, leaf, kumkum) set against cool vessel metals, with aqua reserved for water that has been softened.

### Primary
- **Red Oxide Floor** (oxide): the home ground. Hero, process and the page body; the ledge under the kodas; services heading colour on the pista wall. Also the browser `theme-color`.
- **Fired Oxide** (oxide-900): the deeper floor for the borewell and hard-water acts and the hero scroll-cue band.
- **Burnt Lamp Black-Red** (oxide-950): footer, solid header (at 0.8–0.92 alpha), mobile dock, ink on marigold, dark button.
- **Oxide Ink** (oxide-600): Kannada sub-lines under service names on the pista wall.

### Secondary
- **Marigold** (marigold): the primary pill button, selected chips, form focus ring, the happy act's full ground, scrollbar thumb, text selection.
- **Marigold Light** (marigold-300): the Kannada hero headline and spoken lines on dark grounds, footer/enquiry highlights, focus outline, dt labels.
- **Mango Leaf** (leaf): the enquiry form panel and thoranam leaves.
- **Deep Leaf** (leaf-800): the enquiry section ground.
- **Kumkum** (kumkum): the happy act's Kannada exclamation and the input caret; a small dot on the kalasha. Rare by design.
- **Painted-Wall Pista** (wall): the services section ground and the house walls in the hero illustration.

### Tertiary
- **Steel** (steel), **Steel Shadow** (steel-600), **Steel Ink** (steel-800): kodas, the page pipe, valve wheels, steel tags and the borewell depth counter. Steel is always rendered as a lit horizontal gradient in art, flat only on tags.
- **Copper** (copper): the kalasha's material anchor; in art it is a lit gradient, never a flat fill.
- **Calcium Scale** (scale): hard-water crust on vessels, the crusting ಗಡಸು word, the cloudy water in the pipe before the softener, the bullet pearls on the hard-water signs list.
- **Dusk Indigo** (dusk): the sad act. The hard-water pin tweens its ground from fired oxide to dusk as the crust grows; the softener act starts on dusk.
- **Deep Teal** (deep): the softener ground once the water is clean, and its reduced-motion ground.
- **Soft-Water Aqua** (aqua), **Aqua Mist** (aqua-200): softened water only: the ಮೃದು word, the pipe fill after the softener, process valve branches, services row hover water-line, footer tagline, and the logo drop.

### Neutral
- **Lamp Cream** (ink-on-dark) and **Sandal Cream** (ink-on-dark-soft): text on every dark ground; cream, never pure white.
- **Oxide Ink on Light** (ink-on-light) and **Soft Oxide Ink** (ink-on-light-soft): text on pista and marigold.
- **Field White** (field): form inputs only.
- **WhatsApp Green** (whatsapp) with **WhatsApp Ink** (whatsapp-ink): the WhatsApp button only.

### Named Rules
**The Aqua Is Earned Rule.** Aqua appears only where water has been softened or is about to be. Hard, untreated water is scale white. Never use aqua as a generic "water brand" blue on the home acts.

**The One Ground Per Act Rule.** Each act owns one drenched full-bleed ground from the palette; mood changes are made by tweening that ground (oxide-900 to dusk), not by layering cards on it.

**The Foreign Green Rule.** WhatsApp green is the only colour outside the world, and it is used only on WhatsApp actions.

## Typography

**Display Font:** Baloo Tamma 2 (with Noto Sans Kannada, system-ui)
**Body Font:** Hind Mysuru (with Noto Sans Kannada, system-ui)

**Character:** A rounded, heavy, hand-painted-signboard display that sets ಕನ್ನಡ and English with equal warmth, over a narrow, plain Mysuru-cut body that stays quiet. Both families cover Kannada script.

### Hierarchy
- **Display** (800, hero Kannada line; 1.05 line-height): the Kannada headline in the hero, in marigold-300. Desktop narrows to clamp(2.9rem, 6.4vw, 5.2rem). The softener's ಗಡಸು / ಮೃದು words run larger still (clamp(5rem, 11vw, 9.5rem)) as illustration.
- **Headline** (800, 1.02, -0.02em): section headings for services, process and enquiry, often with a coloured span (oxide/ink, aqua, marigold-300).
- **Title** (800): act headings inside pinned scenes; 1.75rem on phones. Service and step names run clamp(1.5rem, 2.6vw, 2.2rem) and clamp(1.8rem, 3vw, 2.6rem).
- **Spoken** (700, 1.2): the family's Kannada lines in curly quotes, above each act title. Marigold-300 on dark, aqua-200 in the hard act, kumkum and 800 weight in the happy act.
- **Body** (400, 1.6): explanatory copy at 30–38rem max width, in the soft ink for its ground; 0.98rem on phones.
- **Label** (700, 0.86–1rem): form labels, contact dt, steel tag text, nav links (600, 0.98rem). Sentence case, no tracking.

### Named Rules
**The Same Voice Rule.** Kannada and English headings use the same display family and weight. Kannada is never demoted to a smaller or lighter subtitle style; when both appear, Kannada usually leads.

**The lang Rule.** Every Kannada run carries `lang="kn"`, which forces the display family and zero tracking.

## Layout

The page is a vertical sequence of full-viewport pinned acts (hero, bore, hard, soft, happy), then three scrolling sections (services, process, enquiry) separated by thoranam garlands, then the footer. Horizontal padding is the gutter token; every section adds `pipe-clearance` (1.5rem) on the left so content clears the fixed steel pipe. Content in scrolling sections caps at 78rem.

Pinned acts use a two-column grid on desktop (copy beside stage). From 861px up, the hard and happy stages are absolutely positioned along the bottom and sized by viewport height (family min(36svh, 22vw), kodas min(30svh, 18vw)) so the family stands on the koda ledge. Story beats inside an act are stacked absolutely and crossfaded.

Breakpoints: 1080px hides the header nav; 900/860px collapses every two-column grid to one column with copy above stage; 760px collapses the borewell act; 640px hides the header CTA and fixed pipe, shows the mobile dock and a local pipe in the process list. On phones the family-and-kodas stage runs at 120% width and bleeds off the right edge; the hero stage is a fixed 600px canvas centred and cropped.

**The Mobile Dock Rule.** At 640px and below, a fixed bottom dock (WhatsApp 1.4fr, Call 1fr) is always present and sections reserve 4.4rem bottom padding for it. One tap to enquire, always.

## Elevation & Depth

Depth is mostly illustrative: lit metal gradients, painted ledges, and stacking of family in front of house. UI elevation is soft and ambient, never hard-offset.

### Shadow Vocabulary
- **Button rest** (`box-shadow: 0 10px 24px -12px rgb(0 0 0 / 0.55)`), lifting on hover to `0 16px 30px -14px rgb(0 0 0 / 0.6)` with a 2px rise.
- **Form panel** (`box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.6)`): the one floating container.
- **Solid header** (`box-shadow: 0 12px 30px -20px rgb(0 0 0 / 0.8)`) with `backdrop-filter: blur(10px) saturate(1.2)` when supported; the mobile dock mirrors it upward.
- **Steel tag** (`filter: drop-shadow(0 3px 3px rgb(46 12 7 / 0.25))`).

### Named Rules
**The Lit Metal Rule.** Steel and copper are always lit gradients with a bright specular band; flat grey is reserved for the steel tag body.

## Shapes

Round and soft: pills for every action, chip and nav link (999px); 14px inputs; a 28px form panel; 6px on the tag's open end. Ruled lists use 1–2px hairlines in a translucent ink of the ground (cream at 0.14 on oxide, oxide at 0.25 on pista). Recurring silhouettes are the koda (narrow neck, wide belly), the mango leaf, the marigold strand, the valve wheel and the pipe with collars.

## Components

### Buttons
- **Shape:** full pill (999px), min-height 3.25rem (3rem in the dock, 2.75rem in the header).
- **Primary:** marigold with oxide-950 ink, Baloo 700 1.05rem; leading 1.25em icon nudged down 0.06em to meet Baloo's baseline.
- **WhatsApp:** WhatsApp green with WhatsApp ink and the WhatsApp glyph; the main conversion everywhere (header, hero, enquiry submit, dock).
- **Ghost:** transparent with a 2px inset cream ring; hover fills cream at 0.08. Used for Call beside WhatsApp in the hero.
- **Dark:** oxide-950 with marigold-300 ink, for marigold grounds.
- **Hover / Focus:** 2px rise and deeper shadow over 0.4s ease-out; focus is a 3px marigold-300 outline at 3px offset.

### Chips
- **Style:** pill with a 2px inset white ring at 0.45, white Hind Mysuru 600 text, on the leaf panel.
- **State:** selected fills marigold with oxide-950 ink and drops the ring; focus mirrors the global outline.

### Cards / Containers
- **Corner Style:** 28px, only on the enquiry form panel.
- **Background:** leaf on a leaf-800 section.
- **Internal Padding:** clamp(1.5rem, 3vw, 2.5rem); fields gap 1.25rem.
- There are no content cards; services and process are ruled rows.

### Inputs / Fields
- **Style:** field white, 2px transparent border, 14px radius, Hind Mysuru 500, kumkum caret.
- **Focus:** marigold border plus a 4px marigold halo at 0.3.
- **Error:** border #ff8f7a, message in #ffd2c7 at 0.92rem.

### Navigation
- **Header:** transparent over the hero, becoming solid oxide-950 with blur after 40px of scroll. Water-drop mark plus "Soft Water / Technologies" in Baloo 800 with a marigold-300 small line. Pill nav links (Baloo 600) with a cream 0.12 hover fill; WhatsApp CTA at the right.
- **Mobile:** nav hidden; the bottom dock carries WhatsApp and Call.

### Thoranam Garland (signature)
Mango leaves alternating two greens with a marigold strand every third item, hung from a sagging gold cord. Each item is a `.sway` group pivoting at its top. In the hero it drops in with an elastic swing then idles; in the happy act it falls in from above; between services, process and enquiry it hangs across the seam and swings with scroll velocity (clamped ±14°, per-leaf weights 0.6–1.3, elastic settle).

### Koda Row (signature)
Two steel kodas, a copper kalasha with leaves and coconut, a chombu and a tap on a red-oxide ledge. Animatable layers: `.crust` (chalk-filtered scale white), `.shine` (skewed polish sweep) and `.water-in` (tap stream). A static `crusted` state serves reduced motion.

### Family and Faces (signature)
An illustrated family of four. Each face's mouth and brows carry happy and sad paths; `moodTo` tweens them (power2.inOut) and fades tears. The family stands on the koda ledge in the hard and happy acts.

### Page Pipe and Valve Steps (signature)
A 14px fixed steel pipe with collars on the left edge; its fill scales with page progress, scale-white before the softener act and aqua after. Process steps are valve wheels (3.6rem, steel stroke) teeing off the pipe with aqua-filling branches, rotating from -120° into place as the list scrubs. On phones a local pipe runs down the steps instead.

### Steel Tag
A steel price tag on an oxide thread naming who each service is for; Baloo 700 0.86rem in steel-800.

### Softener Canvas
An interactive ion-exchange canvas: indigo tank, marigold resin beads, scale-white hardness flecks, aqua soft water out; pointer stirs the water; scroll drives flow and brine regeneration.

### Motion grammar
GSAP ScrollTrigger and Lenis share one ticker. Story acts pin for +180% to +260% with `scrub: 0.8`, linear defaults; beats crossfade with 30px vertical travel. All timelines are registered inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`; under reduce, Lenis does not start, pins release to auto height, beats stack statically and each act shows its end state (crusted kodas, sad faces, dusk or deep ground).

## Do's and Don'ts

### Do:
- **Do** give each act one drenched full-bleed ground from the palette and change mood by tweening it.
- **Do** keep aqua for softened water and scale white for hard water.
- **Do** set Kannada in the display face with `lang="kn"`, at the same weight as English.
- **Do** end every scene within reach of a WhatsApp or Call pill; keep the mobile dock on phones.
- **Do** add the 1.5rem pipe clearance to every section's left padding.
- **Do** ship a static reduced-motion layout for every pinned act.
- **Do** keep every unconfirmed claim (contacts, stats, certifications, partners, logo) in `site.config.ts` as a visible placeholder.

### Don't:
- **Don't** use a blue water-splash hero, stock photography or a product card grid.
- **Don't** use WhatsApp green for anything but WhatsApp actions.
- **Don't** render steel or copper as flat fills in illustration.
- **Don't** use pure white body text on dark grounds; use the cream inks.
- **Don't** publish years in business, homes served, certifications, partners or testimonials until the client confirms them.
