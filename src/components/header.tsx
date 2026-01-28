import Link from "next/link";

import { SearchForm } from "@/components/search-form";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/subscribe", label: "Subscribe" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-950"
            aria-label="Content Site home"
          >
            Content Site
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-4 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-2 py-1 text-zinc-700 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <SearchForm />
          <Link
            href="/subscribe"
            className="hidden rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 sm:inline-flex"
          >
            Subscribe
          </Link>
        </div>
      </div>
      <nav aria-label="Primary" className="border-t border-zinc-200 md:hidden">
        <div className="mx-auto w-full max-w-6xl px-4 py-2">
          <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-md px-2 py-1 text-zinc-700 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
