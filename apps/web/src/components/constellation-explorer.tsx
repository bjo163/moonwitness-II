"use client";

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

  const visibleNodes = nodes.filter((node) => connected.has(node));
  const layout = visibleNodes.map((node, index) => {
    if (node === selected) return { node, x: 50, y: 50 };
    const angle = (index / Math.max(visibleNodes.length - 1, 1)) * Math.PI * 2;
    const radius = 35;
    return {
      node,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius
    };
  });

  return (
    <div className="constellation-wrap">
      <div className="constellation-stage" aria-label="Interactive MoonWitness constellation">
        <div className="constellation-orbit orbit-one" />
        <div className="constellation-orbit orbit-two" />
        <div className="constellation-moon">◌</div>

        {related.map((relationship) => (
          <div
            className="constellation-edge"
            key={relationship.id}
            data-active="true"
            style={{
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}

        {layout.map(({ node, x, y }) => (
          <button
            className={`constellation-node ${node === selected ? "is-selected" : ""}`}
            key={node}
            style={{ left: `${x}%`, top: `${y}%` }}
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
          {related.map((relationship) => (
            <button
              type="button"
              className="relationship-row"
              key={relationship.id}
              onClick={() =>
                setSelected(
                  relationship.from === selected ? relationship.to : relationship.from
                )
              }
            >
              <span>{relationship.type}</span>
              <strong>
                {labelFor(relationship.from === selected ? relationship.to : relationship.from)}
              </strong>
            </button>
          ))}
        </div>

        {!related.length ? (
          <p className="muted">
            This is an open node. Add a relationship when the story reveals where it connects.
          </p>
        ) : null}
      </aside>
    </div>
  );
}
