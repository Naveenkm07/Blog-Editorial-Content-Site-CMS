import { getAuthorBySlug } from "@/lib/authors";

export function authorLabel(authorSlugOrName: string) {
  const match = getAuthorBySlug(authorSlugOrName);
  return match?.name ?? authorSlugOrName;
}

export function authorRole(authorSlugOrName: string) {
  const match = getAuthorBySlug(authorSlugOrName);
  return match?.role ?? "";
}
