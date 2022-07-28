import type { ChangeEvent } from "react";
import { SimpleGrid, Flex, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useDocumentStore } from "store";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";
import styles from "styles/document.module.css";

const TextDocument = () => {
  const content = useDocumentStore((state) => state.content);
  const setContent = useDocumentStore((state) => state.setContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (editor?.getHTML() === content) return;

      setContent(editor?.getHTML() as string);
    }, 5000);

    return () => clearTimeout(saveTimer);
  }, [editor, content, setContent]);

  return (
    <Flex h="100%" direction="column" justify="space-between">
      <Flex direction="column" w="100%" h="100%" boxShadow="base">
        <EditorContent editor={editor} className={styles.editor} />
      </Flex>

      <Menubar editor={editor} />
    </Flex>
  );
};

export default TextDocument;
