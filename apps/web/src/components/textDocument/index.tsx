import type { ChangeEvent } from "react";
import { SimpleGrid, Flex, Box, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { useDocumentStore } from "store";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import styles from "styles/document.module.css";

const TextDocument = () => {
  const content = useDocumentStore((state) => state.content);
  const setContent = useDocumentStore((state) => state.setContent);
  const [text, setText] = useState("");

  const completionData = {
    on: "Hello world",
    complete: "this is an example auto-completion",
  };

  const [completion, setCompletion] = useState(
    `<span style="color: rgba(0, 0, 0, 0.6)">${completionData.complete}</span>`
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content,
  });

  const editorText = editor?.getText();

  useEffect(() => {
    setText(editor?.getHTML() as string);

    if (text?.includes(completionData.on)) {
      if (text?.includes(completionData.complete)) {
        return;
      }

      if (completion === "") return;

      if (!editor?.isDestroyed) {
        editor?.commands?.setContent(`<p>${text}${completion}</p>`);
        setText(editor?.getHTML() as string);

        setCompletion("");

        return;
      }
    }

    setInterval(() => {
      if (content === text) {
        return;
      }

      setContent(text);
    }, 3000);
  }, [content, text, editorText]);

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
