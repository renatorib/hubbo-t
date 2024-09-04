import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";

const GetRepositoryQuery = operation(
  graphql(`
    query GetRepository($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        url
      }
    }
  `),
).withMap((data) => {
  return data.repository!;
});

export async function getRepository(this: Hubbo) {
  const result = await this.graphql(GetRepositoryQuery).execute({ ...this.repo });
  this.repo.id = result.id;

  return result;
}
