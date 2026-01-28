import { slugify } from "@/lib/slug";

export type Tag = {
  name: string;
  slug: string;
};

export const requiredTags: Tag[] = [
  "Content",
  "SEO",
  "CMS",
  "Marketing",
  "Web Development",
  "Design",
].map((name) => ({ name, slug: slugify(name) }));
