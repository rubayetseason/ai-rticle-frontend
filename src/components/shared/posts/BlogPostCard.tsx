import { Button } from "@/components/ui/button";
import { BlogPostCardProps } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogPostCard({
  id,
  title,
  shortDescp,
  tags,
  viewCount,
  createdAt,
  user,
}: BlogPostCardProps) {
  return (
    <div className="h-full md:h-96 py-0 flex flex-row items-start font-raleway border border-input rounded-xl shadow-none">
      <div className="hidden md:block w-96 h-full">
        <Link href={`/posts/${id}`}>
          <Image
            className="hidden md:block w-full h-full oject-cover rounded-l-xl"
            src="https://picsum.photos/500/700"
            alt={title}
            width={1000}
            height={1000}
          />
        </Link>
      </div>
      <div className="p-6 w-full h-full flex flex-col justify-between">
        <Link href={`/posts/${id}`}>
          <div>
            {tags.length > 0 && (
              <div className="pr-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link href={`/explore/${tag}`} key={index}>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-sm">
                      #{tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            <h2 className="mt-5 text-xl md:text-4xl font-bold">{title}</h2>
            <p className="mt-5 text-sm md:text-bsae text-muted-foreground">
              {shortDescp}
            </p>

            <div className="mt-9 flex items-center gap-4">
              <Image
                src="https://picsum.photos/200"
                alt={user.username}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-8 text-lg text-muted-foreground flex justify-between items-center">
          <Link href={`/posts/${id}`}>
            <Button>Read Article</Button>
          </Link>
          <div className="flex items-center gap-2">
            <Eye />
            <span>{viewCount} reads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
