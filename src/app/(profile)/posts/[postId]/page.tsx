import { getSinglePost } from "@/services/post.service";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import PostContent from "./_components/PostContent";
import { Sparkles } from "lucide-react";

type Props = {
  params: Promise<{ postId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  console.log(searchParams);
  const { postId } = await params;

  try {
    const post = await getSinglePost(postId);

    return {
      title: `AI-rticle | ${post.title}`,
      description: post.shortDescp,
      openGraph: {
        title: `AI-rticle | ${post.title}`,
        description: post.shortDescp,
        type: "article",
        publishedTime: post.createdAt,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }
}

const SinglePostPage = async ({ params, searchParams }: Props) => {
  const { postId } = await params;
  console.log(searchParams);

  let post;

  try {
    post = await getSinglePost(postId);
  } catch (err) {
    console.error(err);
    return notFound();
  }

  return (
    <div className="relative pb-10">
      <PostContent post={post} postId={postId} />

      {/* Ask AI Button */}
      <div className="fixed bottom-12 right-12 md:right-32">
        <div className="relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#4b749f] via-[#0968e5] to-[#456fe8] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-pulse" />
          <h1
            className="px-6 md:px-8 py-3 md:py-4 relative inline-flex justify-center items-center gap-3 text-base font-bold text-black dark:text-white transition-all duration-200 bg-white dark:bg-black rounded-[30px] focus:outline-none"
            role="button"
          >
            <Sparkles /> Ask AI
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
