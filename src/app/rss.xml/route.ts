import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(pathname: string) {
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) return pathname;
  return `${siteConfig.url.replace(/\/$/, "")}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export async function GET() {
  const posts = await getAllPosts();

  const channelTitle = siteConfig.name;
  const channelDescription = siteConfig.description;
  const channelLink = siteConfig.url;

  const itemsXml = posts
    .map((p) => {
      const link = toAbsoluteUrl(`/blog/${p.slug}`);
      const pubDate = new Date(p.date).toUTCString();
      const title = escapeXml(p.title);
      const description = escapeXml(p.excerpt ?? "");

      return [
        "<item>",
        `  <title>${title}</title>`,
        `  <description>${description}</description>`,
        `  <link>${escapeXml(link)}</link>`,
        `  <guid>${escapeXml(link)}</guid>`,
        `  <pubDate>${pubDate}</pubDate>`,
        "</item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<rss version=\"2.0\">",
    "<channel>",
    `  <title>${escapeXml(channelTitle)}</title>`,
    `  <description>${escapeXml(channelDescription)}</description>`,
    `  <link>${escapeXml(channelLink)}</link>`,
    `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    itemsXml,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=600",
    },
  });
}
