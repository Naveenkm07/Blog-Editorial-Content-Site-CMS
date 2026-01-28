import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export function BadgeLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:border-zinc-300 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
    >
      {label}
    </Link>
  );
}
