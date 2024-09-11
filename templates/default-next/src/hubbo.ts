import { Hubbo } from "@hubbo/core";

export const hubbo = new Hubbo({
  repo: process.env.GITHUB_REPO!,
  token: process.env.GITHUB_TOKEN!,
});
