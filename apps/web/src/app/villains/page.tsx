import { NarrativeIndex } from "@/components/narrative-index";
import { getVillains } from "@/lib/content";

export const metadata = {
  title: "Villains — MoonWitness"
};

export default function VillainsPage() {
  return (
    <NarrativeIndex
      eyebrow="NARRATIVE ROLE, NOT A FIXED PERSON."
      title="VILLAINS"
      lede="THE FORCE AGAINST THE STORY"
      items={getVillains()}
      fields={[["TYPE","type"],["DISRUPTION","disruption"],["TEMPTATION","temptation"],["CONFLICT","conflict"],["REVELATION","revelation"],["TRANSFORMATION","transformation"]]}
    />
  );
}
