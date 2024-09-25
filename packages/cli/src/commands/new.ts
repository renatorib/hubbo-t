import colors from "picocolors";
import ora from "ora";
import { createCommand } from "@commander-js/extra-typings";
import { ExitPromptError } from "@inquirer/core";
import { confirm, input } from "@inquirer/prompts";
import { Hubbo } from "@hubbo/core";
import { authenticate } from "../lib/auth";
import { addStar, checkStar } from "../lib/api";
import { consistentColor } from "../lib/utils";

const REPO_TO_STAR = "renatorib/hubbo";

export const neww = createCommand("new")
  .argument("[project-directory]")
  .description("create new hubbo project")
  .action(async (answerDir?: string) => {
    const loading = ora();
    try {
      const user = await authenticate();
      const check = checkStar(user.token, REPO_TO_STAR);

      console.log(colors.bold(`👋 Hello ${colors.green(user.name)}.`));
      console.log("Let's start your new project.\n");

      if (!answerDir) {
        answerDir = await input({
          message: "What's the project directory?",
          default: "my-blog",
        });
      }

      const answerRepo = await input({
        message: `What's the new repository name for the posts?`,
        default: `${answerDir}-posts`,
        validate(name) {
          // TODO: use zod
          if (name.includes("/")) return "Repository name can't have slash";
          if (name.includes(" ")) return "Repository name can't have space";
          return true;
        },
      });

      const answerName = await input({
        message: "What's name of your blog?",
        default: `${user.name}'s Blog`,
      });

      const hubbo = new Hubbo({
        repo: `${user.login}/${answerRepo}`,
        token: user.token,
      });

      /**
       * --------------------------
       * Asks for project support
       * --------------------------
       */
      if ((await check).code === "NOT_STARRED") {
        const shouldStarRepo = await confirm({
          message: `We are almost done! Could you ${colors.yellow("star")} our repository to help the project grow?`,
          default: true,
        });

        if (shouldStarRepo) {
          loading.start(`Starring "${REPO_TO_STAR}"...`);
          const res = await addStar(user.token, REPO_TO_STAR);
          if (res.code === "STARRED" || res.code === "ALREADY_STARRED") {
            loading.succeed(`Repository "${REPO_TO_STAR}" starred! Thanks for the support!`);
          } else {
            loading.fail(`Unable to star our repository: https://github.com/${REPO_TO_STAR}`);
          }
        } else {
          console.log(colors.dim(`If you change your mind here's the link: https://github.com/${REPO_TO_STAR}`));
        }
      }

      /**
       * --------------------------
       * Create repository
       * --------------------------
       */

      loading.start("Creating repository...");
      // @ts-ignore
      const repository = await hubbo.createRepository();
      loading.succeed("Repository created");

      /**
       * --------------------------
       * Setup labels
       * --------------------------
       */

      loading.start("Setting up labels...");
      // Wait label creation by github
      await new Promise((res) => setTimeout(res, 1000));
      const labels = await hubbo.getLabels({ first: 100 });

      // Delete default labels
      if (labels.edges?.length > 0) {
        await Promise.all(labels.edges.map((edge) => hubbo.deleteLabel(edge.label.id)));
      }

      // Create hubbo labels
      const hubboLabels = ["state:published", "state:draft"];
      await Promise.all(
        hubboLabels
          .map((label) => label.split("#"))
          .map(([name, color]) =>
            hubbo.createLabel({
              name,
              color: color ?? consistentColor(name.split(":")[0]),
            }),
          ),
      );
      loading.succeed("Labels setted up");

      console.log({
        answerDir,
        answerRepo,
        answerName,
      });
    } catch (e) {
      loading.fail("Something went wrong");
      if (e instanceof ExitPromptError) {
        process.exit(0);
      }
      if (e instanceof Error) {
        console.error(colors.red(e.message));
        process.exit(1);
      }
      console.error(e);
      process.exit(1);
    }
  });
