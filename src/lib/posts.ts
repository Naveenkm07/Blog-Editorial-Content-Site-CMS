import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { slugify } from "@/lib/slug";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
};

export type PostWithContent = Post & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function estimateReadingTimeMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>,
  content: string
): PostFrontmatter {
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

  const readingTimeFromData =
    typeof data.readingTime === "number"
      ? data.readingTime
      : typeof data.readingTime === "string"
        ? Number(data.readingTime)
        : NaN;
  const readingTime = Number.isFinite(readingTimeFromData)
    ? Math.max(1, Math.round(readingTimeFromData))
    : estimateReadingTimeMinutes(content);

  return {
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : new Date().toISOString(),
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    author: typeof data.author === "string" ? data.author : "",
    category: typeof data.category === "string" ? data.category : "General",
    tags,
    readingTime,
    featured: Boolean(data.featured),
    coverImage: typeof data.coverImage === "string" ? data.coverImage : "/images/placeholder.svg",
    metaTitle: typeof data.metaTitle === "string" ? data.metaTitle : undefined,
    metaDescription: typeof data.metaDescription === "string" ? data.metaDescription : undefined,
    ogImage: typeof data.ogImage === "string" ? data.ogImage : undefined,
    canonicalUrl: typeof data.canonicalUrl === "string" ? data.canonicalUrl : undefined,
  };
}

async function readPostFileBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(fullPath, "utf8");
  const parsed = matter(raw);
  const frontmatter = normalizeFrontmatter(
    slug,
    parsed.data as Record<string, unknown>,
    parsed.content
  );
  return { frontmatter, content: parsed.content };
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const files = await fs.readdir(POSTS_DIR);
  const slugs = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await readPostFileBySlug(slug);
      return { slug, ...frontmatter };
    })
  );

  return posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });
});

export const getPostBySlug = cache(async (slug: string): Promise<PostWithContent | null> => {
  try {
    const { frontmatter, content } = await readPostFileBySlug(slug);
    return { slug, ...frontmatter, content };
  } catch {
    return null;
  }
});

export function filterPosts(
  posts: Post[],
  filters: {
    q?: string;
    tag?: string;
    category?: string;
    author?: string;
  }
) {
  const q = filters.q?.trim().toLowerCase() ?? "";
  const tag = filters.tag?.trim() ?? "";
  const category = filters.category?.trim() ?? "";
  const author = filters.author?.trim() ?? "";

  return posts.filter((p) => {
    if (q) {
      const haystack = `${p.title} ${p.excerpt}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (tag) {
      if (!p.tags.map((t) => slugify(t)).includes(tag)) return false;
    }
    if (category) {
      if (slugify(p.category) !== category) return false;
    }
    if (author) {
      if (p.author !== author) return false;
    }
    return true;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const end = start + perPage;
  return {
    items: items.slice(start, end),
    page: safePage,
    perPage,
    total,
    totalPages,
  };
}

export function getAllCategories(posts: Post[]) {
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllTags(posts: Post[]) {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
