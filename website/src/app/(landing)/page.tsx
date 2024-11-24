import Image, { StaticImageData } from "next/image";
import { RiExternalLinkLine } from "@remixicon/react";

import exampleIssue from "~/assets/example_issue.jpg";
import examplePost from "~/assets/example_post.jpg";

import { WindowSplit } from "~/components/window-split";
import { WindowUI } from "~/components/window-ui";
import { cn } from "~/lib/css";

import square from "~/assets/square-40.png";
import squareLight from "~/assets/square-5.png";

import featMarkdown from "~/assets/features/f-markdown.png";
import featTaxonomy from "~/assets/features/f-taxonomy.png";
import featCoauthor from "~/assets/features/f-coauthor.png";
import featImage from "~/assets/features/f-image.png";
import featComment from "~/assets/features/f-comment.png";
import featLike from "~/assets/features/f-like.png";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="py-16 md:py-36 flex flex-col gap-14 md:gap-24">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl md:text-7xl text-zinc-800">
            Your blog. <strong className="text-black">Instantly.</strong>
          </h1>
          <p className="text-center text-zinc-500 font-light text-xl md:text-3xl">
            Powered by <u className="decoration-wavy decoration-pink-500 decoration-from-font">github issues</u>.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="p-1 w-fit rounded-[8px] mx-auto bg-white shadow-xl shadow-zinc-300/20 border border-zinc-200">
            <div
              className="p-0.5 w-fit rounded-[6px] mx-auto animate-angle-spin bg-white to-black shadow-xl shadow-zinc-500/10"
              style={{
                backgroundImage: `conic-gradient(from var(--angle) at 50% 50%, var(--tw-gradient-from, transparent), var(--tw-gradient-to, #000000) 14%, var(--tw-gradient-from, transparent) 17%)`,
              }}
            >
              <div
                className={cn(
                  "rounded-[4px] p-4 md:px-8 md:py-4 w-fit text-xl md:text-2xl font-mono text-black bg-gradient-to-b from-zinc-100 to-white",
                )}
              >
                <span className="select-none text-pink-500">$ </span>
                <span>npx create-hubbo</span>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-zinc-400">
            <div>1 minute is enough for setup</div>
            <strong className="text-lime-600">free</strong> and{" "}
            <a
              className="font-bold text-sky-500 hover:underline inline-flex items-center gap-1"
              href="https://github.com/renatorib/hubbo"
            >
              open source <RiExternalLinkLine size="1em" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="px-2"
        style={{
          background: `linear-gradient(to bottom, #ffffff 30%, rgb(9 9 11) 30%), url(${square.src}) repeat`,
        }}
      >
        <div className="flex justify-center">
          <WindowSplit
            className="max-w-[700px]"
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

      <Features />
    </div>
  );
}

function Features() {
  return (
    <div className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-screen-lg px-2 py-24 md:py-36 flex flex-col gap-12">
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center">Why github issues?</h2>
          <p className="text-center text-zinc-400 md:text-xl">Everything you need to start blogging</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-zinc-200">
          <FeatureCard image={featMarkdown} title="Markdown with preview">
            Issues offers a built-in interactive editor where you can already preview your markdown styling on the fly
          </FeatureCard>
          <FeatureCard image={featTaxonomy} title="Taxonomy by labels">
            Taking advantage of labels we can create chains of categories, tags, and any state to your post
          </FeatureCard>
          <FeatureCard image={featCoauthor} title="Co-author by assigns">
            Issues have only one author, but with assignees we can associate co-authors to the post with no problem
          </FeatureCard>
          <FeatureCard image={featImage} title="Built-in image hosting">
            Github will host your post{"'"}s images completely for free, just paste your image and keep writing
          </FeatureCard>
          <FeatureCard image={featComment} title="Built-in comment section">
            Issue comments are comments on your post, it will just works as is
          </FeatureCard>
          <FeatureCard image={featLike} title="Built-in likes & reactions">
            Likes and other reactions your issue receives, will be the likes and reactions of your post
          </FeatureCard>
        </div>
      </div>
    </div>
  );
}

function FeatureCard(props: { image: StaticImageData; title: string; children?: React.ReactNode }) {
  return (
    <div className="group relative border border-zinc-900 bg-zinc-900/25 hover:bg-zinc-900/50 rounded overflow-hidden transition-colors">
      <div className="bg-zinc-950" style={{ backgroundImage: `url(${squareLight.src})`, backgroundSize: "25px 25px" }}>
        <Image
          className="opacity-75 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0"
          src={props.image}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-xl font-semibold text-white">{props.title}</h3>
        {props.children && <div className="text-zinc-500 text-sm">{props.children}</div>}
      </div>
    </div>
  );
}
