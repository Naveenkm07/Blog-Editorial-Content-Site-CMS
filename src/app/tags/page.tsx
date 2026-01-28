import Link from "next/link";
import type { Metadata } from "next";

import { getAllPosts, getAllTags } from "@/lib/posts";
import { slugify } from "@/lib/slug";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse tags.",
};

export default async function TagsIndexPage() {
  const posts = await getAllPosts();
  const tags = getAllTags(posts);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Tags</h1>
        <p className="text-sm leading-6 text-zinc-600">
          Find related posts by keyword. Placeholder taxonomy only.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.name}
            href={`/tags/${slugify(t.name)}`}
            className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-950"
          >
            {t.name}
            <span className="ml-2 text-xs text-zinc-500">{t.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
