# Design Contract

This document defines the boundary between the **data layer** (this repo) and the **design layer** (Figma).

It exists so the designer knows exactly what they own, and everyone else knows what they can't touch.

---

## The designer owns

These things live entirely in Figma. They are never in the data file.

| Element | Notes |
|---|---|
| Colours | Dark background, lime, pink — the CF palette |
| Typography | Typeface, sizes, weight hierarchy |
| Grid layout | The bento structure, spacing, proportions |
| Card design | Borders, corner radius, elevation |
| Logo placement | CF logo, position, size |
| Section layout | How each section's data is presented visually |
| Theme decoration sets | The actual assets for each named theme |

---

## The data layer owns

These things come from the monthly JSON (generated from the Google Sheet). The Figma template has named `[bracket]` slots for each one — the designer must never hardcode them.

| Data field | Figma layer name |
|---|---|
| Month | `[MONTH] 2026 HIGHLIGHTS` |
| Featured title | `[featured_item_title]` |
| Featured subtitle | `[subject_subtitle]` |
| Featured summary | `[summary]` |
| Featured link | Layer named `Text` containing `[link]` |
| Tool names | `[tool 1 name]` through `[tool 5 name]` |
| Tool statuses | `[status]` (×5, matched by order) |
| Client names | `[CLIENT NAME 1]` through `[CLIENT NAME 4]` |
| Project titles | `[Project title 1]` through `[Project title 4]` |
| Client asks | `[the ask]` (×4, matched by order) |
| Client answers | `[answer]` (×4, matched by order) |
| Project values | `[value 1]` through `[value 4]` |
| Weekly metrics | `[metric 1]` through `[metric 4]` |
| Weekly labels | `[LABEL]` (×4, matched by order) |
| Shoutout names | `[Client & Project name 1]` through `[Client & Project name 3]` |
| Shoutout leads | `LEAD: [NAME OF THE PROJECT LEAD 1]` through `...3` |
| Key metrics large | `[Key metric 1]` through `[Key metric 3]` (first occurrence) |
| Key metrics small | `[Key metric 1]` through `[Key metric 3]` (second occurrence) |
| Key insights | `[Key insight 1]` through `[Key insight 3]` |
| Footer note | `[theme.footer_note]` |

---

## Critical rules for the designer

- **Never rename a layer** that contains `[brackets]` — the injection script finds slots by exact layer name
- **Never hardcode real content** in the template frame — always use `[bracket]` placeholders
- **If you add a new section**, tell the developer — `CLAUDE.md` and the injection script need to be updated too
- **The template frame is sacred** — Claude duplicates it each month, so the original must always stay clean

---

## Adding a new field

1. Add the `[bracket]` slot to the Figma template with the agreed layer name
2. Update `CLAUDE.md` with the new layer name and injection logic
3. Update `schema/infographic.schema.json` with the new field
4. Update the Google Sheet template with the new input field
5. Test with a fresh injection before shipping

---

## Theme contract

Themes are **decorative only**. A theme can:
- Add floating icons or illustrations to the header
- Add a footer note line

A theme **cannot**:
- Change the colour palette
- Change the layout or grid
- Add or remove sections
- Change typography
