import "dotenv/config";
import { generate } from "@graphql-codegen/cli";
import { confirm } from "@inquirer/prompts";

console.log("Caution! The introspection query consumes a lot of token's rate limit points.");
console.log("You may get 1-hour ban if you use more than ~2 times in a hour.");

confirm({ message: "Do you want to continue?" }).then((answer) => {
  if (!answer) {
    console.log("Aborting introspection query...");
    process.exit(0);
  }

  generate(
    {
      schema: {
        "https://api.github.com/graphql": {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_INTROSPECTION_TOKEN}`,
          },
        },
      },
      generates: {
        "./src/api/__generated__/schema.graphql": {
          plugins: ["schema-ast"],
          config: { includeDirectives: true },
        },
      },
    },
    true,
  );
});
