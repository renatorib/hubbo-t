import { graphql, operation } from "../lib/graphql";
import { buildPager, PagerParams } from "../lib/pager";
import { $comment } from "../types";
import { Hubbo } from ".";

const GetCommentsByPostNumberQuery = operation(
  graphql(`
    query getCommentsByPostNumber(
      $owner: String!
      $name: String!
      $number: Int!
      $first: Int
      $last: Int
      $before: String
      $after: String
    ) {
      repository(owner: $owner, name: $name) {
        issue(number: $number) {
          number
          comments(first: $first, last: $last, before: $before, after: $after) {
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
                ...Comment_IssueComment
              }
            }
          }
        }
      }
    }
  `),
).withMap((data) => {
  const issue = data.repository?.issue;

  if (!issue) return {};

  return {
    totalCount: issue.comments.totalCount,
    pageInfo: issue.comments.pageInfo,
    edges: issue.comments.edges
      ?.filter((e) => e != null)
      .map((edge) => {
        return {
          cursor: edge.cursor,
          comment: $comment.unmask(edge.node),
        };
      }),
  };
});

const GetCommentsByPostIdQuery = operation(
  graphql(`
    query getCommentsByPostId(
      $owner: String!
      $name: String!
      $id: ID!
      $first: Int
      $last: Int
      $before: String
      $after: String
    ) {
      node(id: $id) {
        ... on Issue {
          id
          number
          comments(first: $first, last: $last, before: $before, after: $after) {
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
                ...Comment_IssueComment
              }
            }
          }
        }
      }
    }
  `),
).withMap((data) => {
  const issue = data.node;

  if (!issue || issue.__typename !== "Issue") return {};

  return {
    totalCount: issue.comments.totalCount,
    pageInfo: issue.comments.pageInfo,
    edges: issue.comments.edges
      ?.filter((e) => e != null)
      .map((edge) => {
        return {
          cursor: edge.cursor,
          comment: $comment.unmask(edge.node),
        };
      }),
  };
});

export async function getComments(
  this: Hubbo,
  props: ({ postNumber: number } & PagerParams) | ({ postId: string } & PagerParams),
) {
  const common = { ...this.repo, ...buildPager(props) };

  if ("postNumber" in props) {
    return this.graphql(GetCommentsByPostNumberQuery).execute({ ...common, number: props.postNumber });
  }

  return this.graphql(GetCommentsByPostIdQuery).execute({ ...common, id: props.postId });
}
