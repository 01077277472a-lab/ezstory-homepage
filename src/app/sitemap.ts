import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { programs } from "@/data/programs";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url; const pages = ["", "/about", "/programs", "/schedule", "/results", "/curriculum", "/insights", "/vod", "/contact", "/privacy"]; return [...pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })), ...programs.map((program) => ({ url: `${base}/programs/${program.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))]; }
