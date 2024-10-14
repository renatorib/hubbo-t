import "server-only";
import Shiki from "@shikijs/markdown-it";
// import { transformerTwoslash } from "@shikijs/twoslash";
import markdownit from "markdown-it";
import htmr from "htmr";

export async function getHtml(markdown: string) {
  return markdownit({ html: true })
    .use(
      await Shiki({
        themes: { dark: "vitesse-dark", light: "vitesse-light" },
        // transformers: [transformerTwoslash()],
      }),
    )
    .render(markdown);
}

export function render(...args: Parameters<typeof htmr>) {
  return htmr(...args);
}
