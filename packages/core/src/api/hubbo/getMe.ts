import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";

const GetMeQuery = operation(
  graphql(`
    query GetMe {
      viewer {
        id
        login
        email
      }
    }
  `),
).withMap((data) => data.viewer);

export async function getMe(this: Hubbo) {
  return this.graphql(GetMeQuery).execute();
}
