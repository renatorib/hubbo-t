import { graphql, operation } from "../lib/graphql";
import { buildPager, PagerParams } from "../lib/pager";
import { $label } from "../types";
import { Hubbo } from ".";

const GetLabelsQuery = operation(
  graphql(`
    query GetLabels(
      $query: String
      $name: String!
      $owner: String!
      $first: Int
      $last: Int
      $before: String
      $after: String
    ) {
      repository(name: $name, owner: $owner) {
        labels(query: $query, first: $first, last: $last, before: $before, after: $after) {
          totalCount
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              ...Label_Label
            }
          }
        }
      }
    }
  `),
).withMap((data) => {
  return {
    totalCount: data.repository?.labels?.totalCount ?? 0,
    pageInfo: data.repository?.labels?.pageInfo ?? {},
    edges: (data.repository?.labels?.edges ?? [])
      .filter((edge) => edge != null)
      .filter((edge) => edge.node != null)
      .map((edge) => {
        return {
          cursor: edge.cursor,
          label: $label.unmask(edge.node!),
        };
      }),
  };
});

export async function getLabels(
  this: Hubbo,
  props?: {
    search?: string;
  } & PagerParams,
) {
  return this.graphql(GetLabelsQuery).execute({
    query: props?.search,
    ...this.repo,
    ...buildPager(props, 100),
  });
}
