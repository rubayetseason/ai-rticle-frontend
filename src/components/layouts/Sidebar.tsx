"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateMobileMenuList } from "@/constants/menuList";
import { Loader, LogOut, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const name = "John Doe";
const userName = "@johndoe";

const Sidebar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const location = usePathname();
  const userId = "123";
  const menuItems = generateMobileMenuList(userId);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <h1 className="pt-5 text-2xl text-center font-bold mb-5">Ai-rticle</h1>
      {menuItems.map((item) => {
        const isActive = location === item.href;

        return (
          <Link key={item.name} href={item.href}>
            <div
              className={cn(
                "px-5 py-3 mb-3 text-xl flex items-center gap-4 border-[1px] border-transparent hover:bg-gray-100 dark:hover:bg-gray-300/500 hover:border-blue-700/50 cursor-pointer transition-all duration-300 rounded-[30px]",
                isActive &&
                  "bg-black hover:bg-black dark:bg-white dark:hover:bg-white text-white hover:text-white dark:text-black dark:hover:text-black"
              )}
            >
              {item?.icon && <item.icon className="size-7" />}
              <p>{item.name}</p>
            </div>
          </Link>
        );
      })}

      <div
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="px-5 py-3 mb-3 text-xl flex items-center gap-4 border-[1px] border-transparent hover:bg-gray-100 dark:hover:bg-gray-300/500 hover:border-blue-700/50 cursor-pointer transition-all duration-300 rounded-[30px]"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="size-7 rotate-0 scale-100 transition-all" />
        ) : (
          <Moon className="size-7 rotate-0 scale-100 transition-all" />
        )}
        <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
      </div>

      <div className="w-full md:w-[75%] mx-auto">
        <Link href="/create-post">
          <button className="bg-gradient-animate hover-pulse mt-10 px-2 py-2.5 w-full text-white text-lg font-medium flex justify-center items-center gap-3 rounded-[30px]">
            Post <Sparkles size="18" />
          </button>
        </Link>
      </div>

      <div className="px-4 w-full absolute bottom-4 left-0">
        <div className="mb-4">
          <Separator />
        </div>
        <Link href="/profile/123">
          <div className="flex items-center gap-2 cursor-pointer">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-11 w-11 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="bg-transparent text-indigo-700 dark:text-indigo-500 font-medium">
                        {name
                          ?.split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex flex-col">
              <h1 className="text-sm font-light">{userName}</h1>
            </div>
          </div>
        </Link>
        <div className="mt-6">
          <button className="py-2 w-full text-sm text-red-600 dark:text-red-700 hover:text-white dark:hover:text-white bg-transparent hover:bg-red-700 font-medium flex justify-center items-center gap-2 transition-all duration-500 border-[1px] border-red-600 dark:border-red-700 rounded-[30px] cursor-pointer">
            <LogOut size="16" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
