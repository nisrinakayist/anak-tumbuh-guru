"use client";

import { Editor } from "@tiptap/react";
import { CiLink } from "react-icons/ci";

type LinkButtonProps = {
  editor: Editor;
};

function LinkButton({ editor }: LinkButtonProps) {
  const handleClick = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Masukkan URL tautan:", previousUrl ?? "");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-lg p-2 transition ${
        editor.isActive("link")
          ? "bg-primary-500 text-white"
          : "bg-primary-50 text-primary-900/70 hover:bg-primary-100"
      }`}
      aria-label="Sisipkan tautan"
    >
      <CiLink size={16} />
    </button>
  );
}

export default LinkButton;
