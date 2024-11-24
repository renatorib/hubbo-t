import { hubbo } from "~/hubbo";
import { PostCard } from "~/components/post-card";
import { Breadcrumbs } from "~/components/breadcrumbs";

export const revalidate = 300;

export default async function Tag({ params }: { params: Record<string, string> }) {
  const { posts } = await hubbo.findPosts({ label: `tag:${params.name}` });

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs>
        <Breadcrumbs.Home />
        <Breadcrumbs.Active prefix="tag/">{params.name.slice(0, 40)}</Breadcrumbs.Active>
      </Breadcrumbs>

      <div className="flex flex-col gap-4">
        {posts.length === 0 && <div className="text-center rounded-lg p-2 border border-zinc-100">No posts found</div>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
