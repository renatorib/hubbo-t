import { feed } from "@hubbo/next";
import { hubbo } from "~/hubbo";

export const GET = feed.rss2(
  feed.create({
    getPosts: () => hubbo.findPosts({ state: "published", first: 50 }),
    options: {
      id: "https://eva.hubbo.dev",
      title: "Eva Hubbo Template",
      copyright: "Hubbo",
    },
    item: (post) => {
      return {
        title: post.title,
        date: new Date(post.meta.realCreatedAt || post.createdAt),
        link: `https://eva.hubbo.dev/post/${post.number}-${post.meta.slug}`,
      };
    },
  }),
);
