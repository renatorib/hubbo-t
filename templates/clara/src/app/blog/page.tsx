import { hubbo } from "~/hubbo";
import { PostCard } from "~/components/post-card";

export const revalidate = 300;

export default async function Blog() {
  const { posts } = await hubbo.findPosts();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
