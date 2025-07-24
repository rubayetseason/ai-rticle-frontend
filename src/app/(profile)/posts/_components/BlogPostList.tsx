"use client";

import { useEffect, useState } from "react";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { getPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";
import { toast } from "sonner";

const BlogPostList = ({
  posts: initialPosts,
  isLoading,
}: {
  posts: Post[];
  isLoading: boolean;
}) => {
  const userId = useCurrentUserId();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(isLoading);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to refresh posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  if (loading) {
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
        <BlogPostCard key={post.id} {...post} userId={userId} onPostDeleted={fetchPosts} />
      ))}
    </div>
  );
};

export default BlogPostList;
