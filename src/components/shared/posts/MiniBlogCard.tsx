import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { blogPosts } from "@/constants";
import { ShineBorder } from "@/components/ui/shine-border";
import { Flame } from "lucide-react";
import Link from "next/link";

const MiniBlogCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 pb-10">
      {blogPosts.map((post) => (
        <Card
          key={post.postId}
          className="relative flex items-start gap-4 p-7 hover:shadow-md transition-shadow border-muted dark:border-border bg-card"
        >
          <Flame className="p-1.5 size-9 absolute -top-3 -right-3 text-red-700 bg-white dark:bg-black animate-pulse border border-red-700 rounded-full z-10" />
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          {/* Info */}
          <div className="flex flex-col justify-between flex-1 overflow-hidden">
            <Link href="/posts/123">
              <div>
                <h3 className="text-base text-wrap font-semibold truncate">
                  {post.title}
                </h3>
                <p className="text-sm text-wrap text-muted-foreground mt-1 line-clamp-2">
                  {post.shortDescription}
                </p>
              </div>
            </Link>

            {/* Author */}
            <Link href="/profie/123">
              <div className="mt-3 flex items-center gap-2">
                <Image
                  src={post.user.avatar}
                  alt={post.user.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <p className="text-xs font-medium text-muted-foreground truncate">
                  {post.user.name} ·{" "}
                  {formatDistanceToNow(new Date(post.postedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MiniBlogCard;
