import { cn } from "~/lib/css";

const themes = {
  pink: {
    outer: "",
    inner: "to-pink-500 shadow-pink-500/20",
  },
  lime: {
    outer: "",
    inner: "to-lime-500 shadow-lime-500/20",
  },
};

export function GradientBorder(props: React.ComponentProps<"div"> & { radius?: number; theme?: keyof typeof themes }) {
  const t = themes[props.theme || "lime"];

  return (
    <div
      className={cn("p-1 w-fit mx-auto bg-stone-700 shadow-xl shadow-zinc-500/60", t.outer)}
      style={{ borderRadius: props.radius ? `${props.radius + 4}px` : "" }}
    >
      <div
        className={cn("p-0.5 w-fit mx-auto animate-angle-spin bg-stone-900 shadow-xl", t.inner)}
        style={{
          backgroundImage: `conic-gradient(from var(--angle) at 50% 50%, var(--tw-gradient-from, transparent), var(--tw-gradient-to, #000000) 14%, var(--tw-gradient-from, transparent) 17%)`,
          borderRadius: props.radius ? `${props.radius + 2}px` : "",
        }}
      >
        <div {...props} style={{ borderRadius: props.radius ? `${props.radius}px` : "", ...props.style }} />
      </div>
    </div>
  );
}
