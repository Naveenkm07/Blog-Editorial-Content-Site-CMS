import type { Metadata } from "next";
 
 import { NewsletterSubscribeForm } from "@/components/newsletter-subscribe-form";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Newsletter signup with Netlify Function placeholder integration.",
};

export default async function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Subscribe
        </h1>
        <p className="text-sm leading-6 text-zinc-600">
          This is a placeholder newsletter signup. Connect your provider to make it
          functional.
        </p>
        {sp.email ? (
          <p className="text-sm text-zinc-600">
            Prefilled email: <span className="font-medium text-zinc-950">{sp.email}</span>
          </p>
        ) : null}
      </header>

      <NewsletterSubscribeForm initialEmail={sp.email} />
    </div>
  );
}
