import Image from "next/image";
import Link from "next/link";

import type { Author } from "@/lib/authors";

type Props = {
  author: Author;
};

export function AuthorBioBox({ author }: Props) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
          <Image
            src={author.avatar ?? "/images/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            sizes="56px"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-zinc-950">{author.name}</p>
              <p className="mt-0.5 text-sm text-zinc-600">{author.role}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              {author.social?.website ? (
                <Link
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-zinc-950"
                >
                  Website
                </Link>
              ) : null}
              {author.social?.twitter ? (
                <Link
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-zinc-950"
                >
                  Twitter
                </Link>
              ) : null}
              {author.social?.linkedin ? (
                <Link
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-zinc-950"
                >
                  LinkedIn
                </Link>
              ) : null}
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">{author.bio}</p>
        </div>
      </div>
    </section>
  );
}
