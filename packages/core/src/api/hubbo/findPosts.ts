import { graphql, operation, asNode } from "../lib/graphql";
import { buildQuery, QueryParams } from "../lib/query";
import { buildPager, PagerParams } from "../lib/pager";
import { Hubbo } from ".";
import { Post } from "../types/Post";

const FindPostsQuery = operation(
  graphql(`
    query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
      search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {
        issueCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            ...Post_Issue
          }
        }
      }
    }
  `),
).withMap((data) => {
  const edges = (data.search.edges ?? [])
    .filter((edge) => edge != null)
    .filter((edge) => edge.node != null)
    .map((edge) => ({
      cursor: edge.cursor,
      post: Post.unmask(asNode(edge.node!, "Issue")),
    }));

  return {
    totalCount: data.search.issueCount,
    pageInfo: data.search.pageInfo,
    posts: edges.map((edge) => edge.post),
    edges,
  };
});

export async function findPosts(this: Hubbo, props?: QueryParams & PagerParams) {
  const args = {
    query: buildQuery.call(this, props),
    ...buildPager(props, 10),
  };
  console.log(args);
  return this.graphql(FindPostsQuery).execute(args);
}
