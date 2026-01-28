import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/posts";
import { authorLabel } from "@/lib/display";
import { slugify } from "@/lib/slug";
import { BadgeLink } from "@/components/badge-link";

type Props = {
  post: Post;
};

export function FeaturedPostHero({ post }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full bg-zinc-100 md:aspect-auto">
          <Image
            src={post.coverImage ?? "/images/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Featured
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-zinc-950 md:text-4xl">
            <Link
              href={`/blog/${post.slug}`}
              className="outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              {post.title}
            </Link>
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <BadgeLink href={`/categories/${slugify(post.category)}`} label={post.category} />
            {post.tags.slice(0, 3).map((t) => (
              <BadgeLink key={t} href={`/tags/${slugify(t)}`} label={t} />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-zinc-600">
            <span>
              By{" "}
              <Link
                href={`/authors/${encodeURIComponent(post.author)}`}
                className="font-medium text-zinc-950 hover:underline"
              >
                {authorLabel(post.author)}
              </Link>
            </span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
          </div>
          <div className="mt-7">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              Read article
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
