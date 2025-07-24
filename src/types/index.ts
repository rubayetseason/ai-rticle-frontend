import { User } from "./post.types";

export interface BlogPostCardProps {
  id: string;
  title: string;
  shortDescp: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  userId?: string | null;
  user: User;
}

export interface SinglePostProps {
  post: {
    title: string;
    thumbnail: string;
    coverImage: string;
    content: string;
    postedAt: string | Date;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
  };
}
