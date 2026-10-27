import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; frequency: "monthly" | "yearly" }[] = [
    { path: "", priority: 1, frequency: "monthly" },
    { path: "/products", priority: 0.9, frequency: "monthly" },
    { path: "/acrycore", priority: 0.9, frequency: "monthly" },
    { path: "/woodveneer", priority: 0.9, frequency: "monthly" },
    { path: "/applications", priority: 0.8, frequency: "monthly" },
    { path: "/philosophy", priority: 0.7, frequency: "yearly" },
    { path: "/contact", priority: 0.8, frequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, frequency: "yearly" },
  ];

  return routes.map(({ path, priority, frequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: frequency,
    priority,
  }));
}
