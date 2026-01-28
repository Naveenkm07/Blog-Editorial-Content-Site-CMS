import type { MetadataRoute } from "next";

import { authors } from "@/lib/authors";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";
import { slugify } from "@/lib/slug";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = getAllCategories(posts);
  const tags = getAllTags(posts);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/categories`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/tags`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/authors`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteConfig.url}/subscribe`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteConfig.url}/categories/${slugify(c.name)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${siteConfig.url}/tags/${slugify(t.name)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${siteConfig.url}/authors/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes];
}
