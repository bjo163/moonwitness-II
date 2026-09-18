import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getMessages } from "@/lib/content";

export const metadata = {
  title: "Messages — MoonWitness"
};

export default function MessagesPage() {
  const messages = getMessages();

  return (
    <main className="shell">
      <PlatformNav />
      <section className="rail page-intro">
        <div className="eyebrow">THE MESSAGES</div>
        <h1>WHAT WAS SAID</h1>
        <p className="lede">
          A message is preserved with its source, witness, context, and
          relationships. It does not become truth merely because it was recorded.
        </p>
      </section>

      <section className="rail">
        <div className="split">
          {messages.map((message) => (
            <article className="feature-card" key={message.id}>
              <span className="label">{message.type} · {message.status}</span>
              <h3>{message.title ?? message.id}</h3>
              <p className="lede">“{message.message}”</p>
              {message.context ? <p>{message.context}</p> : null}
              <div className="transition">
                <div><span>FROM</span><strong>{message.from ?? "UNKNOWN"}</strong></div>
                <div><span>TO</span><strong>{message.to ?? "UNKNOWN"}</strong></div>
                <div><span>EVENT</span><strong>{message.related_event ?? "UNKNOWN"}</strong></div>
              </div>
              <Link className="entity-open" href={"/entity/" + message.id}>
                OPEN MESSAGE ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
