import { createPrompt, useKeypress } from "@inquirer/core";

export const pressKey = createPrompt<boolean, { message: string; key: string }>(({ message, key }, done) => {
  useKeypress((event) => {
    if (event.name === key || key === "*") done(true);
  });
  return `\n[> ${message}]`;
});

export const anyKey = (message = "Press any key to continue...") => {
  return pressKey({ message, key: "*" }, { clearPromptOnDone: true });
};
