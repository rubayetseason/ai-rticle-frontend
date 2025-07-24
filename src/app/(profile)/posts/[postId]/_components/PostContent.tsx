"use client";

import GoBackButton from "@/components/shared/others/GoBackButton";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Post } from "@/types/post.types";
import { incrementViewCount } from "@/services/post.service";

const PostContent = ({ post, postId }: { post: Post; postId: string }) => {
  useEffect(() => {
    // Increment view count only on client side
    incrementViewCount(postId).catch(() => {
      console.warn("Failed to update view count");
    });
  }, [postId]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 space-y-6">
      <GoBackButton />

      <h1 className="text-2xl md:text-5xl font-bold tracking-tight">{post.title}</h1>

      <div className="mt-9 flex items-center gap-4">
        <Image
          src="https://picsum.photos/200"
          alt={post.user.username}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex-1 flex justify-between items-center">
          <Link href={`/profile/${post.user.id}`}>
            <div>
              <p className="font-medium">{post.user.username}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-muted flex items-center gap-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Image
        src="https://picsum.photos/900/400"
        alt={post.title}
        width={1200}
        height={600}
        className="rounded-lg w-full h-auto object-cover"
      />

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostContent;
