import { type, graphql } from "../lib/graphql";

export type User = typeof $user.__output;

export const $user = type(
  graphql(`
    fragment User_User on User {
      avatarUrl
      name
      login
      twitterUsername
    }
  `),
);
