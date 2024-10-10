import fs from "node:fs";
import { createCommand, Command } from "@commander-js/extra-typings";

import { test } from "./commands/test";
import { login } from "./commands/login";
import { whoami } from "./commands/whoami";
import { create } from "./commands/create";

const commands = {
  login,
  whoami,
  create,
};

const program = createCommand().name("hubbo").description("Hubbo CLI");

if (process.env.NODE_ENV === "test") {
  program.addCommand(test);
}

try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  program.version(pkg.version);
} catch (e) {}

for (const command of Object.values(commands)) {
  program.addCommand(command);
}

export { commands, program };

export const runCommand = (command: Command<any[], any>) => {
  const handleSigTerm = () => process.exit(0);
  process.on("SIGINT", handleSigTerm);
  process.on("SIGTERM", handleSigTerm);
  command.parse();
};
