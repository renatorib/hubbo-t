import { type, graphql } from "../lib/graphql";

export const User = type(
  graphql(`
    fragment User_User on User {
      avatarUrl
      name
      login
      twitterUsername
    }
  `),
);
