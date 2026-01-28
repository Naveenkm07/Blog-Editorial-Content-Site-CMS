import Link from "next/link";

import { FeaturedPostHero } from "@/components/featured-post-hero";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const latest = posts.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <p className="text-sm font-medium text-zinc-600">Editorial template</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
          Fast, SEO-friendly content for blogs and publications
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          Placeholder content only. Swap MDX files or plug in a headless CMS when you
          are ready.
        </p>
      </section>

      {featured ? <FeaturedPostHero post={featured} /> : null}

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
            Latest posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
