#!/usr/bin/env node
// CF AI Infographic — Injection Script
// Run via Figma MCP: paste figmaScript into a Figma:use_figma call

const fs = require("fs");
const path = require("path");

// Load latest data file
const dataDir = path.join(__dirname, "../data");
const latest = fs.readdirSync(dataDir).filter(f => f.endsWith(".json")).sort().reverse()[0];
const data = JSON.parse(fs.readFileSync(path.join(dataDir, latest), "utf8"));

console.log(`Injecting: ${latest}`);
console.log(`
// ── Paste this into a Figma:use_figma call ──────────────────
const page = figma.currentPage;
const data = ${JSON.stringify(data, null, 2)};

const template = page.findOne(n => n.type === "FRAME" && n.name.includes("Template POC"));
if (!template) return "❌ Template frame not found";

const copy = template.clone();
copy.name = \`CF AI Infographic — \${data.meta.month} 2026\`;
copy.x = template.x + template.width + 120;
copy.y = template.y;
page.appendChild(copy);

const injections = {
  "[MONTH] 2026 HIGHLIGHTS": \`\${data.meta.month.toUpperCase()} 2026 HIGHLIGHTS\`,
  "[featured_item_title]":    data.featured.featured_item_title,
  "[subject_subtitle]":       data.featured.subject_subtitle,
  "[summary]":                data.featured.summary,
  "[theme.footer_note]":      data.meta.theme.footer_note,
};

const toolSlots = ["[tool 1 name]","[tool 2 name]","[tool 3 name]","[tool 4 name]","[tool 5 name]"];
const clientNameSlots   = ["[CLIENT NAME 1]","[CLIENT NAME 2]","[CLIENT NAME 3]","[CLIENT NAME 4]"];
const projectTitleSlots = ["[Project title 1]","[Project title 2]","[Project title 3]","[Project title 4]"];
const valueSlots        = ["[value 1]","[value 2]","[value 3]","[value 4]"];
const metricValueSlots  = ["[metric 1]","[metric 2]","[metric 3]","[metric 4]"];
const shoutoutNameSlots = ["[Client & Project name 1]","[Client & Project name 2]","[Client & Project name 3]"];
const keyInsightSlots   = ["[Key insight 1]","[Key insight 2]","[Key insight 3]"];

const textNodes = copy.findAll(n => n.type === "TEXT");
const counts = {};
function nextCount(key) { counts[key] = (counts[key] || 0); return counts[key]++; }
let statusIdx = 0, askIdx = 0, answerIdx = 0, labelIdx = 0;
let injected = [];

for (const node of textNodes) {
  const name = node.name;
  const chars = node.characters;

  // 1:1 injections
  if (injections[name] !== undefined) {
    await figma.loadFontAsync(node.fontName);
    node.characters = injections[name]; injected.push(name); continue;
  }

  // Link — layer named "Text" containing [link]
  if (name === "Text" && chars.includes("[link]")) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.featured.link; injected.push("link"); continue;
  }

  // Tool names
  const ti = toolSlots.indexOf(name);
  if (ti !== -1 && data.tooling.tools[ti]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.tooling.tools[ti].name; injected.push(name); continue;
  }

  // Tool statuses (lowercase [status])
  if (name === "[status]" && data.tooling.tools[statusIdx]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.tooling.tools[statusIdx].status;
    injected.push(\`status \${statusIdx}\`); statusIdx++; continue;
  }

  // Client names, project titles, values
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

  // [the ask] and [answer] — by order
  if (name === "[the ask]") {
    const idx = nextCount("[the ask]");
    if (data.client_pipeline[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.client_pipeline[idx].ask; injected.push(\`ask \${idx}\`); } continue;
  }
  if (name === "[answer]") {
    const idx = nextCount("[answer]");
    if (data.client_pipeline[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.client_pipeline[idx].answer; injected.push(\`answer \${idx}\`); } continue;
  }

  // Weekly metrics and labels
  const mvi = metricValueSlots.indexOf(name);
  if (mvi !== -1 && data.weekly_ai_call.metrics[mvi]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.weekly_ai_call.metrics[mvi].value; injected.push(name); continue;
  }
  if (name === "[LABEL]") {
    const idx = nextCount("[LABEL]");
    if (data.weekly_ai_call.metrics[idx]) { await figma.loadFontAsync(node.fontName); node.characters = data.weekly_ai_call.metrics[idx].label; injected.push(\`label \${idx}\`); } continue;
  }

  // Shoutout names
  const sni = shoutoutNameSlots.indexOf(name);
  if (sni !== -1 && data.evangelist_shoutouts[sni]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.evangelist_shoutouts[sni].client_and_project; injected.push(name); continue;
  }

  // Shoutout leads — "LEAD: [NAME OF THE PROJECT LEAD N]"
  if (name.startsWith("LEAD: [NAME OF THE PROJECT LEAD")) {
    const idx = parseInt(name.slice(-2)) - 1;
    if (data.evangelist_shoutouts[idx]) {
      await figma.loadFontAsync(node.fontName);
      node.characters = \`LEAD: \${data.evangelist_shoutouts[idx].lead}\`;
      injected.push(\`lead \${idx}\`);
    } continue;
  }

  // Key metrics — two per shoutout (large then small), matched by occurrence
  if (name.match(/^\[Key metric [123]\]$/)) {
    const si = parseInt(name.slice(-2, -1)) - 1;
    const occ = nextCount(name);
    if (data.evangelist_shoutouts[si]) {
      await figma.loadFontAsync(node.fontName);
      node.characters = occ === 0
        ? data.evangelist_shoutouts[si].key_metric_large
        : data.evangelist_shoutouts[si].key_metric_small;
      injected.push(\`key metric \${si}[\${occ}]\`);
    } continue;
  }

  // Key insights
  const kii = keyInsightSlots.indexOf(name);
  if (kii !== -1 && data.evangelist_shoutouts[kii]) {
    await figma.loadFontAsync(node.fontName);
    node.characters = data.evangelist_shoutouts[kii].key_insight; injected.push(name); continue;
  }
}

figma.viewport.scrollAndZoomIntoView([copy]);
return \`✅ "\${copy.name}" created — \${injected.length} fields injected\`;
`);
