import Link from "next/link";
import { notFound } from "next/navigation";
import { PlatformNav } from "@/components/platform-nav";
import { getEntity, getRelationships, getStories, getStoryTraces } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getStories().map((story) => ({ id: story.id }));
}

export default async function StoryJourneyPage({ params }: PageProps) {
  const { id } = await params;
  const entity = getEntity(id);

  if (!entity || entity.type !== "STORY") {
    notFound();
  }

  const data = entity.data as Record<string, unknown>;
  const movement = Array.isArray(data.movement) ? data.movement : [];
  const nextEvents = Array.isArray(data.next_event) ? data.next_event : [];
  const nextEventEntities = nextEvents
    .map((eventId) => getEntity(String(eventId)))
    .filter((item): item is NonNullable<ReturnType<typeof getEntity>> => Boolean(item));
  const narrativeTraces = getStoryTraces(id);
  const traceLinks = getRelationships()
    .filter((relationship) => relationship.from === id || relationship.to === id)
    .map((relationship) => {
      const targetId = relationship.from === id ? relationship.to : relationship.from;
      return { relationship, target: getEntity(targetId) };
    })
    .filter((item): item is { relationship: ReturnType<typeof getRelationships>[number]; target: NonNullable<ReturnType<typeof getEntity>> } => Boolean(item.target));

  return (
    <main className="shell">
      <PlatformNav />

      <section className="hero">
        <div className="eyebrow">STORY JOURNEY</div>
        <h1>{entity.title}</h1>
        <p className="tagline">{typeof data.theme === "string" ? data.theme : "LORE"}</p>
        <p className="lede">
          Follow this story as its own path through the MoonWitness universe.
        </p>
        <div className="hero-line" />
      </section>

      <section className="rail">
        <div className="section-head">
          <span>OPENING</span>
          <h2>{typeof data.opening === "string" ? data.opening : "The story is still forming."}</h2>
        </div>
        <div className="feature-card">
          <p>{typeof data.premise === "string" ? data.premise : "Unknown premise."}</p>
          <div className="entity-meta">
            <span>{entity.id}</span>
            <span>{typeof data.canon_level === "string" ? data.canon_level : "unknown"}</span>
          </div>
        </div>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>{movement.length}</span>
          <h2>MOVEMENT</h2>
        </div>
        <div className="timeline">
          {movement.map((step, index) => (
            <article className="timeline-item" key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="label">STEP</div>
                <h3>{String(step)}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {nextEvents.length ? (
        <section className="rail">
          <div className="section-head">
            <span>{nextEvents.length}</span>
            <h2>NEXT EVENTS</h2>
          </div>
          <div className="grid">
            {nextEventEntities.map((event) => (
              <Link className="card entity-card" href={"/entity/" + event.id} key={event.id}>
                <div className="card-index">{event.type}</div>
                <h3>{event.title}</h3>
                <p className="muted">Continue the trace.</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {narrativeTraces.length ? (
        <section className="rail">
          <div className="section-head">
            <span>{narrativeTraces.length}</span>
            <h2>FULL NARRATIVE TRACE</h2>
          </div>
          <div className="narrative-traces">
            {narrativeTraces.map((trace) => {
              const steps = [
                ["EVENT", trace.event],
                ["WITNESS", trace.witness],
                ["MESSAGE", trace.message],
                ["SEDUCTION", trace.seduction],
                ["FAULT LINE", trace.faultLine],
                ["EXPOSURE", trace.exposure],
                ["PAST PRESENCE", trace.pastPresence],
                ["CHANGE", trace.change]
              ].filter(([, item]) => Boolean(item)) as [string, NonNullable<(typeof trace)["event"]>][];
              return (
                <article className="narrative-trace-card" key={trace.event?.id ?? Math.random()}>
                  <div className="label">TRACE / {trace.event?.type}</div>
                  <h3>{trace.event?.title ?? "UNKNOWN EVENT"}</h3>
                  <div className="narrative-trace-steps">
                    {steps.map(([label, item], index) => (
                      <Link className="narrative-trace-step" href={"/entity/" + item.id} key={item.id}>
                        <span>{String(index + 1).padStart(2, "0")} · {label}</span>
                        <strong>{item.title}</strong>
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {traceLinks.length ? (
        <section className="rail">
          <div className="section-head">
            <span>{traceLinks.length}</span>
            <h2>CONNECTED TRACE</h2>
          </div>
          <div className="grid">
            {traceLinks.map(({ relationship, target }) => {
              const direction = relationship.from === id ? "OUTBOUND" : "INBOUND";
              return (
                <Link className="card entity-card" href={"/entity/" + target.id} key={relationship.id}>
                  <div className="card-index">{direction} · {relationship.type}</div>
                  <h3>{target.title}</h3>
                  <p className="muted">
                    {relationship.context ?? "Follow this relationship into the wider constellation."}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="rail">
        <div className="next-grid">
          <div>
            <div className="label">ENDING</div>
            <h3>{typeof data.ending === "string" ? data.ending : "The ending remains open."}</h3>
          </div>
          <div>
            <div className="label">NEXT PHASE</div>
            <h3>{typeof data.next_phase === "string" ? data.next_phase : "UNKNOWN"}</h3>
          </div>
          <div>
            <div className="label">BACK TO</div>
            <Link className="entity-open" href="/storytelling">ALL STORIES ↗</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
