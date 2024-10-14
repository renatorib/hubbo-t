import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import stream from "node:stream";
import { format, resolveConfig } from "prettier";
import type { ReadableStream } from "node:stream/web";
import { extract } from "tar";

const base = path.join(os.homedir(), ".hubbo");

type Options = {
  repo: string;
  token: string;
  title: string;
};

async function downloadRepo(ref: string = "main") {
  const fileName = path.join(base, `${ref}.tar.gz`);
  const url = `https://github.com/renatorib/hubbo-t/archive/refs/heads/${ref}.tar.gz`;
  await fsp.mkdir(path.dirname(fileName), { recursive: true });
  const response = await fetch(url);
  if (response.ok && response.body) {
    return new Promise((resolve) => {
      stream.Readable.fromWeb(response.body as ReadableStream<Uint8Array>)
        .pipe(fs.createWriteStream(fileName))
        .on("finish", () => resolve(true))
        .on("error", () => resolve(false));
    });
  }
  return true;
}

async function extractTar(dest: string, subdir?: string) {
  const extractDest = path.join(base, "main");
  const extractFile = path.join(base, "main.tar.gz");
  await fsp.mkdir(extractDest, { recursive: true });
  await fsp.mkdir(dest, { recursive: true });

  if (fs.existsSync(extractDest)) {
    await fsp.rmdir(extractDest);
  }

  extract({ file: extractFile, C: extractDest, strip: 1, sync: true });
  await fsp.cp(path.join(base, subdir ? `main/${subdir}` : "main"), dest, { recursive: true });
}

async function configure(dir: string, options: Options) {
  const file = (f: string) => path.join(dir, f);
  const rewrite = async (
    f: string,
    transform: (content: string) => string | Promise<string>,
    encoding: BufferEncoding = "utf8",
  ) => fsp.writeFile(f, await transform(await fsp.readFile(f, encoding)), encoding);

  // Configure .env file
  await fsp.cp(file(".env.example"), file(".env"));
  await rewrite(file(".env"), (content) =>
    content.replaceAll("<github.token>", options.token).replaceAll("<github.repo>", options.repo),
  );

  // Configure src/hubbo.ts
  const prettierrc = await resolveConfig(file("src"));
  await rewrite(file("src/hubbo.ts"), (content) =>
    format(content.replaceAll("Blog Title", options.title), { ...prettierrc, parser: "typescript" }),
  );
}

export async function cloneTemplate(to: string, template: string, options: Options) {
  await downloadRepo("main");
  await extractTar(to, `templates/${template}`);
  await configure(to, options);
}
