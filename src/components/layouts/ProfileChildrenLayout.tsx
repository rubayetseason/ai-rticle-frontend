"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layouts/Sidebar";
import { getFromLocalStorage } from "@/helpers/local-storage";
import { authKey } from "@/constants/storageKey";

const ProfileChildrenLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    if (!token) {
      router.replace("/"); // redirect to login page
    } else {
      setIsAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return null; // or a loader if you prefer

  return (
    <div className="w-full px-4">
      <div className="max-w-[var(--custom-width)] mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 pr-6">
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </aside>

        {/* Content */}
        <main className="pb-10 flex-1 md:border-x md:border-border">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileChildrenLayout;
