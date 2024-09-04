import { cosmiconfig } from "cosmiconfig";

export type Config = {
  repo: string;
  name?: string;
  /**
   * Entities mapping from frontmatter properties
   */
  entities?: {
    subtitle?: string;
    kicker?: string;
    cover?: string;
  };
};

const explorer = cosmiconfig("hubbo");

export const loadConfig = async (from?: string) => {
  const loaded = await (from ? explorer.load(from) : explorer.search());
  if (loaded == null || typeof loaded !== "object") {
    return null;
  }
  return {
    config: loaded.config as Config,
    filepath: loaded.filepath,
  };
};

export const defineConfig = (config: Config) => config;
