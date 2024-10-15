/* eslint-disable */
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n    mutation AddComment($input: AddCommentInput!) {\n      addComment(input: $input) {\n        commentEdge {\n          node {\n            ...Comment_IssueComment\n          }\n        }\n      }\n    }\n  ":
    types.AddCommentDocument,
  "\n    mutation CreateLabel($input: CreateLabelInput!) {\n      createLabel(input: $input) {\n        label {\n          ...Label_Label\n        }\n      }\n    }\n  ":
    types.CreateLabelDocument,
  "\n    mutation CreatePost($input: CreateIssueInput!) {\n      createIssue(input: $input) {\n        issue {\n          ...Post_Issue\n        }\n      }\n    }\n  ":
    types.CreatePostDocument,
  "\n    mutation DeleteLabel($id: ID!) {\n      deleteLabel(input: { id: $id }) {\n        __typename\n      }\n    }\n  ":
    types.DeleteLabelDocument,
  "\n    query FindPost($query: String!) {\n      search(first: 1, type: ISSUE, query: $query) {\n        nodes {\n          ... on Issue {\n            ...Post_Issue\n          }\n        }\n      }\n    }\n  ":
    types.FindPostDocument,
  "\n    query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {\n      search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {\n        issueCount\n        pageInfo {\n          endCursor\n          startCursor\n          hasNextPage\n          hasPreviousPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post_Issue\n          }\n        }\n      }\n    }\n  ":
    types.FindPostsDocument,
  "\n    query getCommentsByPostNumber(\n      $owner: String!\n      $name: String!\n      $number: Int!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      repository(owner: $owner, name: $name) {\n        issue(number: $number) {\n          number\n          comments(first: $first, last: $last, before: $before, after: $after) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n              hasNextPage\n              hasPreviousPage\n            }\n            edges {\n              cursor\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetCommentsByPostNumberDocument,
  "\n    query getCommentsByPostId(\n      $owner: String!\n      $name: String!\n      $id: ID!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      node(id: $id) {\n        ... on Issue {\n          id\n          number\n          comments(first: $first, last: $last, before: $before, after: $after) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n              hasNextPage\n              hasPreviousPage\n            }\n            edges {\n              cursor\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetCommentsByPostIdDocument,
  "\n    query GetLabels(\n      $query: String\n      $name: String!\n      $owner: String!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      repository(name: $name, owner: $owner) {\n        labels(query: $query, first: $first, last: $last, before: $before, after: $after) {\n          totalCount\n          pageInfo {\n            endCursor\n            startCursor\n            hasNextPage\n            hasPreviousPage\n          }\n          edges {\n            cursor\n            node {\n              ...Label_Label\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetLabelsDocument,
  "\n    query GetMe {\n      viewer {\n        id\n        login\n        email\n      }\n    }\n  ":
    types.GetMeDocument,
  "\n    query GetPinnedPosts($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        pinnedIssues(first: 3) {\n          nodes {\n            pinnedBy {\n              ...Author_Actor\n            }\n            issue {\n              ...Post_Issue\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetPinnedPostsDocument,
  "\n    query GetPostById($id: ID!) {\n      node(id: $id) {\n        ...Post_Issue\n      }\n    }\n  ":
    types.GetPostByIdDocument,
  "\n    query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {\n      repository(owner: $owner, name: $name) {\n        issue(number: $number) {\n          ...Post_Issue\n        }\n      }\n    }\n  ":
    types.GetPostByNumberDocument,
  "\n    query GetRateLimit {\n      rateLimit {\n        limit\n        used\n        resetAt\n        remaining\n      }\n    }\n  ":
    types.GetRateLimitDocument,
  "\n    query GetRepository($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        id\n        url\n      }\n    }\n  ":
    types.GetRepositoryDocument,
  "\n        mutation AddComment($input: AddCommentInput!) {\n          addComment(input: $input) {\n            commentEdge {\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      ":
    types.AddCommentDocument,
  "\n          mutation CreateLabel($input: CreateLabelInput!) {\n            createLabel(input: $input) {\n              label {\n                ...Label_Label\n              }\n            }\n          }\n        ":
    types.CreateLabelDocument,
  "\n          mutation CreatePost($input: CreateIssueInput!) {\n            createIssue(input: $input) {\n              issue {\n                ...Post_Issue\n              }\n            }\n          }\n        ":
    types.CreatePostDocument,
  "\n          mutation DeleteLabel($id: ID!) {\n            deleteLabel(input: { id: $id }) {\n              __typename\n            }\n          }\n        ":
    types.DeleteLabelDocument,
  "\n          query FindPost($query: String!) {\n            search(first: 1, type: ISSUE, query: $query) {\n              nodes {\n                ... on Issue {\n                  ...Post_Issue\n                }\n              }\n            }\n          }\n        ":
    types.FindPostDocument,
  "\n          query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {\n            search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {\n              issueCount\n              pageInfo {\n                endCursor\n                startCursor\n                hasNextPage\n                hasPreviousPage\n              }\n              edges {\n                cursor\n                node {\n                  ...Post_Issue\n                }\n              }\n            }\n          }\n        ":
    types.FindPostsDocument,
  "\n            query getCommentsByPostNumber(\n              $owner: String!\n              $name: String!\n              $number: Int!\n              $first: Int\n              $last: Int\n              $before: String\n              $after: String\n            ) {\n              repository(owner: $owner, name: $name) {\n                issue(number: $number) {\n                  number\n                  comments(first: $first, last: $last, before: $before, after: $after) {\n                    totalCount\n                    pageInfo {\n                      endCursor\n                      startCursor\n                      hasNextPage\n                      hasPreviousPage\n                    }\n                    edges {\n                      cursor\n                      node {\n                        ...Comment_IssueComment\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          ":
    types.GetCommentsByPostNumberDocument,
  "\n          query getCommentsByPostId(\n            $owner: String!\n            $name: String!\n            $id: ID!\n            $first: Int\n            $last: Int\n            $before: String\n            $after: String\n          ) {\n            node(id: $id) {\n              ... on Issue {\n                id\n                number\n                comments(first: $first, last: $last, before: $before, after: $after) {\n                  totalCount\n                  pageInfo {\n                    endCursor\n                    startCursor\n                    hasNextPage\n                    hasPreviousPage\n                  }\n                  edges {\n                    cursor\n                    node {\n                      ...Comment_IssueComment\n                    }\n                  }\n                }\n              }\n            }\n          }\n        ":
    types.GetCommentsByPostIdDocument,
  "\n          query GetLabels(\n            $query: String\n            $name: String!\n            $owner: String!\n            $first: Int\n            $last: Int\n            $before: String\n            $after: String\n          ) {\n            repository(name: $name, owner: $owner) {\n              labels(query: $query, first: $first, last: $last, before: $before, after: $after) {\n                totalCount\n                pageInfo {\n                  endCursor\n                  startCursor\n                  hasNextPage\n                  hasPreviousPage\n                }\n                edges {\n                  cursor\n                  node {\n                    ...Label_Label\n                  }\n                }\n              }\n            }\n          }\n        ":
    types.GetLabelsDocument,
  "\n          query GetPinnedPosts($owner: String!, $name: String!) {\n            repository(owner: $owner, name: $name) {\n              pinnedIssues(first: 3) {\n                nodes {\n                  pinnedBy {\n                    ...Author_Actor\n                  }\n                  issue {\n                    ...Post_Issue\n                  }\n                }\n              }\n            }\n          }\n        ":
    types.GetPinnedPostsDocument,
  "\n            query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {\n              repository(owner: $owner, name: $name) {\n                issue(number: $number) {\n                  ...Post_Issue\n                }\n              }\n            }\n          ":
    types.GetPostByNumberDocument,
  "\n          query GetPostById($id: ID!) {\n            node(id: $id) {\n              ...Post_Issue\n            }\n          }\n        ":
    types.GetPostByIdDocument,
  "\n          query GetRateLimit {\n            rateLimit {\n              limit\n              used\n              resetAt\n              remaining\n            }\n          }\n        ":
    types.GetRateLimitDocument,
  "\n          query GetMe {\n            viewer {\n              id\n              login\n              email\n            }\n          }\n        ":
    types.GetMeDocument,
  "\n          query GetRepository($owner: String!, $name: String!) {\n            repository(owner: $owner, name: $name) {\n              id\n              url\n            }\n          }\n        ":
    types.GetRepositoryDocument,
  "\n    fragment Author_Actor on Actor {\n      __typename\n      ... on User {\n        avatarUrl\n        name\n        login\n        twitterUsername\n      }\n      ... on Organization {\n        avatarUrl\n        name\n        login\n        twitterUsername\n      }\n      ... on EnterpriseUserAccount {\n        avatarUrl\n        name\n        login\n      }\n      ... on Bot {\n        avatarUrl\n        login\n      }\n      ... on Mannequin {\n        avatarUrl\n        login\n      }\n    }\n  ":
    types.Author_ActorFragmentDoc,
  "\n    fragment Comment_IssueComment on IssueComment {\n      id\n      body\n      createdAt\n      lastEditedAt\n      isMinimized\n      minimizedReason\n      author {\n        ...Author_Actor\n      }\n      reactions {\n        totalCount\n      }\n      reactionGroups {\n        ...Reaction_ReactionGroup\n      }\n    }\n  ":
    types.Comment_IssueCommentFragmentDoc,
  "\n    fragment Label_Label on Label {\n      id\n      name\n      color\n      issues {\n        totalCount\n      }\n    }\n  ":
    types.Label_LabelFragmentDoc,
  "\n    fragment Post_Issue on Issue {\n      id\n      number\n      url\n      updatedAt\n      createdAt\n      title\n      body\n      author {\n        ...Author_Actor\n      }\n      coauthors: assignees(first: 10) {\n        nodes {\n          ...User_User\n        }\n      }\n      reactions: reactionGroups {\n        ...Reaction_ReactionGroup\n      }\n      labels(first: 100) {\n        nodes {\n          ...Label_Label\n        }\n      }\n      comments {\n        totalCount\n      }\n    }\n  ":
    types.Post_IssueFragmentDoc,
  "\n    fragment Reaction_ReactionGroup on ReactionGroup {\n      content\n      reactors {\n        totalCount\n      }\n    }\n  ":
    types.Reaction_ReactionGroupFragmentDoc,
  "\n    fragment User_User on User {\n      avatarUrl\n      name\n      login\n      twitterUsername\n    }\n  ":
    types.User_UserFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation AddComment($input: AddCommentInput!) {\n      addComment(input: $input) {\n        commentEdge {\n          node {\n            ...Comment_IssueComment\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").AddCommentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateLabel($input: CreateLabelInput!) {\n      createLabel(input: $input) {\n        label {\n          ...Label_Label\n        }\n      }\n    }\n  ",
): typeof import("./graphql").CreateLabelDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreatePost($input: CreateIssueInput!) {\n      createIssue(input: $input) {\n        issue {\n          ...Post_Issue\n        }\n      }\n    }\n  ",
): typeof import("./graphql").CreatePostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteLabel($id: ID!) {\n      deleteLabel(input: { id: $id }) {\n        __typename\n      }\n    }\n  ",
): typeof import("./graphql").DeleteLabelDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query FindPost($query: String!) {\n      search(first: 1, type: ISSUE, query: $query) {\n        nodes {\n          ... on Issue {\n            ...Post_Issue\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").FindPostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {\n      search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {\n        issueCount\n        pageInfo {\n          endCursor\n          startCursor\n          hasNextPage\n          hasPreviousPage\n        }\n        edges {\n          cursor\n          node {\n            ...Post_Issue\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").FindPostsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getCommentsByPostNumber(\n      $owner: String!\n      $name: String!\n      $number: Int!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      repository(owner: $owner, name: $name) {\n        issue(number: $number) {\n          number\n          comments(first: $first, last: $last, before: $before, after: $after) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n              hasNextPage\n              hasPreviousPage\n            }\n            edges {\n              cursor\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").GetCommentsByPostNumberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getCommentsByPostId(\n      $owner: String!\n      $name: String!\n      $id: ID!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      node(id: $id) {\n        ... on Issue {\n          id\n          number\n          comments(first: $first, last: $last, before: $before, after: $after) {\n            totalCount\n            pageInfo {\n              endCursor\n              startCursor\n              hasNextPage\n              hasPreviousPage\n            }\n            edges {\n              cursor\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").GetCommentsByPostIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetLabels(\n      $query: String\n      $name: String!\n      $owner: String!\n      $first: Int\n      $last: Int\n      $before: String\n      $after: String\n    ) {\n      repository(name: $name, owner: $owner) {\n        labels(query: $query, first: $first, last: $last, before: $before, after: $after) {\n          totalCount\n          pageInfo {\n            endCursor\n            startCursor\n            hasNextPage\n            hasPreviousPage\n          }\n          edges {\n            cursor\n            node {\n              ...Label_Label\n            }\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").GetLabelsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetMe {\n      viewer {\n        id\n        login\n        email\n      }\n    }\n  ",
): typeof import("./graphql").GetMeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetPinnedPosts($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        pinnedIssues(first: 3) {\n          nodes {\n            pinnedBy {\n              ...Author_Actor\n            }\n            issue {\n              ...Post_Issue\n            }\n          }\n        }\n      }\n    }\n  ",
): typeof import("./graphql").GetPinnedPostsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetPostById($id: ID!) {\n      node(id: $id) {\n        ...Post_Issue\n      }\n    }\n  ",
): typeof import("./graphql").GetPostByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {\n      repository(owner: $owner, name: $name) {\n        issue(number: $number) {\n          ...Post_Issue\n        }\n      }\n    }\n  ",
): typeof import("./graphql").GetPostByNumberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetRateLimit {\n      rateLimit {\n        limit\n        used\n        resetAt\n        remaining\n      }\n    }\n  ",
): typeof import("./graphql").GetRateLimitDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetRepository($owner: String!, $name: String!) {\n      repository(owner: $owner, name: $name) {\n        id\n        url\n      }\n    }\n  ",
): typeof import("./graphql").GetRepositoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation AddComment($input: AddCommentInput!) {\n          addComment(input: $input) {\n            commentEdge {\n              node {\n                ...Comment_IssueComment\n              }\n            }\n          }\n        }\n      ",
): typeof import("./graphql").AddCommentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          mutation CreateLabel($input: CreateLabelInput!) {\n            createLabel(input: $input) {\n              label {\n                ...Label_Label\n              }\n            }\n          }\n        ",
): typeof import("./graphql").CreateLabelDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          mutation CreatePost($input: CreateIssueInput!) {\n            createIssue(input: $input) {\n              issue {\n                ...Post_Issue\n              }\n            }\n          }\n        ",
): typeof import("./graphql").CreatePostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          mutation DeleteLabel($id: ID!) {\n            deleteLabel(input: { id: $id }) {\n              __typename\n            }\n          }\n        ",
): typeof import("./graphql").DeleteLabelDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query FindPost($query: String!) {\n            search(first: 1, type: ISSUE, query: $query) {\n              nodes {\n                ... on Issue {\n                  ...Post_Issue\n                }\n              }\n            }\n          }\n        ",
): typeof import("./graphql").FindPostDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query FindPosts($query: String!, $first: Int, $last: Int, $before: String, $after: String) {\n            search(query: $query, first: $first, last: $last, before: $before, after: $after, type: ISSUE) {\n              issueCount\n              pageInfo {\n                endCursor\n                startCursor\n                hasNextPage\n                hasPreviousPage\n              }\n              edges {\n                cursor\n                node {\n                  ...Post_Issue\n                }\n              }\n            }\n          }\n        ",
): typeof import("./graphql").FindPostsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n            query getCommentsByPostNumber(\n              $owner: String!\n              $name: String!\n              $number: Int!\n              $first: Int\n              $last: Int\n              $before: String\n              $after: String\n            ) {\n              repository(owner: $owner, name: $name) {\n                issue(number: $number) {\n                  number\n                  comments(first: $first, last: $last, before: $before, after: $after) {\n                    totalCount\n                    pageInfo {\n                      endCursor\n                      startCursor\n                      hasNextPage\n                      hasPreviousPage\n                    }\n                    edges {\n                      cursor\n                      node {\n                        ...Comment_IssueComment\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          ",
): typeof import("./graphql").GetCommentsByPostNumberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query getCommentsByPostId(\n            $owner: String!\n            $name: String!\n            $id: ID!\n            $first: Int\n            $last: Int\n            $before: String\n            $after: String\n          ) {\n            node(id: $id) {\n              ... on Issue {\n                id\n                number\n                comments(first: $first, last: $last, before: $before, after: $after) {\n                  totalCount\n                  pageInfo {\n                    endCursor\n                    startCursor\n                    hasNextPage\n                    hasPreviousPage\n                  }\n                  edges {\n                    cursor\n                    node {\n                      ...Comment_IssueComment\n                    }\n                  }\n                }\n              }\n            }\n          }\n        ",
): typeof import("./graphql").GetCommentsByPostIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetLabels(\n            $query: String\n            $name: String!\n            $owner: String!\n            $first: Int\n            $last: Int\n            $before: String\n            $after: String\n          ) {\n            repository(name: $name, owner: $owner) {\n              labels(query: $query, first: $first, last: $last, before: $before, after: $after) {\n                totalCount\n                pageInfo {\n                  endCursor\n                  startCursor\n                  hasNextPage\n                  hasPreviousPage\n                }\n                edges {\n                  cursor\n                  node {\n                    ...Label_Label\n                  }\n                }\n              }\n            }\n          }\n        ",
): typeof import("./graphql").GetLabelsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetPinnedPosts($owner: String!, $name: String!) {\n            repository(owner: $owner, name: $name) {\n              pinnedIssues(first: 3) {\n                nodes {\n                  pinnedBy {\n                    ...Author_Actor\n                  }\n                  issue {\n                    ...Post_Issue\n                  }\n                }\n              }\n            }\n          }\n        ",
): typeof import("./graphql").GetPinnedPostsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n            query GetPostByNumber($owner: String!, $name: String!, $number: Int!) {\n              repository(owner: $owner, name: $name) {\n                issue(number: $number) {\n                  ...Post_Issue\n                }\n              }\n            }\n          ",
): typeof import("./graphql").GetPostByNumberDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetPostById($id: ID!) {\n            node(id: $id) {\n              ...Post_Issue\n            }\n          }\n        ",
): typeof import("./graphql").GetPostByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetRateLimit {\n            rateLimit {\n              limit\n              used\n              resetAt\n              remaining\n            }\n          }\n        ",
): typeof import("./graphql").GetRateLimitDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetMe {\n            viewer {\n              id\n              login\n              email\n            }\n          }\n        ",
): typeof import("./graphql").GetMeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n          query GetRepository($owner: String!, $name: String!) {\n            repository(owner: $owner, name: $name) {\n              id\n              url\n            }\n          }\n        ",
): typeof import("./graphql").GetRepositoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment Author_Actor on Actor {\n      __typename\n      ... on User {\n        avatarUrl\n        name\n        login\n        twitterUsername\n      }\n      ... on Organization {\n        avatarUrl\n        name\n        login\n        twitterUsername\n      }\n      ... on EnterpriseUserAccount {\n        avatarUrl\n        name\n        login\n      }\n      ... on Bot {\n        avatarUrl\n        login\n      }\n      ... on Mannequin {\n        avatarUrl\n        login\n      }\n    }\n  ",
): typeof import("./graphql").Author_ActorFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment Comment_IssueComment on IssueComment {\n      id\n      body\n      createdAt\n      lastEditedAt\n      isMinimized\n      minimizedReason\n      author {\n        ...Author_Actor\n      }\n      reactions {\n        totalCount\n      }\n      reactionGroups {\n        ...Reaction_ReactionGroup\n      }\n    }\n  ",
): typeof import("./graphql").Comment_IssueCommentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment Label_Label on Label {\n      id\n      name\n      color\n      issues {\n        totalCount\n      }\n    }\n  ",
): typeof import("./graphql").Label_LabelFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment Post_Issue on Issue {\n      id\n      number\n      url\n      updatedAt\n      createdAt\n      title\n      body\n      author {\n        ...Author_Actor\n      }\n      coauthors: assignees(first: 10) {\n        nodes {\n          ...User_User\n        }\n      }\n      reactions: reactionGroups {\n        ...Reaction_ReactionGroup\n      }\n      labels(first: 100) {\n        nodes {\n          ...Label_Label\n        }\n      }\n      comments {\n        totalCount\n      }\n    }\n  ",
): typeof import("./graphql").Post_IssueFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment Reaction_ReactionGroup on ReactionGroup {\n      content\n      reactors {\n        totalCount\n      }\n    }\n  ",
): typeof import("./graphql").Reaction_ReactionGroupFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    fragment User_User on User {\n      avatarUrl\n      name\n      login\n      twitterUsername\n    }\n  ",
): typeof import("./graphql").User_UserFragmentDoc;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
