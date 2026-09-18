import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getAllEntities } from "@/lib/content";

export const metadata = {
  title: "Witness Archive — MoonWitness"
};

export default function ArchivePage() {
  const entities = getAllEntities();
  const groups = entities.reduce<Record<string, typeof entities>>((acc, entity) => {
    (acc[entity.type] ??= []).push(entity);
    return acc;
  }, {});

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">WITNESS ARCHIVE</div>
        <h1>EVERYTHING THAT REMAINS</h1>
        <p className="lede">
          One index for the living archive. Nothing needs to be resolved before
          it can be remembered, revisited, or connected.
        </p>
        <div className="entity-meta">
          <span>{entities.length} NODES</span>
          <span>{Object.keys(groups).length} LAYERS</span>
        </div>
      </section>

      {Object.entries(groups).map(([type, items]) => (
        <section className="rail" key={type}>
          <div className="section-head">
            <span>{String(items.length).padStart(2, "0")}</span>
            <h2>{type}</h2>
          </div>

          <div className="grid">
            {items.map((entity) => (
              <Link className="card entity-card" href={"/entity/" + entity.id} key={entity.id}>
                <div className="card-index">
                  {"status" in entity.data && typeof entity.data.status === "string"
                    ? entity.data.status
                    : "unknown"}
                </div>
                <h3>{entity.title}</h3>
                <p className="muted">{entity.id}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
