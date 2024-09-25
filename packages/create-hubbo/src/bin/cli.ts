#!/usr/bin/env -S npx tsx

import { neww } from "@hubbo/cli";

const run = async () => {
  const handleSigTerm = () => process.exit(0);
  process.on("SIGINT", handleSigTerm);
  process.on("SIGTERM", handleSigTerm);
  neww.parse();
};

run();
