import { Newspaper, Rss, Search } from "lucide-react";

export const generateMobileMenuList = () => [
  {
    name: "All Posts",
    href: "/posts",
    icon: Rss,
  },
  {
    name: "My Posts",
    href: "/my-posts",
    icon: Newspaper,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Search,
  },
];
