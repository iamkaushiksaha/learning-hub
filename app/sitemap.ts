import type { MetadataRoute } from "next";
import { TOPICS } from "@/lib/topics";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const topics = TOPICS.map((t) => ({
    url: `${SITE_URL}/topics/${t.slug}`,
    lastModified: new Date(t.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/presentations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...topics,
  ];
}
