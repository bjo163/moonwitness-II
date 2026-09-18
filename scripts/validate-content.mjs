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

const eras = readYaml("data/eras.yaml");
const characters = readYaml("data/characters.yaml");
const loop = readYaml("data/first-loop.yaml");
const relationships = readYaml("data/relationships.yaml");
const graph = readYaml("data/graph.yaml");

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

for (const era of eras.eras ?? []) register(era.id, "data/eras.yaml");
for (const character of characters.characters ?? []) register(character.id, "data/characters.yaml");

for (const section of ["event", "witness", "message", "seduction", "fault_line", "past_presence", "change"]) {
  if (loop[section]?.id) register(loop[section].id, "data/first-loop.yaml");
}

for (const relationship of relationships.relationships ?? []) {
  register(relationship.id, "data/relationships.yaml");
}

const referencedIds = [
  ...(graph.graph?.nodes ?? []),
  ...((relationships.relationships ?? []).flatMap((r) => [r.from, r.to])),
];

for (const id of referencedIds) {
  if (typeof id !== "string") {
    fail("Graph contains a non-string reference");
  } else if (!ids.has(id) && id !== "THE_MOON") {
    fail(`Unknown graph reference: ${id}`);
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

validateStatuses(eras.eras, "data/eras.yaml");
validateStatuses(characters.characters, "data/characters.yaml");
validateStatuses(relationships.relationships, "data/relationships.yaml");
for (const [section, value] of Object.entries(loop)) {
  if (value && typeof value === "object" && "status" in value) {
    validateStatuses([value], `data/first-loop.yaml:${section}`);
  }
}

if (!process.exitCode) {
  console.log(`[moonwitness] PASS: ${ids.size} IDs registered, graph references resolved.`);
}
