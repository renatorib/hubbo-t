import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";
import { Author } from "../types/Author";
import { Post } from "../types/Post";

const GetPinnedPostsQuery = operation(
  graphql(`
    query GetPinnedPosts($owner: String!, $name: String!, $omitBody: Boolean = true) {
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
        pinnedBy: Author.unmask(pinnedIssue.pinnedBy),
        post: Post.unmask(pinnedIssue.issue),
      })),
  };
});

export async function getPinnedPosts(
  this: Hubbo,
  props?: {
    omitBody?: boolean;
  },
) {
  return this.graphql(GetPinnedPostsQuery).execute({
    ...this.repo,
    ...props,
  });
}
