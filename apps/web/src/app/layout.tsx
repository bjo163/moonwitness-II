import type { Metadata } from "next";
import { ProductionInsights } from "@/components/production-insights";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoonWitness — When The Moon Witness",
  description: "A Story & Witness Platform for stories, witnesses, memories, fault lines, and change."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ProductionInsights />
      </body>
    </html>
  );
}
