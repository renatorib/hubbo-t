import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import stream from "node:stream";
import { format, resolveConfig } from "prettier";
import type { ReadableStream } from "node:stream/web";
import { extract } from "tar";

const base = path.join(os.homedir(), ".hubbo");
const hubbo = (...p: string[]) => path.join(base, ...p);

export class Template {
  constructor(
    public options: {
      name: string;
      repo: string;
      token: string;
      title: string;
      dest: string;
    },
  ) {}

  async run(ref: string = "main") {
    await downloadFile(`https://github.com/renatorib/hubbo/archive/refs/heads/${ref}.tar.gz`, hubbo(`${ref}.tar.gz`));
    await extractTar(hubbo(`${ref}.tar.gz`), hubbo(ref), { clear: true });
    await fsp.cp(hubbo(ref, `templates/${this.options.name}`), this.options.dest, { recursive: true });
    await this.configure();
  }

  async configure() {
    const target = (...p: string[]) => path.join(this.options.dest, ...p);

    // Configure .env file
    await fsp.cp(target(".env.example"), target(".env"));
    await rewrite(target(".env"), (content) =>
      content.replaceAll("<github.token>", this.options.token).replaceAll("<github.repo>", this.options.repo),
    );

    // Configure src/hubbo.ts
    const prettierrc = await resolveConfig(target("src"));
    await rewrite(target("src/hubbo.ts"), (content) =>
      format(content.replaceAll("Blog Title", this.options.title), { ...prettierrc, parser: "typescript" }),
    );

    // Configure package.json
    await rewrite(target("package.json"), async (content) => {
      const pkg = JSON.parse(content);
      delete pkg.private;
      pkg.name = path.basename(this.options.dest);
      pkg.version = "1.0.0";
      pkg.dependencies = Object.fromEntries(
        await Promise.all(
          Object.entries(pkg.dependencies).map(async ([key, value]) => [
            key,
            value === "workspace:*" ? await getPackageLatestVersion(key) : value,
          ]),
        ),
      );
      pkg.devDependencies = Object.fromEntries(
        await Promise.all(
          Object.entries(pkg.devDependencies).map(async ([key, value]) => [
            key,
            value === "workspace:*" ? await getPackageLatestVersion(key) : value,
          ]),
        ),
      );

      return JSON.stringify(pkg, null, 2);
    });
  }
}

async function downloadFile(url: string, destination: string) {
  await fsp.mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(url);
  if (!(response.ok && response.body)) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }
  return new Promise<string>((resolve, reject) => {
    stream.Readable.fromWeb(response.body as ReadableStream<Uint8Array>)
      .pipe(fs.createWriteStream(destination))
      .on("finish", () => resolve(destination))
      .on("error", reject);
  });
}

async function extractTar(file: string, destination: string, options?: { clear?: boolean }) {
  if (fs.existsSync(destination)) {
    if (options?.clear) {
      await fsp.rm(destination, { force: true, recursive: true });
    } else {
      throw new Error(
        "Failed to extract tar file. Destination (${destination}) already exists. " +
          "Skipping to prevent file rewrites. " +
          'Delete destination first or explicitly use "clear: true" option.',
      );
    }
  }

  await fsp.mkdir(destination, { recursive: true });
  extract({ file, C: destination, strip: 1, sync: true });
}

async function rewrite(
  f: string,
  transform: (content: string) => string | Promise<string>,
  encoding: BufferEncoding = "utf8",
) {
  return fsp.writeFile(f, await transform(await fsp.readFile(f, encoding)), encoding);
}

async function getPackageLatestVersion(name: string) {
  const response = await fetch(`https://registry.npmjs.org/${name}`);
  if (!(response.ok && response.body)) {
    throw new Error(`Failed to get npm package information of: ${name}`);
  }
  const data = await response.json();
  return data["dist-tags"].latest;
}
