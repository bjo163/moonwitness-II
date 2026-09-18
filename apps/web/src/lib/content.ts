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

type Event = {
  id: string;
  title: string;
  era?: string | null;
  status: string;
  what_happened: string;
  [key: string]: unknown;
};

type Witness = {
  id: string;
  event: string;
  witnessed_by: string[];
  status: string;
  [key: string]: unknown;
};

type Message = {
  id: string;
  message: string;
  status: string;
  [key: string]: unknown;
};

type Seduction = {
  id: string;
  title: string;
  type: string;
  event: string;
  status: string;
  [key: string]: unknown;
};

type FaultLine = {
  id: string;
  title: string;
  status: string;
  [key: string]: unknown;
};

type PastPresence = {
  id: string;
  title: string;
  status: string;
  [key: string]: unknown;
};

type Change = {
  id: string;
  event: string;
  next_phase: string;
  status: string;
  [key: string]: unknown;
};

type Relationship = {
  id: string;
  from: string;
  to: string;
  type: string;
  context?: string;
  status: string;
};

type FirstLoopManifest = {
  version: string;
  event: string;
  witness: string;
  message: string;
  seduction: string;
  fault_line: string;
  past_presence: string;
  transition?: {
    audit: string;
    evaluation: string;
    balancing: string;
    promoting: string;
  };
  change: string;
};

const root = path.resolve(process.cwd(), "../..");

const loadYaml = <T>(relativePath: string): T => {
  const absolutePath = path.join(root, relativePath);
  return YAML.parse(fs.readFileSync(absolutePath, "utf8")) as T;
};

export const getEras = () => loadYaml<{ version: string; eras: Era[] }>("data/eras.yaml").eras;
export const getCharacters = () =>
  loadYaml<{ version: string; characters: Character[] }>("data/characters.yaml").characters;

export const getEvents = () =>
  loadYaml<{ version: string; events: Event[] }>("data/events.yaml").events;

export const getWitnesses = () =>
  loadYaml<{ version: string; witnesses: Witness[] }>("data/witnesses.yaml").witnesses;

export const getMessages = () =>
  loadYaml<{ version: string; messages: Message[] }>("data/messages.yaml").messages;

export const getSeductionEntries = () =>
  loadYaml<{ version: string; seductions: Seduction[] }>("data/seductions.yaml").seductions;

export const getFaultLines = () =>
  loadYaml<{ version: string; fault_lines: FaultLine[] }>("data/fault-lines.yaml").fault_lines;

export const getPastPresences = () =>
  loadYaml<{ version: string; past_presences: PastPresence[] }>("data/past-presence.yaml").past_presences;

export const getChanges = () =>
  loadYaml<{ version: string; changes: Change[] }>("data/changes.yaml").changes;

export const getRelationships = () =>
  loadYaml<{ version: string; relationships: Relationship[] }>("data/relationships.yaml").relationships;

export const getGraph = () =>
  loadYaml<{ version: string; graph: { nodes: string[]; traversal: string[] } }>("data/graph.yaml").graph;

export const getFirstLoop = () => {
  const manifest = loadYaml<FirstLoopManifest>("data/first-loop.yaml");
  const event = getEvents().find((item) => item.id === manifest.event);
  const witness = getWitnesses().find((item) => item.id === manifest.witness);
  const message = getMessages().find((item) => item.id === manifest.message);
  const seduction = getSeductionEntries().find((item) => item.id === manifest.seduction);
  const faultLine = getFaultLines().find((item) => item.id === manifest.fault_line);
  const pastPresence = getPastPresences().find((item) => item.id === manifest.past_presence);
  const change = getChanges().find((item) => item.id === manifest.change);

  return {
    version: manifest.version,
    event,
    witness,
    message,
    seduction,
    fault_line: faultLine,
    past_presence: pastPresence,
    transition: manifest.transition,
    change
  };
};

export const getEntity = (id: string) => {
  const character = getCharacters().find((item) => item.id === id);
  if (character) return { id, type: "CHARACTER", title: character.name, data: character };

  const era = getEras().find((item) => item.id === id);
  if (era) return { id, type: "ERA", title: era.title, data: era };

  const collections: Array<[string, Array<{ id: string; [key: string]: unknown }>]> = [
    ["EVENT", getEvents()],
    ["WITNESS", getWitnesses()],
    ["MESSAGE", getMessages()],
    ["SEDUCTION", getSeductionEntries()],
    ["FAULT_LINE", getFaultLines()],
    ["PAST_PRESENCE", getPastPresences()],
    ["CHANGE", getChanges()],
  ];

  for (const [type, items] of collections) {
    const item = items.find((entry) => entry.id === id);
    if (item) {
      const title =
        typeof item.title === "string"
          ? item.title
          : typeof item.message === "string"
            ? item.message
            : id;
      return { id, type, title, data: item };
    }
  }

  const relationship = getRelationships().find((item) => item.id === id);
  if (relationship) return { id, type: "RELATIONSHIP", title: relationship.type, data: relationship };

  return null;
};
