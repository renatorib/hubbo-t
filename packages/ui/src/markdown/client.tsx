"use client";

import React from "react";
import { type HtmrOptions } from "htmr";
import { getHtml, render } from "./shared";

export async function MarkdownRender(
  props: { content: string; transform?: HtmrOptions["transform"] } & React.ComponentProps<"div">,
) {
  const [html, setHtml] = React.useState<string>();

  React.useEffect(() => void (async () => setHtml(await getHtml(props.content)))(), [props.content]);

  return <div {...props}>{html ? render(html, { transform: props.transform }) : null}</div>;
}
