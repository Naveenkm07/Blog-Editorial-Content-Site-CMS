import Link from "next/link";
import type { ComponentProps } from "react";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function MdxLink(props: ComponentProps<"a">) {
  const href = props.href ?? "";
  if (!href) return <a {...props} />;

  if (isExternal(href)) {
    return <a {...props} target="_blank" rel="noopener noreferrer" />;
  }

  return <Link href={href}>{props.children}</Link>;
}

export const mdxComponents = {
  a: MdxLink,
};
