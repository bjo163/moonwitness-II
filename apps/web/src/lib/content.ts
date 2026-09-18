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
  actors?: string[];
  witnesses?: string[];
  seduction?: string[];
  fault_lines?: string[];
  exposure?: string[];
  past_presence?: string[];
  conflict?: string[];
  sanity_last_breath?: string[];
  consequence?: string | null;
  [key: string]: unknown;
};

type Witness = {
  id: string;
  event: string;
  witnessed_by: string[];
  era?: string | null;
  signal?: string | null;
  observation?: string | null;
  message?: string | null;
  seduction?: string | null;
  fault_lines?: string[];
  exposure?: string | null;
  past_presence?: string | null;
  conflict?: string | null;
  sanity_last_breath?: string | null;
  audit?: string | null;
  evaluation?: string | null;
  balancing?: string | null;
  promoting?: string | null;
  change?: string | null;
  next_phase?: string | null;
  status: string;
  [key: string]: unknown;
};

type Message = {
  id: string;
  title?: string | null;
  from?: string | null;
  to?: string | null;
  date?: string | null;
  era?: string | null;
  type: string;
  witnesses?: string[];
  context?: string | null;
  message: string;
  signal?: string | null;
  related_event?: string | null;
  related_people?: string[];
  related_fault_lines?: string[];
  related_past_presence?: string[];
  status: string;
  [key: string]: unknown;
};

type Exposure = {
  id: string;
  title: string;
  event: string;
  witness?: string | null;
  message?: string | null;
  fault_line?: string | null;
  what_is_exposed?: string | null;
  what_remains_unknown?: string | null;
  status: string;
  [key: string]: unknown;
};

type Seduction = {
  id: string;
  title: string;
  type: string;
  event: string;
  flow?: string[];
  status: string;
  [key: string]: unknown;
};

type FaultLine = {
  id: string;
  title: string;
  type?: string | null;
  entity_a?: string | null;
  entity_b?: string | null;
  trigger?: string | null;
  pressure?: string | null;
  tension?: string | null;
  misalignment?: string | null;
  hidden?: string | null;
  risk?: string | null;
  related_events?: string[];
  related_messages?: string[];
  related_characters?: string[];
  related_era?: string | null;
  status: string;
  [key: string]: unknown;
};

type PastPresence = {
  id: string;
  title: string;
  origin?: string | null;
  past_event?: string | null;
  past_era?: string | null;
  trace?: string | null;
  what_remains?: string | null;
  where_present?: string | null;
  who_affected?: string[];
  current_signal?: string | null;
  current_influence?: string | null;
  audit?: string | null;
  evaluation?: string | null;
  balancing?: string | null;
  promoting?: string | null;
  next_phase?: string | null;
  related_entities?: string[];
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

type NarrativeEntry = {
  id: string;
  title: string;
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
  exposure: string;
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

export const getExposures = () =>
  loadYaml<{ version: string; exposures: Exposure[] }>("data/exposures.yaml").exposures;

export const getSeductionEntries = () =>
  loadYaml<{ version: string; seductions: Seduction[] }>("data/seductions.yaml").seductions;

export const getFaultLines = () =>
  loadYaml<{ version: string; fault_lines: FaultLine[] }>("data/fault-lines.yaml").fault_lines;

export const getPastPresences = () =>
  loadYaml<{ version: string; past_presences: PastPresence[] }>("data/past-presence.yaml").past_presences;

export const getChanges = () =>
  loadYaml<{ version: string; changes: Change[] }>("data/changes.yaml").changes;

const getNarrativeEntries = (relativePath: string, key: string) =>
  (loadYaml<{ version: string; [key: string]: NarrativeEntry[] }>(relativePath)[key] ?? []);

export const getPromoting = () => getNarrativeEntries("data/promoting.yaml", "promoting");
export const getVillains = () => getNarrativeEntries("data/villains.yaml", "villains");
export const getSanityLastBreath = () => getNarrativeEntries("data/sanity-last-breath.yaml", "sanity_last_breath");
export const getChangeAdvisoryBoard = () => getNarrativeEntries("data/change-advisory-board.yaml", "change_advisory_board");
export const getChasingHeart = () => getNarrativeEntries("data/chasing-heart.yaml", "chasing_heart");
export const getLovestruck = () => getNarrativeEntries("data/lovestruck.yaml", "lovestruck");
export const getBreathElectric = () => getNarrativeEntries("data/breath-electric.yaml", "breath_electric");
export const getEndOfAnEra = () => getNarrativeEntries("data/end-of-an-era.yaml", "end_of_an_era");

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
  const exposure = getExposures().find((item) => item.id === manifest.exposure);
  const pastPresence = getPastPresences().find((item) => item.id === manifest.past_presence);
  const change = getChanges().find((item) => item.id === manifest.change);

  return {
    version: manifest.version,
    event,
    witness,
    message,
    seduction,
    fault_line: faultLine,
    exposure,
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
    ["EXPOSURE", getExposures()],
    ["SEDUCTION", getSeductionEntries()],
    ["FAULT_LINE", getFaultLines()],
    ["PAST_PRESENCE", getPastPresences()],
    ["CHANGE", getChanges()],
    ["PROMOTING", getPromoting()],
    ["VILLAIN", getVillains()],
    ["SANITY_LAST_BREATH", getSanityLastBreath()],
    ["CHANGE_ADVISORY_BOARD", getChangeAdvisoryBoard()],
    ["CHASING_HEART", getChasingHeart()],
    ["LOVESTRUCK", getLovestruck()],
    ["BREATH_ELECTRIC", getBreathElectric()],
    ["END_OF_AN_ERA", getEndOfAnEra()],
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
