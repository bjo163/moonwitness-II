import { PlatformNav } from "@/components/platform-nav";
import { getEras } from "@/lib/content";

export const metadata = {
  title: "Timeline — MoonWitness"
};

export default function TimelinePage() {
  const eras = getEras().sort((a, b) => a.order - b.order);
  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE TIMELINE</div>
        <h1>ERAS</h1>
        <p className="lede">A lightweight timeline from Before Light to the Next Phase.</p>
      </section>
      <section className="rail">
        <div className="timeline">
          {eras.map((era) => (
            <article className="timeline-item" key={era.id}>
              <span>{String(era.order).padStart(2, "0")}</span>
              <div>
                <h3>{era.title}</h3>
                <p className="muted">{era.id} · {era.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
