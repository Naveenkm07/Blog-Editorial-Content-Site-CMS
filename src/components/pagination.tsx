import Link from "next/link";

type Props = {
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
  page: number;
  totalPages: number;
};

function buildHref(
  basePath: string,
  searchParams: Record<string, string | string[] | undefined>,
  page: number
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      for (const vv of v) sp.append(k, vv);
    } else {
      sp.set(k, v);
    }
  }
  if (page <= 1) sp.delete("page");
  else sp.set("page", String(page));
  const q = sp.toString();
  return q ? `${basePath}?${q}` : basePath;
}

export function Pagination({ basePath, searchParams, page, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
      <Link
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : 0}
        href={buildHref(basePath, searchParams, prev)}
        className={`rounded-md border px-3 py-2 text-sm transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 active:scale-[0.98] ${
          page === 1
            ? "pointer-events-none border-zinc-200 text-zinc-400"
            : "border-zinc-300 text-zinc-700 hover:text-zinc-950"
        }`}
      >
        Previous
      </Link>
      <p className="text-sm text-zinc-600">
        Page <span className="font-medium text-zinc-950">{page}</span> of{" "}
        <span className="font-medium text-zinc-950">{totalPages}</span>
      </p>
      <Link
        aria-disabled={page === totalPages}
        tabIndex={page === totalPages ? -1 : 0}
        href={buildHref(basePath, searchParams, next)}
        className={`rounded-md border px-3 py-2 text-sm transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 active:scale-[0.98] ${
          page === totalPages
            ? "pointer-events-none border-zinc-200 text-zinc-400"
            : "border-zinc-300 text-zinc-700 hover:text-zinc-950"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
