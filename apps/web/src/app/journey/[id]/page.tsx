import Link from "next/link";
import { notFound } from "next/navigation";
import { PlatformNav } from "@/components/platform-nav";
import { getEntity, getStories } from "@/lib/content";

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
            {nextEvents.map((eventId) => (
              <Link className="card entity-card" href={"/entity/" + String(eventId)} key={String(eventId)}>
                <div className="card-index">EVENT</div>
                <h3>{String(eventId)}</h3>
                <p className="muted">Continue the trace.</p>
              </Link>
            ))}
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
