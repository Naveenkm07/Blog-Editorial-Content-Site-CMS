import type { Post, PostWithContent } from "@/lib/posts";

export type CmsProvider = "sanity" | "strapi" | "none";

export const cmsProvider: CmsProvider =
  (process.env.NEXT_PUBLIC_CMS_PROVIDER as CmsProvider | undefined) ?? "none";

export async function fetchPostsFromCms(): Promise<Post[] | null> {
  return null;
}

export async function fetchPostFromCmsBySlug(
  _slug: string
): Promise<PostWithContent | null> {
  return null;
}
