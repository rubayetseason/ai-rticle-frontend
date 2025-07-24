"use client";

import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { Post } from "@/types/post.types";

interface Props {
  posts: Post[];
  isLoading: boolean;
}

const BlogPostList = ({ posts, isLoading }: Props) => {
  const userId = useCurrentUserId();

  if (isLoading) {
    return (
      <div className="md:px-5 space-y-6 py-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogPostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground text-sm md:text-base">
        No posts available.
      </div>
    );
  }

  return (
    <div className="md:px-5 space-y-6 py-10">
      {posts.map((post) => (
        <BlogPostCard key={post.id} {...post} userId={userId} />
      ))}
    </div>
  );
};

export default BlogPostList;
