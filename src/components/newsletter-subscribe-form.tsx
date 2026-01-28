"use client";

import { useMemo, useState } from "react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function NewsletterSubscribeForm({
  initialEmail,
}: {
  initialEmail?: string;
}) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const canSubmit = useMemo(() => {
    if (status === "loading") return false;
    return isValidEmail(email);
  }, [email, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.message || "Subscription failed. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data?.message || "Thanks — you’re subscribed.");
    } catch {
      setStatus("error");
      setMessage("Network error. If you're running locally, use `netlify dev`.");
    }
  }

  return (
    <form
      className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6"
      onSubmit={onSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-950">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          autoComplete="email"
          inputMode="email"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "Join"}
      </button>

      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
          role={status === "success" ? "status" : "alert"}
        >
          {message}
        </p>
      ) : (
        <p className="text-xs text-zinc-500">
          Provider integration is a safe placeholder. Configure Mailchimp/ConvertKit later.
        </p>
      )}
    </form>
  );
}
