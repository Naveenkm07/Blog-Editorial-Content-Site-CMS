import { slugify } from "@/lib/slug";

export function categoryPath(category: string) {
  return `/categories/${slugify(category)}`;
}

export function tagPath(tag: string) {
  return `/tags/${slugify(tag)}`;
}

export function authorPath(authorSlug: string) {
  return `/authors/${authorSlug}`;
}
