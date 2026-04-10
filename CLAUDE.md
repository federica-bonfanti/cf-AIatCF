# CLAUDE.md — CF AI Infographic System

This file tells Claude everything needed to run the monthly infographic injection. Read this before doing anything else.

---

## What this system does

Each month, someone fills in a spreadsheet with content for the AI at CreateFuture infographic. Claude converts it to JSON and injects it into a Figma template, creating a new populated frame ready for the designer to review and publish.

---

## Figma file

**File key:** `2ZT59UJTa0zltcPpjhRVRG`
**URL:** https://www.figma.com/design/2ZT59UJTa0zltcPpjhRVRG/CF-AI-Infographic-%E2%80%94-Template-POC

The template frame is named **`CF AI Infographic — Template POC`**. It always stays clean with `[bracket]` placeholders. Never inject into it directly — always duplicate it first.

---

## Monthly workflow

### Step 1 — Convert spreadsheet to JSON

The person will upload a filled `.xlsx` file. Convert it to JSON matching this exact structure:

```json
{
  "meta": {
    "month": "May",
    "theme": {
      "name": "default",
      "footer_note": null
    }
  },
  "featured": {
    "featured_item_title": "",
    "subject_subtitle": "",
    "summary": "",
    "link": ""
  },
  "tooling": {
    "tools": [
      { "name": "", "status": "" },
      { "name": "", "status": "" },
      { "name": "", "status": "" },
      { "name": "", "status": "" },
      { "name": "", "status": "" }
    ]
  },
  "client_pipeline": [
    { "client_name": "", "project_title": "", "ask": "", "answer": "", "value": "" },
    { "client_name": "", "project_title": "", "ask": "", "answer": "", "value": "" },
    { "client_name": "", "project_title": "", "ask": "", "answer": "", "value": "" },
    { "client_name": "", "project_title": "", "ask": "", "answer": "", "value": "" }
  ],
  "weekly_ai_call": {
    "metrics": [
      { "value": "", "label": "" },
      { "value": "", "label": "" },
      { "value": "", "label": "" },
      { "value": "", "label": "" }
    ]
  },
  "evangelist_shoutouts": [
    { "client_and_project": "", "lead": "", "key_metric_large": "", "key_metric_small": "", "key_insight": "" },
    { "client_and_project": "", "lead": "", "key_metric_large": "", "key_metric_small": "", "key_insight": "" },
    { "client_and_project": "", "lead": "", "key_metric_large": "", "key_metric_small": "", "key_insight": "" }
  ]
}
```

**Rules:**
- `meta.month` = month name only, e.g. `"May"` not `"May 2026"`
- `tooling.tools` = exactly 5 items
- `client_pipeline` = exactly 4 items
- `weekly_ai_call.metrics` = exactly 4 items
- `evangelist_shoutouts` = exactly 3 items
- `theme.name` must be one of: `default`, `easter`, `summer`, `halloween`, `christmas`
- `tool.status` must be one of: `In Trial`, `Adopted`, `Dropped`, `Evaluating`

---

### Step 2 — Inject into Figma

Use the `Figma:use_figma` tool with file key `2ZT59UJTa0zltcPpjhRVRG`.

Run this script, replacing the `data` object with the JSON from Step 1:

```javascript
const page = figma.currentPage;

const data = { /* paste JSON here */ };

// 1. Find template
const template = page.findOne(n => n.type === "FRAME" && n.name.includes("Template POC"));
if (!template) return "❌ Template frame not found";

// 2. Duplicate
const copy = template.clone();
copy.name = `CF AI Infographic — ${data.meta.month} 2026`;
copy.x = template.x + template.width + 120;
copy.y = template.y;
page.appendChild(copy);

// 3. Inject
const injections = {
  "[MONTH] 2026 HIGHLIGHTS": `${data.meta.month.toUpperCase()} 2026 HIGHLIGHTS`,
  "[featured_item_title]":   data.featured.featured_item_title,
  "[subject_subtitle]":      data.featured.subject_subtitle,
  "[summary]":               data.featured.summary,
  "[theme.footer_note]":     data.meta.theme.footer_note || " ",
};

const toolSlots         = ["[tool 1 name]","[tool 2 name]","[tool 3 name]","[tool 4 name]","[tool 5 name]"];
const clientNameSlots   = ["[CLIENT NAME 1]","[CLIENT NAME 2]","[CLIENT NAME 3]","[CLIENT NAME 4]"];
const projectTitleSlots = ["[Project title 1]","[Project title 2]","[Project title 3]","[Project title 4]"];
const valueSlots        = ["[value 1]","[value 2]","[value 3]","[value 4]"];
const metricValueSlots  = ["[metric 1]","[metric 2]","[metric 3]","[metric 4]"];
const shoutoutNameSlots = ["[Client & Project name 1]","[Client & Project name 2]","[Client & Project name 3]"];
const keyInsightSlots   = ["[Key insight 1]","[Key insight 2]","[Key insight 3]"];

const textNodes = copy.findAll(n => n.type === "TEXT");
const counts = {};
function nextCount(key) { counts[key] = (counts[key] || 0); return counts[key]++; }
let statusIdx = 0;
let injected = [];

for (const node of textNodes) {
  const name = node.name;
  const chars = node.characters;

  if (injections[name] !== undefined) {
    await figma.loadFontAsync(node.fontName);
    node.characters = injections[name]; injected.push(name); continue;
  }

  if (name === "Text" && chars.includes("[link]")) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.featured.link; injected.push("link"); continue;
  }

  const ti = toolSlots.indexOf(name);
  if (ti !== -1 && data.tooling.tools[ti]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.tooling.tools[ti].name; injected.push(name); continue;
  }

  if (name === "[status]" && data.tooling.tools[statusIdx]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.tooling.tools[statusIdx].status;
    injected.push(`status ${statusIdx}`); statusIdx++; continue;
  }

  const ci = clientNameSlots.indexOf(name);
  if (ci !== -1 && data.client_pipeline[ci]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.client_pipeline[ci].client_name; injected.push(name); continue;
  }

  const pti = projectTitleSlots.indexOf(name);
  if (pti !== -1 && data.client_pipeline[pti]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.client_pipeline[pti].project_title; injected.push(name); continue;
  }

  const vi = valueSlots.indexOf(name);
  if (vi !== -1 && data.client_pipeline[vi]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.client_pipeline[vi].value; injected.push(name); continue;
  }

  if (name === "[the ask]") {
    const idx = nextCount("[the ask]");
    if (data.client_pipeline[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.client_pipeline[idx].ask; injected.push(`ask ${idx}`); } continue;
  }

  if (name === "[answer]") {
    const idx = nextCount("[answer]");
    if (data.client_pipeline[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.client_pipeline[idx].answer; injected.push(`answer ${idx}`); } continue;
  }

  const mvi = metricValueSlots.indexOf(name);
  if (mvi !== -1 && data.weekly_ai_call.metrics[mvi]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.weekly_ai_call.metrics[mvi].value; injected.push(name); continue;
  }

  if (name === "[LABEL]") {
    const idx = nextCount("[LABEL]");
    if (data.weekly_ai_call.metrics[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.weekly_ai_call.metrics[idx].label; injected.push(`label ${idx}`); } continue;
  }

  const sni = shoutoutNameSlots.indexOf(name);
  if (sni !== -1 && data.evangelist_shoutouts[sni]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.evangelist_shoutouts[sni].client_and_project; injected.push(name); continue;
  }

  if (name.startsWith("LEAD: [NAME OF THE PROJECT LEAD")) {
    const idx = parseInt(name.slice(-2)) - 1;
    if (data.evangelist_shoutouts[idx]) {
      await figma.loadFontAsync(node.fontName);
      node.characters = `LEAD: ${data.evangelist_shoutouts[idx].lead}`;
      injected.push(`lead ${idx}`);
    } continue;
  }

  if (name.match(/^\[Key metric [123]\]$/)) {
    const si = parseInt(name.slice(-2, -1)) - 1;
    const occ = nextCount(name);
    if (data.evangelist_shoutouts[si]) {
      await figma.loadFontAsync(node.fontName);
      node.characters = occ === 0
        ? data.evangelist_shoutouts[si].key_metric_large
        : data.evangelist_shoutouts[si].key_metric_small;
      injected.push(`key metric ${si}[${occ}]`);
    } continue;
  }

  const kii = keyInsightSlots.indexOf(name);
  if (kii !== -1 && data.evangelist_shoutouts[kii]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.evangelist_shoutouts[kii].key_insight; injected.push(name); continue;
  }
}

figma.viewport.scrollAndZoomIntoView([copy]);
return `✅ "${copy.name}" created — ${injected.length} fields injected`;
```

---

## Layer naming — critical notes

These are the quirks in the Figma template that the injection script handles:

| Layer name | Quirk |
|---|---|
| `[MONTH] 2026 HIGHLIGHTS` | Must be named exactly this — not hardcoded month |
| `Text` | The link button layer is named "Text", detected by its content containing `[link]` |
| `[status]` | Lowercase — matched by order of appearance (5 total) |
| `LEAD: [NAME OF THE PROJECT LEAD N]` | Full string including "LEAD: " prefix |
| `[Key metric N]` | Appears twice per shoutout — first = large, second = small |
| `[LABEL]` | Uppercase — matched by order of appearance (4 total) |
| `[the ask]` | Lowercase — matched by order of appearance (4 total) |
| `[answer]` | Lowercase — matched by order of appearance (4 total) |

---

## After injection

Tell the designer:
1. Open the Figma file
2. Find the new frame — e.g. `CF AI Infographic — May 2026`
3. Review and tweak if needed
4. Click **Present** → **Share prototype** → **Anyone with the link** → **Copy link**
5. Share the link with the team
