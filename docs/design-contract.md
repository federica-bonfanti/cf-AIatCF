# Design Contract

This document defines the boundary between the **data layer** (this repo) and the **design layer** (Figma Make).

It exists so the designer knows exactly what they own, and data fillers know what they can't touch.

---

## The designer owns

These things live entirely in Figma Make. They are never in the data file.

| Element | Notes |
|---|---|
| Colours | Dark background, lime, pink — the CF palette |
| Typography | Typeface, sizes, weight hierarchy |
| Grid layout | The bento structure, spacing, proportions |
| Card design | Borders, corner radius, elevation |
| Logo placement | CF logo, position, size |
| Section layout | How each section's data is presented visually |
| Badge styles | How `won` / `pending` / `in_progress` / `lost` look |
| Stage badge styles | How `early` / `growing` / `scaled` look |
| Theme decoration sets | The actual assets (icons, illustrations) for each named theme |

---

## The data layer owns

These things come from `/data/YYYY-MM.json`. The designer creates *slots* for them in Figma Make — they do not hardcode them.

| Data field | Slot type in Figma Make |
|---|---|
| All text content | Text variable |
| Metric values and labels | Text variable |
| Tool names and statuses | List / repeater |
| Client cards | List / repeater |
| Shoutout cards | List / repeater |
| Featured items | List / repeater (1–3) |
| Theme name | Condition — controls which decoration set is shown |
| CTA URLs | Link variable |

---

## Shared responsibility

| Element | Who decides |
|---|---|
| How many items appear | **Data** (within the min/max in the schema) |
| What the items say | **Data** |
| How items are laid out | **Design** |
| Whether a null field hides a slot | **Design** — slots with null values should hide gracefully |

---

## Adding a new field

If the data layer needs a new field:

1. Propose it in a PR to `schema/infographic.schema.json`
2. Tag the designer — they need to add the corresponding slot in Figma Make before the field goes live
3. Update `docs/field-guide.md` with instructions for fillers
4. Deploy together

**Never add a field to a data file before the schema and Figma Make slot exist.**

---

## Theme contract

Themes are **decorative only**. A theme can:

- Add floating icons / illustrations to the header and background
- Change the header illustration or pattern
- Adjust the tone of small incidental copy (e.g. a footer line)

A theme **cannot**:

- Change the colour palette
- Change the layout or grid
- Add or remove sections
- Change typography

Each named theme has a corresponding file in `/themes/`. The designer maintains these files — they define which assets map to which theme name.

---

## The schema is the contract

If a data file validates against `schema/infographic.schema.json`, the designer's template must be able to render it — including edge cases like:

- A shoutout card with no metrics
- A featured item with no CTA
- A client card with `value: null`
- A shoutout card with `big_win: null`

The designer should test these cases when building the template.
