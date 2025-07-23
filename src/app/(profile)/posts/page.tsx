"use client";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { blogPosts } from "@/constants";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="px-5 space-y-6 py-10">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <BlogPostSkeleton key={i} />)
        : blogPosts.map((post) => <BlogPostCard key={post.postId} {...post} />)}
    </div>
  );
};

export default AllPosts;
