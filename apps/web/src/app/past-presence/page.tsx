import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getPastPresences } from "@/lib/content";

export const metadata = {
  title: "Past Presence — MoonWitness"
};

export default function PastPresencePage() {
  const presences = getPastPresences();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">PAST PRESENCE</div>
        <h1>WHAT FROM THE PAST IS STILL HERE?</h1>
        <p className="lede">
          Past Presence is not nostalgia. It traces what remains, what still
          influences the present, and what may deserve to move forward.
        </p>
      </section>

      <section className="rail">
        {presences.map((presence) => (
          <article className="presence" key={presence.id}>
            <div>
              <span className="label">THE ECHO · {presence.status}</span>
              <h3>{presence.title}</h3>
              <p>{presence.what_remains}</p>
              <p className="muted">{presence.current_influence}</p>
              <Link className="entity-open" href={"/entity/" + presence.id}>
                OPEN PAST PRESENCE ↗
              </Link>
            </div>

            <div className="transition">
              <div><span>AUDIT</span><strong>{presence.audit ?? "UNKNOWN"}</strong></div>
              <div><span>EVALUATION</span><strong>{presence.evaluation ?? "UNKNOWN"}</strong></div>
              <div><span>BALANCING</span><strong>{presence.balancing ?? "UNKNOWN"}</strong></div>
              <div><span>PROMOTING</span><strong>{presence.promoting ?? "UNKNOWN"}</strong></div>
              <div><span>NEXT PHASE</span><strong>{presence.next_phase ?? "UNKNOWN"}</strong></div>
            </div>
          </article>
        ))}
      </section>

      <section className="rail">
        <div className="section-head">
          <span>CORE</span>
          <h2>PAST → AUDIT → EVALUATION → BALANCING → PROMOTING → NEXT PHASE</h2>
        </div>
      </section>
    </main>
  );
}
