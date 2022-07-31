import type { ChangeEvent } from "react";
import { SimpleGrid, Flex, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useDocumentStore } from "store";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import styles from "styles/document.module.css";

const TextDocument = () => {
  const content = useDocumentStore((state) => state.content);
  const setContent = useDocumentStore((state) => state.setContent);
  const [text, setText] = useState("");

  const completionData = {
    on: "Hello world",
    complete: `<p><span style="color: rgba(0, 0, 0, 0.6)">this is completion</span></p>`
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content,
  });

  useEffect(() => {
    setText(editor?.getHTML() as string);
    
    if (text?.includes(completionData.on)) {
      if (text?.includes(completionData.complete) === true) {
        return; 
      }

      if (!editor?.isDestroyed) {
        editor?.commands?.insertContent(completionData.complete);
        setText(editor?.getHTML() as string);
        return;
      }
    }

    setInterval(() => {
      if (content === text) {
        return;
      }

      setContent(text);
    }, 3000)
  }, [content, text, editor?.getText()]);

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
