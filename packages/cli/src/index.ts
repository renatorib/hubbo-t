import { createCommand } from "@commander-js/extra-typings";

import { test } from "./commands/test";
import { whoami } from "./commands/whoami";
import { neww } from "./commands/new";

const program = createCommand()
  .name("hubbo")
  .description("hubbo CLI")
  .version("0.1.0")
  .addCommand(neww)
  .addCommand(whoami)
  .addCommand(test);

export const run = () => {
  const handleSigTerm = () => process.exit(0);
  process.on("SIGINT", handleSigTerm);
  process.on("SIGTERM", handleSigTerm);
  program.parse();
};
