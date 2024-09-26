import { graphql, type } from "../lib/graphql";
import { $reaction } from "./$reaction";
import { $author } from "./$author";

export type Comment = typeof $comment.__output;

export const $comment = type(
  graphql(`
    fragment Comment_IssueComment on IssueComment {
      id
      body
      createdAt
      lastEditedAt
      isMinimized
      minimizedReason
      author {
        ...Author_Actor
      }
      reactions {
        totalCount
      }
      reactionGroups {
        ...Reaction_ReactionGroup
      }
    }
  `),
).withMap((comment) => {
  return {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt.toString(),
    lastEditedAt: comment.lastEditedAt?.toString() ?? null,
    isMinimized: comment.isMinimized,
    minimizedReason: comment.minimizedReason ?? null,
    author: $author.unmask(comment.author!),
    reactions: $reaction.unmask(comment.reactionGroups),
    totalReactions: comment.reactions.totalCount,
  };
});
