import { ChevronRightIcon } from "~/components/icons";

export const revalidate = 300;

export default async function Home() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="my-8 prose lg:prose-xl dark:prose-invert dark:prose-zinc">
        <h1 className="!text-3xl">Clara</h1>
        <p>Hey, I am Clara, a minimalist hubbo template.</p>
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
    </div>
  );
}
