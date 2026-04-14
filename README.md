# CF AI Infographic — Monthly Data System

A lightweight data-injection system for the monthly **AI at CreateFuture** infographic.

The design lives in Figma. This repo owns the **data and instructions** that feed it. There are now two ways to publish each month — a Figma frame injection (original POC) and a live Figma Make site that reads from this repo automatically.

---

## Quick start

→ **Filling in the spreadsheet?** Just fill in the Google Sheet and ping the designer. No repo access needed.

→ **Running the injection (Option A)?** See [`docs/monthly-workflow.md`](docs/monthly-workflow.md)

→ **Updating the Make site (Option B)?** Overwrite `data/current.json` and push. The site updates automatically.

→ **New to Claude?** Read [`CLAUDE.md`](CLAUDE.md) — it has everything Claude needs to run the injection cold.

→ **Changing the design?** See [`docs/design-contract.md`](docs/design-contract.md)

---

## How it works

There are two parallel publishing options. Both start from the same Google Sheet.

### Option A — Figma frame injection (POC)

```
AI team fills in Google Sheet
        ↓
Designer uploads sheet to Claude (with Figma MCP connected)
Claude converts it to JSON + injects into Figma template
        ↓
New Figma frame appears automatically
        ↓
Designer reviews → Present → Share prototype → team gets a link
```

### Option B — Figma Make site (live, auto-updating)

```
AI team fills in Google Sheet
        ↓
Designer converts sheet to JSON using Claude
Overwrites data/current.json and pushes to GitHub
        ↓
Figma Make site fetches current.json at runtime
Site updates automatically — no Figma MCP needed
        ↓
Share the permanent figma.site URL with the team
```

The Make site always reflects whatever is in `data/current.json` on the main branch.

---

## Figma file

**Template (Option A):** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame always stays clean with `[bracket]` placeholders. Claude duplicates it and injects real data into the copy each month. The original is never touched.

---

## Repo structure

```
CLAUDE.md                     ← start here if you're Claude running the injection

/data
  current.json                ← always the latest month (read by the Make site)
  2026-04.json                ← April 2026 archive
  2026-05.json                ← May 2026 archive
  template.json               ← blank template for reference

/schema
  infographic.schema.json     ← JSON validation rules

/docs
  monthly-workflow.md         ← step by step for each month
  design-contract.md          ← what the designer can/can't change

/themes
  default.json                ← base CF (no seasonal overlay)
  easter.json                 ← Easter decoration config

/scripts
  validate.js                 ← npm run validate
  inject.js                   ← injection script reference

/make
  PROMPT.md                   ← Figma Make prompt (paste into Make to rebuild the site)
```

---

## Rules

- **Never rename Figma layers** without updating CLAUDE.md and the injection script
- **Never add a field** without telling the designer — they need to add the matching Figma layer
- **Theme changes are decorative only** — no layout, colour, or typography changes
- **The template frame is sacred** — never manually edit it with real data
- **`data/current.json` is always the latest month** — archive the previous month as a dated file before overwriting
