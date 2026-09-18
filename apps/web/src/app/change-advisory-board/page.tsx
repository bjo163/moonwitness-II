import { NarrativeIndex } from "@/components/narrative-index";
import { getChangeAdvisoryBoard } from "@/lib/content";

export const metadata = {
  title: "Change Advisory Board — MoonWitness"
};

export default function ChangeAdvisoryBoardPage() {
  return (
    <NarrativeIndex
      eyebrow="TRANSITION REVIEW."
      title="CHANGE ADVISORY BOARD"
      lede="WHAT CHANGES NEXT?"
      items={getChangeAdvisoryBoard()}
      fields={[["CURRENT STATE","current_state"],["PRESSURE POINTS","pressure_points"],["EVIDENCE","evidence"],["QUESTIONS","questions"],["NEXT PHASE","next_phase"]]}
    />
  );
}
