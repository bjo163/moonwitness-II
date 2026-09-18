import { NarrativeIndex } from "@/components/narrative-index";
import { getChasingHeart } from "@/lib/content";

export const metadata = {
  title: "Chasing Heart — MoonWitness"
};

export default function ChasingHeartPage() {
  return (
    <NarrativeIndex
      eyebrow="PURSUIT."
      title="CHASING HEART"
      lede="WHAT KEEPS PULLING US BACK?"
      items={getChasingHeart()}
      fields={[["DESIRE","desire"],["PURSUIT","pursuit"],["TENSION","tension"],["DESTINATION","destination"]]}
    />
  );
}
