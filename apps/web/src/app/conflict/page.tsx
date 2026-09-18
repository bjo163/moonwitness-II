import { NarrativeIndex } from "@/components/narrative-index";
import { getConflicts } from "@/lib/content";

export const metadata = {
  title: "Conflict — MoonWitness"
};

export default function ConflictPage() {
  return (
    <NarrativeIndex
      eyebrow="CONFLICT"
      title="WHERE STORIES COLLIDE"
      lede="Conflict keeps competing readings visible. It does not require an immediate resolution."
      items={getConflicts()}
      fields={[
        ["SOURCE", "source"],
        ["FORCES", "forces"],
        ["TENSION", "tension"],
        ["REVELATION", "revelation"],
        ["NEXT STAGE", "next_stage"]
      ]}
    />
  );
}
