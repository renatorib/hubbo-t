import cn from "classnames";
import { Hubbo } from "../hubbo";

export type SortDescAsc = "interactions" | "reactions" | "author-date" | "created" | "updated";
export type SortReaction = "reactions-+1" | "reactions--1" | "reactions-smile" | "reactions-tada" | "reactions-heart";
export type Sort = SortDescAsc | `${SortDescAsc}-asc` | `${SortDescAsc}-desc` | SortReaction;

export type QueryParams = {
  state?: "published" | "draft";

  author?: string | string[];
  notAuthor?: string | string[];

  label?: string | string[];
  notLabel?: string | string[];

  sort?: Sort;
  search?: string;
};

const by = (prefix: string, value: string | string[] | undefined) => {
  if (!value) return null;
  return (Array.isArray(value) ? value : [value]).map((v) => `${prefix}:${v}`);
};

export function buildQuery(this: Hubbo, args: QueryParams = {}) {
  const publishedLabel = this.options.config?.publishedLabel || "state:published";
  const draftLabel = this.options.config?.publishedLabel || "state:draft";

  return cn(
    `repo:${this.options.repo}`,
    `type:issue`,
    `is:open`,
    `label:${args.state === "draft" ? draftLabel : publishedLabel}`,
    by("label", args.label),
    by("-label", args.notLabel),
    by("author", args.author),
    by("-author", args.notAuthor),
    by("sort", args.sort ?? "created"),
    args.search,
  );
}
