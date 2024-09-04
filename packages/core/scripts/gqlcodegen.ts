import { generate } from "@graphql-codegen/cli";

generate(
  {
    schema: "./src/api/__generated__/schema.graphql",
    documents: ["src/api/**/*.ts"],
    ignoreNoDocuments: true,
    generates: {
      "./src/api/__generated__/codegen/": {
        preset: "client",
        config: {
          documentMode: "string",
          scalars: {
            Date: "string",
            DateTime: "string",
            PreciseDateTime: "string",
            GitTimestamp: "string",
            GitObjectID: "string",
            GitRefname: "string",
            GitSSHRemote: "string",
            HTML: "string",
            URI: "string",
            X509Certificate: "string",
            Base64String: "string",
            BigInt: "string",
          },
        },
      },
    },
  },
  true,
);
