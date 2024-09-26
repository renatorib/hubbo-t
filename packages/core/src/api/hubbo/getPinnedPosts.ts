import { graphql, operation } from "../lib/graphql";
import { $author, $post } from "../types";
import { Hubbo } from ".";

const GetPinnedPostsQuery = operation(
  graphql(`
    query GetPinnedPosts($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        pinnedIssues(first: 3) {
          nodes {
            pinnedBy {
              ...Author_Actor
            }
            issue {
              ...Post_Issue
            }
          }
        }
      }
    }
  `),
).withMap((data) => {
  return {
    pinnedPosts: (data.repository?.pinnedIssues?.nodes ?? [])
      .filter((n) => n != null)
      .map((pinnedIssue) => ({
        pinnedBy: $author.unmask(pinnedIssue.pinnedBy!),
        post: $post.unmask(pinnedIssue.issue),
      })),
  };
});

export async function getPinnedPosts(this: Hubbo) {
  return this.graphql(GetPinnedPostsQuery).execute(this.repo);
}
