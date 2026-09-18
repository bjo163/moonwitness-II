import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getEvents } from "@/lib/content";

export const metadata = {
  title: "Events — MoonWitness"
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE EVENTS</div>
        <h1>WHAT HAPPENED</h1>
        <p className="lede">
          Events are the things that happened. Witnesses record what was seen.
          Meaning stays separate.
        </p>
      </section>

      <section className="rail">
        <div className="grid">
          {events.map((event) => (
            <article className="card" key={event.id}>
              <span className="label">EVENT · {event.status}</span>
              <h3>{event.title}</h3>
              <p>{event.what_happened}</p>
              <p className="muted">
                {event.era ? "ERA: " + event.era : "ERA: UNKNOWN"}
              </p>
              {Array.isArray(event.actors) && event.actors.length ? (
                <p className="muted">ACTORS: {event.actors.join(" · ")}</p>
              ) : null}
              <Link className="entity-open" href={"/entity/" + event.id}>
                OPEN EVENT ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
