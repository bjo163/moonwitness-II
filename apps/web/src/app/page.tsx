import { getCharacters, getEras, getFirstLoop } from "@/lib/content";

const nav = [
  ["Moon", "#moon"],
  ["Witness", "#witness"],
  ["Crew", "#crew"],
  ["Events", "#event"],
  ["Messages", "#message"],
  ["Past Presence", "#past-presence"],
  ["Next Phase", "#next-phase"]
] as const;

export default function Home() {
  const characters = getCharacters();
  const eras = getEras();
  const loop = getFirstLoop();

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">◌</span>
          <span>MOONWITNESS</span>
        </div>
        <nav aria-label="Primary">
          {nav.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
      </header>

      <section className="hero" id="moon">
        <div className="eyebrow">STORY &amp; WITNESS PLATFORM</div>
        <h1>WHEN THE MOON WITNESS</h1>
        <p className="tagline">WE SHARE A MESSAGE.</p>
        <p className="lede">
          Capture the moment. Follow the witness. Trace the fault line.
          Understand the past presence. Carry what matters into the next phase.
        </p>
        <div className="hero-line" />
        <div className="hero-meta">
          <span>END OF AN ERA</span>
          <span>LINES — VISUAL EFFECT MANSA</span>
          <span>THE OBSERVER</span>
        </div>
      </section>

      <section className="rail" id="witness">
        <div className="section-head">
          <span>01</span>
          <h2>THE WITNESS</h2>
        </div>
        <div className="flow">
          {["WITNESS", "EVENT", "MESSAGE", "SEDUCTION", "FAULT LINE", "EXPOSURE", "PAST PRESENCE", "PROMOTING", "CHANGE", "NEXT ERA"].map((item, index) => (
            <div className="flow-node" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="rail" id="crew">
        <div className="section-head">
          <span>02</span>
          <h2>THE CREW</h2>
        </div>
        <div className="grid">
          {characters.map((character) => (
            <article className="card" key={character.id}>
              <div className="card-index">{character.id.replace("char_", "")}</div>
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

      <section className="rail feature" id="event">
        <div className="section-head">
          <span>03</span>
          <h2>FIRST WITNESS LOOP</h2>
        </div>
        <div className="split">
          <article className="feature-card">
            <span className="label">EVENT</span>
            <h3>{loop.event?.title}</h3>
            <p>{loop.event?.what_happened}</p>
            <span className="status">{loop.event?.status}</span>
          </article>
          <article className="feature-card" id="message">
            <span className="label">MESSAGE</span>
            <h3>{loop.message?.message}</h3>
            <p>Witnessed through <strong>{loop.witness?.witnessed_by?.join(", ")}</strong>.</p>
            <p className="muted">{loop.witness?.observation}</p>
          </article>
        </div>
      </section>

      <section className="rail" id="past-presence">
        <div className="section-head">
          <span>04</span>
          <h2>PAST PRESENCE</h2>
        </div>
        <div className="presence">
          <div>
            <div className="label">THE ECHO</div>
            <h3>{loop.past_presence?.title}</h3>
            <p>{loop.past_presence?.what_remains}</p>
          </div>
          <div className="transition">
            <div><span>AUDIT</span><strong>{loop.transition?.audit}</strong></div>
            <div><span>EVALUATION</span><strong>{loop.transition?.evaluation}</strong></div>
            <div><span>BALANCING</span><strong>{loop.transition?.balancing}</strong></div>
            <div><span>PROMOTING</span><strong>{loop.transition?.promoting}</strong></div>
          </div>
        </div>
      </section>

      <section className="rail" id="next-phase">
        <div className="section-head">
          <span>05</span>
          <h2>NEXT PHASE</h2>
        </div>
        <div className="next-grid">
          <div>
            <div className="label">CURRENT ERA</div>
            <h3>{eras.find((era) => era.id === loop.event?.era)?.title ?? "THE WITNESS"}</h3>
          </div>
          <div>
            <div className="label">NEXT ERA</div>
            <h3>{loop.change?.next_phase ?? "NEXT PHASE"}</h3>
          </div>
          <div>
            <div className="label">PRINCIPLE</div>
            <h3>Promote what deserves to continue.</h3>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>MOONWITNESS</strong>
          <span>Minimum Rules. Maximum Story.</span>
        </div>
        <span>Structure the chaos. Do not kill the chaos.</span>
      </footer>
    </main>
  );
}
