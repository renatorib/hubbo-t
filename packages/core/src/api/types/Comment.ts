import { graphql, type } from "../lib/graphql";
import { Reaction } from "./Reaction";
import { Author } from "./Author";

export const Comment = type(
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
    author: Author.unmask(comment.author!),
    reactions: Reaction.unmask(comment.reactionGroups),
    totalReactions: comment.reactions.totalCount,
  };
});
