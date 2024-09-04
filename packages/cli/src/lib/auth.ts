import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import open from "open";
import c from "picocolors";
import ora from "ora";

import { getUser } from "./api";
import { readConfig, saveConfig } from "./config";
import { anyKey } from "./prompts";

export const authenticate = async () => {
  const config = await readConfig();

  if (config.token) {
    const user = await getUser(config.token);
    if (!user.ok) {
      delete config.token;
      saveConfig(config);
    } else {
      return { token: config.token!, ...user.data };
    }
  }

  console.log(c.bold(c.yellow("You must authenticate first.")));
  return await login();
};

export const logout = async () => {
  // TODO: revoke token access by api
  const config = await readConfig();
  delete config.token;
  await saveConfig(config);
};

export const login = async () => {
  const user = await openOAuthDeviceFlow();
  const config = await readConfig();
  config.token = user.token;
  await saveConfig(config);
  return user;
};

const openOAuthDeviceFlow = async () => {
  const loading = ora("Generating login code").start();

  const validate = createOAuthDeviceAuth({
    clientId: "Ov23liqDLWiCTQJf6B2i",
    scopes: ["repo", "user"],
    onVerification: async (verification) => {
      loading.succeed(`Paste the code ${c.bold(c.blue(verification.user_code))} on github login`);
      await anyKey("Press any key to continue to GitHub website...");
      await open(verification.verification_uri);
      loading.start(`Waiting verification for login code ${c.bold(c.blue(verification.user_code))}`);
    },
  });

  const authentication = await validate({ type: "oauth" });
  loading.succeed("Authenticated!");
  const user = await getUser(authentication.token);
  if (!user.ok) throw new Error(user.response.statusText);

  return { token: authentication.token, ...user.data };
};

/*

function waitFor<T>(
  subscribe: (fn: (data: T | Error) => any) => void | EventEmitter | (() => any),
  timeout = 5 * 1000,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error("waitFor timeout")), timeout);
    const unsubscribe = subscribe(function handleEvent(eventData: T | Error) {
      eventData instanceof Error ? reject(eventData) : resolve(eventData);
      clearTimeout(timeoutId);
      if (!(unsubscribe instanceof EventEmitter)) {
        unsubscribe?.();
      }
    });
  });
}

const openOAuthFlow = async () => {
  type EventMap = { auth_params: [URLSearchParams] };
  const eventName = "auth_params";
  const emitter = new EventEmitter<EventMap>();

  const server = createServer((req, res) => {
    if (req.url?.startsWith(callbackUrl)) {
      emitter.emit(eventName, new URL(req.url).searchParams);
      res.end("You can close this browser now.");
      res.socket?.end();
      res.socket?.destroy();
    } else {
      res.end("Unsupported");
    }
  }).listen(callbackServerPort);

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", "Ov23liqDLWiCTQJf6B2i");
  authUrl.searchParams.set("state", JSON.stringify({ loopback: callbackUrl }));
  authUrl.searchParams.set("scope", "repo");

  await open(authUrl.toString());

  const params = await waitFor<URLSearchParams>(
    (handle) => emitter.once(eventName, handle),
    60 * 1000,
  );

  await new Promise((res) => server.close(res));

  console.log(params);
  console.log(params.get("token"));

  return params.get("token") as string;
}; */
