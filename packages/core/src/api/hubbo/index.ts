import { IsEmptyObject, DeepFlatten } from "../lib/types";
import { asNode, graphql, operation, OperationString } from "../lib/graphql";
import { GithubGraphQLFormattedError, HubboError, ensureHubboError } from "../lib/error";

import { frontmatter } from "../lib/frontmatter";
import { buildQuery, QueryParams } from "../lib/query";
import { buildPager, PagerParams } from "../lib/pager";

import { $author, $comment, $label, $post, Post } from "../types";

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
   * Configuration for SEO
   */
  seo?: {
    siteName?: string;
    locale?: string;

    /**
     * How to determine post's ogImage.
     * @default "meta"
     */
    ogImage?: "meta" | "generated";

    /**
     * What post property is used to use as og image.
     * Only applied when ogImage = "meta"
     * @default "cover"
     */
    ogImageMetaProperty?: string;

    /**
     * Path to the og image generator endpoint
     * @default "/ogi"
     */
    ogImageGeneratedPath?: string;
  };
  /**
   * Optional configuration
   */
  config?: {
    /**
     * Base URL
     */
    baseUrl?: string;
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
    /**
     * Permalink builder
     */
    permalinkPath?: (post: Post) => string;
    /**
     * Permalink builder
     */
    permalinkSlug?: (post: Post) => string;
    /**
     * Get post query from slug
     */
    postFromSlug?: (slug: string) => { number: number } | { id: string };
  };
};

export class Hubbo {
  repo: { owner: string; name: string; fullName: string; id?: string };
  config: HubboOptions["config"];

  constructor(public options: HubboOptions) {
    const [owner, name] = options.repo.split("/");
    this.repo = { owner, name, fullName: options.repo, id: undefined };
    this.config = options?.config;
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

  getPermalinkPath(post: Post) {
    return this.options.config?.permalinkPath
      ? this.options.config?.permalinkPath(post)
      : post.tags.find((tag) => tag.prefix === "type")?.name || "post";
  }

  getPermalinkSlug(post: Post) {
    return this.options.config?.permalinkSlug
      ? this.options.config?.permalinkSlug(post)
      : post.meta.slug
        ? `${post.number}-${post.meta.slug}`
        : String(post.number);
  }

  getPermalink(post: Post) {
    const ensureInitialSlash = (str: string) => (str.startsWith("/") ? str : "/" + str);
    return ensureInitialSlash(this.getPermalinkPath(post)) + ensureInitialSlash(this.getPermalinkSlug(post));
  }

  async getRepoId() {
    if (!this.repo.id) {
      this.repo.id = (await this.getRepository()).id;
    }
    return this.repo.id;
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

  async createLabel(props: { color: string; description?: string; name: string }) {
    if (!this.repo.id) {
      await this.getRepository();
    }

    return this.graphql(
      operation(
        graphql(`
          mutation CreateLabel($input: CreateLabelInput!) {
            createLabel(input: $input) {
              label {
                ...Label_Label
              }
            }
          }
        `),
      ).withMap((data) => {
        return $label.unmask(data.createLabel!.label!);
      }),
    ).execute({
      input: {
        ...props,
        repositoryId: this.repo.id!,
      },
    });
  }

  async createPost(props: {
    title: string;
    body: string;
    meta?: { [key: string]: string | number };
    labelIds?: string[];
    coauthorIds?: string[];
  }) {
    const { body, meta, coauthorIds, ...rest } = props;

    return this.graphql(
      operation(
        graphql(`
          mutation CreatePost($input: CreateIssueInput!) {
            createIssue(input: $input) {
              issue {
                ...Post_Issue
              }
            }
          }
        `),
      ).withMap((data) => {
        return $post.unmask(data.createIssue!.issue!);
      }),
    ).execute({
      input: {
        body: frontmatter.stringify({
          data: props.meta ?? {},
          content: props.body ?? "",
        }),
        assigneeIds: coauthorIds,
        repositoryId: await this.getRepoId(),
        ...rest,
      },
    });
  }

  async createRepository(props?: { description?: string; homepageUrl?: string }) {
    type Result = {
      node_id: string;
      html_url: string;
    };

    const result = await this.rest<Result>("POST /user/repos", {
      body: JSON.stringify({
        name: this.repo.name,
        description: props?.description,
        homepage: props?.homepageUrl,
        auto_init: true,
      }),
    });

    if (!result.ok) {
      throw new HubboError(result.response);
    }

    this.repo.id = result.data.node_id;

    return {
      id: result.data.node_id,
      url: result.data.html_url,
    };
  }

  async deleteLabel(id: string) {
    return this.graphql(
      operation(
        graphql(`
          mutation DeleteLabel($id: ID!) {
            deleteLabel(input: { id: $id }) {
              __typename
            }
          }
        `),
      ).withMap(() => true),
    ).execute({ id });
  }

  async findPost(props?: { query?: QueryParams }) {
    return this.graphql(
      operation(
        graphql(`
          query FindPost($query: String!) {
            search(first: 1, type: ISSUE, query: $query) {
              nodes {
                ... on Issue {
                  ...Post_Issue
                }
              }
            }
          }
        `),
      ).withMap((data) => {
        return data.search.nodes?.[0] ? $post.unmask(asNode(data.search.nodes[0], "Issue")) : null;
      }),
    ).execute({
      query: buildQuery.call(this, props?.query),
    });
  }

  async findPosts(props?: QueryParams & PagerParams) {
    const args = {
      query: buildQuery.call(this, props),
      ...buildPager(props, 10),
    };
    return this.graphql(
      operation(
        graphql(`
          query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {
            search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {
              issueCount
              pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
              }
              edges {
                cursor
                node {
                  ...Post_Issue
                }
              }
            }
          }
        `),
      ).withMap((data) => {
        const edges = (data.search.edges ?? [])
          .filter((edge) => edge != null)
          .filter((edge) => edge.node != null)
          .map((edge) => ({
            cursor: edge.cursor,
            post: $post.unmask(asNode(edge.node!, "Issue")),
          }));

        return {
          totalCount: data.search.issueCount,
          pageInfo: data.search.pageInfo,
          posts: edges.map((edge) => edge.post),
          edges,
        };
      }),
    ).execute(args);
  }

  async getComments(props: ({ postNumber: number } & PagerParams) | ({ postId: string } & PagerParams)) {
    const common = { ...this.repo, ...buildPager(props) };

    if ("postNumber" in props) {
      return this.graphql(
        operation(
          graphql(`
            query getCommentsByPostNumber(
              $owner: String!
              $name: String!
              $number: Int!
              $first: Int
              $last: Int
              $before: String
              $after: String
            ) {
              repository(owner: $owner, name: $name) {
                issue(number: $number) {
                  number
                  comments(first: $first, last: $last, before: $before, after: $after) {
                    totalCount
                    pageInfo {
                      endCursor
                      startCursor
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      cursor
                      node {
                        ...Comment_IssueComment
                      }
                    }
                  }
                }
              }
            }
          `),
        ).withMap((data) => {
          const issue = data.repository?.issue;

          if (!issue) return {};

          return {
            totalCount: issue.comments.totalCount,
            pageInfo: issue.comments.pageInfo,
            edges: issue.comments.edges
              ?.filter((e) => e != null)
              .map((edge) => {
                return {
                  cursor: edge.cursor,
                  comment: $comment.unmask(edge.node),
                };
              }),
          };
        }),
      ).execute({ ...common, number: props.postNumber });
    }

    return this.graphql(
      operation(
        graphql(`
          query getCommentsByPostId(
            $owner: String!
            $name: String!
            $id: ID!
            $first: Int
            $last: Int
            $before: String
            $after: String
          ) {
            node(id: $id) {
              ... on Issue {
                id
                number
                comments(first: $first, last: $last, before: $before, after: $after) {
                  totalCount
                  pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    cursor
                    node {
                      ...Comment_IssueComment
                    }
                  }
                }
              }
            }
          }
        `),
      ).withMap((data) => {
        const issue = data.node;

        if (!issue || issue.__typename !== "Issue") return {};

        return {
          totalCount: issue.comments.totalCount,
          pageInfo: issue.comments.pageInfo,
          edges: issue.comments.edges
            ?.filter((e) => e != null)
            .map((edge) => {
              return {
                cursor: edge.cursor,
                comment: $comment.unmask(edge.node),
              };
            }),
        };
      }),
    ).execute({ ...common, id: props.postId });
  }

  async getLabels(
    props?: {
      search?: string;
    } & PagerParams,
  ) {
    return this.graphql(
      operation(
        graphql(`
          query GetLabels(
            $query: String
            $name: String!
            $owner: String!
            $first: Int
            $last: Int
            $before: String
            $after: String
          ) {
            repository(name: $name, owner: $owner) {
              labels(query: $query, first: $first, last: $last, before: $before, after: $after) {
                totalCount
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  cursor
                  node {
                    ...Label_Label
                  }
                }
              }
            }
          }
        `),
      ).withMap((data) => {
        return {
          totalCount: data.repository?.labels?.totalCount ?? 0,
          pageInfo: data.repository?.labels?.pageInfo ?? {},
          edges: (data.repository?.labels?.edges ?? [])
            .filter((edge) => edge != null)
            .filter((edge) => edge.node != null)
            .map((edge) => {
              return {
                cursor: edge.cursor,
                label: $label.unmask(edge.node!),
              };
            }),
        };
      }),
    ).execute({
      query: props?.search,
      ...this.repo,
      ...buildPager(props, 100),
    });
  }

  async getPinnedPosts() {
    return this.graphql(
      operation(
        graphql(`
          query GetPinnedPosts($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              pinnedIssues(first: 3) {
                nodes {
                  pinnedBy {
                    ...Author_Actor
                  }
                  issue {
                    ...Post_Issue
                  }
                }
              }
            }
          }
        `),
      ).withMap((data) => {
        return {
          pinnedPosts: (data.repository?.pinnedIssues?.nodes ?? [])
            .filter((n) => n != null)
            .map((pinnedIssue) => ({
              pinnedBy: $author.unmask(pinnedIssue.pinnedBy!),
              post: $post.unmask(pinnedIssue.issue),
            })),
        };
      }),
    ).execute(this.repo);
  }

  async getPost(props: { number: number } | { id: string }) {
    if ("number" in props) {
      return this.graphql(
        operation(
          graphql(`
            query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {
              repository(owner: $owner, name: $name) {
                issue(number: $number) {
                  ...Post_Issue
                }
              }
            }
          `),
        ).withMap((data) => {
          return data.repository?.issue ? $post.unmask(data.repository.issue) : null;
        }),
      ).execute({ ...this.repo, number: props.number });
    }

    return this.graphql(
      operation(
        graphql(`
          query GetPostById($id: ID!) {
            node(id: $id) {
              ...Post_Issue
            }
          }
        `),
      ).withMap((data) => {
        const issue = data.node && data.node.__typename === "Issue" ? data.node : null;
        return issue ? $post.unmask(issue) : null;
      }),
    ).execute({ id: props.id });
  }

  async getPostFromSlug(slug: string) {
    const getPostProps = this.options.config?.postFromSlug?.(slug) || { number: parseInt(slug.split("-")[0], 10) };
    return this.getPost(getPostProps);
  }

  async getRateLimit() {
    return this.graphql(
      operation(
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
      ).withMap((data) => data.rateLimit),
    ).execute();
  }

  async getMe() {
    return this.graphql(
      operation(
        graphql(`
          query GetMe {
            viewer {
              id
              login
              email
            }
          }
        `),
      ).withMap((data) => data.viewer),
    ).execute();
  }

  async getRepository() {
    const result = await this.graphql(
      operation(
        graphql(`
          query GetRepository($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              id
              url
            }
          }
        `),
      ).withMap((data) => {
        return data.repository!;
      }),
    ).execute({ ...this.repo });
    this.repo.id = result.id;

    return result;
  }
}
