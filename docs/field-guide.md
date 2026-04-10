# Field Guide — How to fill in the monthly data

This is for anyone filling in the monthly infographic data. You don't need to know how to code.

**The golden rule:** Copy last month's file, replace the content, validate, done.

---

## Step by step

1. Find last month's file in `/data/` — e.g. `2026-04.json`
2. Duplicate it and rename: `2026-05.json`
3. Fill in each section below
4. Validate at [jsonschemavalidator.net](https://www.jsonschemavalidator.net/) — paste your file on the left, paste `schema/infographic.schema.json` on the right
5. If it says "valid" — hand it off to Claude to inject

---

## meta

| Field | What to put | Example |
|---|---|---|
| `month` | Month name only | `"April"` |
| `theme.name` | Seasonal theme. One of: `default` `easter` `summer` `halloween` `christmas` | `"easter"` |
| `theme.footer_note` | Optional fun line in the footer | `"Happy Easter 🐣"` |

For most months use `"default"` and leave `footer_note` as `null`.

---

## featured

One spotlight item — a talk, event, or learning.

| Field | What to put | Required? |
|---|---|---|
| `featured_item_title` | Speaker name or event title | ✅ |
| `subject_subtitle` | Their role or a short descriptor | ✅ |
| `summary` | 2–3 sentences, plain text | ✅ |
| `link` | URL for the CTA button | ✅ |

---

## tooling

Exactly 5 tools. Each has:

| Field | What to put | Required? |
|---|---|---|
| `name` | Tool name | ✅ |
| `status` | One of: `In Trial` `Adopted` `Dropped` `Evaluating` | ✅ |

---

## client_pipeline

Exactly 4 client cards. Each has:

| Field | What to put | Required? |
|---|---|---|
| `client_name` | Client name — shown small at top of card | ✅ |
| `project_title` | Project name — shown large | ✅ |
| `ask` | What the client asked for, 1–2 sentences | ✅ |
| `answer` | What CF proposed or did, 1–2 sentences | ✅ |
| `value` | Monetary value e.g. `"£1m"` | ✅ |

---

## weekly_ai_call

Exactly 4 metrics. Each has:

| Field | What to put | Required? |
|---|---|---|
| `value` | Bold stat e.g. `"40%"` or `"1/wk"` | ✅ |
| `label` | Short label under the stat | ✅ |

---

## evangelist_shoutouts

Exactly 3 shoutout cards. Each has:

| Field | What to put | Required? |
|---|---|---|
| `client_and_project` | Project name shown at top | ✅ |
| `lead` | CF lead's name | ✅ |
| `key_metric_large` | Big bold number or word e.g. `"160+"` | ✅ |
| `key_metric_small` | Smaller supporting stat or label | ✅ |
| `key_insight` | 1–2 sentence takeaway | ✅ |

---

## Common mistakes

- **Wrong status format** — `status` must match exactly: `In Trial`, `Adopted`, `Dropped`, `Evaluating`
- **Wrong month format** — just the month name: `"April"` not `"April 2026"`
- **Forgetting a comma** between items in a list — the validator catches this

---

## Need help?

Ask Claude. Paste your file and say *"validate this against the CF infographic schema"* — it'll spot the problem instantly.
