import Link from "next/link";
import { PlatformNav } from "@/components/platform-nav";
import { getFirstLoop } from "@/lib/content";

export const metadata = {
  title: "Journey — MoonWitness"
};

type Step = {
  label: string;
  text: string;
  id?: string;
};

export default function JourneyPage() {
  const loop = getFirstLoop();
  const steps: Step[] = [
    {
      label: "EVENT",
      text: loop.event?.title ?? "Unknown event",
      id: loop.event?.id
    },
    {
      label: "WITNESS",
      text: loop.witness?.observation ?? "Unknown observation",
      id: loop.witness?.id
    },
    {
      label: "MESSAGE",
      text: loop.message?.message ?? "Unknown message",
      id: loop.message?.id
    },
    {
      label: "SEDUCTION",
      text: loop.seduction?.title ?? "Unknown seduction",
      id: loop.seduction?.id
    },
    {
      label: "FAULT LINE",
      text: loop.fault_line?.title ?? "Unknown fault line",
      id: loop.fault_line?.id
    },
    {
      label: "EXPOSURE",
      text: loop.exposure?.title ?? "Unknown exposure",
      id: loop.exposure?.id
    },
    {
      label: "PAST PRESENCE",
      text: loop.past_presence?.title ?? "Unknown past presence",
      id: loop.past_presence?.id
    },
    {
      label: "AUDIT",
      text: loop.transition?.audit ?? "Unknown audit"
    },
    {
      label: "EVALUATION",
      text: loop.transition?.evaluation ?? "Unknown evaluation"
    },
    {
      label: "BALANCING",
      text: loop.transition?.balancing ?? "Unknown balancing"
    },
    {
      label: "PROMOTING",
      text: loop.promoting?.title ?? loop.transition?.promoting ?? "Unknown promoting",
      id: loop.promoting?.id
    },
    {
      label: "CONFLICT",
      text: loop.conflict?.title ?? "Unknown conflict",
      id: loop.conflict?.id
    },
    {
      label: "SANITY'S LAST BREATH",
      text: loop.sanity_last_breath?.title ?? "Unknown threshold",
      id: loop.sanity_last_breath?.id
    },
    {
      label: "CHANGE",
      text: loop.change?.id ?? "Unknown change",
      id: loop.change?.id
    },
    {
      label: "NEXT ERA",
      text: loop.change?.next_phase ?? "Unknown next phase"
    }
  ];

  return (
    <main className="shell">
      <PlatformNav />

      <section className="rail page-intro">
        <div className="eyebrow">THE JOURNEY</div>
        <h1>FOLLOW THE SIGNAL</h1>
        <p className="lede">
          One witness loop, one connected path. Every step keeps its own identity
          while the journey shows how the pieces move together.
        </p>
      </section>

      <section className="rail">
        <div className="timeline">
          {steps.map((step, index) => (
            <article className="timeline-item" key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="label">{step.label}</div>
                <h3>{step.text}</h3>
                {step.id ? (
                  <Link className="entity-open" href={"/entity/" + step.id}>
                    OPEN NODE ↗
                  </Link>
                ) : (
                  <p className="muted">NARRATIVE STEP</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
