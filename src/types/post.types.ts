export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  shortDescp: string;
  tags: string[];
  content: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface PostResponse {
  meta: Meta;
  data: Post[];
}

export interface ICreatePost {
  title: string;
  shortDescp: string;
  tags: string[];
  content: string;
  userId: string;
}
