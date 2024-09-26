import { graphql, type } from "../lib/graphql";

export type Author = typeof $author.__output;

export const $author = type(
  graphql(`
    fragment Author_Actor on Actor {
      __typename
      ... on User {
        avatarUrl
        name
        login
        twitterUsername
      }
      ... on Organization {
        avatarUrl
        name
        login
        twitterUsername
      }
      ... on EnterpriseUserAccount {
        avatarUrl
        name
        login
      }
      ... on Bot {
        avatarUrl
        login
      }
      ... on Mannequin {
        avatarUrl
        login
      }
    }
  `),
).withMap((actor) => {
  switch (actor.__typename) {
    case "User":
    case "Organization": {
      return {
        type: actor.__typename,
        avatarUrl: actor.avatarUrl,
        name: actor.name,
        login: actor.login,
        twitterUsername: actor.twitterUsername,
      };
    }
    case "EnterpriseUserAccount": {
      return {
        type: actor.__typename,
        avatarUrl: actor.avatarUrl,
        name: actor.name,
        login: actor.login,
      };
    }
    case "Mannequin":
    case "Bot": {
      return {
        type: actor.__typename,
        avatarUrl: actor.avatarUrl,
        login: actor.login,
      };
    }
  }

  actor satisfies never;
});
