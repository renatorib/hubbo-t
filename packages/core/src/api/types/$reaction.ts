import { graphql, type } from "../lib/graphql";

export type Reaction = typeof $reaction.__output;

export const $reaction = type(
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
