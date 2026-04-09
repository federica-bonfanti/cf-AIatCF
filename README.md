# CF AI Infographic — Monthly Data System

This repo is the source of truth for the monthly **AI at CreateFuture** infographic.

The design lives in Figma Make. This repo owns the **data** that feeds it.

---

## How it works

```
You fill in /data/YYYY-MM.json
        ↓
Claude (via Figma MCP) reads the schema + data
        ↓
Figma Make template is populated
        ↓
Designer reviews & exports
```

---

## Who does what

| Role | What they touch |
|---|---|
| **Data filler** (anyone) | `/data/YYYY-MM.json` only |
| **Designer** | Figma Make template — layout, colour, type |
| **Developer / Claude** | Schema, tooling, Figma MCP integration |

---

## Monthly process

1. Duplicate last month's data file: `cp data/2026-04.json data/2026-05.json`
2. Fill in the new file following the field guide: [`docs/field-guide.md`](docs/field-guide.md)
3. Validate it: `npm run validate` (or paste into [jsonschemavalidator.net](https://jsonschemavalidator.net) with `schema/infographic.schema.json`)
4. Tell Claude: *"Populate the Figma Make template with data/2026-05.json"*
5. Designer reviews output in Figma Make, exports

---

## Structure

```
/data
  2026-04.json          ← April 2026 (first real example)
  YYYY-MM.json          ← add one per month

/schema
  infographic.schema.json   ← JSON Schema with validation rules

/docs
  field-guide.md        ← plain-English guide for data fillers
  design-contract.md    ← what the designer can/can't change
  themes.md             ← how seasonal themes work

/themes
  easter.json           ← decorative config for Easter
  default.json          ← base CF theme (no seasonal overlay)
```

---

## Rules

- **Never edit the schema without telling the designer.** Adding a field = the designer needs to add a slot in Figma Make.
- **Theme changes are decorative only.** They cannot change layout, colours, or typography — only icons, illustrations, and tone of small copy.
- **The schema is the contract.** If it validates, it's correct. If it doesn't validate, don't send it to Figma.
