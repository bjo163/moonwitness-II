import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

type Era = {
  id: string;
  title: string;
  order: number;
  description?: string;
  canon_level?: string;
  source?: string;
  provenance?: string;
  visibility?: string;
  status: string;
};

type Character = {
  id: string;
  name: string;
  description?: string;
  canon_level?: string;
  source?: string;
  provenance?: string;
  visibility?: string;
  status?: string;
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
  title?: string;
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

type Story = NarrativeEntry & {
  theme?: string;
  premise?: string;
  opening?: string;
  ending?: string;
  movement?: string[];
  next_event?: string[];
  next_phase?: string;
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
  promoting: string;
  conflict: string;
  sanity_last_breath: string;
  villain: string;
  change_advisory_board: string;
  transition?: {
    audit: string;
    evaluation: string;
    balancing: string;
    promoting: string;
  };
  change: string;
};

const loadYaml = <T>(relativePath: string): T => {
  const absolutePath = path.join(process.cwd(), "../../data", relativePath);
  return YAML.parse(fs.readFileSync(absolutePath, "utf8")) as T;
};

type ContentVisibility = "public" | "unlisted" | "archived" | "private";

const getContentVisibility = (value: unknown): ContentVisibility => {
  if (typeof value !== "object" || value === null) return "public";

  const visibility = (value as Record<string, unknown>).visibility;
  if (
    visibility === "public" ||
    visibility === "unlisted" ||
    visibility === "archived" ||
    visibility === "private"
  ) {
    return visibility;
  }

  return "public";
};

const isDirectlyVisible = (value: unknown) => {
  const visibility = getContentVisibility(value);
  return visibility === "public" || visibility === "unlisted";
};

const isDiscoverable = (value: unknown) => getContentVisibility(value) === "public";


export const getEras = () => loadYaml<{ version: string; eras: Era[] }>("eras.yaml").eras;
export const getCharacters = () =>
  loadYaml<{ version: string; characters: Character[] }>("characters.yaml").characters;

export const getEvents = () =>
  loadYaml<{ version: string; events: Event[] }>("events.yaml").events;

export const getWitnesses = () =>
  loadYaml<{ version: string; witnesses: Witness[] }>("witnesses.yaml").witnesses;

export const getMessages = () =>
  loadYaml<{ version: string; messages: Message[] }>("messages.yaml").messages;

export const getExposures = () =>
  loadYaml<{ version: string; exposures: Exposure[] }>("exposures.yaml").exposures;

export const getSeductionEntries = () =>
  loadYaml<{ version: string; seductions: Seduction[] }>("seductions.yaml").seductions;

export const getFaultLines = () =>
  loadYaml<{ version: string; fault_lines: FaultLine[] }>("fault-lines.yaml").fault_lines;

export const getPastPresences = () =>
  loadYaml<{ version: string; past_presences: PastPresence[] }>("past-presence.yaml").past_presences;

export const getChanges = () =>
  loadYaml<{ version: string; changes: Change[] }>("changes.yaml").changes;

const getNarrativeEntries = (relativePath: string, key: string): NarrativeEntry[] => {
  const data = loadYaml<Record<string, unknown>>(relativePath);
  const entries = data[key];
  return Array.isArray(entries) ? (entries as NarrativeEntry[]) : [];
};

export const getPromoting = () => getNarrativeEntries("promoting.yaml", "promoting");
export const getVillains = () => getNarrativeEntries("villains.yaml", "villains");
export const getSanityLastBreath = () => getNarrativeEntries("sanity-last-breath.yaml", "sanity_last_breath");
export const getChangeAdvisoryBoard = () => getNarrativeEntries("change-advisory-board.yaml", "change_advisory_board");
export const getChasingHeart = () => getNarrativeEntries("chasing-heart.yaml", "chasing_heart");
export const getLovestruck = () => getNarrativeEntries("lovestruck.yaml", "lovestruck");
export const getBreathElectric = () => getNarrativeEntries("breath-electric.yaml", "breath_electric");
export const getEndOfAnEra = () => getNarrativeEntries("end-of-an-era.yaml", "end_of_an_era");
export const getConflicts = () => getNarrativeEntries("conflicts.yaml", "conflicts");
export const getStories = () =>
  loadYaml<{ version: string; stories: Story[] }>("stories.yaml").stories;

export const getRelationships = () =>
  loadYaml<{ version: string; relationships: Relationship[] }>("relationships.yaml").relationships;

export const getGraph = () =>
  loadYaml<{ version: string; graph: { nodes: string[]; traversal: string[] } }>("graph.yaml").graph;

export type EntitySummary = {
  id: string;
  type: string;
  title: string;
};

export const getEntitySummaries = (): EntitySummary[] => {
  const summaries: EntitySummary[] = [
    ...getCharacters().filter(isDiscoverable).map((item) => ({ id: item.id, type: "CHARACTER", title: item.name })),
    ...getEras().filter(isDiscoverable).map((item) => ({ id: item.id, type: "ERA", title: item.title })),
    ...getEvents().filter(isDiscoverable).map((item) => ({ id: item.id, type: "EVENT", title: item.title })),
    ...getWitnesses().filter(isDiscoverable).map((item) => ({ id: item.id, type: "WITNESS", title: item.id })),
    ...getMessages().filter(isDiscoverable).map((item) => ({ id: item.id, type: "MESSAGE", title: item.title ?? item.message })),
    ...getExposures().filter(isDiscoverable).map((item) => ({ id: item.id, type: "EXPOSURE", title: item.title })),
    ...getSeductionEntries().filter(isDiscoverable).map((item) => ({ id: item.id, type: "SEDUCTION", title: item.title })),
    ...getFaultLines().filter(isDiscoverable).map((item) => ({ id: item.id, type: "FAULT_LINE", title: item.title })),
    ...getPastPresences().filter(isDiscoverable).map((item) => ({ id: item.id, type: "PAST_PRESENCE", title: item.title })),
    ...getChanges().filter(isDiscoverable).map((item) => ({ id: item.id, type: "CHANGE", title: item.title ?? item.id })),
    ...getPromoting().filter(isDiscoverable).map((item) => ({ id: item.id, type: "PROMOTING", title: item.title })),
    ...getVillains().filter(isDiscoverable).map((item) => ({ id: item.id, type: "VILLAIN", title: item.title })),
    ...getSanityLastBreath().filter(isDiscoverable).map((item) => ({ id: item.id, type: "SANITY_LAST_BREATH", title: item.title })),
    ...getChangeAdvisoryBoard().filter(isDiscoverable).map((item) => ({ id: item.id, type: "CHANGE_ADVISORY_BOARD", title: item.title })),
    ...getChasingHeart().filter(isDiscoverable).map((item) => ({ id: item.id, type: "CHASING_HEART", title: item.title })),
    ...getLovestruck().filter(isDiscoverable).map((item) => ({ id: item.id, type: "LOVESTRUCK", title: item.title })),
    ...getBreathElectric().filter(isDiscoverable).map((item) => ({ id: item.id, type: "BREATH_ELECTRIC", title: item.title })),
    ...getEndOfAnEra().filter(isDiscoverable).map((item) => ({ id: item.id, type: "END_OF_AN_ERA", title: item.title })),
    ...getConflicts().filter(isDiscoverable).map((item) => ({ id: item.id, type: "CONFLICT", title: item.title })),
    ...getStories().filter(isDiscoverable).map((item) => ({ id: item.id, type: "STORY", title: item.title }))
  ];

  const lookup = new Map(summaries.map((summary) => [summary.id, summary]));
  return getGraph().nodes
    .map((id) => lookup.get(id))
    .filter((summary): summary is EntitySummary => Boolean(summary));
};

export type NarrativeTrace = {
  event: EntitySummary | null;
  witness: EntitySummary | null;
  message: EntitySummary | null;
  seduction: EntitySummary | null;
  faultLine: EntitySummary | null;
  exposure: EntitySummary | null;
  pastPresence: EntitySummary | null;
  change: EntitySummary | null;
};

const summaryMap = () => new Map(getEntitySummaries().map((summary) => [summary.id, summary]));

export const getEventTrace = (eventId: string): NarrativeTrace | null => {
  const event = getEvents().find((item) => item.id === eventId);
  if (!event) return null;

  const summaries = summaryMap();
  const first = <T,>(values: T[] | undefined) => values?.[0] ?? null;
  const resolve = (id: unknown) =>
    typeof id === "string" ? summaries.get(id) ?? null : null;

  return {
    event: summaries.get(event.id) ?? null,
    witness: resolve(first(event.witnesses)),
    message: resolve(
      typeof first(event.witnesses) === "string"
        ? getWitnesses().find((item) => item.id === first(event.witnesses))?.message
        : null
    ),
    seduction: resolve(first(event.seduction)),
    faultLine: resolve(first(event.fault_lines)),
    exposure: resolve(first(event.exposure)),
    pastPresence: resolve(first(event.past_presence)),
    change: resolve(getChanges().find((item) => item.event === event.id)?.id)
  };
};

export const getStoryTraces = (storyId: string): NarrativeTrace[] => {
  const story = getStories().find((item) => item.id === storyId);
  if (!story) return [];

  const eventIds = [
    typeof story.related_event === "string" ? story.related_event : null,
    ...(Array.isArray(story.next_event) ? story.next_event.map((value) => String(value)) : [])
  ].filter((id, index, values): id is string => Boolean(id) && values.indexOf(id) === index);

  return eventIds
    .map((eventId) => getEventTrace(eventId))
    .filter((trace): trace is NarrativeTrace => Boolean(trace));
};

export const getFirstLoop = () => {
  const manifest = loadYaml<FirstLoopManifest>("first-loop.yaml");
  const event = getEvents().find((item) => item.id === manifest.event);
  const witness = getWitnesses().find((item) => item.id === manifest.witness);
  const message = getMessages().find((item) => item.id === manifest.message);
  const seduction = getSeductionEntries().find((item) => item.id === manifest.seduction);
  const faultLine = getFaultLines().find((item) => item.id === manifest.fault_line);
  const exposure = getExposures().find((item) => item.id === manifest.exposure);
  const pastPresence = getPastPresences().find((item) => item.id === manifest.past_presence);
  const promoting = getPromoting().find((item) => item.id === manifest.promoting);
  const conflict = getConflicts().find((item) => item.id === manifest.conflict);
  const sanityLastBreath = getSanityLastBreath().find((item) => item.id === manifest.sanity_last_breath);
  const villain = getVillains().find((item) => item.id === manifest.villain);
  const changeAdvisoryBoard = getChangeAdvisoryBoard().find((item) => item.id === manifest.change_advisory_board);
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
    promoting,
    conflict,
    sanity_last_breath: sanityLastBreath,
    villain,
    change_advisory_board: changeAdvisoryBoard,
    transition: manifest.transition,
    change
  };
};

const getRawEntity = (id: string) => {
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
    ["CONFLICT", getConflicts()],
    ["STORY", getStories()],
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

export const getEntity = (id: string) => {
  const entity = getRawEntity(id);
  return entity && isDirectlyVisible(entity.data) ? entity : null;
};

export const getAllEntities = () => {
  return getGraph().nodes
    .map((id) => getEntity(id))
    .filter(
      (entity): entity is NonNullable<ReturnType<typeof getEntity>> =>
        Boolean(entity) && isDiscoverable(entity?.data)
    );
};

const collectSearchValues = (value: unknown): string[] => {
  if (value === null || value === undefined) return [];

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectSearchValues(item));
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) =>
      collectSearchValues(item)
    );
  }

  return [];
};

export type SearchDocument = {
  id: string;
  type: string;
  title: string;
  searchText: string;
};

export const getSearchDocuments = (): SearchDocument[] =>
  getAllEntities().map((entity) => ({
    id: entity.id,
    type: entity.type,
    title: entity.title,
    searchText: [
      entity.id,
      entity.type,
      entity.title,
      ...collectSearchValues(entity.data)
    ]
      .join(" ")
      .toLowerCase()
  }));
