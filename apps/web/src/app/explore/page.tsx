import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getSearchDocuments } from "@/lib/content";

export const metadata = {
  title: "Explore — MoonWitness"
};

type PageProps = {
  searchParams: Promise<{ q?: string; type?: string }>;
};

export default async function ExplorePage({ searchParams }: PageProps) {
  const { q = "", type = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const selectedType = type.trim().toUpperCase();
  const documents = getSearchDocuments();
  const types = Array.from(new Set(documents.map((document) => document.type))).sort();

  const results = documents.filter((document) => {
    const matchesType = !selectedType || document.type === selectedType;
    const matchesQuery = !query || document.searchText.includes(query);
    return matchesType && matchesQuery;
  });

  const hasFilters = Boolean(query || selectedType);

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">THE EXPLORER</div>
        <h1>FIND A SIGNAL</h1>
        <p className="lede">
          Search the connected universe across titles, lore, provenance,
          narrative context, and linked canonical references.
        </p>

        <form className="explore-form" method="get">
          <input
            aria-label="Search MoonWitness"
            name="q"
            defaultValue={q}
            placeholder="search lore, names, signals, references..."
          />
          <select aria-label="Filter by node type" name="type" defaultValue={selectedType}>
            <option value="">ALL TYPES</option>
            {types.map((entityType) => (
              <option value={entityType} key={entityType}>
                {entityType.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <button type="submit">SEARCH ↗</button>
        </form>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>{results.length}</span>
          <h2>{hasFilters ? "MATCHES" : "ALL NODES"}</h2>
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
            <h3>Nothing matched this trace.</h3>
            <p className="muted">
              Unknown is valid. Try a broader phrase or another node type.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
