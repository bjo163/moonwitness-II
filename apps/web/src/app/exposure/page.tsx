import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getExposures } from "@/lib/content";

export const metadata = {
  title: "Exposure — MoonWitness"
};

export default function ExposurePage() {
  const exposures = getExposures();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE EXPOSURE</div>
        <h1>MAKE THE SIGNAL VISIBLE</h1>
        <p className="lede">
          Exposure surfaces what can actually be shown from the witness record.
          It does not turn an observation into certainty.
        </p>
      </section>

      <section className="rail">
        <div className="grid">
          {exposures.map((exposure) => (
            <article className="card" key={exposure.id}>
              <span className="label">EXPOSURE · {exposure.status}</span>
              <h3>{exposure.title}</h3>
              <p>{exposure.what_is_exposed ?? "UNKNOWN"}</p>
              <div className="transition">
                <div>
                  <span>WHAT REMAINS UNKNOWN</span>
                  <strong>{exposure.what_remains_unknown ?? "UNKNOWN"}</strong>
                </div>
                <div>
                  <span>EVENT</span>
                  <strong>{exposure.event}</strong>
                </div>
              </div>
              <Link className="entity-open" href={"/entity/" + exposure.id}>
                OPEN EXPOSURE ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
