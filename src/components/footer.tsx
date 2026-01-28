import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-950"
          >
            Content Site
          </Link>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Placeholder editorial site built for performance, SEO, and readability.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium text-zinc-950">Explore</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link className="text-zinc-600 hover:text-zinc-950" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-600 hover:text-zinc-950"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link className="text-zinc-600 hover:text-zinc-950" href="/tags">
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-600 hover:text-zinc-950"
                  href="/authors"
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-zinc-950">Company</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link className="text-zinc-600 hover:text-zinc-950" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-600 hover:text-zinc-950"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="text-zinc-600 hover:text-zinc-950"
                  href="/subscribe"
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p className="font-medium text-zinc-950">Newsletter</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Get new posts in your inbox. UI only.
          </p>
          <form className="mt-4 flex gap-2" action="/subscribe" method="get">
            <label className="sr-only" htmlFor="newsletterEmail">
              Email
            </label>
            <input
              id="newsletterEmail"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              type="submit"
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Content Site</p>
          <p>
            Built with Next.js, Tailwind, and MDX.
          </p>
        </div>
      </div>
    </footer>
  );
}
