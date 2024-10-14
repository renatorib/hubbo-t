import { defineConfig } from "tsup";

export default defineConfig([
  {
    dts: true,
    format: ["esm", "cjs"],
    sourcemap: true,
    minify: true,
    entry: ["src", "!**/*.graphql"],
    outDir: "dist",
    splitting: true,
    silent: true,
    esbuildOptions: (options) => {
      options.chunkNames = "__chunks/[hash]";
    },
  },
]);
