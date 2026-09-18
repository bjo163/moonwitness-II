import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

type Era = {
  id: string;
  title: string;
  order: number;
  status: string;
};

type Character = {
  id: string;
  name: string;
  aliases?: string[];
  nickname?: string;
  role?: string[];
  skills?: string[];
  ultimate_skill?: string;
  witness_phrase?: string;
};

type FirstLoop = {
  event?: { id: string; title: string; era: string; what_happened: string; status: string };
  witness?: { id: string; event: string; witnessed_by: string[]; observation?: string; status: string };
  message?: { id: string; event: string; witness: string; message: string; status: string };
  past_presence?: { id: string; title: string; source_event: string; what_remains: string; status: string };
  transition?: { audit: string; evaluation: string; balancing: string; promoting: string };
  change?: { id: string; event: string; next_phase: string; status: string };
};

const root = path.resolve(process.cwd(), "../..");

const loadYaml = <T>(relativePath: string): T => {
  const absolutePath = path.join(root, relativePath);
  return YAML.parse(fs.readFileSync(absolutePath, "utf8")) as T;
};

export const getEras = () => loadYaml<{ version: string; eras: Era[] }>("data/eras.yaml").eras;
export const getCharacters = () => loadYaml<{ version: string; characters: Character[] }>("data/characters.yaml").characters;
export const getFirstLoop = () => loadYaml<{ version: string } & FirstLoop>("data/first-loop.yaml");

export const getRelationships = () =>
  loadYaml<{ version: string; relationships: Array<{ id: string; from: string; to: string; type: string; context?: string; status: string }> }>(
    "data/relationships.yaml"
  ).relationships;

export const getGraph = () =>
  loadYaml<{ version: string; graph: { nodes: string[]; traversal: string[] } }>("data/graph.yaml").graph;

export const getEntity = (id: string) => {
  const characters = getCharacters();
  const eras = getEras();
  const relationships = getRelationships();
  const loop = getFirstLoop();

  const character = characters.find((item) => item.id === id);
  if (character) return { id, type: "CHARACTER", title: character.name, data: character };

  const era = eras.find((item) => item.id === id);
  if (era) return { id, type: "ERA", title: era.title, data: era };

  const loopEntries = Object.entries(loop);
  for (const [type, value] of loopEntries) {
    if (value && typeof value === "object" && "id" in value && value.id === id) {
      return { id, type: type.toUpperCase(), title: "title" in value ? value.title : id, data: value };
    }
  }

  const relationship = relationships.find((item) => item.id === id);
  if (relationship) return { id, type: "RELATIONSHIP", title: relationship.type, data: relationship };

  return null;
};
