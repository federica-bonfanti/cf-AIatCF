# Figma Make Prompt v3 — AI at CreateFuture (no design file attached)

> Do NOT attach the Figma design file when using this prompt.
> Paste everything below this line directly into Figma Make.

---

Build a responsive, scrollable single-page website for "AI at CreateFuture" — a monthly internal infographic for a digital consultancy. The site should feel like a polished internal publication: bold, dark, high-contrast, with subtle motion that adds energy without being distracting.

All content is fetched from a JSON file at runtime. Nothing is hardcoded except labels and the fixed bullet list in Section 03.

---

## Data source

Fetch this URL on page load:

```
https://raw.githubusercontent.com/federica-bonfanti/cf-AIatCF/main/data/current.json
```

While fetching: show the page background with a centred `AI at CreateFuture` wordmark and a subtle animated loading indicator. If fetch fails: centred message "Content unavailable — please try again later."

---

## Colour palette

- Page background: `#040019` (near-black deep navy)
- Section 01 accent: `#c6f135` (neon yellow-green)
- Section 02 accent: `#e040fb` (vivid magenta)
- Section 03 accent: `#00e5a0` (bright mint)
- Section 04 accent: `#00d4ff` (bright cyan)
- Card background: `#0d0a2e`
- Card border: `#2a1a4a`
- Body text: `#ffffff`
- Muted text: `rgba(255,255,255,0.5)`

---

## Typography

- Use Inter or Space Grotesk (Google Fonts, load via @import)
- Page title: 64px bold
- Section number: 48px bold
- Card title: 22px bold
- Metric value (large stat): 56px bold, coloured with section accent
- Body copy: 15px, line-height 1.7
- Labels / eyebrows: 10px, all caps, letter-spacing 0.12em, muted

---

## Layout & responsiveness

- Max content width: 1100px, centred, 48px horizontal padding
- On desktop (>900px): multi-column layouts as described per section
- On tablet (600–900px): 2-column grids where applicable
- On mobile (<600px): single column, full width cards
- Section vertical spacing: 80px
- All layouts use CSS Grid or Flexbox — no fixed pixel widths on cards

---

## Animation

Apply subtle entrance animations as sections scroll into view (use Intersection Observer):
- Section header bars: slide in from left, fade in, 0.4s ease-out
- Cards: fade up from 20px below, staggered 0.1s delay per card
- Metric values: count up from 0 to their value on entrance (only for purely numeric values — skip for strings like "1/wk")
- Section accent colour: a very subtle animated gradient shimmer on section header backgrounds (slow, 4s loop, low intensity — should feel alive not flashy)

---

## Page header

- Small all-caps eyebrow: `data.meta.month` + ` HIGHLIGHTS` — muted white
- Large title: `AI at CreateFuture` — white, 64px bold
- Subtitle: `FEATURED · AI TOOLING · CLIENT PIPELINE · EVANGELIST SHOUTOUTS` — muted, 11px, all caps, letter-spaced
- Generous top padding: 80px

---

## Section header component (reused across all 4 sections)

Each section starts with a full-width coloured banner. Use this pattern for all four:
- Background: section accent colour
- Left: section number (e.g. `01.`) in black, 48px bold + section title in black, 24px bold
- Below title: section subtitle in dark grey, 11px all caps
- Right: a decorative SVG pattern in a slightly darker shade of the accent — use a different motif per section:
  - 01: dot grid
  - 02: spiral / concentric rings
  - 03: pixel / scattered squares
  - 04: wavy parallel lines
- Banner height: ~80px, full content width, border-radius 12px
- The accent shimmer animation applies to this banner background

---

## Section 01 — Featured & Tooling

Two columns, 55/45 split on desktop, stacked on mobile.

**Left — Featured this month**
- Eyebrow: `FEATURED THIS MONTH` in section accent colour
- Title: `data.featured.featured_item_title` — white, 36px bold
- Subtitle: `data.featured.subject_subtitle` — muted, 15px
- Body: `data.featured.summary` — white, 15px
- CTA: pill button `Watch / Read →` linking to `data.featured.link` — dark bg, white text, accent border, hover: accent bg with dark text, smooth transition

**Right — Tool Assessment**
- Eyebrow: `AI TOOLING` in accent colour
- Title: `Tool Assessment` — white, 22px bold
- Subtitle: `Trialling AI tools across the business — direction coming very soon.` — muted, 13px
- 5 tool rows from `data.tooling.tools`:
  - Full-width row, card background, 12px border-radius, 14px 16px padding
  - Left: `tool.name` white 14px
  - Right: `tool.status` badge — pill shape, coloured:
    - `In Trial` → amber `#f59e0b` bg, dark text
    - `Adopted` → green `#10b981` bg, dark text
    - `Dropped` → red `#ef4444` bg, white text
    - `Evaluating` → muted grey bg, white text
  - 6px gap between rows
- Footer line: `→ Contact your project lead to share your ideas` — muted, 12px

---

## Section 02 — AI Pipeline with Clients

4-column grid on desktop, 2-column on tablet, 1-column on mobile.

Each card from `data.client_pipeline`:
- Background: card bg colour, border: card border colour, border-radius: 12px, padding: 24px
- Full card height equal across the row (align-items: stretch)
- Eyebrow: `client.client_name` — section accent colour, 10px all caps
- Title: `client.project_title` — white, 20px bold
- Label `THE ASK` + `client.ask` — label muted 9px all caps, body white 13px
- Label `OUR ANSWER` + `client.answer` — same pattern
- Label `TOTAL PROJECT VALUE` — same label style
- Value: `client.value` — section accent colour, 32px bold, pushed to bottom of card with margin-top auto

---

## Section 03 — Weekly AI Call

**Metrics row** — 4 blocks in a row on desktop, 2×2 on tablet, 2×2 on mobile (not single column — always keep pairs):
- Each block: `metric.value` in section accent colour, 56px bold; `metric.label` white 13px below
- Generous spacing between blocks

**Below metrics** — two columns on desktop, stacked on mobile:
- Left: bullet list (hardcoded):
  - Where AI is currently being used on projects
  - Opportunities to expand AI within and across projects
  - What's working (and what isn't)
  - Growing weekly — more Creatrs joining each week
- Right: `Contact Gregor Bulloch to share what's happening on your project.` — with `Gregor Bulloch` bold

---

## Section 04 — Evangelist Shoutouts

3-column grid on desktop, 1-column on mobile.

Each card from `data.evangelist_shoutouts`:
- Background: card bg, border: card border, border-radius: 12px, padding: 24px
- Top: `shoutout.client_and_project` — white, 14px bold
- Below: `LEAD: [shoutout.lead]` — section accent colour, 10px all caps
- Large metric: `shoutout.key_metric_large` — white, 52px bold
- Supporting: `shoutout.key_metric_small` — white, 15px
- Label `WHAT THIS SHOWS` — muted, 9px all caps, margin-top 20px
- Insight: `shoutout.key_insight` — white, 13px, line-height 1.6

---

## Footer

- Centred `✦ CreateFuture` — white, 22px bold
- Below: `CONFIDENTIAL — INTERNAL USE ONLY` — muted, 10px all caps letter-spaced
- If `data.meta.theme.footer_note` is not null, render it below in muted italic 12px
- Bottom padding: 64px
