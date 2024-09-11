// import { type HtmrOptions } from "htmr";
import { getHtml, render } from "./shared";
import "server-only";

export async function MarkdownRender({ content, ...props }: { content: string } & React.ComponentProps<"div">) {
  return <div {...props}>{render(await getHtml(content))}</div>;
}
