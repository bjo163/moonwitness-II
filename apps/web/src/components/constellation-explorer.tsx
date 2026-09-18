"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Relationship = {
  id: string;
  from: string;
  to: string;
  type: string;
  context?: string;
  status: string;
};

type Props = {
  nodes: string[];
  relationships: Relationship[];
};

const labelFor = (id: string) =>
  id
    .replace(/^char_/, "")
    .replace(/^past_presence_/, "past presence / ")
    .replace(/^witness_/, "witness / ")
    .replace(/^event_/, "event / ")
    .replace(/^msg_/, "message / ")
    .replace(/^fault_/, "fault line / ")
    .replace(/^seduction_/, "seduction / ")
    .replace(/^change_/, "change / ")
    .replace(/^era_/, "era / ")
    .replace(/_/g, " ");

const kindFor = (id: string) => {
  if (id.startsWith("char_")) return "CHARACTER";
  if (id.startsWith("event_")) return "EVENT";
  if (id.startsWith("witness_")) return "WITNESS";
  if (id.startsWith("msg_")) return "MESSAGE";
  if (id.startsWith("fault_")) return "FAULT LINE";
  if (id.startsWith("past_presence_")) return "PAST PRESENCE";
  if (id.startsWith("change_")) return "CHANGE";
  if (id.startsWith("era_")) return "ERA";
  return "ENTITY";
};

export function ConstellationExplorer({ nodes, relationships }: Props) {
  const [selected, setSelected] = useState(nodes[0] ?? "");

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    const ring = nodes.filter((node) => node !== selected);
    const radius = 36;

    if (selected) {
      map.set(selected, { x: 50, y: 50 });
    }

    ring.forEach((node, index) => {
      const angle = (index / Math.max(ring.length, 1)) * Math.PI * 2 - Math.PI / 2;
      map.set(node, {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      });
    });

    return map;
  }, [nodes, selected]);

  const related = useMemo(
    () =>
      relationships.filter(
        (relationship) => relationship.from === selected || relationship.to === selected
      ),
    [relationships, selected]
  );

  const connected = useMemo(() => {
    const values = new Set<string>([selected]);
    for (const relationship of related) {
      values.add(relationship.from);
      values.add(relationship.to);
    }
    return values;
  }, [related, selected]);

  return (
    <div className="constellation-wrap">
      <div className="constellation-stage" aria-label="Interactive MoonWitness constellation">
        <div className="constellation-orbit orbit-one" />
        <div className="constellation-orbit orbit-two" />
        <div className="constellation-moon">◌</div>

        <svg
          className="constellation-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {relationships.map((relationship) => {
            const from = positions.get(relationship.from);
            const to = positions.get(relationship.to);
            if (!from || !to) return null;
            const active = connected.has(relationship.from) && connected.has(relationship.to);

            return (
              <line
                key={relationship.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={active ? "constellation-edge active" : "constellation-edge"}
              />
            );
          })}
        </svg>

        {Array.from(positions.entries()).map(([node, point]) => (
          <button
            className={[
              "constellation-node",
              node === selected ? "is-selected" : "",
              connected.has(node) ? "is-connected" : "is-dimmed"
            ].join(" ")}
            key={node}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => setSelected(node)}
            type="button"
          >
            <span className="node-dot" />
            <span className="node-label">
              <small>{kindFor(node)}</small>
              {labelFor(node)}
            </span>
          </button>
        ))}
      </div>

      <aside className="constellation-panel">
        <span className="label">{kindFor(selected)}</span>
        <h3>{labelFor(selected)}</h3>
        <p className="muted">
          {related.length
            ? `${related.length} connected relationship${related.length === 1 ? "" : "s"}.`
            : "No relationship recorded yet."}
        </p>

        <div className="relationship-list">
          {related.map((relationship) => {
            const target =
              relationship.from === selected ? relationship.to : relationship.from;

            return (
              <button
                type="button"
                className="relationship-row"
                key={relationship.id}
                onClick={() => setSelected(target)}
              >
                <span>{relationship.type}</span>
                <strong>{labelFor(target)}</strong>
              </button>
            );
          })}
        </div>

        <Link className="entity-open" href={`/entity/${selected}`}>
          OPEN ENTITY ↗
        </Link>

        {!related.length ? (
          <p className="muted">
            This is an open node. Add a relationship when the story reveals where it connects.
          </p>
        ) : null}
      </aside>
    </div>
  );
}
