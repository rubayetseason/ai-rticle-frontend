"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { colors } from "@/constants";
import { tiptapExtensions } from "@/utils/tiptapExtensions";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CodeXml,
  Paintbrush,
  Redo2,
  Undo2,
} from "lucide-react";
import { useCallback } from "react";
import {
  FaBold,
  FaItalic,
  FaQuoteLeft,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { LuLayoutList } from "react-icons/lu";
import { RiListOrdered2 } from "react-icons/ri";

const CreatePostEditor = () => {
  //intilaise the editor
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: "",
    immediatelyRender: false,
  });

  // Utility function to check if an editor command is active
  const isActive = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (format: string, attributes?: Record<string, any>) =>
      editor?.isActive(format, attributes) || false,
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="my-12">
      <div className="!mt-7">
        <div className="editor-container">
          {/* Custom Toolbar */}

          <div className="px-2 py-3 flex gap-x-1 gap-y-3 flex-wrap items-center border-t-[1px] border-input">
            {/* undo */}
            <button
              type="button"
              className="cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo2 className="h-4 w-4" />
            </button>
            {/* redo */}
            <button
              type="button"
              className="cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo2 className="h-4 w-4" />
            </button>

            {/* text size */}
            <Select
              value={
                isActive("heading", { level: 2 })
                  ? "h2"
                  : isActive("heading", { level: 3 })
                  ? "h3"
                  : "paragraph"
              }
              onValueChange={(value) => {
                if (value === "paragraph") {
                  editor.chain().focus().setParagraph().run();
                } else if (value === "h2") {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                } else if (value === "h3") {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }
              }}
            >
              <SelectTrigger className="w-[130px] px-2 py-1 cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraph">Normal Text</SelectItem>
                <SelectItem value="h2">Heading 1</SelectItem>
                <SelectItem value="h3">Heading 2</SelectItem>
              </SelectContent>
            </Select>

            {/* text align */}
            <div className="ml-1 ">
              <Select
                value={
                  editor.isActive({ textAlign: "left" })
                    ? "left"
                    : editor.isActive({ textAlign: "center" })
                    ? "center"
                    : editor.isActive({ textAlign: "right" })
                    ? "right"
                    : editor.isActive({ textAlign: "justify" })
                    ? "justify"
                    : "left" // Default value
                }
                onValueChange={(value) => {
                  editor.chain().focus().setTextAlign(value).run();
                }}
              >
                <SelectTrigger className="w-[60px] px-2 py-1 cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30">
                  <SelectValue placeholder="Align" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">
                    <div className="flex items-center gap-2">
                      <AlignLeft className="h-4 w-4" />
                    </div>
                  </SelectItem>
                  <SelectItem value="center">
                    <div className="flex items-center gap-2">
                      <AlignCenter className="h-4 w-4" />
                    </div>
                  </SelectItem>
                  <SelectItem value="right">
                    <div className="flex items-center gap-2">
                      <AlignRight className="h-4 w-4" />
                    </div>
                  </SelectItem>
                  <SelectItem value="justify">
                    <div className="flex items-center gap-2">
                      <AlignJustify className="h-4 w-4" />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* bold */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${
                isActive("bold")
                  ? "active bg-orange-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <FaBold className="h-4 w-4" />
            </button>

            {/* italic */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${
                isActive("italic")
                  ? "active bg-orange-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-1.5 py-2`}
            >
              <FaItalic className="h-4 w-4" />
            </button>

            {/* underline */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${
                isActive("underline")
                  ? "active bg-orange-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <FaUnderline className="h-4 w-4" />
            </button>

            {/* stroke */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${
                isActive("strike")
                  ? "active bg-blue-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <FaStrikethrough className="h-4 w-4" />
            </button>

            {/* unordered list */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                isActive("bulletList")
                  ? "active bg-blue-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <LuLayoutList className="h-4 w-4" />
            </button>

            {/* ordered list */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${
                isActive("orderedList")
                  ? "active bg-blue-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <RiListOrdered2 className="h-5 w-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30">
                  <Paintbrush className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        editor.chain().focus().setColor(color).run()
                      }
                      className="w-5 h-5 mx-auto rounded-md border-2"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    className="w-full text-sm text-center font-medium py-1 rounded-md"
                  >
                    Unset Color
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* blockquote */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${
                isActive("blockquote")
                  ? "active bg-blue-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <FaQuoteLeft className="h-4 w-4" />
            </button>

            {/* code */}
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`${
                isActive("code")
                  ? "active bg-blue-400/70 rounded-sm"
                  : "cursor-pointer p-2 rounded hover:!bg-gray-100 dark:hover:!bg-blue-600/30"
              } px-2 py-2`}
            >
              <CodeXml className="h-5 w-5" />
            </button>
          </div>

          {/* Editor Content */}
          <EditorContent
            id="editor_scrollbar"
            className="!h-[25rem] max-h-[36rem] overflow-y-scroll prose max-w-none border-y-[1px] border-input"
            editor={editor}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePostEditor;
