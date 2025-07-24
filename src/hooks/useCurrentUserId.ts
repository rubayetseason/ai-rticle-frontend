"use client";

import { useEffect, useState } from "react";
import { getFromLocalStorage } from "@/helpers/local-storage";
import { getUserFromToken } from "@/helpers/jwt";
import { authKey } from "@/constants/storageKey";

export const useCurrentUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    const user = token ? getUserFromToken(token) : null;
    setUserId(user?.userId || null);
  }, []);

  return userId;
};
