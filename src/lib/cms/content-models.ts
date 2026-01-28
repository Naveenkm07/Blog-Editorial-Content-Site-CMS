export type CmsTag = {
  name: string;
  slug: string;
};

export type CmsCategory = {
  name: string;
  slug: string;
};

export type CmsAuthor = {
  name: string;
  bio: string;
  avatar?: string;
  social?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
};

export type CmsPost = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  author: string;
  publishedDate: string;
  category?: string;
  tags: string[];
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
};

export const sanitySchemas = {
  post: {
    name: "post",
    title: "Post",
    type: "document",
    fields: [
      { name: "title", title: "Title", type: "string" },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "title", maxLength: 96 },
      },
      { name: "excerpt", title: "Excerpt", type: "text" },
      { name: "body", title: "Body", type: "markdown" },
      { name: "coverImage", title: "Cover Image", type: "image" },
      { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
      { name: "publishedDate", title: "Published Date", type: "datetime" },
      {
        name: "category",
        title: "Category",
        type: "reference",
        to: [{ type: "category" }],
      },
      { name: "tags", title: "Tags", type: "array", of: [{ type: "reference", to: [{ type: "tag" }] }] },
      { name: "readingTime", title: "Reading Time (minutes)", type: "number" },
      {
        name: "seo",
        title: "SEO",
        type: "object",
        fields: [
          { name: "metaTitle", title: "Meta Title", type: "string" },
          { name: "metaDescription", title: "Meta Description", type: "text" },
          { name: "ogImage", title: "Open Graph Image", type: "image" },
          { name: "canonicalUrl", title: "Canonical URL", type: "url" },
        ],
      },
    ],
  },
  author: {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
      { name: "name", title: "Name", type: "string" },
      { name: "bio", title: "Bio", type: "text" },
      { name: "avatar", title: "Avatar", type: "image" },
      {
        name: "social",
        title: "Social Links",
        type: "object",
        fields: [
          { name: "website", title: "Website", type: "url" },
          { name: "twitter", title: "Twitter", type: "url" },
          { name: "linkedin", title: "LinkedIn", type: "url" },
        ],
      },
    ],
  },
  tag: {
    name: "tag",
    title: "Tag",
    type: "document",
    fields: [
      { name: "name", title: "Name", type: "string" },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "name", maxLength: 96 },
      },
    ],
  },
  category: {
    name: "category",
    title: "Category",
    type: "document",
    fields: [
      { name: "name", title: "Name", type: "string" },
      {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: { source: "name", maxLength: 96 },
      },
    ],
  },
} as const;

export const strapiContentTypes = {
  post: {
    kind: "collectionType",
    collectionName: "posts",
    info: { singularName: "post", pluralName: "posts", displayName: "Post" },
    options: { draftAndPublish: true },
    attributes: {
      title: { type: "string", required: true },
      slug: { type: "uid", targetField: "title", required: true },
      excerpt: { type: "text" },
      body: { type: "richtext" },
      coverImage: { type: "media", multiple: false },
      author: { type: "relation", relation: "manyToOne", target: "api::author.author" },
      publishedDate: { type: "datetime" },
      category: {
        type: "relation",
        relation: "manyToOne",
        target: "api::category.category",
      },
      tags: { type: "relation", relation: "manyToMany", target: "api::tag.tag" },
      readingTime: { type: "integer" },
      metaTitle: { type: "string" },
      metaDescription: { type: "text" },
      ogImage: { type: "media", multiple: false },
      canonicalUrl: { type: "string" },
    },
  },
  author: {
    kind: "collectionType",
    collectionName: "authors",
    info: { singularName: "author", pluralName: "authors", displayName: "Author" },
    options: { draftAndPublish: false },
    attributes: {
      name: { type: "string", required: true },
      bio: { type: "text" },
      avatar: { type: "media", multiple: false },
      website: { type: "string" },
      twitter: { type: "string" },
      linkedin: { type: "string" },
    },
  },
  tag: {
    kind: "collectionType",
    collectionName: "tags",
    info: { singularName: "tag", pluralName: "tags", displayName: "Tag" },
    options: { draftAndPublish: false },
    attributes: {
      name: { type: "string", required: true },
      slug: { type: "uid", targetField: "name", required: true },
    },
  },
  category: {
    kind: "collectionType",
    collectionName: "categories",
    info: { singularName: "category", pluralName: "categories", displayName: "Category" },
    options: { draftAndPublish: false },
    attributes: {
      name: { type: "string", required: true },
      slug: { type: "uid", targetField: "name", required: true },
    },
  },
} as const;
