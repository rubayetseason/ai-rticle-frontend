"use client";

import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { Post } from "@/types/post.types";

const PostResult = ({ posts }: { posts: Post[] }) => {
  const loading = !posts;

  return (
    <div className="px-5 my-10 space-y-6 border-t border-input">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium">Posts</h1>
        <h1 className="text-sm md:text-lg font-medium">
          {posts.length} Result{posts.length !== 1 && "s"} Found
        </h1>
      </div>

      {loading ? (
        Array.from({ length: 2 }).map((_, i) => <BlogPostSkeleton key={i} />)
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        posts.map((post) => <BlogPostCard key={post.id} {...post} />)
      )}
    </div>
  );
};

export default PostResult;
