import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getFaultLines } from "@/lib/content";

export const metadata = {
  title: "Fault Lines — MoonWitness"
};

export default function FaultLinesPage() {
  const faultLines = getFaultLines();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE FAULT LINES</div>
        <h1>WHERE PRESSURE LIVES</h1>
        <p className="lede">
          A Fault Line does not automatically mean something is broken. It marks
          pressure, misalignment, tension, or a place where the story can shift.
        </p>
      </section>

      <section className="rail">
        <div className="grid">
          {faultLines.map((fault) => (
            <article className="card" key={fault.id}>
              <span className="label">FAULT LINE · {fault.status}</span>
              <h3>{fault.title}</h3>
              <p>{fault.trigger}</p>
              <div className="transition">
                <div><span>PRESSURE</span><strong>{fault.pressure ?? "UNKNOWN"}</strong></div>
                <div><span>TENSION</span><strong>{fault.tension ?? "UNKNOWN"}</strong></div>
                <div><span>MISALIGNMENT</span><strong>{fault.misalignment ?? "UNKNOWN"}</strong></div>
              </div>
              <Link className="entity-open" href={"/entity/" + fault.id}>
                OPEN FAULT LINE ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
