import Image from "next/image";
import { Post } from "@hubbo/core";
import { CalendarIcon, CommentIcon, ThumbsUpIcon, TimeIcon } from "@hubbo/react/icons";
import { format } from "date-fns/format";
import { config } from "~/hubbo";

export function PostCard({ post }: { post: Post }) {
  const link = `/post/${post.number}${post.meta.slug ? `-${post.meta.slug}` : ""}`;

  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-zinc-800">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-6" key={post.id}>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex gap-4">
              {config.postCard.showAuthor && (
                <a
                  href={`/author/${post.author.login}`}
                  className="text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-300 text-sm flex items-center gap-2"
                >
                  <Image src={post.author.avatarUrl} alt="" width={16} height={16} className="rounded-full" />
                  <span>{post.author.name ?? post.author.login}</span>
                </a>
              )}
              <span className="text-slate-500 dark:text-zinc-400 text-sm inline-flex items-center gap-1">
                <CalendarIcon /> {format(post.meta.realCreatedAt || post.createdAt, "MMM dd, yyyy")}
              </span>
              {config.postCard.showMinsRead && (
                <span className="text-slate-500 dark:text-zinc-400 text-sm inline-flex items-center gap-1">
                  <TimeIcon /> {post.estimatedReadingTime} mins read
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <a
                href={link}
                className="font-bold text-2xl text-slate-800 dark:text-white hover:dark:text-white hover:underline"
              >
                {post.title}
              </a>
              {config.postCard.showSubtitle && (
                <div className="text-slate-500 dark:text-zinc-600 text-lg">{post.meta.subtitle}</div>
              )}
            </div>
          </div>
          {config.postCard.showCover && post.meta.cover && (
            <a href={link} className="shrink-0 relative w-[200px] h-[120px] rounded">
              <Image src={post.meta.cover} fill={true} className="rounded object-cover" alt="" />
            </a>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {config.postCard.showComments && (
                <a
                  href={link + "#comments"}
                  className="flex items-center gap-1 text-sm px-2 -mx-2 py-1 -py-2 rounded transition-colors text-slate-400 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-400"
                >
                  <CommentIcon /> <span>{post.totalComments}</span>
                </a>
              )}
              {config.postCard.showReactions && (
                <a
                  href={link}
                  className="flex items-center gap-1 text-sm px-2 -mx-2 py-1 -py-2 rounded transition-colors text-slate-400 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-400"
                >
                  <ThumbsUpIcon /> <span>{post.totalReactions}</span>
                </a>
              )}
            </div>
            {config.postCard.showTags && (
              <div className="flex gap-5">
                {post.tags.map((tag) => (
                  <a
                    href={`/tag/${tag.name}`}
                    key={tag.id}
                    className="text-xs px-2 -mx-2 py-1 -py-2 rounded transition-colors text-slate-400 dark:text-zinc-500 hover:bg-slate-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-400"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
