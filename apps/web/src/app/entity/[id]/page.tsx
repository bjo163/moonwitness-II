import Link from "next/link";
import { notFound } from "next/navigation";
import { PlatformNav } from "@/components/platform-nav";
import { getEntity, getGraph, getRelationships } from "@/lib/content";

type PageProps = {
  params: Promise<{ id: string }>;
};

const hiddenFields = new Set(["id", "status"]);

const formatLabel = (key: string) =>
  key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const renderValue = (value: unknown, knownIds: Set<string>): React.ReactNode => {
  if (value === null || value === undefined || value === "") {
    return <span className="muted">UNKNOWN</span>;
  }

  if (typeof value === "string") {
    if (knownIds.has(value)) {
      return (
        <Link className="inline-ref" href={"/entity/" + value}>
          {value}
        </Link>
      );
    }

    return value;
  }

  if (Array.isArray(value)) {
    return (
      <div className="entity-value-list">
        {value.map((item, index) => (
          <div key={index}>
            {renderValue(item, knownIds)}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    return (
      <pre className="entity-inline-json">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return String(value);
};

export async function generateStaticParams() {
  return getGraph().nodes.map((id) => ({ id }));
}

export default async function EntityPage({ params }: PageProps) {
  const { id } = await params;
  const entity = getEntity(id);
  if (!entity) notFound();

  const graph = getGraph();
  const relationships = getRelationships().filter(
    (relationship) => relationship.from === id || relationship.to === id
  );
  const knownIds = new Set(graph.nodes);

  const relatedIds = relationships
    .map((relationship) =>
      relationship.from === id ? relationship.to : relationship.from
    )
    .filter((relatedId, index, ids) => ids.indexOf(relatedId) === index);

  const fields = Object.entries(entity.data as Record<string, unknown>).filter(
    ([key]) => !hiddenFields.has(key)
  );

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">{entity.type}</div>
        <h1>{entity.title}</h1>
        <div className="entity-meta">
          <span>{entity.id}</span>
          <span>CANONICAL NODE</span>
        </div>
      </section>

      <section className="rail">
        <div className="entity-layout">
          <article className="feature-card">
            <span className="label">LORE</span>
            <div className="entity-fields">
              {fields.map(([key, value]) => (
                <div className="entity-field" key={key}>
                  <span>{formatLabel(key)}</span>
                  <div>{renderValue(value, knownIds)}</div>
                </div>
              ))}
            </div>
          </article>

          <aside className="feature-card">
            <span className="label">CONNECTIONS</span>
            <div className="relationship-list">
              {relationships.map((relationship) => {
                const target =
                  relationship.from === id ? relationship.to : relationship.from;

                return (
                  <Link
                    className="relationship-row"
                    href={"/entity/" + target}
                    key={relationship.id}
                  >
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
              <Link href="/journey">← Follow the journey</Link>
              <Link href="/constellation">Explore the constellation →</Link>
              <Link href="/timeline">Explore the timeline →</Link>
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
          {relatedIds.map((relatedId) => {
            const related = getEntity(relatedId);

            return (
              <Link
                className="card entity-card"
                href={"/entity/" + relatedId}
                key={relatedId}
              >
                <div className="card-index">{related?.type ?? "NODE"}</div>
                <h3>{related?.title ?? relatedId}</h3>
                <p className="muted">{relatedId}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rail">
        <details className="entity-debug">
          <summary>RAW NODE DATA</summary>
          <pre className="entity-json">
            {JSON.stringify(entity.data, null, 2)}
          </pre>
        </details>
      </section>
    </main>
  );
}
