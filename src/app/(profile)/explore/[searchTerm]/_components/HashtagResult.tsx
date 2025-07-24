"use client";

import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { Post } from "@/types/post.types";

const HashtagResult = ({ posts, tag }: { posts: Post[]; tag: string }) => {
  const loading = !posts;
  const userId = useCurrentUserId();

  return (
    <div className="px-5 my-10 space-y-6 border-t border-input">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium">Hashtags</h1>
        <h1 className="text-sm md:text-lg font-medium">
          {posts.length} Result{posts.length !== 1 && "s"} Found for #{tag}
        </h1>
      </div>

      {loading ? (
        Array.from({ length: 2 }).map((_, i) => <BlogPostSkeleton key={i} />)
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found for #{tag}.</p>
      ) : (
        posts.map((post) => <BlogPostCard key={post.id} {...post} userId={userId} />)
      )}
    </div>
  );
};

export default HashtagResult;
