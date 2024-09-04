import { graphql, type } from "../lib/graphql";
import { frontmatter } from "../lib/frontmatter";

import { User } from "./User";
import { Author } from "./Author";
import { Reaction } from "./Reaction";
import { Label } from "./Label";

export const Post = type(
  graphql(`
    fragment Post_Issue on Issue {
      id
      number
      url
      updatedAt
      createdAt
      title
      body
      author {
        ...Author_Actor
      }
      coauthors: assignees(first: 10) {
        nodes {
          ...User_User
        }
      }
      reactions: reactionGroups {
        ...Reaction_ReactionGroup
      }
      labels(first: 100) {
        nodes {
          ...Label_Label
        }
      }
    }
  `),
).withMap((issue) => {
  const { data: meta, content: body } = frontmatter.parse(issue.body);

  return {
    ...issue,
    author: Author.unmask(issue.author),
    coauthors: User.unmask(issue.coauthors.nodes),
    reactions: Reaction.unmask(issue.reactions),
    labels: Label.unmask(issue.labels?.nodes),
    meta,
    body,
  };
});
