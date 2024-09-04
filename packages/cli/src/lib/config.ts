import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const configPath = path.join(os.homedir(), ".hubbo", "config.json");

type Config = {
  token?: string;
};

export const readConfig = async () => {
  await touch(configPath);
  return safeParse<Config>(await fs.promises.readFile(configPath, "utf8"));
};

export const saveConfig = async (data: Config) => {
  await touch(configPath);
  return await fs.promises.writeFile(configPath, JSON.stringify(data, null, 2), "utf8");
};

async function touch(filePath: string) {
  if (!fs.existsSync(filePath)) {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, "", "utf8");
  }
}

function safeParse<T = any>(content?: string) {
  try {
    return JSON.parse(content || "{}") as T;
  } catch {
    return {} as T;
  }
}
