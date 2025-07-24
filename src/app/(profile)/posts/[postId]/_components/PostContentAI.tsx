"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generatePostAI } from "@/services/post.service";
import { toast } from "sonner";

type Props = {
  postId: string;
};

export default function PostContentAI({ postId }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"summarize" | "tldr" | "tell_more" | null>(null);
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const handleGenerate = async (selectedMode: "summarize" | "tldr" | "tell_more") => {
    setMode(selectedMode);
    setLoading(true);
    setHtmlContent("");

    try {
      const res = await generatePostAI({ postId, mode: selectedMode });
      setHtmlContent(res);
    } catch (err) {
      toast.error("Failed to generate AI response");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-12 right-12 md:right-32">
          <div className="relative inline-flex group">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#4b749f] via-[#0968e5] to-[#456fe8] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-pulse" />
            <h1 className="px-6 md:px-8 py-3 md:py-4 relative inline-flex justify-center items-center gap-3 text-base font-bold text-black dark:text-white transition-all duration-200 bg-white dark:bg-black rounded-[30px] focus:outline-none cursor-pointer">
              <Sparkles /> Ask AI
            </h1>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-[95vw] sm:w-full overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Ask AI about this post</DialogTitle>
        </DialogHeader>

        {!loading && htmlContent === "" && (
          <div className="flex flex-wrap gap-3 mt-4">
            <Button onClick={() => handleGenerate("summarize")}>Summarize</Button>
            <Button onClick={() => handleGenerate("tldr")}>TL;DR</Button>
            <Button onClick={() => handleGenerate("tell_more")}>Tell More</Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader2 className="animate-spin h-6 w-6 text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground">
              Generating {mode?.replace("_", " ")}... Takes around 40-50 seconds
            </p>
          </div>
        )}

        {!loading && htmlContent && (
          <div className="prose dark:prose-invert mt-4 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
