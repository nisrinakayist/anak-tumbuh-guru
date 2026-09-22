"use client";

import { Editor } from "@tiptap/react";
import { CiImageOn } from "react-icons/ci";

type ImageButtonProps = {
  editor: Editor;
};

function ImageButton({ editor }: ImageButtonProps) {
  const handleClick = () => {
    const url = window.prompt("Masukkan URL gambar:");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg bg-primary-50 p-2 text-primary-900/70 transition hover:bg-primary-100"
      aria-label="Sisipkan gambar"
    >
      <CiImageOn size={16} />
    </button>
  );
}

export default ImageButton;
