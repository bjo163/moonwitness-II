import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getSeductionEntries } from "@/lib/content";

export const metadata = {
  title: "Seduction — MoonWitness"
};

export default function SeductionPage() {
  const entries = getSeductionEntries();

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">THE SEDUCTION</div>
        <h1>WHAT PULLS US IN?</h1>
        <p className="lede">
          Seduction tracks attraction, curiosity, temptation, and attachment.
          It describes narrative movement without forcing a conclusion about
          what that movement means.
        </p>
      </section>

      <section className="rail">
        <div className="grid">
          {entries.map((entry) => (
            <article className="card" key={entry.id}>
              <span className="label">{entry.type} · {entry.status}</span>
              <h3>{entry.title}</h3>
              <p className="muted">EVENT: {entry.event}</p>

              <div className="flow">
                {(entry.flow ?? []).map((step, index) => (
                  <div className="flow-node" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>

              <Link className="entity-open" href={"/entity/" + entry.id}>
                OPEN SEDUCTION ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
