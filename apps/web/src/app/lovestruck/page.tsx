import { NarrativeIndex } from "@/components/narrative-index";
import { getLovestruck } from "@/lib/content";

export const metadata = {
  title: "Lovestruck — MoonWitness"
};

export default function LovestruckPage() {
  return (
    <NarrativeIndex
      eyebrow="EMOTIONAL MOVEMENT."
      title="LOVESTRUCK"
      lede="WHEN CONNECTION BECOMES PERSONAL"
      items={getLovestruck()}
      fields={[["ATTRACTION","attraction"],["VULNERABILITY","vulnerability"],["TENSION","tension"],["MOVEMENT","movement"]]}
    />
  );
}
