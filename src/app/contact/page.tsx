import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page (UI only).",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">Contact</h1>
        <p className="text-sm leading-6 text-zinc-600">
          This form is UI-only. Wire it to your email provider or backend.
        </p>
      </header>

      <form className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-950">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-950">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-zinc-950">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>

        <button
          type="button"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          Send (UI only)
        </button>
      </form>
    </div>
  );
}
