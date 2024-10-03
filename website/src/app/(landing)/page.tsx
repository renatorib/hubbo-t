import Image from "next/image";

import exampleIssue from "~/assets/example_issue.jpg";
import examplePost from "~/assets/example_post.jpg";

import { WindowSplit } from "~/components/window-split";
import { WindowUI } from "~/components/window-ui";
import { cn } from "~/lib/css";

export default function Home() {
  return (
    <div className="px-2">
      <div className="py-16 md:py-36 flex flex-col gap-14 md:gap-24">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl md:text-7xl text-stone-800">
            Your blog. <strong className="text-black">Instantly.</strong>
          </h1>
          <p className="text-center text-stone-500 text-xl md:text-3xl">
            Powered by <u className="decoration-wavy decoration-pink-500">github issues</u>.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="p-1 w-fit rounded-[18px] mx-auto bg-stone-700 shadow-xl shadow-zinc-500/60">
            <div
              className="p-0.5 w-fit rounded-[14px] mx-auto animate-angle-spin bg-stone-900 to-pink-500 shadow-xl shadow-pink-500/20"
              style={{
                backgroundImage: `conic-gradient(from var(--angle) at 50% 50%, var(--tw-gradient-from, transparent), var(--tw-gradient-to, #000000) 14%, var(--tw-gradient-from, transparent) 17%)`,
              }}
            >
              <div
                className={cn(
                  "rounded-[12px] p-4 md:px-8 md:py-6 w-fit text-xl md:text-2xl font-mono text-stone-100 bg-gradient-to-b from-stone-950 to-stone-800",
                )}
              >
                <span className="select-none text-pink-500">$ </span>
                <span>npx create-hubbo</span>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-zinc-400">
            <div>2 minutes is enough for setup</div>
            <strong className="text-lime-600">free</strong> and{" "}
            <a className="font-bold text-sky-500 hover:underline" href="https://github.com/renatorib/hubbo">
              open source
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <WindowSplit
          left={
            <WindowUI url="github.com/renatorib/posts/issues" dark={true}>
              <Image draggable={false} src={exampleIssue} alt="" />
            </WindowUI>
          }
          right={
            <WindowUI url="rena.to">
              <Image src={examplePost} alt="" />
            </WindowUI>
          }
        />
      </div>
    </div>
  );
}
