import Link from "next/link";

import type { Post } from "@/lib/posts";
import { getAllCategories, getAllTags } from "@/lib/posts";
import { slugify } from "@/lib/slug";

type Props = {
  posts: Post[];
};

export function Sidebar({ posts }: Props) {
  const categories = getAllCategories(posts).slice(0, 8);
  const tags = getAllTags(posts).slice(0, 12);
  const popular = posts.slice(0, 5);

  return (
    <aside className="space-y-8">
      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-950">Categories</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-3">
              <Link
                href={`/categories/${slugify(c.name)}`}
                className="text-zinc-700 hover:text-zinc-950"
              >
                {c.name}
              </Link>
              <span className="text-xs text-zinc-500">{c.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-950">Tags</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/tags/${slugify(t.name)}`}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-950"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-950">Popular</h2>
        <ol className="mt-3 space-y-3 text-sm">
          {popular.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="text-zinc-700 hover:text-zinc-950">
                {p.title}
              </Link>
              <p className="mt-1 text-xs text-zinc-500">
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
