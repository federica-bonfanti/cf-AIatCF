# CF AI Infographic — Monthly Data System

A lightweight data-injection system for the monthly **AI at CreateFuture** infographic.

The design lives in Figma. This repo owns the **data** that feeds it. Each month, someone fills in a JSON file, Claude injects it into the Figma template, and the result gets published as a Figma site link.

---

## Quick start

→ **Running it this month?** See [`docs/monthly-workflow.md`](docs/monthly-workflow.md)

→ **Filling in the data?** See [`docs/field-guide.md`](docs/field-guide.md)

→ **Changing the design?** See [`docs/design-contract.md`](docs/design-contract.md)

---

## How it works

```
Fill in /data/YYYY-MM.json
        ↓
Tell Claude to inject it → Figma frame created automatically
        ↓
Publish the frame in Figma → share the figma.site link
```

---

## Figma file

**Template:** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame always stays clean with `[bracket]` placeholders. Claude duplicates it and injects real data into the copy each month. The original is never touched.

---

## Repo structure

```
/data
  2026-04.json              ← April 2026
  2026-05.json              ← May 2026
  YYYY-MM.json              ← add one per month

/schema
  infographic.schema.json   ← validation rules

/docs
  monthly-workflow.md       ← how to run it each month
  field-guide.md            ← how to fill in the data
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

- **Never rename Figma layers** without updating the injection script
- **Never add a JSON field** without telling the designer — they need to add the matching Figma layer
- **Theme changes are decorative only** — no layout, colour, or typography changes
- **The template frame is sacred** — never manually edit it with real data
