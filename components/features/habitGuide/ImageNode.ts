import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Lightweight image node used by the habit guide editor.
 * Kept local so the project does not need an additional Tiptap package just
 * for inserting an image from a URL.
 */
const ImageNode = Node.create({
  name: "image",

  group: "inline",
  inline: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: "img[src]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(HTMLAttributes, {
        class: "max-w-full rounded-lg",
      }),
    ];
  },
});

export default ImageNode;
