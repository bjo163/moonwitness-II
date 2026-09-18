import { PlatformNav } from "@/components/platform-nav";
import { getGraph, getRelationships } from "@/lib/content";

export const metadata = {
  title: "Constellation — MoonWitness"
};

export default function ConstellationPage() {
  const graph = getGraph();
  const relationships = getRelationships();
  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE CONSTELLATION</div>
        <h1>CONNECTED UNIVERSE</h1>
        <p className="lede">Relationships are links between entities, not duplicated source content.</p>
      </section>
      <section className="rail">
        <div className="presence">
          <article className="feature-card">
            <span className="label">NODES</span>
            <h3>{graph.nodes.length}</h3>
            <p className="muted">Seeded entities and narrative nodes.</p>
          </article>
          <article className="feature-card">
            <span className="label">RELATIONSHIPS</span>
            <h3>{relationships.length}</h3>
            <p className="muted">Current links in the seed graph.</p>
          </article>
        </div>
      </section>
      <section className="rail">
        <div className="grid">
          {relationships.map((relationship) => (
            <article className="card" key={relationship.id}>
              <div className="card-index">{relationship.id}</div>
              <h3>{relationship.type}</h3>
              <p>{relationship.from} <span className="accent">↔</span> {relationship.to}</p>
              {relationship.context ? <p className="muted">{relationship.context}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
