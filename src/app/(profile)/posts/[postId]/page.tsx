import { getSinglePost } from "@/services/post.service";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import PostContent from "./_components/PostContent";
import PostContentAI from "./_components/PostContentAI";

type Props = {
  params: Promise<{ postId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
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
      <PostContentAI postId={postId} />
    </div>
  );
};

export default SinglePostPage;
