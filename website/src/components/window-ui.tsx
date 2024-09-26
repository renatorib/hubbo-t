import { cn } from "~/lib/css";

export function WindowUI(props: { children?: React.ReactNode; right?: React.ReactNode; url?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border shadow-lg w-fit h-fit",
        props.dark ? "bg-zinc-800 border-zinc-950" : "bg-white border-zinc-300",
      )}
    >
      <div
        className={cn(
          "relative px-6 h-12 flex items-center justify-between border-b",
          props.dark ? "border-zinc-950" : "border-zinc-200 ",
        )}
      >
        <svg width="52" height="12" viewBox="0 0 52 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="5.75" fill="#ED6A5E" stroke="#CF594E" strokeWidth="0.5"></circle>
          <circle cx="26" cy="6" r="5.75" fill="#F4BD50" stroke="#D79F3E" strokeWidth="0.5"></circle>
          <circle cx="46" cy="6" r="5.75" fill="#61C355" stroke="#52A63D" strokeWidth="0.5"></circle>
        </svg>

        {props.url && (
          <div
            className={cn(
              "absolute left-[50%] -translate-x-[50%]",
              "text-xs  rounded px-2 py-1 w-full max-w-[400px] text-center text-zinc-900 truncate",
              props.dark ? "bg-zinc-700 text-zinc-100" : "bg-zinc-100 text-zinc-900",
            )}
          >
            {props.url}
          </div>
        )}

        <div>{props.right}</div>
      </div>

      <div>{props.children}</div>
    </div>
  );
}
