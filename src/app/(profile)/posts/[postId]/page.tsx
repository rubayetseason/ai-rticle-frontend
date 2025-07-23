import { Sparkles } from "lucide-react";
import { type Metadata } from "next";
import PostContent from "./_components/PostContent";

export const metadata: Metadata = {
  title: "Post Details",
  description: "View the full post details",
};

// ✅ Fix: Both params and searchParams must be Promise types
type Props = {
  params: Promise<{ postId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SinglePost = async ({ params, searchParams }: Props) => {
  const { postId } = await params;
  const search = await searchParams;
  console.log(search);

  return (
    <div className="relative pb-10">
      <PostContent postId={postId} />

      <div className="fixed bottom-12 right-32">
        <div className="relative inline-flex group">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#4b749f] via-[#0968e5] to-[#456fe8] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-pulse"></div>
          <h1
            className="px-8 py-4 relative inline-flex justify-center items-center gap-3 text-base font-bold text-black dark:text-white transition-all duration-200 bg-white dark:bg-black rounded-[30px] focus:outline-none"
            role="button"
          >
            <Sparkles /> Ask AI
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
