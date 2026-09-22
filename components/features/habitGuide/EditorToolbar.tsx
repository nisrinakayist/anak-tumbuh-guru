"use client";

import { Editor } from "@tiptap/react";
import { CiTextAlignLeft, CiTextAlignCenter, CiTextAlignRight, CiTextAlignJustify } from "react-icons/ci";
import HeadingSelect from "@/components/features/habitGuide/HeadingSelect";
import LinkButton from "@/components/features/habitGuide/LinkButton";

type EditorToolbarProps = {
  editor: Editor | null;
};

function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const iconButtonClass = (isActive: boolean) =>
    `rounded-lg p-2 transition ${
      isActive ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-900/70 hover:bg-primary-100"
    }`;

  const textButtonClass = (isActive: boolean) =>
    `rounded-lg px-2.5 py-1.5 text-xs transition ${
      isActive ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-900/70 hover:bg-primary-100"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-primary-50 p-2.5">
      <HeadingSelect editor={editor} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={textButtonClass(editor.isActive("codeBlock"))}
      >
        {"<>"}
      </button>

      <span className="mx-0.5 h-5 w-px bg-primary-100" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${textButtonClass(editor.isActive("bold"))} font-black`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${textButtonClass(editor.isActive("italic"))} italic`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${textButtonClass(editor.isActive("strike"))} line-through`}
      >
        S
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${textButtonClass(editor.isActive("underline"))} underline`}
      >
        U
      </button>

      <span className="mx-0.5 h-5 w-px bg-primary-100" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={iconButtonClass(editor.isActive({ textAlign: "left" }))}
        aria-label="Rata kiri"
      >
        <CiTextAlignLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={iconButtonClass(editor.isActive({ textAlign: "center" }))}
        aria-label="Rata tengah"
      >
        <CiTextAlignCenter size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={iconButtonClass(editor.isActive({ textAlign: "right" }))}
        aria-label="Rata kanan"
      >
        <CiTextAlignRight size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={iconButtonClass(editor.isActive({ textAlign: "justify" }))}
        aria-label="Rata kiri-kanan"
      >
        <CiTextAlignJustify size={16} />
      </button>

      <span className="mx-0.5 h-5 w-px bg-primary-100" />

      <LinkButton editor={editor} />
    </div>
  );
}

export default EditorToolbar;
