export const setToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
    console.log("Token set:", key, value);
  } else {
    console.warn("❌ localStorage not available — SSR?");
  }
};

export const getFromLocalStorage = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
