"use client";

import { useState } from "react";

type Props = {
  initialOpen?: boolean;
};

export function CommentsToggle({ initialOpen }: Props) {
  const [open, setOpen] = useState(Boolean(initialOpen));

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-zinc-950">Comments</h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open ? (
        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          <p className="font-medium text-zinc-950">Embed placeholder</p>
          <p className="mt-1 leading-6">
            Hook up Disqus or Commento here. This template does not activate external embeds or keys.
          </p>
          <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-3 font-mono text-xs text-zinc-600">
            {"<div id=\"comments\">(embed goes here)</div>"}
          </div>
        </div>
      ) : null}
    </section>
  );
}
