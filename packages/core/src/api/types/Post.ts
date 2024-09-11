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
      comments {
        totalCount
      }
    }
  `),
).withMap((issue) => {
  const { data: meta, content: body } = frontmatter.parse(issue.body);
  const wordCount = body.split(" ").length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  const labels = Label.unmask(issue.labels?.nodes);
  const reactions = Reaction.unmask(issue.reactions);

  return {
    ...issue,
    author: Author.unmask(issue.author!),
    coauthors: User.unmask(issue.coauthors.nodes),
    reactions,
    totalReactions: reactions.reduce((total, group) => total + group.count, 0),
    totalComments: issue.comments.totalCount,
    labels,
    tags: labels.filter((label) => label.prefix === "tag"),
    flags: labels.filter((label) => label.prefix === "flag"),
    state: labels.find((label) => label.prefix === "state")?.name,
    wordCount,
    estimatedReadingTime,
    meta,
    body,
  };
});
