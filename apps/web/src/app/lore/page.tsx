import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getCharacters, getEras, getStories } from "@/lib/content";

export const metadata = {
  title: "Lore — MoonWitness"
};

export default function LorePage() {
  const eras = getEras().sort((a, b) => a.order - b.order);
  const characters = getCharacters();
  const stories = getStories();

  return (
    <main className="shell">
      <PlatformNav />

      <section className="hero">
        <div className="eyebrow">THE LORE BOOK</div>
        <h1>ENTER THE UNIVERSE</h1>
        <p className="tagline">LORE IS OPEN. CANON CAN GROW.</p>
        <p className="lede">
          The Lore Book is the human-readable layer of MoonWitness. It keeps the
          world coherent while allowing mystery, aliases, unfinished histories,
          and unresolved meaning to remain open.
        </p>
        <div className="hero-line" />
      </section>

      {stories.map((story) => (
        <section className="rail" key={story.id}>
          <div className="section-head">
            <span>STORY</span>
            <h2>{story.title}</h2>
          </div>
          <div className="feature-card">
            <div className="label">{story.theme ?? "LORE"}</div>
            <p className="lede">{story.premise}</p>
            <Link className="entity-open" href={"/entity/" + story.id}>
              OPEN STORY ↗
            </Link>
          </div>
        </section>
      ))}

      <section className="rail">
        <div className="section-head">
          <span>01</span>
          <h2>ERAS</h2>
        </div>
        <div className="timeline">
          {eras.map((era) => (
            <Link className="timeline-item" href={"/entity/" + era.id} key={era.id}>
              <span>{String(era.order).padStart(2, "0")}</span>
              <div>
                <div className="label">{era.status}</div>
                <h3>{era.title}</h3>
                <p className="muted">{era.description ?? "The lore is still forming."}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>02</span>
          <h2>THE CREW</h2>
        </div>
        <div className="grid">
          {characters.map((character) => (
            <Link className="card entity-card" href={"/entity/" + character.id} key={character.id}>
              <div className="card-index">{character.status ?? "lore"}</div>
              <h3>{character.name}</h3>
              {character.aliases?.length ? (
                <p className="muted">{character.aliases.join(" · ")}</p>
              ) : null}
              {character.nickname ? <p className="accent">{character.nickname}</p> : null}
              {character.witness_phrase ? <blockquote>{character.witness_phrase}</blockquote> : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="rail">
        <div className="section-head">
          <span>03</span>
          <h2>RULE OF THE LORE</h2>
        </div>
        <div className="next-grid">
          <div>
            <div className="label">UNKNOWN</div>
            <h3>Not knowing is allowed.</h3>
          </div>
          <div>
            <div className="label">LORE</div>
            <h3>Belongs to the universe, even while unresolved.</h3>
          </div>
          <div>
            <div className="label">CANON</div>
            <h3>Established only when the story earns it.</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
