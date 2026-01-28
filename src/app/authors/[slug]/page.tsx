import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { getAuthorBySlug } from "@/lib/authors";
import { filterPosts, getAllPosts, paginate } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: author.name,
    description: `Posts by ${author.name}.`,
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = await getAllPosts();
  const filtered = filterPosts(posts, { author: slug });

  const page = Number(sp.page ?? "1") || 1;
  const pager = paginate(filtered, page, 9);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-zinc-600">
          <Link href="/authors" className="hover:text-zinc-950">
            Authors
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-zinc-950">{author.name}</span>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          {author.name}
        </h1>
        <p className="text-sm text-zinc-600">{author.role}</p>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600">{author.bio}</p>
      </header>

      {pager.total === 0 ? (
        <p className="text-sm text-zinc-600">No posts yet.</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pager.items.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <Pagination
            basePath={`/authors/${encodeURIComponent(slug)}`}
            searchParams={sp}
            page={pager.page}
            totalPages={pager.totalPages}
          />
        </>
      )}
    </div>
  );
}
