import { ChevronRightIcon } from "@hubbo/react/icons";
import { PostCard } from "~/components/post-card";
import { hubbo } from "~/hubbo";

export const revalidate = 300;

export default async function Home() {
  const [{ posts }, { posts: thoughts }] = await Promise.all([
    hubbo.findPosts({ label: "type:post" }),
    hubbo.findPosts({ label: "type:thought" }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-2">
      <div className="my-8 prose dark:prose-invert dark:prose-zinc">
        <h1 className="!text-3xl">Hey, I{"'"}m Clara</h1>
        <p>A minimalist hubbo template.</p>
        <p>
          Here you can put a summary of your blog, a personal description with experiences, achievements, work done, or
          anything else that relates to the purpose of your blog.
        </p>
        <p>
          You can also check other <a href="https://hubbo.dev/templates">templates</a>, read hubbo{" "}
          <a href="https://hubbo.dev/docs">docs</a>, checkout hubbo{" "}
          <a href="https://github.com/renatorib/hubbo">source code</a>, or join our{" "}
          <a href="https://discord.gg/NbxYqwK897">discord</a>.
        </p>
        <p>
          Check our{" "}
          <a href="/blog" className="inline-flex gap-1 items-center">
            blog posts <ChevronRightIcon className="text-sm" />
          </a>
        </p>
      </div>

      <div className="my-6 border-t border-zinc-200 dark:border-zinc-900" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-2">
        <div className="flex-[5] flex flex-col gap-4">
          <h2 className="text-sm uppercase text-zinc-400 dark:text-zinc-700 tracking-wider">Posts</h2>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex-[3] flex flex-col gap-4">
          <h2 className="text-sm uppercase text-zinc-400 dark:text-zinc-700 tracking-wider">Thoughts</h2>
          {thoughts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
