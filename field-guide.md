# Field Guide — How to fill in the monthly data

This is for anyone filling in the monthly infographic data. You don't need to know how to code.

**The golden rule:** Copy last month's file, replace the content, validate, done.

---

## Step by step

1. Find last month's file in `/data/` — e.g. `2026-04.json`
2. Duplicate it: rename to `2026-05.json` (or the current month)
3. Fill in each section below
4. Validate your file at [jsonschemavalidator.net](https://www.jsonschemavalidator.net/) — paste in your file on the left, paste `schema/infographic.schema.json` on the right
5. If it says "valid" — you're done. Hand it off.

---

## meta

| Field | What to put | Example |
|---|---|---|
| `month` | Month and year, written out | `"April 2026"` |
| `tagline` | Short list of this month's sections, separated by `·` | `"Expert Talks · AI Tooling · Client Pipeline"` |
| `theme.name` | Seasonal theme. Must be one of: `default` `easter` `summer` `halloween` `christmas` | `"easter"` |

For most months, just use `"default"` for the theme and leave `decorative_elements` as-is from last month.

---

## featured

This is the spotlight section — talks, events, learning. **At least 1, at most 3.**

| Field | What to put | Required? |
|---|---|---|
| `type` | One of: `talk` `event` `learning` | ✅ |
| `title` | Card heading | ✅ |
| `subject` | Speaker name, event name, course name | No |
| `subject_subtitle` | Their role or a short descriptor | No |
| `date` | When it happened or will happen | No |
| `summary` | 2–4 sentences, plain text | ✅ |
| `tags` | Up to 4 keywords shown as pills | No |
| `cta_label` | Button text e.g. "Watch on CF Learn" | No |
| `cta_url` | Link for the button | No (but required if cta_label is set) |

**To add a second featured item**, copy the whole `{ }` block and add it after a comma inside the `[ ]`.

---

## tooling

| Field | What to put | Required? |
|---|---|---|
| `headline` | Section heading | ✅ |
| `body` | One supporting sentence | No |
| `tools[].name` | Tool name | ✅ |
| `tools[].logo_search` | What to search to find the logo | No |
| `tools[].status` | One of: `in_trial` `adopted` `dropped` `evaluating` | ✅ |
| `spoiler` | Optional teaser line at the bottom | No |

---

## client_pipeline

**At least 3 clients, at most 8.**

| Field | What to put | Required? |
|---|---|---|
| `intro` | Short intro line | No |
| `clients[].client_name` | Client name | ✅ |
| `clients[].ask` | What they asked for, 1–2 sentences | ✅ |
| `clients[].answer` | What CF proposed or did, 1–2 sentences | ✅ |
| `clients[].result` | One of: `won` `pending` `in_progress` `lost` | ✅ |
| `clients[].value` | Monetary value e.g. `"£1m"` — or `null` if none | No |

---

## weekly_ai_call

| Field | What to put | Required? |
|---|---|---|
| `headline` | Section heading | ✅ |
| `metrics[].value` | Bold stat e.g. `"40%"` or `"1/wk"` | ✅ |
| `metrics[].label` | Short label under the stat | ✅ |
| `what_it_covers` | List of bullet points for the right column | No |
| `cta_contact` | Name of person to contact to join | No |

**Minimum 2 metrics, maximum 6.**

---

## evangelist_shoutouts

The project spotlights. **At least 1, at most 6.**

| Field | What to put | Required? |
|---|---|---|
| `project_name` | Project or workstream name | ✅ |
| `client` | Client name (full) | ✅ |
| `lead` | CF lead's name | ✅ |
| `stage` | One of: `early` `growing` `scaled` | ✅ |
| `big_win` | One-line headline win. `null` if nothing to report yet | No |
| `in_progress` | What's currently underway | No |
| `metrics[].value` | Bold stat | No |
| `metrics[].label` | Short label | No |
| `client_quote` | A real quote from the client side | No |
| `quote_attribution` | Name and role e.g. `"Khully, Engineer"` | No (but required if quote is set) |
| `what_this_shows` | 1–2 sentence takeaway | ✅ |

---

## Common mistakes

- **Leaving out a required field** — the validator will catch this
- **Using the wrong `result` or `stage` value** — check the allowed values in the table above, they're case-sensitive
- **Forgetting the comma** between items in a list — the validator catches this too
- **Setting `client_quote` without `quote_attribution`** — always pair them

---

## Need help?

Ask Claude. Paste your file and say "validate this against the CF infographic schema" — it'll spot the problem.
