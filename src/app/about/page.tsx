import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About this site.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">About</h1>
        <p className="text-sm leading-6 text-zinc-600">
          This is a production-ready template with placeholder content.
        </p>
      </header>

      <div className="prose prose-zinc max-w-none">
        <p>
          Use this site as a foundation for a blog, editorial publication, or company
          content hub.
        </p>
        <ul>
          <li>Server-rendered pages for SEO</li>
          <li>MDX posts for flexible content</li>
          <li>CMS-ready data layer (stub)</li>
          <li>Accessible, readable UI</li>
        </ul>
      </div>
    </div>
  );
}
