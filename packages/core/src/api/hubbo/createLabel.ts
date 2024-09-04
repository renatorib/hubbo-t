import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";
import { Label } from "../types/Label";

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
  return Label.unmask(data.createLabel!.label!);
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
