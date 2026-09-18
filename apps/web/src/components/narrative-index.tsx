import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";

export type NarrativeItem = {
  id: string;
  title: string;
  status: string;
  [key: string]: unknown;
};

type NarrativeIndexProps = {
  eyebrow: string;
  title: string;
  lede: string;
  items: NarrativeItem[];
  fields: Array<[string, string]>;
};

export function NarrativeIndex({
  eyebrow,
  title,
  lede,
  items,
  fields
}: NarrativeIndexProps) {
  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </section>

      <section className="rail">
        <div className="grid">
          {items.map((item) => (
            <article className="card" key={item.id}>
              <span className="label">{item.status}</span>
              <h3>{item.title}</h3>

              <div className="transition">
                {fields.map(([label, key]) => {
                  const value = item[key];
                  if (value === undefined || value === null || value === "") return null;
                  const text = Array.isArray(value) ? value.join(" · ") : String(value);

                  return (
                    <div key={key}>
                      <span>{label}</span>
                      <strong>{text}</strong>
                    </div>
                  );
                })}
              </div>

              <Link className="entity-open" href={"/entity/" + item.id}>
                OPEN NODE ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
