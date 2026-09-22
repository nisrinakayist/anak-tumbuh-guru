"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import EditorToolbar from "@/components/features/habitGuide/EditorToolbar";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: false,
        bulletList: false,
        listItem: false,
        blockquote: false,
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] px-4 py-3 focus:outline-none text-sm text-primary-900 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-black [&_a]:text-primary-500 [&_a]:underline [&_h1]:text-xl [&_h1]:font-black [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-black [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-black [&_h3]:mb-2 [&_pre]:bg-primary-900 [&_pre]:text-white [&_pre]:rounded-xl [&_pre]:p-3 [&_pre]:mb-3",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  // Sinkronkan editor saat pindah tab kebiasaan (value berubah dari luar)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;
