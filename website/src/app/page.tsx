import Image from "next/image";
import blobs from "~/assets/blobs.png";
import hubbo from "~/assets/hubbo.png";

import exampleIssue from "~/assets/example_issue.jpg";
import examplePost from "~/assets/example_post.jpg";

import { WindowSplit } from "~/components/window-split";
import { WindowUI } from "~/components/window-ui";

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
          <header className="md:rounded-full bg-white shadow px-12 py-6 flex flex-col gap-6 md:flex-row justify-between items-center">
            <div>
              <Image src={hubbo} className="" alt="" />
            </div>
            <div className="flex md:items-center gap-4 md:gap-8 md:text-xl">
              <a href="/docs">Docs</a>
              <a href="/templates">Templates</a>
              <a href="https://github.com/renatorib/hubbo">Github</a>
            </div>
          </header>
        </div>

        <div className="px-2">
          <div className="py-24 md:py-36 flex flex-col gap-24">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-center text-5xl md:text-7xl text-stone-800">
                Your blog. <strong className="text-black">Instantly.</strong>
              </h1>
              <p className="text-center text-stone-500 text-xl md:text-3xl">
                Powered by <u className="decoration-wavy decoration-pink-400">github issues</u>.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-4 md:px-8 md:py-6 text-white w-fit mx-auto text-xl md:text-2xl font-mono bg-gradient-to-b from-stone-950 to-stone-950/90 ring-4 ring-stone-950/20 border-4 border-stone-950/60">
                <span className="select-none text-pink-400">$ </span>
                <span>npx create-hubbo</span>
              </div>
              <div className="text-center text-sm md:text-base">
                <div>2 minutes is enough</div>
                <strong className="text-lime-700">free</strong> and{" "}
                <a className="font-bold text-sky-600 hover:underline" href="https://github.com/renatorib/hubbo">
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
