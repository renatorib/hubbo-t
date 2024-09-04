import { graphql, operation, asNode } from "../lib/graphql";
import { Hubbo } from ".";
import { buildQuery, QueryParams } from "../lib/query";
import { Post } from "../types/Post";

const FindPostQuery = operation(
  graphql(`
    query FindPost($query: String!) {
      search(first: 1, type: ISSUE, query: $query) {
        nodes {
          ... on Issue {
            ...Post_Issue
          }
        }
      }
    }
  `),
).withMap((data) => {
  return data.search.nodes?.[0] ? Post.unmask(asNode(data.search.nodes[0], "Issue")) : null;
});

export async function findPost(
  this: Hubbo,
  props?: {
    query?: QueryParams;
    foo?: string;
  },
) {
  return this.graphql(FindPostQuery).execute({
    query: buildQuery.call(this, props?.query),
  });
}
