import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";
import { BadgeLink } from "@/components/badge-link";
import { AuthorBioBox } from "@/components/author-bio-box";
import { CommentsToggle } from "@/components/comments-toggle";
import { ReadProgressBar } from "@/components/read-progress-bar";
import { SocialShareButtons } from "@/components/social-share-buttons";
import { getAuthorBySlug } from "@/lib/authors";
import { authorLabel, authorRole } from "@/lib/display";
import { mdxOptions } from "@/lib/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/slug";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const canonical = post.canonicalUrl ?? `/blog/${post.slug}`;
  const ogImage = post.ogImage ?? post.coverImage ?? "/images/placeholder.svg";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "",
        },
      ],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.author);
  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const shared = p.tags.filter((t) => post.tags.includes(t)).length;
      return { post: p, shared };
    })
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((x) => x.post);

  const canonicalUrl = new URL(post.canonicalUrl ?? `/blog/${post.slug}`, siteConfig.url).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: [new URL(post.ogImage ?? post.coverImage ?? "/images/placeholder.svg", siteConfig.url).toString()],
    author: {
      "@type": "Person",
      name: author?.name ?? authorLabel(post.author),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const compiled = await compileMDX<{ title: string }>({
    source: post.content,
    components: mdxComponents,
    options: mdxOptions as any,
  });

  return (
    <>
      <ReadProgressBar />
      <article className="mx-auto w-full max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-4">
        <p className="text-sm text-zinc-600">
          <Link href="/blog" className="hover:text-zinc-950">
            Blog
          </Link>
          <span aria-hidden="true"> / </span>
          <Link
            href={`/categories/${slugify(post.category)}`}
            className="hover:text-zinc-950"
          >
            {post.category}
          </Link>
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
          {post.title}
        </h1>

        <p className="text-base leading-7 text-zinc-600">{post.excerpt}</p>

        <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Author</dt>
            <dd>
              <Link
                href={`/authors/${encodeURIComponent(post.author)}`}
                className="font-medium text-zinc-950 hover:underline"
              >
                {authorLabel(post.author)}
              </Link>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Reading time</dt>
            <dd className="text-zinc-500">{post.readingTime} min read</dd>
          </div>
          {authorRole(post.author) ? (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Role</dt>
              <dd className="text-zinc-500">{authorRole(post.author)}</dd>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date</dt>
            <dd>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </time>
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          <BadgeLink href={`/categories/${slugify(post.category)}`} label={post.category} />
          {post.tags.map((t) => (
            <BadgeLink key={t} href={`/tags/${slugify(t)}`} label={t} />
          ))}
        </div>

        <SocialShareButtons url={canonicalUrl} title={post.title} />

        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
          <Image
            src={post.coverImage ?? "/images/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>
      </header>

      <div className="prose prose-zinc mt-10 max-w-none">
        {compiled.content}
      </div>

      <div className="mt-10 space-y-6">
        {author ? <AuthorBioBox author={author} /> : null}
        <CommentsToggle />
      </div>

      {related.length ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
            Related posts
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300"
              >
                <p className="text-sm font-semibold text-zinc-950 group-hover:underline">
                  {p.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="mt-12 border-t border-zinc-200 pt-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            Back to blog
          </Link>
          <Link
            href="/subscribe"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
          >
            Subscribe
          </Link>
        </div>
      </footer>
    </article>
    </>
  );
}
