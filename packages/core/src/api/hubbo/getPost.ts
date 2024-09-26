import { graphql, operation } from "../lib/graphql";
import { $post } from "../types";
import { Hubbo } from ".";

const GetPostByIdQuery = operation(
  graphql(`
    query GetPostById($id: ID!) {
      node(id: $id) {
        ...Post_Issue
      }
    }
  `),
).withMap((data) => {
  const issue = data.node && data.node.__typename === "Issue" ? data.node : null;
  return issue ? $post.unmask(issue) : null;
});

const GetPostByNumberQuery = operation(
  graphql(`
    query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {
      repository(owner: $owner, name: $name) {
        issue(number: $number) {
          ...Post_Issue
        }
      }
    }
  `),
).withMap((data) => {
  return data.repository?.issue ? $post.unmask(data.repository.issue) : null;
});

export async function getPost(this: Hubbo, props: { number: number } | { id: string }) {
  if ("number" in props) {
    return this.graphql(GetPostByNumberQuery).execute({ ...this.repo, number: props.number });
  }

  return this.graphql(GetPostByIdQuery).execute({ id: props.id });
}
