import fs from "node:fs";
import satori from "satori";

const satoriOptions = {
  width: 800,
  height: 400,
  fonts: [
    {
      name: "Inter",
      data: fs.readFileSync("node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"),
      style: "normal",
      weight: 400,
    } as const,
    {
      name: "Inter",
      data: fs.readFileSync("node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"),
      style: "normal",
      weight: 700,
    } as const,
  ],
};

export async function serveImage(hash: string, init?: ResponseInit) {
  let props: {
    title?: string;
    subtitle?: string;
    cover?: string;
  } = {};

  try {
    props = JSON.parse(Buffer.from(hash, "base64url").toString());
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }

  const svg = await satori(
    <div
      style={{
        fontFamily: "Inter",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="50" height="50" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" rx="25" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M150.5 272.11C217.663 272.11 272.11 217.663 272.11 150.5C272.11 83.3369 217.663 28.8905 150.5 28.8905C83.3369 28.8905 28.8905 83.3369 28.8905 150.5C28.8905 217.663 83.3369 272.11 150.5 272.11ZM150.5 283C223.678 283 283 223.678 283 150.5C283 77.3223 223.678 18 150.5 18C77.3223 18 18 77.3223 18 150.5C18 223.678 77.3223 283 150.5 283Z"
          fill="#EE45C4"
        />
        <circle cx="150.5" cy="150.5" r="34.0713" fill="#EE45C4" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#000000" }}>{props.title}</div>
        <div style={{ fontSize: 18, color: "#555555" }}>{props.subtitle}</div>
      </div>
    </div>,
    satoriOptions,
  );

  return new Response(svg, {
    status: 200,
    ...init,
    headers: {
      "Cache-Control": "max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
      ...init?.headers,
    },
  });
}
