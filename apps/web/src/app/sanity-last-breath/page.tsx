import { NarrativeIndex } from "@/components/narrative-index";
import { getSanityLastBreath } from "@/lib/content";

export const metadata = {
  title: "Sanity's Last Breath — MoonWitness"
};

export default function SanitysLastBreathPage() {
  return (
    <NarrativeIndex
      eyebrow="THRESHOLD BEFORE TRANSFORMATION."
      title="SANITY'S LAST BREATH"
      lede="THE LAST BREATH BEFORE CHANGE"
      items={getSanityLastBreath()}
      fields={[["TRIGGER","trigger"],["PRESSURE","pressure"],["CONFLICT","conflict"],["FINAL SIGNAL","final_signal"],["OUTCOME","outcome"]]}
    />
  );
}
