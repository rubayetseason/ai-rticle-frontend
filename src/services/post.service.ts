// app/posts/services/post.service.ts
import { Post, PostResponse } from "@/types/post.types";
import axiosInstance from "@/utils/axios";

export const getPosts = async (params?: { search?: string; tag?: string }) => {
  const res = await axiosInstance.get<PostResponse>("/post", { params });
  return res.data;
};

export const getSinglePost = async (postId: string) => {
  const res = await axiosInstance.get<Post>(`/post/${postId}`);
  console.log("res", res);
  return res.data;
};

export const incrementViewCount = async (postId: string) => {
  await axiosInstance.patch(`/post/${postId}`);
};
