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

let warningCount = 0;
const warn = (message) => {
  warningCount += 1;
  console.warn(`[moonwitness] WARN: ${message}`);
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
  promoting: readYaml("data/promoting.yaml"),
  villains: readYaml("data/villains.yaml"),
  sanityLastBreath: readYaml("data/sanity-last-breath.yaml"),
  changeAdvisoryBoard: readYaml("data/change-advisory-board.yaml"),
  chasingHeart: readYaml("data/chasing-heart.yaml"),
  lovestruck: readYaml("data/lovestruck.yaml"),
  breathElectric: readYaml("data/breath-electric.yaml"),
  endOfAnEra: readYaml("data/end-of-an-era.yaml"),
  conflicts: readYaml("data/conflicts.yaml"),
  stories: readYaml("data/stories.yaml"),
  loop: readYaml("data/first-loop.yaml"),
  relationships: readYaml("data/relationships.yaml"),
  graph: readYaml("data/graph.yaml"),
};

const ids = new Set();
const entityMetadata = new Map();
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
  ["promoting", datasets.promoting.promoting],
  ["villains", datasets.villains.villains],
  ["sanity-last-breath", datasets.sanityLastBreath.sanity_last_breath],
  ["change-advisory-board", datasets.changeAdvisoryBoard.change_advisory_board],
  ["chasing-heart", datasets.chasingHeart.chasing_heart],
  ["lovestruck", datasets.lovestruck.lovestruck],
  ["breath-electric", datasets.breathElectric.breath_electric],
  ["end-of-an-era", datasets.endOfAnEra.end_of_an_era],
  ["conflicts", datasets.conflicts.conflicts],
  ["stories", datasets.stories.stories],
];

for (const [source, items] of collectionEntries) {
  for (const item of items ?? []) {
    register(item.id, `data/${source}`);
    if (typeof item.id === "string") {
      entityMetadata.set(item.id, { source: `data/${source}`, item });
    }
  }
}

const relationshipEdges = new Set();
for (const relationship of datasets.relationships.relationships ?? []) {
  register(relationship.id, "data/relationships.yaml");

  if (typeof relationship.id === "string") {
    entityMetadata.set(relationship.id, {
      source: "data/relationships.yaml",
      item: relationship,
    });
  }

  const edgeKey = [relationship.from, relationship.to, relationship.type].join("::");
  if (relationshipEdges.has(edgeKey)) {
    warn(
      `Duplicate relationship edge: ${relationship.from} → ${relationship.to} (${relationship.type})`
    );
  }
  relationshipEdges.add(edgeKey);
}

const graphNodes = datasets.graph.graph?.nodes ?? [];
const seenGraphNodes = new Set();

for (const id of graphNodes) {
  if (seenGraphNodes.has(id)) {
    fail(`Duplicate graph node: ${id}`);
  }
  seenGraphNodes.add(id);

  const metadata = entityMetadata.get(id);
  const visibility = metadata?.item?.visibility;

  if (visibility === "private" || visibility === "archived") {
    fail(`Non-public node exposed through graph: ${id} (${visibility})`);
  }

  if (visibility === "unlisted") {
    warn(`Unlisted node appears in graph and will be excluded from public discovery: ${id}`);
  }
}

const referencedIds = [
  ...graphNodes,
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
  ["promoting", datasets.loop.promoting],
  ["conflict", datasets.loop.conflict],
  ["sanity_last_breath", datasets.loop.sanity_last_breath],
  ["villain", datasets.loop.villain],
  ["change_advisory_board", datasets.loop.change_advisory_board],
  ["change", datasets.loop.change],
];

for (const [section, id] of loopReferences) {
  if (typeof id !== "string" || !id) {
    fail(`Invalid first-loop reference: ${section}`);
  } else if (!ids.has(id)) {
    fail(`Unknown first-loop reference: ${section} → ${id}`);
  }
}

const requiredCanonLevels = new Set([
  "canon",
  "lore",
  "interpretation",
  "unknown",
]);

const requiredVisibilities = new Set([
  "public",
  "unlisted",
  "archived",
  "private",
]);

const validateMetadata = (items, source) => {
  for (const item of items ?? []) {
    if (item.canon_level && !requiredCanonLevels.has(item.canon_level)) {
      fail(`Unknown canon_level "${item.canon_level}" in ${source}`);
    }
    if (item.visibility && !requiredVisibilities.has(item.visibility)) {
      fail(`Unknown visibility "${item.visibility}" in ${source}`);
    }

    if (
      item.visibility === "public" &&
      (item.canon_level === "canon" || item.canon_level === "lore") &&
      (!item.provenance || typeof item.provenance !== "string")
    ) {
      warn(`Public ${item.canon_level} item lacks provenance in ${source}: ${item.id}`);
    }
  }
};

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
  validateMetadata(items, `data/${source}`);
}
validateStatuses(datasets.relationships.relationships, "data/relationships.yaml");
validateMetadata(datasets.relationships.relationships, "data/relationships.yaml");

if (datasets.loop.version !== "0.1") {
  fail(`Unsupported first-loop version: ${datasets.loop.version}`);
}

if (!process.exitCode) {
  const warningSummary =
    warningCount === 1 ? "1 structural warning" : `${warningCount} structural warnings`;
  console.log(
    `[moonwitness] PASS: ${ids.size} IDs registered, graph references resolved, ${warningSummary}.`
  );
}
