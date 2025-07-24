"use client";

import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";
import { searchPostsByTitle } from "@/services/post.service";
import { Post } from "@/types/post.types";
import { useState } from "react";
import { toast } from "sonner";

const PostResult = ({ posts: initialPosts }: { posts: Post[] }) => {
  const userId = useCurrentUserId();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  const refetchPosts = async () => {
    try {
      setLoading(true);
      const searchTerm = new URLSearchParams(window.location.pathname).get("searchTerm");
      const res = await searchPostsByTitle(searchTerm || "");
      setPosts(res.data);
    } catch (error) {
      toast.error("Failed to refetch posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        posts.map((post) => (
          <BlogPostCard key={post.id} {...post} userId={userId} onPostDeleted={refetchPosts} />
        ))
      )}
    </div>
  );
};

export default PostResult;
