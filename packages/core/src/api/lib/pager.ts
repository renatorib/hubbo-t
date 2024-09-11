export type PagerParams =
  | {
      before?: string;
      after?: string;
      first?: number;
      last?: number;
    }
  | {
      limit?: number;
      offset?: number;
    };

export const buildPager = (args?: PagerParams, defaultLimit = 10) => {
  if (!args) {
    return {
      first: defaultLimit,
    };
  }

  // offset/limit pagination
  if ("offset" in args || "limit" in args) {
    const offset = args.offset ?? 0;
    return {
      after: offset > 0 ? cursor(offset) : undefined,
      first: args.limit,
    };
  }

  if ("before" in args || "after" in args || "first" in args || "last" in args) {
    return {
      before: args.before,
      after: args.after,
      first: args.first,
      last: args.last,
    };
  }

  return {
    first: defaultLimit,
  };
};

const btoa = typeof window !== "undefined" ? window.btoa : (text: string) => Buffer.from(text).toString("base64");

function cursor(n: number) {
  return btoa(`cursor:${n}`);
}
