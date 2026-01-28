export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
};

export const authors: Author[] = [
  {
    slug: "alex-writer",
    name: "Alex Writer",
    role: "Editor",
    bio: "Edits and writes practical notes on content systems, publishing workflows, and readable web writing.",
    avatar: "/images/placeholder.svg",
    social: {
      website: "https://example.com",
      twitter: "https://twitter.com/example",
      linkedin: "https://www.linkedin.com/in/example/",
    },
  },
  {
    slug: "sam-editor",
    name: "Sam Editor",
    role: "Managing Editor",
    bio: "Shapes editorial standards and helps teams ship consistent posts that work in a CMS today and scale tomorrow.",
    avatar: "/images/placeholder.svg",
    social: {
      website: "https://example.com",
      twitter: "https://twitter.com/example",
      linkedin: "https://www.linkedin.com/in/example/",
    },
  },
  {
    slug: "jamie-analyst",
    name: "Jamie Analyst",
    role: "Analyst",
    bio: "Turns analytics into simple story frameworks—what to write, why it matters, and how to measure impact.",
    avatar: "/images/placeholder.svg",
    social: {
      website: "https://example.com",
      twitter: "https://twitter.com/example",
      linkedin: "https://www.linkedin.com/in/example/",
    },
  },
];

export function getAuthorBySlug(slug: string) {
  return authors.find((a) => a.slug === slug) ?? null;
}

export function getAuthorByName(name: string) {
  return authors.find((a) => a.name.toLowerCase() === name.toLowerCase()) ?? null;
}
