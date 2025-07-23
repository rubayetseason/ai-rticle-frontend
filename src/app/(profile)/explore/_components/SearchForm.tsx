"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="p-5">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search for topics, authors, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-base dark:bg-background dark:border-border dark:placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SearchForm;
