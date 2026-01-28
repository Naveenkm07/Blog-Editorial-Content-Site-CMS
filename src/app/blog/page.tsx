import Link from "next/link";
import type { Metadata } from "next";

import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { Sidebar } from "@/components/sidebar";
import { filterPosts, getAllPosts, paginate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts with filtering and pagination.",
};

type SearchParams = {
  q?: string;
  tag?: string;
  category?: string;
  author?: string;
  page?: string;
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const posts = await getAllPosts();

  const filtered = filterPosts(posts, {
    q: sp.q,
    tag: sp.tag,
    category: sp.category,
    author: sp.author,
  });

  const page = Number(sp.page ?? "1") || 1;
  const pager = paginate(filtered, page, 9);

  const hasFilters = Boolean(sp.q || sp.tag || sp.category || sp.author);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Blog
          </h1>
          <p className="text-sm leading-6 text-zinc-600">
            Browse all placeholder posts. Use the search field in the header, or
            filter via categories and tags.
          </p>
          {hasFilters ? (
            <div className="pt-2">
              <Link
                href="/blog"
                className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
              >
                Clear filters
              </Link>
            </div>
          ) : null}
        </header>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {pager.items.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>

        <Pagination
          basePath="/blog"
          searchParams={sp}
          page={pager.page}
          totalPages={pager.totalPages}
        />
      </div>

      <div className="lg:pt-12">
        <Sidebar posts={posts} />
      </div>
    </div>
  );
}
