export interface GithubGraphQLFormattedError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: { [key: string]: unknown };
  /**
   * GraphQL spec do not include `type` on error, but
   * github does.
   * See: https://spec.graphql.org/draft/#sec-Errors
   */
  type?: string;
}

export class HubboError extends Error {
  name = "HubboError";
  response?: Response;

  constructor(
    input: string | Error | Response,
    public graphQLErrors?: GithubGraphQLFormattedError[],
  ) {
    super(
      ...((): [string?, ErrorOptions?] => {
        if (typeof input === "string") {
          return [input];
        }
        if (graphQLErrors) {
          return ["GraphQL errors:\n- " + graphQLErrors.map((e) => e.message).join("\n- ")];
        }
        if (input instanceof Response) {
          return [input.statusText];
        }
        return [input.message, { cause: input }];
      })(),
    );

    if (graphQLErrors) {
      this.graphQLErrors = graphQLErrors;
    }

    if (input instanceof Response) {
      this.response = input;
    }
  }

  isHttpError(): this is this & { response: Response } {
    return this.response?.ok === false;
  }

  isGrapQLError(): this is this & { graphQLErrors: GithubGraphQLFormattedError[]; response: Response } {
    return !!this.graphQLErrors;
  }

  isForbidden() {
    return (this.response?.status === 403 || this.graphQLErrors?.some((e) => e.type === "FORBIDDEN")) ?? false;
  }

  isNotFound() {
    return (this.response?.status === 404 || this.graphQLErrors?.some((e) => e.type === "NOT_FOUND")) ?? false;
  }
}

export const ensureHubboError = (error: unknown) => {
  if (error instanceof HubboError) {
    return error;
  }
  if (error instanceof Error) {
    return new HubboError(error);
  }
  return new HubboError(`Non error was thrown: ${error}`);
};
