import Link from "next/link";
import type { Metadata } from "next";

import { authors } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Authors",
  description: "Browse authors.",
};

export default function AuthorsIndexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Authors
        </h1>
        <p className="text-sm leading-6 text-zinc-600">
          Placeholder author directory.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {authors.map((a) => (
          <li key={a.slug} className="rounded-xl border border-zinc-200 bg-white p-4">
            <Link
              href={`/authors/${a.slug}`}
              className="text-base font-semibold text-zinc-950 hover:underline"
            >
              {a.name}
            </Link>
            <p className="mt-1 text-sm text-zinc-600">{a.role}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{a.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
