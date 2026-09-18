import { PlatformNav } from "@/components/platform-nav";
import { getFirstLoop } from "@/lib/content";

export const metadata = {
  title: "Witness — MoonWitness"
};

export default function WitnessPage() {
  const loop = getFirstLoop();
  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE WITNESS</div>
        <h1>WITNESS LOG</h1>
        <p className="lede">Observation stays distinct from interpretation. Unknown is allowed.</p>
      </section>
      <section className="rail">
        <div className="split">
          <article className="feature-card">
            <span className="label">EVENT</span>
            <h3>{loop.event?.title}</h3>
            <p>{loop.event?.what_happened}</p>
          </article>
          <article className="feature-card">
            <span className="label">WITNESSED BY</span>
            <h3>{loop.witness?.witnessed_by?.join(", ")}</h3>
            <p>{loop.witness?.observation}</p>
          </article>
          <article className="feature-card">
            <span className="label">MESSAGE</span>
            <h3>{loop.message?.message}</h3>
            <p className="muted">{loop.message?.status}</p>
          </article>
          <article className="feature-card">
            <span className="label">PAST PRESENCE</span>
            <h3>{loop.past_presence?.title}</h3>
            <p>{loop.past_presence?.what_remains}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
