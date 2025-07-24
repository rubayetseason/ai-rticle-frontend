"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "@/schemas/postSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import GoBackButton from "@/components/shared/others/GoBackButton";
import { useState } from "react";
import dynamic from "next/dynamic";
import { getFromLocalStorage } from "@/helpers/local-storage";
import { authKey } from "@/constants/storageKey";
import { getUserFromToken } from "@/helpers/jwt";
import { createPost } from "@/services/post.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Lazy-load Tiptap editor with `editor` prop forwarding
const CreatePostEditor = dynamic(() => import("./_components/CreatePostEditor"), {
  ssr: false,
});

type PostFormData = z.infer<typeof postSchema>;

const CreatePostPage = () => {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editorContent, setEditorContent] = useState("");

  console.log("editorContent", editorContent);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      shortDescp: "",
      tags: [],
      content: "",
    },
  });

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      form.setValue("tags", updatedTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  async function onSubmit(values: PostFormData) {
    const token = getFromLocalStorage(authKey);

    if (!token) {
      toast.error("Unauthorized: Token not found");
      return;
    }

    const user = getUserFromToken(token);
    if (!user?.userId) {
      toast.error("Unauthorized: Invalid token");
      return;
    }

    const payload = {
      ...values,
      userId: user.userId,
    };

    try {
      await createPost(payload);
      toast.success("Post created successfully!");
      router.push("/my-posts");
    } catch (err) {
      toast.error("Failed to create post.");
      console.error(err);
    }
  }

  return (
    <div>
      <div className="px-5 py-5 font-raleway flex items-center gap-4 border-b border-input">
        <GoBackButton />
        Create a Post
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="What's on your mind? Enter a title here..."
                    className="text-xl font-semibold border-b"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Short Description */}
          <FormField
            control={form.control}
            name="shortDescp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    rows={3}
                    placeholder="Enter a short description..."
                    className="w-full border-b p-3 text-muted-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    placeholder="Enter tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="max-w-sm"
                  />
                  <Button type="button" onClick={handleAddTag}>
                    <Plus className="w-4 h-4 mr-1" /> Add Tag
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <CreatePostEditor
                  value={field.value}
                  onChange={(content) => {
                    setEditorContent(content);
                    field.onChange(content);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6">
            Publish Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
