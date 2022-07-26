import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DocumentStore {
  name: string;
  content: string;
  completion: string;
  id: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setContent: (content: string) => void;
};

const useDocumentStore = create<DocumentStore>()(
  devtools(
    persist((set) => ({
      name: "Untitled",
      content: "<p>Start writing ...</p>",
      completion: "",
      id: "",
      setId: (id: string) => set(state => ({ id })),
      setName: (name: string) => set(state => ({ name })),
      setContent: (content: string) => set(state => ({ content })),
    }))
  )
);

export  { useDocumentStore };
