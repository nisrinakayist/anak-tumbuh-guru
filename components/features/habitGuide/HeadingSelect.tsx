"use client";

import { Editor } from "@tiptap/react";

type HeadingSelectProps = {
  editor: Editor;
};

const LEVEL_OPTIONS = [
  { label: "Paragraf", value: "0" },
  { label: "Heading 1", value: "1" },
  { label: "Heading 2", value: "2" },
  { label: "Heading 3", value: "3" },
];

function HeadingSelect({ editor }: HeadingSelectProps) {
  const activeLevel = [1, 2, 3].find((level) => editor.isActive("heading", { level })) ?? 0;

  const handleChange = (value: string) => {
    const level = Number(value);
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level: level as 1 | 2 | 3 }).run();
    }
  };

  return (
    <select
      value={String(activeLevel)}
      onChange={(event) => handleChange(event.target.value)}
      className="rounded-lg border border-primary-100 bg-white px-2.5 py-1.5 text-xs font-bold text-primary-900 outline-none"
    >
      {LEVEL_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default HeadingSelect;
