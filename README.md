# CF AI Infographic — Monthly Data System

A lightweight data-injection system for the monthly **AI at CreateFuture** infographic.

The design lives in Figma. This repo owns the **data and instructions** that feed it. Each month, someone fills in a Google Sheet, the designer converts it to JSON using Claude, injects it into Figma, and shares a prototype link with the team.

---

## Quick start

→ **Filling in the spreadsheet?** Just fill in the Google Sheet and ping the designer. No repo access needed.

→ **Running the injection?** See [`docs/monthly-workflow.md`](docs/monthly-workflow.md)

→ **New to Claude?** Read [`CLAUDE.md`](CLAUDE.md) — it has everything Claude needs to run the injection cold.

→ **Changing the design?** See [`docs/design-contract.md`](docs/design-contract.md)

---

## How it works

```
AI team fills in Google Sheet
        ↓
Designer uploads sheet to Claude
Claude converts it to JSON + injects into Figma
        ↓
New Figma frame appears automatically
        ↓
Designer reviews → Present → Share prototype → team gets a link
```

---

## Figma file

**Template:** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame always stays clean with `[bracket]` placeholders. Claude duplicates it and injects real data into the copy each month. The original is never touched.

---

## Repo structure

```
CLAUDE.md                     ← start here if you're Claude running the injection

/data
  2026-04.json                ← April 2026
  2026-05.json                ← May 2026
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
```

---

## Rules

- **Never rename Figma layers** without updating CLAUDE.md and the injection script
- **Never add a field** without telling the designer — they need to add the matching Figma layer
- **Theme changes are decorative only** — no layout, colour, or typography changes
- **The template frame is sacred** — never manually edit it with real data
