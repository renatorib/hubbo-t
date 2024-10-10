import fs from "node:fs";
import colors from "picocolors";
import ora from "ora";

import { createCommand } from "@commander-js/extra-typings";
import { ExitPromptError } from "@inquirer/core";
import { confirm, input } from "@inquirer/prompts";
import { Hubbo } from "@hubbo/core";

import { authenticate } from "../lib/auth";
import { addStar, checkStar } from "../lib/api";
import { consistentColor } from "../lib/utils";
import { cloneTemplate } from "../lib/templates";

const REPO_TO_STAR = "renatorib/hubbo";

export const create = createCommand("create")
  .argument("[project-directory]")
  .description("create new hubbo project")
  .action(interactiveCreateProject);

export async function interactiveCreateProject(dir?: string) {
  const loading = ora();
  try {
    const user = await authenticate();
    const check = checkStar(user.token, REPO_TO_STAR);

    console.log(colors.bold(`👋 Hello ${colors.green(user.name)}.`));
    console.log("Let's start your new project.\n");

    if (!dir) {
      dir = await input({
        message: "What's the project directory?",
        default: "my-blog",
      });
    }

    if (fs.existsSync(dir)) {
      loading.fail(`Directory ${dir} already exists. Exiting to prevent file rewrites.`);
      process.exit(1);
    }

    const answerRepo = await input({
      message: `What's the new repository name for the posts?`,
      default: `${dir}-posts`,
      validate(name) {
        if (name.includes("/")) return "Repository name can't have slash";
        if (name.includes(" ")) return "Repository name can't have space";
        return true;
      },
    });

    const answerName = await input({
      message: "What's name of your blog?",
      default: `${user.name}'s Blog`,
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

    const repo = `${user.login}/${answerRepo}`;
    const token = user.token;
    const title = answerName;

    const hubbo = new Hubbo({ repo, token });

    /**
     * --------------------------
     * Create & configure CMS repository and template code
     * --------------------------
     */
    loading.start("Creating CMS repository...");
    // @ts-ignore
    const repository = await hubbo.createRepository();
    loading.succeed(`CMS Repository created: ${repository.url}`);

    loading.start("Setting up labels...");
    await setupLabels(hubbo);
    loading.succeed("Labels setted up");

    loading.start("Cloning template...");
    await cloneTemplate(dir, "eva", { repo, token, title });
    loading.succeed("Templated cloned");
  } catch (e) {
    if (e instanceof ExitPromptError) {
      loading.fail("Exited");
      process.exit(1);
    }

    loading.fail("Something went wrong");
    if (e instanceof Error) {
      console.error(colors.red(e.message));
      process.exit(1);
    }

    console.error(e);
    process.exit(1);
  }
}

async function setupLabels(hubbo: Hubbo) {
  // Wait label creation by github (it's async)
  await new Promise((res) => setTimeout(res, 1000));
  const labels = await hubbo.getLabels({ first: 100 });

  // Delete default labels
  if (labels.edges?.length > 0) {
    await Promise.all(labels.edges.map((edge) => hubbo.deleteLabel(edge.label.id)));
  }

  // Create hubbo labels
  await Promise.all(
    ["state:published", "state:draft", "type:post"]
      .map((label) => label.split("#"))
      .map(([name, color = consistentColor(name.split(":")[0])]) => hubbo.createLabel({ name, color })),
  );
}
