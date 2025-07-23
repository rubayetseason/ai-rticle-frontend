"use client";
import GoBackButton from "@/components/shared/others/GoBackButton";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import CreatePostEditor from "./_components/CreatePostEditor";

const CreatePostPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="px-5 py-5 font-raleway flex items-center gap-4 border-b border-input">
        <GoBackButton></GoBackButton> Create a Post
      </div>

      <div>
        <div>
          <input
            type="text"
            className="my-5 px-5 py-4 w-full text-base md:text-2xl font-medium border-b border-input outline-none"
            placeholder="What's on your mind? Enter a title here..."
          />
        </div>

        <div>
          <textarea
            className="my-5 px-5 py-4 w-full text-sm md:text-lg
            font-normal border-b border-input overflow-hidden resize-none outline-none"
            placeholder="Enter a short description here..."
            rows={3}
          ></textarea>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="text"
              placeholder="Enter tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="h-12 text-sm md:text-xl w-full max-w-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="mt-4 md:mt-0 px-5 py-2 bg-black dark:bg-white text-white dark:text-black flex items-center gap-2 rounded-full"
            >
              <Plus className="w-5 h-5" /> Add Tag
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm"
                >
                  {tag}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        <CreatePostEditor></CreatePostEditor>
      </div>
    </div>
  );
};

export default CreatePostPage;
