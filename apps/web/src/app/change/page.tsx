import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getChanges, getEras } from "@/lib/content";

export const metadata = {
  title: "Change — MoonWitness"
};

export default function ChangePage() {
  const changes = getChanges();
  const eras = getEras();

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">THE CHANGE</div>
        <h1>WHAT MOVES NEXT?</h1>
        <p className="lede">
          Change is where the witness loop stops looking backward and starts
          moving forward. The next phase remains a destination, not a forced
          interpretation.
        </p>
      </section>

      <section className="rail">
        <div className="grid">
          {changes.map((change) => {
            const nextEra = eras.find((era) => era.id === change.next_phase);

            return (
              <article className="card" key={change.id}>
                <span className="label">CHANGE · {change.status}</span>
                <h3>{change.id}</h3>
                <p className="muted">FROM EVENT: {change.event}</p>
                <div className="transition">
                  <div>
                    <span>NEXT PHASE</span>
                    <strong>{nextEra?.title ?? change.next_phase}</strong>
                  </div>
                  <div>
                    <span>ERA ID</span>
                    <strong>{change.next_phase}</strong>
                  </div>
                </div>
                <Link className="entity-open" href={"/entity/" + change.id}>
                  OPEN CHANGE ↗
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
