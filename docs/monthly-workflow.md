# Monthly Workflow

How to produce the AI at CreateFuture infographic each month. End to end in three steps.

---

## Who does what

| Step | Who | Time |
|---|---|---|
| Fill in the spreadsheet | Anyone on the AI team | ~15 mins |
| Convert + inject | Designer (using Claude) | ~5 mins |
| Review, publish, share | Designer | ~5 mins |

---

## What you need

- The monthly spreadsheet template (Google Sheets — ask the designer for the link)
- Claude (claude.ai) with the Figma MCP connected — designer only
- Edit access to the Figma file — designer only

---

## Step 1 — Fill in the spreadsheet (AI team)

1. Open the shared Google Sheet for this month
2. Fill in every yellow field — every section, every row
3. When done, ping the designer: *"May spreadsheet is ready"*

That's it. You're done.

---

## Step 2 — Convert and inject (designer)

**2a — Convert spreadsheet to JSON**

Open a new Claude chat and say:

> "I've filled in the CF AI Infographic spreadsheet for [month]. Please read CLAUDE.md from https://github.com/federica-bonfanti/cf-AIatCF and convert this spreadsheet to the correct JSON format."

Then upload the filled spreadsheet. Claude will output the JSON.

**2b — Inject into Figma**

In the same Claude chat, say:

> "Now inject this JSON into the Figma template following CLAUDE.md"

Claude will:
- Duplicate the clean template frame in Figma
- Populate every slot with the month's data
- Leave the original template untouched

The new frame will appear in Figma named e.g. `CF AI Infographic — May 2026`.

---

## Step 3 — Review, publish and share (designer)

1. Open the Figma file: https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG
2. Find the new frame — e.g. `CF AI Infographic — May 2026`
3. Review it — tweak anything that needs adjusting
4. Click **Present** (play button, top right) to enter presentation mode
5. Click **Share prototype** in the toolbar
6. Set access to **Anyone with the link** → **Can view**
7. Click **Copy link**
8. Share the link with the team 🎉

---

## If something looks wrong after injection

- Check all fields in the spreadsheet were filled in — no blanks
- Tell Claude which field looks wrong — it can fix it directly in the Figma frame
- If a whole section is missing, Claude can re-run just that section
