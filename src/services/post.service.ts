// app/posts/services/post.service.ts
import { IAIGenerateProps, ICreatePost, Post, PostResponse } from "@/types/post.types";
import axiosInstance from "@/utils/axios";

export const generatePostAI = async ({ postId, mode }: IAIGenerateProps) => {
  const res = await axiosInstance.post("/post/generate", { postId, mode });
  console.log("ai res ", res);
  return res.data;
};

export const createPost = async (data: ICreatePost) => {
  return axiosInstance.post("/post/create-post", data);
};

export const getPosts = async (params?: { search?: string; tag?: string }) => {
  const res = await axiosInstance.get<PostResponse>("/post", { params });
  return res.data;
};

export const searchPostsByTitle = async (searchTerm: string) => {
  const res = await axiosInstance.get<PostResponse>("/post", {
    params: { search: searchTerm },
  });
  return res.data;
};

export const searchPostsByTag = async (tag: string) => {
  const res = await axiosInstance.get<PostResponse>("/post", {
    params: { tag },
  });
  return res.data;
};

export const getMyPosts = async (userId: string) => {
  const res = await axiosInstance.get<PostResponse>("/post", {
    params: { creatorId: userId },
  });
  return res.data;
};

export const getSinglePost = async (postId: string) => {
  const res = await axiosInstance.get<Post>(`/post/${postId}`);
  return res.data;
};

export const incrementViewCount = async (postId: string) => {
  await axiosInstance.patch(`/post/${postId}`);
};

export const deletePost = async (postId: string) => {
  return axiosInstance.delete(`/post/${postId}`);
};
