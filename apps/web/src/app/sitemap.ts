import type { MetadataRoute } from "next";
import { getEntitySummaries } from "@/lib/content";

const baseUrl = "https://moonwitness-ii-web.vercel.app";

const staticRoutes = [
  "",
  "/storytelling",
  "/explore",
  "/archive",
  "/journey",
  "/witness",
  "/events",
  "/messages",
  "/seduction",
  "/fault-lines",
  "/exposure",
  "/promoting",
  "/conflict",
  "/sanity-last-breath",
  "/past-presence",
  "/change",
  "/change-advisory-board",
  "/chasing-heart",
  "/lovestruck",
  "/breath-electric",
  "/villains",
  "/end-of-an-era",
  "/lore",
  "/crew",
  "/timeline",
  "/constellation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || "/"}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const entityEntries: MetadataRoute.Sitemap = getEntitySummaries().map((entity) => ({
    url: `${baseUrl}/entity/${entity.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...entityEntries];
}
