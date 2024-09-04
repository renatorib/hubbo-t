import { graphql, type } from "../lib/graphql";

export const Author = type(
  graphql(`
    fragment Author_Actor on Actor {
      ...User_User
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
    }
  `),
).withMap((actor) => {
  return {
    avatarUrl: "avatarUrl" in actor ? actor.avatarUrl : null,
    login: "login" in actor ? actor.login : null,
    name: "name" in actor && actor.name ? actor.name : "login" in actor ? actor.login : "Unknown",
    twitterUsername: "twitterUsername" in actor ? (actor.twitterUsername ?? null) : null,
  };
});
