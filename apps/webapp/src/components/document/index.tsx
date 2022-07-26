import type { ChangeEvent } from "react";
import { SimpleGrid, Flex, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";
import styles from "styles/document.module.css";

const Document = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: "<p style='color: rgba(0, 0, 0, 0.9)'>Start writing...</p>",
  })

  return (
    <Flex h="100%" direction="column" justify="space-between">
      <Flex direction="column" w="100%" h="100%" boxShadow="base">
        <EditorContent editor={editor} className={styles.editor} />
      </Flex>
      
      <Menubar editor={editor} />
    </Flex>
  )
}

export default Document;
