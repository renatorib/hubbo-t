import { graphql, operation } from "../lib/graphql";
import { Post } from "../types/Post";
import { frontmatter } from "../lib/frontmatter";
import { Hubbo } from ".";

const CreatePostMutation = operation(
  graphql(`
    mutation CreatePost($input: CreateIssueInput!) {
      createIssue(input: $input) {
        issue {
          ...Post_Issue
        }
      }
    }
  `),
).withMap((data) => {
  return Post.unmask(data.createIssue!.issue!);
});

export async function createPost(
  this: Hubbo,
  props: {
    title: string;
    body: string;
    meta?: { [key: string]: string | number };
    labelIds?: string[];
    coauthorIds?: string[];
  },
) {
  const { body, meta, coauthorIds, ...rest } = props;

  return this.graphql(CreatePostMutation).execute({
    input: {
      body: frontmatter.stringify({
        data: props.meta ?? {},
        content: props.body ?? "",
      }),
      assigneeIds: coauthorIds,
      repositoryId: await this.getRepoId(),
      ...rest,
    },
  });
}
