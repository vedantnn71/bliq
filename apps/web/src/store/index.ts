import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ObjectId } from "bson";
import axios from "axios";

interface DocumentStore {
  name: string;
  content: string;
  completion: string;
  id?: ObjectId;
  setName: (name: string) => Promise<void>;
  setContent: (content: string) => Promise<void>;
  fetch: (id: ObjectId) => Promise<void>;
}

const useDocumentStore = create<DocumentStore>()(
  devtools(
    persist((set, get) => ({
      name: "Untitled",
      content: "<p>Start writing ...</p>",
      completion: "",
      setName: async (name: string) => {
        const id = get().id;

        if (!id || !name) return;

        set({ name });

        const response = await axios.put(`/api/document/${id}`, { name });
        const data = await response.data;
      },
      setContent: async (content: string) => {
        const id = get().id;

        if (!content) return;

        set({ content });

        const response = await axios.put(`/api/document/${id}`, { content });
        const data = await response.data;
      },
      fetch: async (id: ObjectId) => {
        if (!id) return;

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
