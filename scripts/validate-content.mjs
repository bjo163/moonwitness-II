import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();

const readYaml = (relativePath) => {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing file: ${relativePath}`);
  }
  return YAML.parse(fs.readFileSync(file, "utf8"));
};

const fail = (message) => {
  console.error(`[moonwitness] FAIL: ${message}`);
  process.exitCode = 1;
};

const datasets = {
  eras: readYaml("data/eras.yaml"),
  characters: readYaml("data/characters.yaml"),
  events: readYaml("data/events.yaml"),
  witnesses: readYaml("data/witnesses.yaml"),
  messages: readYaml("data/messages.yaml"),
  exposures: readYaml("data/exposures.yaml"),
  seductions: readYaml("data/seductions.yaml"),
  faultLines: readYaml("data/fault-lines.yaml"),
  pastPresences: readYaml("data/past-presence.yaml"),
  changes: readYaml("data/changes.yaml"),
  loop: readYaml("data/first-loop.yaml"),
  relationships: readYaml("data/relationships.yaml"),
  graph: readYaml("data/graph.yaml"),
};

const ids = new Set();
const register = (id, source) => {
  if (!id || typeof id !== "string") {
    fail(`Invalid ID in ${source}`);
    return;
  }
  if (ids.has(id)) {
    fail(`Duplicate ID: ${id}`);
    return;
  }
  ids.add(id);
};

const collectionEntries = [
  ["eras", datasets.eras.eras],
  ["characters", datasets.characters.characters],
  ["events", datasets.events.events],
  ["witnesses", datasets.witnesses.witnesses],
  ["messages", datasets.messages.messages],
  ["exposures", datasets.exposures.exposures],
  ["seductions", datasets.seductions.seductions],
  ["fault-lines", datasets.faultLines.fault_lines],
  ["past-presence", datasets.pastPresences.past_presences],
  ["changes", datasets.changes.changes],
];

for (const [source, items] of collectionEntries) {
  for (const item of items ?? []) register(item.id, `data/${source}`);
}

for (const relationship of datasets.relationships.relationships ?? []) {
  register(relationship.id, "data/relationships.yaml");
}

const referencedIds = [
  ...(datasets.graph.graph?.nodes ?? []),
  ...((datasets.relationships.relationships ?? []).flatMap((r) => [r.from, r.to])),
];

for (const id of referencedIds) {
  if (typeof id !== "string") {
    fail("Graph contains a non-string reference");
  } else if (!ids.has(id) && id !== "THE_MOON") {
    fail(`Unknown graph reference: ${id}`);
  }
}

const loopReferences = [
  ["event", datasets.loop.event],
  ["witness", datasets.loop.witness],
  ["message", datasets.loop.message],
  ["seduction", datasets.loop.seduction],
  ["fault_line", datasets.loop.fault_line],
  ["exposure", datasets.loop.exposure],
  ["past_presence", datasets.loop.past_presence],
  ["change", datasets.loop.change],
];

for (const [section, id] of loopReferences) {
  if (typeof id !== "string" || !id) {
    fail(`Invalid first-loop reference: ${section}`);
  } else if (!ids.has(id)) {
    fail(`Unknown first-loop reference: ${section} → ${id}`);
  }
}

const requiredStatuses = new Set([
  "draft",
  "review",
  "published",
  "archived",
  "forgotten",
  "reopened",
  "unknown",
  "unresolved",
  "promoted",
]);

const validateStatuses = (items, source) => {
  for (const item of items ?? []) {
    if (item.status && !requiredStatuses.has(item.status)) {
      fail(`Unknown status "${item.status}" in ${source}`);
    }
  }
};

for (const [source, items] of collectionEntries) {
  validateStatuses(items, `data/${source}`);
}
validateStatuses(datasets.relationships.relationships, "data/relationships.yaml");

if (datasets.loop.version !== "0.1") {
  fail(`Unsupported first-loop version: ${datasets.loop.version}`);
}

if (!process.exitCode) {
  console.log(`[moonwitness] PASS: ${ids.size} IDs registered, graph references resolved.`);
}
