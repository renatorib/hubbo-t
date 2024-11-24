import { feed } from "@hubbo/next";
import { hubbo } from "~/hubbo";

export const GET = feed.rss2(
  feed.create({
    getPosts: () => hubbo.findPosts({ state: "published", first: 50 }),
    options: {
      id: "https://clara.hubbo.dev",
      link: "https://clara.hubbo.dev",
      title: "Clara",
      description: "Clara Hubbo Template",
      copyright: "Hubbo",
    },
    item: (post) => ({
      title: post.title,
      date: new Date(post.meta.realCreatedAt || post.createdAt),
      link: `https://clara.hubbo.dev/${hubbo.getPermalink(post)}`,
      content: post.body,
    }),
  }),
);
