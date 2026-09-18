import Link from "next/link";
import { notFound } from "next/navigation";
import { PlatformNav } from "@/components/platform-nav";
import { getEntity, getGraph, getRelationships } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getGraph().nodes.map((id) => ({ id }));
}

export default async function EntityPage({ params }: PageProps) {
  const { id } = await params;
  const entity = getEntity(id);
  if (!entity) notFound();

  const relationships = getRelationships().filter(
    (relationship) => relationship.from === id || relationship.to === id
  );

  const relatedIds = relationships.map((relationship) =>
    relationship.from === id ? relationship.to : relationship.from
  );

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">{entity.type}</div>
        <h1>{entity.title}</h1>
        <p className="lede">{entity.id}</p>
      </section>

      <section className="rail">
        <div className="entity-layout">
          <article className="feature-card">
            <span className="label">ENTITY</span>
            <pre className="entity-json">
              {JSON.stringify(entity.data, null, 2)}
            </pre>
          </article>

          <aside className="feature-card">
            <span className="label">CONNECTIONS</span>
            <div className="relationship-list">
              {relationships.map((relationship) => {
                const target =
                  relationship.from === id ? relationship.to : relationship.from;
                return (
                  <Link className="relationship-row" href={`/entity/${target}`} key={relationship.id}>
                    <span>{relationship.type}</span>
                    <strong>{target}</strong>
                  </Link>
                );
              })}
            </div>

            {!relationships.length ? (
              <p className="muted">
                No relationship recorded yet. The node remains open for discovery.
              </p>
            ) : null}

            <div className="entity-actions">
              <Link href="/constellation">← Back to constellation</Link>
              <Link href="/timeline">Explore timeline →</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>{relatedIds.length}</span>
          <h2>RELATED NODES</h2>
        </div>
        <div className="grid">
          {relatedIds.map((relatedId) => (
            <Link className="card entity-card" href={`/entity/${relatedId}`} key={relatedId}>
              <div className="card-index">NODE</div>
              <h3>{relatedId}</h3>
              <p className="muted">Follow the connection.</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
