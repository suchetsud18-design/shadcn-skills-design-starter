# Design Taste — The Anti-Slop Doctrine

Tokens, components, and accessibility make a design *correct*. **Taste** makes it *great*. This
file is the judgment layer: how to make an interface look intentional, expensive, and human
instead of templated and machine-generated.

> Taste sits **below** the hard rules. It may sharpen anything beneath it, but it must **never**
> override User Needs, Accessibility, or the project's token/consistency rules in
> [`DESIGN.md`](./DESIGN.md). A beautiful design that fails contrast or breaks a pattern is a
> failed design. **If taste and a system rule conflict, the system rule wins.**

This project has **one** design system — the warm brand defined in `DESIGN.md` (cream/charcoal
surfaces, orange primary, blue/green accents; light + dark; plus the Neutral theme). Apply the
principles below *within* that system — never introduce a new color, font, or radius to chase a look.

---

## Brief Inference — decide before you generate

Slop comes from generating before deciding. Do NOT open with default components. Before building
a page or section, infer the brief from the request (one or two lines is enough) and commit to it:

- **Audience & tone** — expert vs. first-time; calm vs. energetic; premium vs. utilitarian
- **Mood** — the adjective the result must earn: "warm", "precise", "editorial", "calm"
- **Motion depth** — none / subtle feedback / expressive (honor the rules in `DESIGN.md` §17)
- **Layout family** — the section-archetype sequence you'll use (see Variance Mandate)

Write these down, then generate to them. If you can't name the mood and the layout family, you
will regress to the mean.

---

## The Core Problem: Statistical Slop

A model left to its defaults regresses to the mean — and the mean is mediocre. These are the
recurring "tells" of machine-generated UI. Treat each as a **defect to actively break**, not a
starting point.

| The Slop Default | Why it looks cheap | The Taste Move |
|------------------|--------------------|----------------|
| 6-line wrapped headings in a narrow column | Reads as a paragraph, kills impact | Wide measure for display type (`max-width` ~18–24ch for headlines), short and punchy |
| Same Left-text / Right-image row, repeated | Monotonous rhythm, obviously templated | Vary composition per section (see Variance Mandate) |
| Everything centered | No tension, no hierarchy | Use asymmetry and a real grid; center sparingly and deliberately |
| Three identical feature cards, equal weight | Flat, boring, no focal point | Break symmetry — one hero item, bento sizing, editorial captions |
| Cheap meta-labels ("SECTION 01", "FEATURE") | Filler that says nothing | Real, specific microcopy or none at all |
| Invisible/low-contrast button text | Looks broken, fails a11y | Solid contrast, deliberate button hierarchy (primary = charcoal on orange, 6.2:1) |
| Generic drop shadow on every box | Muddy, dated depth | Restrained, layered elevation (`DESIGN.md` §14); most things are flat |
| Pure black `#000` on pure white `#fff` | Harsh, amateur | Use the semantic tokens — `bg-background` / `text-foreground` are warm off-black/off-white by design |
| Rainbow of accent colors | No discipline | `bg-primary` carries action; one accent max; neutrals carry the weight |
| Cramped vertical spacing | Feels dense and anxious | Generous macro-whitespace between sections (see Spatial Rhythm) |
| Default system spacing (8px everywhere) | No rhythm | Intentional spacing scale with large jumps at section level (`DESIGN.md` §6) |
| Emoji anywhere in product UI (icons, labels, toggles) | Reads as a toy; inconsistent across platforms | Real icon set (**lucide**) as inline SVG with `currentColor`, consistent grid and weight — never emoji, including in JS that swaps a label |

---

## Anti-AI-Pattern Tells (copy + structure)

The fastest way a UI reads as machine-generated is the writing and the rhythm, not just the
pixels. Treat each of these as banned:

- **Em-dashes / long dashes in UI copy.** The sprinkled "—" is a top AI tell. Do not use em-dash
  or en-dash in interface text. Use a period, a comma, or split into two short sentences.
  (Hyphens in compound words like "two-factor" are fine.)
- **Marketing filler verbs.** "Elevate, unlock, seamless, effortless, supercharge, empower, take
  it to the next level, in today's fast-paced world." Say the concrete benefit instead.
- **Hollow superlatives + triads.** "Powerful, intuitive, and beautiful." Three abstract
  adjectives in a row is filler; name one specific, verifiable thing.
- **Fake structure labels.** "SECTION 01", "FEATURE", "Lorem ipsum", "Your headline here." Real,
  specific copy or nothing.
- **Symmetric everything.** Three identical equal-weight cards, every section centered, one
  repeated row. Break it (see the Variance Mandate).
- **Emoji as icons / decoration.** Use a real icon set (lucide).
- **Colored left-border accent strips** on alerts, toasts, callouts, and cards. The 3-4px tinted
  `border-left` is a generated-UI cliche. Convey status with a real icon plus text (never color
  alone); use a full hairline `border-border`, not a colored bar.
- **Over-hedged microcopy.** "You may want to consider possibly..." Be direct: frontload the verb
  (see [`UX-WRITING.md`](./UX-WRITING.md)).

> Read the copy aloud. If it sounds like a press release or a model warming up, rewrite it shorter
> and more specific.

---

## The Variance Mandate

**Never generate the same layout twice in a row.** Sameness is the loudest slop signal. Before
building a multi-section page, decide a *layout sequence* that varies deliberately.

Pick from distinct section archetypes and avoid repeating one back-to-back:
- **Full-bleed hero** — oversized type, lots of air, single focal element
- **Asymmetric split** — uneven columns (e.g. 7/5 or 8/4), not a clean 50/50
- **Bento grid** — mixed tile sizes, *gapless or tight*, no empty dead cells
- **Editorial stack** — centered narrow measure for prose, wide for media
- **Offset / overlap** — elements break the grid edge for depth
- **Marquee / full-width band** — color or media block that resets rhythm
- **Index / list** — dense, typographic, table-like for specs or content

> Rule of thumb: if two adjacent sections share the same column structure and alignment, change
> one of them.

---

## Block Coherence (iterative additions)

Pages are built one block at a time, often across turns. Each new block must read as part of
**one** system, not a fresh start. Before adding a block, re-read what exists and match its
contract:

- **Same tokens, same scale** — reuse the established type scale, spacing rhythm, radius language,
  and `bg-primary` + one accent. A new block never introduces a new color, font, or radius.
- **Same primitives** — reuse the existing shadcn `Button`/`Card`/`Input`; don't hand-roll a
  parallel version with different padding or states.
- **Vary composition, not vocabulary** — the *layout* should differ from the previous block
  (Variance Mandate), but the *materials* (color, type, depth, motion) stay constant.
- **Density continuity** — keep the same information density and whitespace hierarchy as adjacent
  blocks; a sudden dense table after airy hero bands reads as bolted-on.
- **State + a11y parity** — every interactive block carries the same hover/focus/press/disabled
  treatment and the same dark-mode behavior as the rest.

> Test: drop the new block in isolation next to an existing one. If a stranger could tell they
> were authored separately, it fails coherence.

---

## Typography Taste

Type is 90% of taste. The scale lives in `DESIGN.md` §3; here is how to *wield* it.

- **Display type is short and wide.** Headlines get a wide measure and a tight line-height
  (1.05–1.15). Never let a headline wrap to 5+ lines — shorten the copy or widen the container.
- **Extreme scale contrast.** The jump from display to body should be dramatic (e.g. `7xl`/`6xl`
  headline over `base` body). Timid contrast (`2xl` over `lg`) reads as a template.
- **Body measure: 60–75ch.** Enforce with `max-width: 65ch`. Long full-width lines are a
  readability and taste failure.
- **One UI family, used with conviction.** Weight and size create hierarchy, not extra fonts
  (Inter for sans, Geist Mono for mono — `DESIGN.md` §3).
- **Optical alignment over metric.** Trim leading/trailing space; hang punctuation where it
  matters; tighten tracking on large display sizes, loosen on all-caps labels.
- **Numbers and labels:** tabular figures for data, generous tracking + small size for
  overline/eyebrow labels.

---

## Spatial Rhythm

Whitespace is not empty — it is the most reliable signal of confidence.

- **Outer > inner.** Section padding > card padding > element gaps. Establish this hierarchy and
  never invert it.
- **Macro whitespace at section seams.** Give sections room to breathe — large vertical gaps at
  the top of the spacing scale. Crowded sections read as cheap.
- **Bento done right:** tiles vary in size but the grid stays mathematically exact. No empty/dead
  cells, no awkward leftover gaps. Every tile earns its area.
- **Consistent vertical rhythm.** Pick a baseline and keep related blocks on it. Tighten spacing
  inside a group, expand it between groups (proximity = relationship).
- **Edge tension.** Let a small number of elements break the margin/grid edge for depth — but only
  against an otherwise disciplined grid.

---

## Color & Surface Taste

- **Off-black, warm-white.** Never hardcode `#000`/`#fff`. The semantic tokens (`bg-background`,
  `text-foreground`, `bg-card`, `bg-muted`) are already warm/calibrated neutrals — use them.
- **Neutrals do the work; accent is a spice.** `bg-primary` is the one action color; at most one
  accent. Everything else is the neutral ramp.
- **Calibrated, not saturated.** Dial chroma down for large surfaces; reserve high saturation for
  small, intentional highlights.
- **Depth through layering, not shadows alone.** Combine subtle surface elevation, hairline
  `border-border`, and *restrained* shadow (`DESIGN.md` §14). Most surfaces are flat.
- **Dark mode is designed, not inverted.** The `.dark` token values in `DESIGN.md` §2 already
  re-balance surfaces and accents — pair surface/foreground tokens and trust them; don't invert.

---

## Depth & Detail Taste

- **Hairline borders** (`border-border`, 1px, low-contrast) separate surfaces more elegantly than
  shadows in most cases.
- **Radius consistency.** The radius language lives in `DESIGN.md` §5 — apply it system-wide via
  the `rounded-*` tokens. Mixing radii randomly looks accidental.
- **Micro-detail earns trust:** focus rings, hover transitions, selection states, empty states,
  loading skeletons. The presence of these states *is* the taste.
- **Restraint with effects.** Glass/blur, gradients, glow — each used once, intentionally, never
  stacked.

---

## Micro-Interaction Taste

(Full motion guidance in `DESIGN.md` §17.)

- Every interactive element responds — hover, focus, press — quickly (use the project's fast
  duration token).
- Motion has *purpose*: guide attention, show connection, confirm an action. No motion for
  decoration's sake.
- Easing carries meaning: `ease-out` for entrances, `ease-in` for exits.
- Always honor `prefers-reduced-motion` — replace travel with opacity, keep the feedback.

---

## Pre-Flight Aesthetic Check

Before shipping any visual output, confirm:

1. No heading wraps past ~3 lines; display type is wide and short
2. Adjacent sections do **not** share the same layout archetype
3. Body text constrained to 60–75ch
4. `bg-primary` + at most one accent; neutrals carry the rest
5. No hardcoded `#000`/`#fff` — semantic tokens only (off-black text on warm-white surface)
6. Section-level whitespace is generous; spacing hierarchy is outer > inner
7. Depth comes from layered surfaces/hairlines, not a shadow on every box
8. Bento/grid has no empty dead cells; alignment is exact
9. All interactive elements have hover + focus + press states (and `focus-visible` rings)
10. **No emoji anywhere in the UI** (use lucide as inline SVG); no "SECTION 01" filler labels; no
    invisible button text
11. Reduced-motion fallback present
12. Every value traces to a token — nothing hardcoded (see `DESIGN.md` §2)

> If the output passes the system checks (tokens, a11y, states) **and** this aesthetic check, it
> is ready. If taste and a system rule conflict, the system rule wins.
