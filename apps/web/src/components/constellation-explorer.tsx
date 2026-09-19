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

type Node = {
  id: string;
  type: string;
  title: string;
};

type Props = {
  nodes: Node[];
  relationships: Relationship[];
};

const fallbackLabel = (id: string) =>
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

const nodeKind = (node: Node) => node.type.replace(/_/g, " ");

export function ConstellationExplorer({ nodes, relationships }: Props) {
  const [selected, setSelected] = useState(nodes[0]?.id ?? "");

  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  const selectedNode = nodeMap.get(selected);

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    const ring = nodes.filter((node) => node.id !== selected);
    const radius = 36;

    if (selected) {
      map.set(selected, { x: 50, y: 50 });
    }

    ring.forEach((node, index) => {
      const angle = (index / Math.max(ring.length, 1)) * Math.PI * 2 - Math.PI / 2;
      map.set(node.id, {
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

  const selectTarget = (relationship: Relationship) => {
    setSelected(relationship.from === selected ? relationship.to : relationship.from);
  };

  return (
    <div className="constellation-wrap">
      <div className="constellation-stage" aria-label="Interactive MoonWitness constellation">
        <div className="constellation-orbit orbit-one" />
        <div className="constellation-orbit orbit-two" />
        <div className="constellation-moon" aria-hidden="true">◌</div>

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

            const active = relationship.from === selected || relationship.to === selected;

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

        {nodes.map((node) => {
          const point = positions.get(node.id);
          if (!point) return null;

          return (
            <button
              className={[
                "constellation-node",
                node.id === selected ? "is-selected" : "",
                connected.has(node.id) ? "is-connected" : "is-dimmed"
              ].join(" ")}
              key={node.id}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => setSelected(node.id)}
              type="button"
              aria-pressed={node.id === selected}
            >
              <span className="node-dot" />
              <span className="node-label">
                <small>{nodeKind(node)}</small>
                {node.title || fallbackLabel(node.id)}
              </span>
            </button>
          );
        })}
      </div>

      <aside className="constellation-panel">
        <span className="label">{selectedNode ? nodeKind(selectedNode) : "ENTITY"}</span>
        <h3>{selectedNode?.title ?? fallbackLabel(selected)}</h3>
        <p className="muted">
          {related.length
            ? `${related.length} connected trace${related.length === 1 ? "" : "s"}.`
            : "No relationship recorded yet."}
        </p>

        <div className="trace-chain">
          <span className="trace-chain-label">CURRENT TRACE</span>
          <strong>{selectedNode?.title ?? fallbackLabel(selected)}</strong>
          {related.slice(0, 3).map((relationship) => {
            const targetId =
              relationship.from === selected ? relationship.to : relationship.from;
            const target = nodeMap.get(targetId);
            return (
              <button
                type="button"
                className="trace-step"
                key={relationship.id}
                onClick={() => selectTarget(relationship)}
              >
                <span>↓ {relationship.type}</span>
                <strong>{target?.title ?? fallbackLabel(targetId)}</strong>
              </button>
            );
          })}
        </div>

        <div className="relationship-list">
          {related.map((relationship) => {
            const targetId =
              relationship.from === selected ? relationship.to : relationship.from;
            const target = nodeMap.get(targetId);
            const direction = relationship.from === selected ? "OUTBOUND" : "INBOUND";

            return (
              <button
                type="button"
                className="relationship-row"
                key={relationship.id}
                onClick={() => selectTarget(relationship)}
              >
                <span>{direction} · {relationship.type}</span>
                <strong>{target?.title ?? fallbackLabel(targetId)}</strong>
                {relationship.context ? (
                  <small>{relationship.context}</small>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="home-links">
          <Link className="entity-open" href={`/entity/${selected}`}>
            OPEN ENTITY ↗
          </Link>
          <button
            className="entity-open constellation-reset"
            type="button"
            onClick={() => setSelected(nodes[0]?.id ?? "")}
          >
            RESET TRACE
          </button>
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
