import { graphql, type } from "../lib/graphql";

export const Reaction = type(
  graphql(`
    fragment Reaction_ReactionGroup on ReactionGroup {
      content
      reactors {
        totalCount
      }
    }
  `),
).withMap((reactionGroup) => {
  return {
    name: reactionGroup.content,
    count: reactionGroup.reactors.totalCount,
  };
});
