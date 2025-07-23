"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";

const BlogPostSkeleton = () => {
  return (
    <Card className="py-0 flex flex-row items-start shadow-none">
      <Skeleton className="w-72 h-96 rounded-l-xl" />

      <div className="h-full px-4 py-6 flex flex-col justify-between flex-1">
        <div>
          {/* Hashtags */}
          <div className="pr-4 flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-16 h-6 rounded-full" />
            ))}
          </div>

          {/* Title */}
          <Skeleton className="mt-5 h-10 w-3/4 rounded-md" />

          {/* Short description */}
          <Skeleton className="mt-5 h-16 w-full rounded-md" />

          {/* User info */}
          <div className="mt-9 flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex-1 flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-20 h-3" />
              </div>
              <Skeleton className="w-20 h-8 rounded-md" />
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-12 text-lg text-muted-foreground flex justify-between items-center">
          <div className="flex items-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-6 h-4 rounded" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="w-12 h-4 rounded" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogPostSkeleton;