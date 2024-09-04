import { graphql, operation } from "../lib/graphql";
import { Post } from "../types/Post";
import { Hubbo } from ".";

const GetPostByIdQuery = operation(
  graphql(`
    query GetPostById($id: ID!, $omitBody: Boolean = false) {
      node(id: $id) {
        ...Post_Issue
      }
    }
  `),
).withMap((data) => {
  const issue = data.node && data.node.__typename === "Issue" ? data.node : null;
  return { post: issue ? Post.unmask(issue) : null };
});

const GetPostByNumberQuery = operation(
  graphql(`
    query GetPostByNumber($owner: String!, $name: String!, $number: Int!, $omitBody: Boolean = false) {
      repository(owner: $owner, name: $name) {
        issue(number: $number) {
          ...Post_Issue
        }
      }
    }
  `),
).withMap((data) => {
  return { post: data.repository?.issue ? Post.unmask(data.repository.issue) : null };
});

export async function getPost(this: Hubbo, props: ({ number: number } | { id: string }) & { omitBody?: boolean }) {
  const common = { omitBody: props?.omitBody };

  if ("number" in props) {
    return this.graphql(GetPostByNumberQuery).execute({ ...common, ...this.repo, number: props.number });
  }

  return this.graphql(GetPostByIdQuery).execute({ ...common, id: props.id });
}
