import { graphql, operation } from "../lib/graphql";
import { $label } from "../types";
import { Hubbo } from ".";

const CreateLabelMutation = operation(
  graphql(`
    mutation CreateLabel($input: CreateLabelInput!) {
      createLabel(input: $input) {
        label {
          ...Label_Label
        }
      }
    }
  `),
).withMap((data) => {
  return $label.unmask(data.createLabel!.label!);
});

export async function createLabel(
  this: Hubbo,
  props: {
    color: string;
    description?: string;
    name: string;
  },
) {
  if (!this.repo.id) {
    await this.getRepository();
  }

  return this.graphql(CreateLabelMutation).execute({
    input: {
      ...props,
      repositoryId: this.repo.id!,
    },
  });
}
