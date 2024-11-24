import "server-only";
import { getHtml, render } from "./shared";

export async function MarkdownRenderServer({ content, ...props }: { content: string } & React.ComponentProps<"div">) {
  return <div {...props}>{render(await getHtml(content))}</div>;
}
