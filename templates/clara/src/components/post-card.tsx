import { Post } from "@hubbo/core";
import { format } from "date-fns/format";

export function PostCard({ post }: { post: Post }) {
  const link = `/post/${post.number}${post.meta.slug ? `-${post.meta.slug}` : ""}`;

  return (
    <a href={link} className=" dark:text-white text-black opacity-70 transition hover:opacity-100">
      <span className="text-lg">{post.title}</span>
      <span className="">
        <span className="opacity-50"> · {format(post.meta.realCreatedAt || post.createdAt, "MMM dd")}</span>
        <span className="opacity-40"> · {post.estimatedReadingTime}min</span>
      </span>
    </a>
  );
}
