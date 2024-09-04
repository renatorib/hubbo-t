import { graphql, operation } from "../lib/graphql";
import { Hubbo } from ".";

const GetRateLimitQuery = operation(
  graphql(`
    query GetRateLimit {
      rateLimit {
        limit
        used
        resetAt
        remaining
      }
    }
  `),
).withMap((data) => data.rateLimit);

export async function getRateLimit(this: Hubbo) {
  return this.graphql(GetRateLimitQuery).execute();
}
