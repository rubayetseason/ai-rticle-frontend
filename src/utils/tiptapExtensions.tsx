import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

// tiptap extension for content generation editor
export const tiptapExtensions = [
  StarterKit.configure({
    paragraph: {},
  }),
  Paragraph.configure({}),
  Heading.configure({
    levels: [2, 3],
  }),
  Bold,
  Italic,
  Underline,
  Strike,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Color,
  Code.configure({}),
  Blockquote.configure({}),
  ListItem.configure({}),
  BulletList.configure({}),
  OrderedList.configure({}),
  Superscript,
  Subscript,
];
