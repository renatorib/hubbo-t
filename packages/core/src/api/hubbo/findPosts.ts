import { graphql, operation, asNode } from "../lib/graphql";
import { buildQuery, QueryParams } from "../lib/query";
import { buildPager, PagerParams } from "../lib/pager";
import { Hubbo } from ".";
import { Post } from "../types/Post";

const FindPostsQuery = operation(
  graphql(`
    query FindPosts(
      $query: String!
      $first: Int
      $last: Int
      $before: String
      $after: String
      $omitBody: Boolean = true
    ) {
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
  return {
    totalCount: data.search.issueCount,
    pageInfo: data.search.pageInfo,
    edges: data.search.edges
      ?.filter((edge) => edge != null)
      .map((edge) => {
        return {
          cursor: edge.cursor,
          post: edge.node ? Post.unmask(asNode(edge.node, "Issue")) : null,
        };
      }),
  };
});

export async function findPosts(
  this: Hubbo,
  props?: QueryParams &
    PagerParams & {
      omitBody?: boolean;
    },
) {
  return this.graphql(FindPostsQuery).execute({
    query: buildQuery.call(this, props),
    ...buildPager(props, 10),
    omitBody: props?.omitBody,
  });
}
