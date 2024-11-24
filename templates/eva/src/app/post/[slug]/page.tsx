import Image from "next/image";
import { notFound, redirect, RedirectType } from "next/navigation";
import { format } from "date-fns/format";
import { ogi } from "@hubbo/next";
import { MarkdownRenderServer } from "@hubbo/react/server";
import { CalendarIcon, TimeIcon } from "@hubbo/react/icons";
import { hubbo, config } from "~/hubbo";
import { Metadata } from "next";

export const revalidate = 300;

async function getData(props: { params: Record<string, string> }) {
  const [number, ...slug] = props.params.slug.split("-");
  const post = await hubbo.getPost({ number: Number(number) });
  return { post, number, slug };
}

export async function generateMetadata(props: { params: Record<string, string> }) {
  const { post } = await getData(props);

  if (!post) return {};

  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : hubbo.config?.baseUrl;

  const seo = {
    canonical: baseUrl ? baseUrl + hubbo.getPermalink(post) : undefined,
    title: post.title,
    siteName: hubbo.options.seo?.siteName,
    description: (post.meta.description as string) || (post.meta.subtitle as string) || undefined,
    authors: [post.author, ...post.coauthors],
    publishedTime: (post.meta.realCreatedAt as string) || post.createdAt,
    modifiedTime: post.updatedAt,
    locale: (post.meta.locale as string) || hubbo.options.seo?.locale || undefined,
    image: (post.meta.cover as string) || undefined,
    articleSection: (post.meta["article:section"] as string) || undefined,
    articleTags: post.tags.map((tag) => tag.name),
  };

  const image = baseUrl
    ? `${baseUrl}/ogi/${ogi.hash.stringify({
        title: seo.title,
        subtitle: post.meta.subtitle,
        cover: post.meta.cover,
        url: baseUrl.split("//")[1] + hubbo.getPermalink(post),
        authorName: post.author.name || post?.author.login,
        authorPicture: post.author.avatarUrl,
        createdAt: post.createdAt ? format(post.meta.realCreatedAt || post.createdAt, "MMM dd, yyyy") : undefined,
      })}`
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    authors: seo.authors.map((a) => ({ name: a.name || a.login })),
    openGraph: {
      type: "article",
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
      siteName: seo.siteName,
      authors: seo.authors.map((a) => a.name || a.login),
      description: seo.description,
      title: seo.title,
      tags: seo.articleTags,
      section: seo.articleSection,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      site: seo.siteName,
      creator: seo.authors.map((a) => a.name || a.login).join(", "),
      images: image,
    },
  } satisfies Metadata;
}

export default async function Post(props: { params: Record<string, string> }) {
  const { post, number, slug } = await getData(props);

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
          <MarkdownRenderServer content={post.body} />
        </div>
      </div>
    </div>
  );
}
