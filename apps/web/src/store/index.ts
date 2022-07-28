import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ObjectId } from "bson";
import axios from "axios";

interface DocumentStore {
  name: string;
  content: string;
  completion: string;
  id?: ObjectId;
  setName: (name: string) => void;
  setContent: (content: string) => void;
  fetch: (id: ObjectId) => Promise<void>;
}

const useDocumentStore = create<DocumentStore>()(
  devtools(
    persist((set) => ({
      name: "Untitled",
      content: "<p>Start writing ...</p>",
      completion: "",
      setName: (name: string) => set((state) => ({ name })),
      setContent: (content: string) => set((state) => ({ content })),
      fetch: async (id: ObjectId) => {
        const response = await axios.get(`/api/document/${id}`);
        const data = await response.data;

        set({
          id: new ObjectId(data?._id as string),
          name: data?.name as string,
          content: data?.content as string
        });
      },
    }))
  )
);

export { useDocumentStore };
