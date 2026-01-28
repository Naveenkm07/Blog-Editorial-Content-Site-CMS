"use client";

import Link from "next/link";

type Props = {
  url: string;
  title: string;
};

function buildTwitterShareUrl(url: string, title: string) {
  const u = new URL("https://twitter.com/intent/tweet");
  u.searchParams.set("url", url);
  u.searchParams.set("text", title);
  return u.toString();
}

function buildLinkedInShareUrl(url: string) {
  const u = new URL("https://www.linkedin.com/sharing/share-offsite/");
  u.searchParams.set("url", url);
  return u.toString();
}

export function SocialShareButtons({ url, title }: Props) {
  const twitter = buildTwitterShareUrl(url, title);
  const linkedin = buildLinkedInShareUrl(url);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950"
      >
        Share on Twitter
      </Link>
      <Link
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950"
      >
        Share on LinkedIn
      </Link>
    </div>
  );
}
