import Link from "next/link";
import type { Metadata } from "next";

import { getAllCategories, getAllPosts } from "@/lib/posts";
import { slugify } from "@/lib/slug";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse categories.",
};

export default async function CategoriesIndexPage() {
  const posts = await getAllPosts();
  const categories = getAllCategories(posts);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Categories
        </h1>
        <p className="text-sm leading-6 text-zinc-600">
          Group posts by theme. Placeholder taxonomy only.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c.name} className="rounded-xl border border-zinc-200 bg-white p-4">
            <Link
              href={`/categories/${slugify(c.name)}`}
              className="text-base font-semibold text-zinc-950 hover:underline"
            >
              {c.name}
            </Link>
            <p className="mt-1 text-sm text-zinc-600">{c.count} posts</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
