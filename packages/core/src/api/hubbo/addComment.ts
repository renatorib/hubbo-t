import { graphql, operation } from "../lib/graphql";
import { $comment } from "../types";
import { Hubbo } from ".";

const AddCommentMutation = operation(
  graphql(`
    mutation AddComment($input: AddCommentInput!) {
      addComment(input: $input) {
        commentEdge {
          node {
            ...Comment_IssueComment
          }
        }
      }
    }
  `),
).withMap((data) => {
  return {
    comment: $comment.unmask(data.addComment!.commentEdge!.node!),
  };
});

export async function addComment(
  this: Hubbo,
  props: {
    body: string;
    postId: string;
  },
) {
  return this.graphql(AddCommentMutation).execute({
    input: { body: props.body, subjectId: props.postId },
  });
}
