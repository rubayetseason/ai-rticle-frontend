"use client";

import { useEffect, useState } from "react";
import { getMyPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { toast } from "sonner";
import { useCurrentUserId } from "@/hooks/useCurrentUserId";

const MyPosts = () => {
  const userId = useCurrentUserId();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const res = await getMyPosts(userId);
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to fetch your posts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = () => {
    fetchMyPosts();
  };

  useEffect(() => {
    if (userId) fetchMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return (
      <div className="md:px-5 space-y-6 py-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogPostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="md:px-5 space-y-6 py-10">
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">You haven&apos;t created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <BlogPostCard key={post.id} {...post} userId={userId} onPostDeleted={handlePostDeleted} />
        ))
      )}
    </div>
  );
};

export default MyPosts;
