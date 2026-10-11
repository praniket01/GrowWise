import type { MetadataRoute } from "next";
import { plants } from "@/lib/plants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/plants", "/planner", "/advisor", "/missions", "/health-check", "/journal"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));
  const plantRoutes = plants.map((plant) => ({
    url: `${baseUrl}/plants/${plant.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));
  return [...staticRoutes, ...plantRoutes];
}
