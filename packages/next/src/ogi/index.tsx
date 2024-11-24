import fs from "node:fs";
import satori, { SatoriOptions } from "satori";

const satoriOptions = {
  width: 1200,
  height: 627,
  fonts: [
    {
      name: "Inter",
      data: fs.readFileSync(new URL("./fonts/inter-latin-400-normal.woff", String(import.meta.url))),
      style: "normal",
      weight: 400,
    } as const,
    {
      name: "Inter",
      data: fs.readFileSync(new URL("./fonts/inter-latin-700-normal.woff", String(import.meta.url))),
      style: "normal",
      weight: 700,
    } as const,
  ],
};

export const hash = {
  stringify(props: Object) {
    return Buffer.from(JSON.stringify(props)).toString("base64url");
  },
  parse(hashString: string) {
    return JSON.parse(Buffer.from(hashString, "base64url").toString());
  },
};

export async function serveImage(
  hashString: string,
  props?: {
    init?: ResponseInit;
    satoriOptions?: Partial<SatoriOptions>;
    Component?: (props: any) => JSX.Element;
  },
) {
  try {
    const Component = props?.Component || Card;
    const svg = await satori(<Component {...(hash.parse(hashString) as any)} />, {
      ...satoriOptions,
      ...props?.satoriOptions,
      fonts: [...satoriOptions.fonts, ...(props?.satoriOptions?.fonts ?? [])],
    });

    return new Response(svg, {
      status: 200,
      ...props?.init,
      headers: {
        "Cache-Control": "max-age=31536000, immutable",
        "Content-Type": "image/svg+xml",
        ...props?.init?.headers,
      },
    });
  } catch (e) {
    return new Response("Not found", {
      status: 404,
    });
  }
}

export const Card = (props: {
  title: string;
  subtitle?: string;
  cover?: string;
  favicon?: string;
  url?: string;
  siteName?: string;
  authorPicture?: string;
  authorName?: string;
  authorLogin?: string;
  createdAt?: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        background: "black",
        height: "100vh",
        width: "100vw",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "40px",
        paddingBottom: "40px",
        position: "relative",
        fontFamily: "Inter",
      }}
    >
      {props.cover && (
        <img
          src={props.cover}
          width={1200}
          height={1200}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            transform: "scale(1.4)",
            zIndex: -2,
            opacity: 0.2,
            filter: "blur(40px)",
          }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", padding: "24px", width: "100%", height: "100%" }}>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            alignItems: "center",
            color: "rgb(156 163 175)",
            marginBottom: "40px",
            width: "100%",
            gap: "8px",
          }}
        >
          {props.favicon && <img style={{ marginRight: "16px", borderRadius: "6px" }} src={props.favicon} width={40} />}
          {props.url && (
            <div style={{ display: "flex" }}>
              <span style={{ color: "white", fontWeight: 700 }}>{props.url.split("/")[0]}</span>
              <span>/{props.url.split("/").slice(1).join("/")}</span>
            </div>
          )}
          {!props.url && !!props.siteName && (
            <span style={{ fontSize: "24px", color: "white", fontWeight: 700 }}>{props.siteName}</span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {props.cover && (
            <div style={{ display: "flex", position: "relative" }}>
              <img
                src={props.cover}
                width={350}
                height={350}
                style={{ borderRadius: "8px", zIndex: 10, opacity: 0.7 }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: "32px",
              width: "760px",
            }}
          >
            {props.title && (
              <h1
                style={{
                  display: "flex",
                  fontWeight: 700,
                  fontSize: "52px",
                  lineHeight: "60px",
                  color: "rgb(115,209,61)",
                  textAlign: "left",
                }}
              >
                {props.title}
              </h1>
            )}

            {props.subtitle && (
              <p
                style={{
                  fontSize: "32px",
                  lineHeight: "42px",
                  color: "rgb(140,140,154)",
                  textAlign: "left",
                }}
              >
                {props.subtitle}
              </p>
            )}

            <div style={{ display: "flex", alignItems: "center", textAlign: "left", width: "100%", marginTop: "32px" }}>
              {props.authorPicture && (
                <img
                  style={{ borderRadius: "999px", marginRight: "8px", flexShrink: 0 }}
                  src={`${props.authorPicture}&s=120`}
                  alt={props.authorName}
                  title={`${props.authorName} - @${props.authorLogin}`}
                  width={60}
                />
              )}

              {(props.authorName || props.createdAt) && (
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", color: "rgb(156 163 175)", fontSize: "20px" }}>
                    <strong>{props.authorName}</strong>
                  </div>
                  {props.createdAt && (
                    <div style={{ display: "flex", color: "rgb(107 114 128)", fontSize: "20px" }}>
                      <time dateTime={props.createdAt}>{props.createdAt}</time>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*

<div
      className="bg-sky-400"
      style={{
        fontFamily: "Inter",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
        background: "#eee",
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
    </div>

*/
