import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { filterPosts, getAllPosts, getAllTags, paginate } from "@/lib/posts";
import { slugify } from "@/lib/slug";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getAllTags(posts).map((t) => ({ slug: slugify(t.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllPosts();
  const tag = getAllTags(posts).find((t) => slugify(t.name) === slug);
  if (!tag) return {};
  const displayName = tag.name;
  return {
    title: `Tag: ${displayName}`,
    description: `Posts tagged ${displayName}.`,
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const posts = await getAllPosts();
  const tag = getAllTags(posts).find((t) => slugify(t.name) === slug);
  if (!tag) notFound();
  const displayName = tag.name;
  const filtered = filterPosts(posts, { tag: slug });
  if (filtered.length === 0) notFound();

  const page = Number(sp.page ?? "1") || 1;
  const pager = paginate(filtered, page, 9);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-zinc-600">
          <Link href="/tags" className="hover:text-zinc-950">
            Tags
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-zinc-950">{displayName}</span>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Tag: {displayName}
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pager.items.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      <Pagination
        basePath={`/tags/${slug}`}
        searchParams={sp}
        page={pager.page}
        totalPages={pager.totalPages}
      />
    </div>
  );
}
