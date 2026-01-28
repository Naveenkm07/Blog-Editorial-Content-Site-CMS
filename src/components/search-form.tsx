"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

export function SearchForm() {
  const id = useId();
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      className="hidden sm:block"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        router.push(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search posts
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search…"
        className="w-56 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
      />
    </form>
  );
}
