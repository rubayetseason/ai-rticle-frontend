import { getPosts } from "@/services/post.service";
import { Post } from "@/types/post.types";
import BlogPostList from "./_components/BlogPostList";

export const dynamic = "force-dynamic";

const PostsPage = async () => {
  let posts: Post[] = [];
  try {
    const res = await getPosts();
    posts = res?.data;
  } catch (err) {
    console.error("Failed to fetch posts", err);
  }

  return <BlogPostList posts={posts} isLoading={false} />;
};

export default PostsPage;
