import type { Metadata } from "next";
import { ProductionInsights } from "@/components/production-insights";
import "./globals.css";

const siteDescription =
  "A Story & Witness Platform for stories, witnesses, memories, fault lines, and change.";

export const metadata: Metadata = {
  metadataBase: new URL("https://moonwitness-ii-web.vercel.app"),
  title: {
    default: "MoonWitness — When The Moon Witness",
    template: "%s",
  },
  description: siteDescription,
  openGraph: {
    title: "MoonWitness — When The Moon Witness",
    description: siteDescription,
    url: "/",
    siteName: "MoonWitness",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MoonWitness — When The Moon Witness",
    description: siteDescription,
  },
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
