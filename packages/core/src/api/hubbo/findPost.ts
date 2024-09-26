import { Hubbo } from ".";
import { graphql, operation, asNode } from "../lib/graphql";
import { buildQuery, QueryParams } from "../lib/query";
import { $post } from "../types";

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
  return data.search.nodes?.[0] ? $post.unmask(asNode(data.search.nodes[0], "Issue")) : null;
});

export async function findPost(this: Hubbo, props?: { query?: QueryParams }) {
  return this.graphql(FindPostQuery).execute({
    query: buildQuery.call(this, props?.query),
  });
}
