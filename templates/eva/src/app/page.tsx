import { hubbo } from "~/hubbo";
import { PostCard } from "~/components/post-card";

export const revalidate = 300;

export default async function Home() {
  const { posts } = await hubbo.findPosts();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
