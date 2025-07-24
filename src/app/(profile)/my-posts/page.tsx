"use client";

import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/helpers/local-storage";
import { authKey } from "@/constants/storageKey";
import { getUserFromToken } from "@/helpers/jwt";
import { getMyPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";
import BlogPostSkeleton from "@/components/loaders/BlogPostSkeleton";
import { BlogPostCard } from "@/components/shared/posts/BlogPostCard";
import { toast } from "sonner";

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    const token = getFromLocalStorage(authKey);

    if (!token) {
      toast.error("Unauthorized: Token not found");
      setLoading(false);
      return;
    }

    const user = getUserFromToken(token);

    if (!user?.userId) {
      toast.error("Unauthorized: Cannot fetch user ID from token");
      setLoading(false);
      return;
    }

    setUserId(user.userId);

    try {
      const res = await getMyPosts(user.userId);
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
    fetchMyPosts();
  }, []);

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
        <p className="text-center text-muted-foreground">
          You haven&apos;t created any posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <BlogPostCard
            key={post.id}
            {...post}
            userId={userId}
            onPostDeleted={handlePostDeleted}
          />
        ))
      )}
    </div>
  );
};

export default MyPosts;
