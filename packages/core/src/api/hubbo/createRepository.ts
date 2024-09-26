// import { graphql, operation, RepositoryVisibility } from "../lib/graphql";
import { HubboError } from "../lib";
import { Hubbo } from ".";

// Cannot use graphql here because of auto_init arg
/* const CreateRepositoryMutation = operation(
  graphql(`
    mutation CreateRepository($input: CreateRepositoryInput!) {
      createRepository(input: $input) {
        repository {
          id
        }
      }
    }
  `),
).withMap((data) => {
  return data.createRepository!.repository!;
}); */

export async function createRepository(
  this: Hubbo,
  props?: {
    description?: string;
    homepageUrl?: string;
  },
) {
  type Result = {
    node_id: string;
    html_url: string;
  };

  const result = await this.rest<Result>("POST /user/repos", {
    body: JSON.stringify({
      name: this.repo.name,
      description: props?.description,
      homepage: props?.homepageUrl,
      auto_init: true,
    }),
  });

  if (!result.ok) {
    throw new HubboError(result.response);
  }

  this.repo.id = result.data.node_id;

  return {
    id: result.data.node_id,
    url: result.data.html_url,
  };
}
