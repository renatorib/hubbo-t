import Image from "next/image";
import { MarkdownRender } from "../../../../../../packages/react/src/server";
import { notFound, redirect, RedirectType } from "next/navigation";
import { format } from "date-fns";
import { hubbo, config } from "~/hubbo";
import { CalendarIcon, TimeIcon } from "~/components/icons";

export const revalidate = 300;

export default async function Post({ params }: { params: Record<string, string> }) {
  const [number, ...slug] = params.slug.split("-");
  const post = await hubbo.getPost({ number: Number(number) });

  if (!post) {
    throw notFound();
  } else if (post && (post.meta.slug || "") !== slug.join("-")) {
    throw redirect(`/post/${number}-${post.meta.slug}`, RedirectType.replace);
  }

  return (
    <div className="flex flex-col gap-20 pt-20 w-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl font-bold text-center">{post.title}</h1>

        {post.meta.subtitle && (
          <div className="text-center text-2xl text-slate-600 dark:text-zinc-400">{post.meta.subtitle}</div>
        )}

        {post.author && (
          <div className="flex items-center justify-center gap-6">
            {config.post.showAuthor && (
              <a
                href={`/author/${post.author.login}`}
                className="text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 text-sm flex items-center gap-2"
              >
                <Image src={post.author.avatarUrl} alt="" width={16} height={16} className="rounded-full" />
                <span>{post.author.name ?? post.author.login}</span>
              </a>
            )}
            <span className="text-slate-500 dark:text-zinc-500 text-sm inline-flex items-center gap-1">
              <CalendarIcon /> {format(post.meta.realCreatedAt || post.createdAt, "MMM dd, yyyy")}
            </span>
            <span className="text-slate-500 dark:text-zinc-500 text-sm inline-flex items-center gap-1">
              <TimeIcon /> {post.estimatedReadingTime} mins read
            </span>
          </div>
        )}
      </div>

      {post.meta.cover && (
        <div className="relative h-[700px]">
          <Image src={post.meta.cover} fill={true} alt="" className="object-cover rounded-xl" />
        </div>
      )}

      <div className="flex justify-center">
        <div className="prose lg:prose-xl dark:prose-invert dark:prose-zinc lg:max-w-3xl w-full">
          <MarkdownRender content={post.body} />
        </div>
      </div>
    </div>
  );
}
