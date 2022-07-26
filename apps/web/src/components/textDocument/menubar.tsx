import { IconButton, Flex } from "@chakra-ui/react";
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiListUl,
  BiListOl,
  BiHeading,
} from "react-icons/bi";
import { ImPageBreak, ImPagebreak } from "react-icons/im";
import { TbBlockquote } from "react-icons/tb";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

const Menubar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex ml="1px" boxShadow="base" p="8" overflowY="hidden" bg="white">
      <IconButton
        icon={<BiBold size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
        className={editor.isActive("bold") ? "is-active" : ""}
        bg="white"
      />
      <IconButton
        icon={<BiItalic size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
        className={editor.isActive("bold") ? "is-active" : ""}
        bg="white"
      />
      <IconButton
        icon={<BiStrikethrough size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike Through"
        className={editor.isActive("bold") ? "is-active" : ""}
        bg="white"
      />
      <IconButton
        icon={<BiListUl size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Unordered List"
        className={editor.isActive("bulletList") ? "is-active" : ""}
        bg="white"
      />
      <IconButton
        icon={<BiListOl size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
        className={editor.isActive("orderedList") ? "is-active" : ""}
        bg="white"
      />
      <IconButton
        icon={<BiHeading size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        aria-label="Heading"
        bg="white"
      />
      <IconButton
        icon={<ImPageBreak size="1.25rem" />}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="Page Break"
        bg="white"
      />
      <IconButton
        icon={<ImPagebreak size="1.25rem" />}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        aria-label="Hard Break"
        bg="white"
      />
      <IconButton
        icon={<TbBlockquote size="1.25rem" />}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        aria-label="Blockquote"
        bg="white"
      />
    </Flex>
  );
};

export default Menubar;
