"use client";

import { Button } from "@/components/ui/button";
import { BlogPostCardProps } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BlogPostCard({
  postId,
  thumbnail,
  title,
  shortDescription,
  readCount,
  postedAt,
  user,
  stats,
  myposts,
}: BlogPostCardProps) {
  console.log(postId);

  const router = useRouter();

  return (
    <div className="h-96 py-0 flex flex-row items-start font-raleway border border-input rounded-xl shadow-none">
      <div className="w-96 h-full">
        <Image
          onClick={() => router.push(`/posts/${postId}`)}
          className="w-full h-full oject-cover rounded-l-xl"
          src={thumbnail}
          alt={title}
          width={1000}
          height={1000}
        />
      </div>
      <div className="p-6 w-full h-full flex flex-col justify-between">
        <Link href="/posts/123">
          <div>
            {stats.hashtags.length > 0 && (
              <div className="pr-4 flex flex-wrap gap-2">
                {stats.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="mt-5 text-4xl font-bold">{title}</h2>
            <p className="mt-5 text-muted-foreground">{shortDescription}</p>

            <div className="mt-9 flex items-center gap-4">
              <Link href="/profie/123">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </Link>
              <div className="flex-1 flex justify-between items-center">
                <Link href="/profie/123">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(postedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </Link>
                <div>
                  {myposts && (
                    <Link href={`/posts/${postId}/edit`}>
                      <Button>
                        <Edit /> Edit
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-8 text-lg text-muted-foreground flex justify-between items-center">
          <Button>Read Article</Button>
          <div className="flex items-center gap-2">
            <Eye />
            <span>{readCount} reads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
