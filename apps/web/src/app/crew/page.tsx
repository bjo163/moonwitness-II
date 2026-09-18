import { PlatformNav } from "@/components/platform-nav";
import { getCharacters } from "@/lib/content";

export const metadata = {
  title: "The Crew — MoonWitness"
};

export default function CrewPage() {
  const characters = getCharacters();
  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE CREW</div>
        <h1>ME &amp; MY CREW</h1>
        <p className="lede">Characters, aliases, skills, and narrative identities inside the MoonWitness universe.</p>
      </section>
      <section className="rail">
        <div className="grid">
          {characters.map((character) => (
            <article className="card" key={character.id}>
              <div className="card-index">{character.id}</div>
              <h3>{character.name}</h3>
              {character.aliases?.length ? <p className="muted">{character.aliases.join(" · ")}</p> : null}
              {character.nickname ? <p className="accent">{character.nickname}</p> : null}
              {character.skills?.length ? <p>{character.skills.join(" · ")}</p> : null}
              {character.ultimate_skill ? <p className="accent">ULTIMATE: {character.ultimate_skill}</p> : null}
              {character.witness_phrase ? <blockquote>{character.witness_phrase}</blockquote> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
