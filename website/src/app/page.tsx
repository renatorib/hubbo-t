import Image from "next/image";
import blobs from "~/assets/blobs.png";
import hubbo from "~/assets/hubbo.png";

import exampleIssue from "~/assets/example_issue.jpg";
import examplePost from "~/assets/example_post.jpg";

import { WindowSplit } from "~/components/window-split";
import { WindowUI } from "~/components/window-ui";
import { cn } from "~/lib/css";

export default function Home() {
  return (
    <div
      className="min-h-[100vh] text-stone-700"
      style={{
        background: `linear-gradient(to bottom, #ffffff00, white 500px), url(${blobs.src}) repeat;`,
      }}
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="md:p-2">
          <header className="md:rounded-full bg-white shadow flex flex-col justify-between md:flex-row md:items-center overflow-hidden">
            <div className="p-4 md:px-12 md:py-6">
              <Image src={hubbo} className="" alt="" />
            </div>
            <div className="flex md:items-center gap-4 md:gap-8 text-sm md:text-xl border-t md:border-0 px-4 py-2 md:px-12 md:py-6">
              <a href="/docs">Docs</a>
              <a href="/templates">Templates</a>
              <a href="https://github.com/renatorib/hubbo">Github</a>
            </div>
          </header>
        </div>

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
                      "rounded-[12px] p-4 md:px-8 md:py-6 text-stone-100 w-fit text-xl md:text-2xl font-mono bg-gradient-to-b from-stone-950 to-stone-800",
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
      </div>
    </div>
  );
}
