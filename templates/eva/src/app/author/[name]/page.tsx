import { hubbo } from "~/hubbo";
import { PostCard } from "~/components/post-card";
import { Breadcrumbs } from "~/components/breadcrumbs";

export const revalidate = 300;

export default async function Author({ params }: { params: Record<string, string> }) {
  const { posts } = await hubbo.findPosts({ author: params.name });

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs>
        <Breadcrumbs.Home />
        <Breadcrumbs.Active prefix="author/">{params.name}</Breadcrumbs.Active>
      </Breadcrumbs>

      <div className="flex flex-col gap-8">
        {posts.length === 0 && <div className="text-center rounded-lg p-2 border border-slate-100">No posts found</div>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
