import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getStories } from "@/lib/content";

export const metadata = {
  title: "Storytelling — MoonWitness"
};

export default function StorytellingPage() {
  const stories = getStories();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="hero">
        <div className="eyebrow">STORYTELLING</div>
        <h1>THE STORY BEGINS HERE</h1>
        <p className="tagline">NOTICE. FOLLOW. REMEMBER. MOVE.</p>
        <p className="lede">
          Stories are the human-readable layer above the graph: a way to enter
          the universe before understanding every node inside it.
        </p>
        <div className="hero-line" />
      </section>

      {stories.map((story) => (
        <section className="rail" key={story.id}>
          <div className="section-head">
            <span>STORY</span>
            <h2>{story.title}</h2>
          </div>

          <div className="presence">
            <div>
              <div className="label">{story.theme ?? "UNKNOWN THEME"}</div>
              <h3>{story.opening ?? story.premise ?? "The story is still forming."}</h3>
              <p>{story.premise ?? "Unknown premise."}</p>
              <p className="muted">{story.ending ?? "The ending remains open."}</p>
              <div className="home-links">
                <Link className="entity-open" href={"/journey/" + story.id}>
                  FOLLOW STORY ↗
                </Link>
                <Link className="entity-open" href={"/entity/" + story.id}>
                  OPEN STORY NODE ↗
                </Link>
              </div>
            </div>

            <div>
              <div className="label">MOVEMENT</div>
              <div className="transition">
                {(Array.isArray(story.movement) ? story.movement : []).map((step, index) => (
                  <div key={index}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
