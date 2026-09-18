import { NarrativeIndex } from "@/components/narrative-index";
import { getEndOfAnEra } from "@/lib/content";

export const metadata = {
  title: "End Of An Era — MoonWitness"
};

export default function EndOfAnEraPage() {
  return (
    <NarrativeIndex
      eyebrow="CLOSURE AND TRANSITION."
      title="END OF AN ERA"
      lede="THE FRAME CLOSES"
      items={getEndOfAnEra()}
      fields={[["CLOSING SIGNAL","closing_signal"],["WHAT ENDS","what_ends"],["WHAT REMAINS","what_remains"],["WHAT OPENS","what_opens"],["NEXT PHASE","next_phase"]]}
    />
  );
}
