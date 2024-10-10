import c from "picocolors";
import { createCommand } from "@commander-js/extra-typings";
import { login as authLogin } from "../lib/auth";

export const login = createCommand("login").action(async () => {
  try {
    const user = await authLogin();
    console.log(`Logged in as ${c.blue(user.name)}`);
  } catch (e) {
    console.error(c.red("Failed to login"));
    if (e !== null && typeof e === "object" && "message" in e) {
      console.error(e.message);
    }
  }
});
