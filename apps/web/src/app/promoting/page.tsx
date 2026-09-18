import { NarrativeIndex } from "@/components/narrative-index";
import { getPromoting } from "@/lib/content";

export const metadata = {
  title: "Promoting — MoonWitness"
};

export default function PromotingPage() {
  return (
    <NarrativeIndex
      eyebrow="WHAT DESERVES TO CONTINUE?"
      title="PROMOTING"
      lede="WHAT DESERVES TO CONTINUE?"
      items={getPromoting()}
      fields={[["AUDIT","audit"],["EVALUATION","evaluation"],["BALANCING","balancing"],["DECISION","decision"],["NEXT PHASE","next_phase"]]}
    />
  );
}
