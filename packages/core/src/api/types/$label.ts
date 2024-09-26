import { graphql, type } from "../lib/graphql";

export type Label = typeof $label.__output;

export const $label = type(
  graphql(`
    fragment Label_Label on Label {
      id
      name
      color
      issues {
        totalCount
      }
    }
  `),
).withMap((label) => {
  const hasPrefix = label.name.includes(":");
  const [prefix, ...name] = label.name.split(":");
  return {
    id: label.id,
    name: hasPrefix ? name.join(":") : label.name,
    prefix: hasPrefix ? prefix : null,
    fullName: label.name,
    color: "#" + label.color,
    count: label.issues.totalCount,
  };
});
