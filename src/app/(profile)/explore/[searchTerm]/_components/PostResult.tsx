"use client";

import { useEffect, useState } from "react";
import { blogPosts } from "@/constants";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";

const PostResult = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="my-10 space-y-6 border-t border-input">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-medium">Posts</h1>
        <h1 className="text-sm md:text-lg font-medium">2 Results Found</h1>
      </div>
      {loading
        ? Array.from({ length: 2 }).map((_, i) => <BlogPostSkeleton key={i} />)
        : blogPosts
            .slice(0, 2)
            .map((post) => <BlogPostCard key={post.postId} {...post} />)}
    </div>
  );
};

export default PostResult;
