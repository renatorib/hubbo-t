import Image from "next/image";
import blobs from "~/assets/blobs.png";
import example from "~/assets/example.png";
import hubbo from "~/assets/hubbo.png";

export default function Home() {
  return (
    <div
      className="min-h-[100vh] py-8 text-stone-700"
      style={{
        background: `linear-gradient(to bottom, #ffffff00, white 500px), url(${blobs.src}) repeat;`,
      }}
    >
      <div className="mx-auto max-w-screen-xl px-2">
        <header className="rounded-full bg-white shadow px-12 py-6 flex justify-between items-center">
          <div>
            <Image src={hubbo} alt="" />
          </div>
          <div className="flex items-center gap-8 text-xl">
            <a href="/docs">Docs</a>
            <a href="/templates">Templates</a>
            <a href="https://github.com/renatorib/hubbo">Github</a>
          </div>
        </header>
        <div className="py-36 flex flex-col gap-24">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-7xl text-stone-800">
              Your blog. <strong className="text-black">Instantly.</strong>
            </h1>
            <p className="text-stone-500 text-3xl">
              Powered by <u className="decoration-wavy decoration-pink-400">github issues</u>.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl px-8 py-6 text-white w-fit mx-auto text-2xl font-mono bg-gradient-to-b from-stone-950 to-stone-950/90 ring-4 ring-stone-950/20 border-4 border-stone-950/60">
              <span className="select-none text-pink-400">$ </span>
              <span>npx create-hubbo</span>
            </div>
            <div className="text-center">
              <div>2 minutes is enough</div>
              <strong className="text-lime-700">free</strong> and{" "}
              <a className="font-bold text-sky-600 hover:underline" href="https://github.com/renatorib/hubbo">
                open source
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Image src={example} alt="" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
