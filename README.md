# CF AI Infographic — Monthly Data System

A lightweight data-injection system for the monthly **AI at CreateFuture** infographic.

The design lives in Figma. This repo owns the **data** that feeds it.

---

## How it works

```
You fill in /data/YYYY-MM.json
        ↓
Claude reads the file and injects data into the named Figma layers
        ↓
Designer reviews & exports
```

---

## Who does what

| Role | What they touch |
|---|---|
| **Data filler** (anyone) | `/data/YYYY-MM.json` only |
| **Designer** | Figma file — layout, colour, type |
| **Claude** | Reads the JSON, writes to Figma layer slots via MCP |

---

## Monthly process

1. Duplicate last month's file: `cp data/2026-04.json data/2026-05.json`
2. Fill in the new file — see [`docs/field-guide.md`](docs/field-guide.md)
3. Validate: `npm run validate`
4. Tell Claude: *"Inject data/2026-05.json into the Figma template"*
5. Designer reviews the generated frame, exports

---

## Current sections

| # | Section | Status |
|---|---|---|
| Header | Month, title, tagline | ✅ |
| 01 | Featured section & Tooling | ✅ |
| 02 | AI Pipeline with Clients | ✅ |
| 03 | Weekly AI Call | ✅ |
| 04 | Evangelist Shoutouts | ✅ |
| Footer | Logo, disclaimer, theme note | ✅ |

---

## Figma file

**Template:** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame stays clean with `[bracket]` placeholders. Each month Claude duplicates it and injects real data into the copy. The original is never touched.

---

## Structure

```
/data
  2026-04.json              ← April 2026 (first real example)
  YYYY-MM.json              ← add one per month

/schema
  infographic.schema.json   ← validation rules

/docs
  field-guide.md            ← plain-English guide for data fillers
  design-contract.md        ← what the designer can/can't change

/themes
  default.json              ← base CF (no seasonal overlay)
  easter.json               ← Easter decoration config

/scripts
  validate.js               ← npm run validate
  inject.js                 ← injection script (run via Figma MCP)
```

---

## Rules

- **Never rename Figma layers** without updating the injection script — layer names are how Claude finds the slots
- **Never add a JSON field** without telling the designer — they need to add the matching Figma layer
- **Theme changes are decorative only** — no layout, colour, or typography changes
- **The template frame is sacred** — never manually edit it with real data, always let the injection script create a copy
