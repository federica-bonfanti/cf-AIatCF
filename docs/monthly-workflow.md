# Monthly Workflow

How to produce the AI at CreateFuture infographic each month. End to end in three steps.

---

## What you need

- Access to this repo
- Claude (claude.ai) with the Figma MCP connected
- Edit access to the Figma file: https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG

---

## Step 1 — Fill in the data (you)

1. Find last month's file in `/data/` — e.g. `2026-04.json`
2. Duplicate it and rename to the current month — e.g. `2026-05.json`
3. Fill in all the fields — see [`field-guide.md`](field-guide.md) for what goes where
4. Validate your file — paste it into [jsonschemavalidator.net](https://www.jsonschemavalidator.net/) with `schema/infographic.schema.json` on the right
5. Commit and push to GitHub

---

## Step 2 — Inject the data (Claude)

Open a new chat with Claude and say:

> "Inject data/2026-05.json into the CF AI Infographic Figma template"

Claude will:
- Read the JSON
- Duplicate the clean template frame in Figma
- Populate every slot with real data
- Leave the original template untouched

The new frame will be named `CF AI Infographic — May 2026` and will appear next to the template in the Figma file.

---

## Step 3 — Publish and share (you, 30 seconds)

1. Open the Figma file
2. Click on the new frame (`CF AI Infographic — May 2026`)
3. Hit **Share** (top right) → **Publish to web**
4. Copy the `figma.site` link
5. Share it with the team 🎉

---

## Figma file

**Template:** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame (`CF AI Infographic — Template POC`) always stays clean with `[bracket]` placeholders. Never manually edit it with real data.

---

## If something looks wrong after injection

Check that:
- All fields in the JSON are filled in (no empty strings)
- The JSON validated successfully before injecting
- No Figma layer names were renamed since last month

If a field didn't inject, tell Claude which one — it can fix it directly in the Figma frame.
