import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";

const DeleteLabelMutation = operation(
  graphql(`
    mutation DeleteLabel($id: ID!) {
      deleteLabel(input: { id: $id }) {
        __typename
      }
    }
  `),
).withMap(() => true);

export async function deleteLabel(this: Hubbo, id: string) {
  return this.graphql(DeleteLabelMutation).execute({ id });
}
