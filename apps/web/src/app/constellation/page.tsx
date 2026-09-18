import { PlatformNav } from "@/components/platform-nav";
import { ConstellationExplorer } from "@/components/constellation-explorer";
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
        <p className="lede">
          Follow the links. Select a node. Discover what the witness connects to next.
        </p>
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
        <ConstellationExplorer nodes={graph.nodes} relationships={relationships} />
      </section>

      <section className="rail">
        <div className="section-head">
          <span>TRACE</span>
          <h2>THE GRAPH</h2>
        </div>
        <div className="flow">
          {graph.traversal.map((step, index) => (
            <div className="flow-node" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
