import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/posts";
import { authorLabel } from "@/lib/display";
import { slugify } from "@/lib/slug";
import { BadgeLink } from "@/components/badge-link";

type Props = {
  post: Post;
};

export function PostCard({ post }: Props) {
  return (
    <article className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow duration-200 hover:shadow-sm">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] w-full bg-zinc-100">
          <Image
            src={post.coverImage ?? "/images/placeholder.svg"}
            alt=""
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <BadgeLink href={`/categories/${slugify(post.category)}`} label={post.category} />
          {post.tags.slice(0, 2).map((t) => (
            <BadgeLink key={t} href={`/tags/${slugify(t)}`} label={t} />
          ))}
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-950">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-6 text-zinc-600">{post.excerpt}</p>
        <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <dt className="sr-only">Author</dt>
            <dd>
              <Link
                href={`/authors/${encodeURIComponent(post.author)}`}
                className="hover:text-zinc-900"
              >
                {authorLabel(post.author)}
              </Link>
            </dd>
          </div>
          <div className="flex items-center gap-1">
            <dt className="sr-only">Date</dt>
            <dd>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
