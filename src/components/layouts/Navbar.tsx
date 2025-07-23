"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { generateMobileMenuList } from "@/constants/menuList";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const name = "John Doe";
const userName = "@johndoe";

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = usePathname();
  const userId = "123";
  const menuItems = generateMobileMenuList(userId);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="md:hidden py-2 flex justify-between items-center border-b-[1px] border-gray-400/50 dark:border-gray-600/50">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" className="relative h-11 w-11 rounded-full">
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
        </SheetTrigger>
        <SheetContent side="left">
          <div className="px-3 pt-7">
            <div>
              <Link href="/profile/123">
                <div className="mb-9 flex items-center gap-2 cursor-pointer">
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
                  <div className="flex flex-col">
                    <h1 className="font-medium">{name}</h1>
                    <h1 className="text-sm font-light">{userName}</h1>
                  </div>
                </div>
              </Link>

              {menuItems.map((item) => {
                const isActive = location === item.href;

                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={cn(
                        "px-5 py-3 mb-3 text-lg md:text-xl flex items-center gap-4 rounded-[30px] transition-all duration-300",
                        isActive
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "hover:bg-gray-100 dark:hover:bg-gray-300/500"
                      )}
                    >
                      {item?.icon && <item.icon className="size-5 md:size-7" />}
                      <p>{item.name}</p>
                    </div>
                  </Link>
                );
              })}

              <div
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="px-5 py-3 mb-3 text-lg md:text-xl flex items-center gap-4"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="size-5 md:size-7 rotate-0 scale-100 transition-all" />
                ) : (
                  <Moon className="size-5 md:size-7 rotate-0 scale-100 transition-all" />
                )}
                <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
              </div>
            </div>

            <div className="px-4 w-full absolute bottom-4 left-0">
              <div className="mb-4">
                <Separator />
              </div>

              <div className="mt-6">
                <button className="py-2 w-full text-sm text-red-600 dark:text-red-700 hover:text-white dark:hover:text-white bg-transparent hover:bg-red-700 font-medium flex justify-center items-center gap-2 transition-all duration-500 border-[1px] border-red-600 dark:border-red-700 rounded-[30px] cursor-pointer">
                  <LogOut size="16" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
