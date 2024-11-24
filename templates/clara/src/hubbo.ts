import { Hubbo } from "@hubbo/core";

export const hubbo = new Hubbo({
  repo: process.env.GITHUB_REPO!,
  token: process.env.GITHUB_TOKEN!,
  config: {
    baseUrl: "https://clara.hubbo.dev",
  },
});

export const config = {
  site: {
    name: "Blog Title",
    description: "Blog Title blog posts. Be welcome. Read and share :)",
  },
  social: {
    github: "https://github.com/renatorib",
    twitter: "https://x.com/renatoribz",
    bsky: "https://bsky.app/profile/rena.to",
  },
  postCard: {
    showSubtitle: true,
    showAuthor: true,
    showMinsRead: true,
    showCover: true,
    showTags: true,
    showComments: true,
    showReactions: true,
  },
  post: {
    showAuthor: true,
    showMinsRead: true,
    showCover: true,
  },
};
