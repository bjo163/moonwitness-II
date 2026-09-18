import { NarrativeIndex } from "@/components/narrative-index";
import { getBreathElectric } from "@/lib/content";

export const metadata = {
  title: "Breath Electric — MoonWitness"
};

export default function BreathElectricPage() {
  return (
    <NarrativeIndex
      eyebrow="ATMOSPHERE."
      title="BREATH ELECTRIC"
      lede="FEEL THE SIGNAL"
      items={getBreathElectric()}
      fields={[["ENERGY","energy"],["ATMOSPHERE","atmosphere"],["RHYTHM","rhythm"],["SIGNAL","signal"]]}
    />
  );
}
