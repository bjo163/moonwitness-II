import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getAllEntities } from "@/lib/content";

export const metadata = {
  title: "Explore — MoonWitness"
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ExplorePage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const entities = getAllEntities();

  const results = query
    ? entities.filter((entity) =>
        [entity.id, entity.type, entity.title]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : entities;

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">THE EXPLORER</div>
        <h1>FIND A SIGNAL</h1>
        <p className="lede">
          Search the connected universe without needing to know where the story
          lives first.
        </p>

        <form className="explore-form" method="get">
          <input
            aria-label="Search MoonWitness"
            name="q"
            defaultValue={q}
            placeholder="search names, nodes, layers..."
          />
          <button type="submit">SEARCH ↗</button>
        </form>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>{results.length}</span>
          <h2>{query ? "MATCHES" : "ALL NODES"}</h2>
        </div>

        {results.length ? (
          <div className="grid">
            {results.map((entity) => (
              <Link className="card entity-card" href={"/entity/" + entity.id} key={entity.id}>
                <div className="card-index">{entity.type}</div>
                <h3>{entity.title}</h3>
                <p className="muted">{entity.id}</p>
              </Link>
            ))}
          </div>
        ) : (
          <article className="feature-card">
            <span className="label">NO SIGNAL</span>
            <h3>Nothing matched “{q}”.</h3>
            <p className="muted">Unknown is valid. Try another trace.</p>
          </article>
        )}
      </section>
    </main>
  );
}
