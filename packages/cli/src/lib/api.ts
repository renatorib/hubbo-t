const API_URL = "https://api.github.com";

type Method = "GET" | "POST" | "PUT";
type Endpoint = `${Method} /${string}`;

async function gh<T>(endpoint: Endpoint, init?: RequestInit & { token?: string }) {
  const [method, path] = endpoint.split(" ");
  const token = init?.token;
  delete init?.token;
  return fetch(API_URL + path, {
    method,
    ...init,
    headers: {
      Accept: "Accept: application/vnd.github+json",
      ...(method === "PUT" && { "Content-Length": "0" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...init?.headers,
    },
  }).then(async (response) => {
    const data = await response.json().catch(() => response.text());
    if (!response.ok) return { ok: false as const, response };
    return { ok: true as const, response, data: data as T };
  });
}

export const getUser = async (token: string) => {
  type User = { name: string; login: string };
  return gh<User>("GET /user", { token });
};

export const addStar = async (token: string, repo: string) => {
  const codes = {
    "204": "STARRED",
    "304": "ALREADY_STARRED",
    "401": "UNAUTHENTICATED",
    "403": "FORBIDDEN", // Repo is private?
    "404": "NOT_FOUND",
  } as const;

  return gh(`PUT /user/starred/${repo}`, { token }).then((result) => {
    const status = String(result.response.status);
    return { ...result, code: status in codes ? codes[status as keyof typeof codes] : ("UNKNOWN" as const) };
  });
};

export const checkStar = async (token: string, repo: string) => {
  const codes = {
    "204": "STARRED",
    "304": "NOT_MODIFIED",
    "401": "UNAUTHENTICATED",
    "403": "FORBIDDEN",
    "404": "NOT_STARRED",
  } as const;

  return gh(`GET /user/starred/${repo}`, { token }).then((result) => {
    const status = String(result.response.status);
    return { ...result, code: status in codes ? codes[status as keyof typeof codes] : ("UNKNOWN" as const) };
  });
};
