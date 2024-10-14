import { type Hubbo, type Post } from "@hubbo/core";
import { Feed, type FeedOptions, type Item } from "feed";

export function create(props: {
  getPosts: () => ReturnType<Hubbo["findPosts"]>;
  options: FeedOptions;
  item: (post: Post) => Item;
  process?: (feed: Feed) => any;
}) {
  return async function buildFeed() {
    const posts = await props.getPosts();
    const feed = new Feed(props.options);
    posts.edges.forEach(({ post }) => feed.addItem(props.item(post)));
    props.process?.(feed);
    return feed;
  };
}

export type BuildFeed = ReturnType<typeof create>;

function serveFeed(buildFeed: BuildFeed, type?: "rss2" | "atom1" | "json1") {
  return async () => {
    const feed = await buildFeed();

    if (type === "atom1") {
      return new Response(feed.atom1(), {
        headers: { "Content-Type": "text/xml" },
      });
    }

    if (type === "json1") {
      return new Response(feed.json1(), {
        headers: { "Content-Type": "text/json" },
      });
    }

    return new Response(feed.rss2(), {
      headers: { "Content-Type": "text/xml" },
    });
  };
}

export const rss2 = (buildFeed: BuildFeed) => serveFeed(buildFeed, "rss2");
export const atom1 = (buildFeed: BuildFeed) => serveFeed(buildFeed, "atom1");
export const json1 = (buildFeed: BuildFeed) => serveFeed(buildFeed, "json1");
