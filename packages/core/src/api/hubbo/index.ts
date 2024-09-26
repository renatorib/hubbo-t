import { IsEmptyObject, DeepFlatten } from "../lib/types";
import { graphql, operation, OperationString } from "../lib/graphql";
import { GithubGraphQLFormattedError, HubboError, ensureHubboError } from "../lib/error";
import { $comment } from "../types";

import { findPosts } from "./findPosts";
import { findPost } from "./findPost";
import { getLabels } from "./getLabels";
import { getPinnedPosts } from "./getPinnedPosts";
import { getComments } from "./getComments";
import { getPost } from "./getPost";
import { createRepository } from "./createRepository";
import { getRepository } from "./getRepository";
import { createLabel } from "./createLabel";
// import { addComment } from "./addComment";
import { createPost } from "./createPost";
import { deleteLabel } from "./deleteLabel";
import { getRateLimit } from "./getRateLimit";
import { getMe } from "./getMe";

type HubboOptions = {
  /**
   * Full repo string containing owner and name.
   * @example { repo: "my-user/posts" }
   */
  repo: string;
  /**
   * GitHub access token
   */
  token: string;
  /**
   * Optional configuration
   */
  config?: {
    /**
     * A label that controls published state
     * @default "state:published"
     */
    publishedLabel?: string;
    /**
     * A label that controls draft state
     * @default "state:draft"
     */
    draftLabel?: string;
  };
};

export class Hubbo {
  repo: { owner: string; name: string; fullName: string; id?: string };

  constructor(public options: HubboOptions) {
    const [owner, name] = options.repo.split("/");
    this.repo = { owner, name, fullName: options.repo, id: undefined };
  }

  async getRepoId() {
    if (!this.repo.id) {
      this.repo.id = (await this.getRepository()).id;
    }
    return this.repo.id;
  }

  async rest<T, E = any>(endpoint: `${"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} /${string}`, init?: RequestInit) {
    const [method, path] = endpoint.split(" ");
    return fetch("https://api.github.com" + path, {
      method,
      ...init,
      headers: {
        Accept: "Accept: application/vnd.github+json",
        ...(method === "PUT" && { "Content-Length": "0" }),
        ...(this.options.token && { Authorization: `Bearer ${this.options.token}` }),
        ...init?.headers,
      },
    }).then(async (response) => {
      const data = await response.json().catch(() => response.text());
      if (!response.ok) return { ok: false as const, response, data: data as E };
      return { ok: true as const, response, data: data as T };
    });
  }

  async rawGraphql(query: string, variables?: { [x: string]: any }) {
    try {
      return await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.options.token}` },
        body: JSON.stringify({ query, variables }),
      });
    } catch (e) {
      throw ensureHubboError(e);
    }
  }

  graphql<Data, Variables, Out>(document: OperationString<Data, Variables, Out>) {
    const execute = async (
      ...[variables]: IsEmptyObject<Variables> extends true
        ? [variables?: undefined]
        : [variables: DeepFlatten<Variables>]
    ) => {
      try {
        const response = await this.rawGraphql(
          // document is a string in runtime
          // here in TS it's just a magic typed-string to help infer things
          document as any as string,
          variables,
        );

        if (!response.ok) {
          throw new HubboError(response);
        }

        const result = (await response.json()) as
          | { data: Data }
          | { errors: GithubGraphQLFormattedError[] }
          | { data: Data; errors: GithubGraphQLFormattedError[] };

        if ("errors" in result) {
          throw new HubboError(response, result.errors);
        }

        return document.map(result.data);
      } catch (e) {
        throw ensureHubboError(e);
      }
    };

    return { execute };
  }

  async addComment(props: { body: string; postId: string }) {
    const AddCommentMutation = operation(
      graphql(`
        mutation AddComment($input: AddCommentInput!) {
          addComment(input: $input) {
            commentEdge {
              node {
                ...Comment_IssueComment
              }
            }
          }
        }
      `),
    ).withMap((data) => {
      return {
        comment: $comment.unmask(data.addComment!.commentEdge!.node!),
      };
    });

    return this.graphql(AddCommentMutation).execute({
      input: { body: props.body, subjectId: props.postId },
    });
  }

  createLabel = createLabel.bind(this);
  createPost = createPost.bind(this);
  createRepository = createRepository.bind(this);
  deleteLabel = deleteLabel.bind(this);
  findPost = findPost.bind(this);
  findPosts = findPosts.bind(this);
  getComments = getComments.bind(this);
  getLabels = getLabels.bind(this);
  getPinnedPosts = getPinnedPosts.bind(this);
  getPost = getPost.bind(this);
  getRateLimit = getRateLimit.bind(this);
  getMe = getMe.bind(this);
  getRepository = getRepository.bind(this);
}
