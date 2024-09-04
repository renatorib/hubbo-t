import { createCommand } from "@commander-js/extra-typings";
import c from "picocolors";
import { readConfig } from "../lib/config";
import { getUser } from "../lib/api";

export const whoami = createCommand("whoami").action(async () => {
  const config = await readConfig();

  if (config.token) {
    const me = await getUser(config.token);
    if (me.ok) {
      return console.log(c.green(`${c.bold(me.data.name)} (${me.data.login})`));
    }
  }

  return console.log(c.gray("unauthenticated"));
});
