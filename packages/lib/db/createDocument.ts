import type { Db, ObjectId } from "mongodb";
import { Document } from "./types";
import { client as mongoClient } from "../mongodb";

interface CreateDocumentParams {
  userId: ObjectId;
  name?: string;
  content?: string;
}

const createDocument = async ({
  userId,
  name = "Untitled Document",
  content = "Start writing ...",
}: CreateDocumentParams) => {
  const client = await mongoClient;
  const database: Db = await client.db();
  const documents = await database.collection<Document>("documents");

  if (!userId) return;

  await documents.insertOne({
    userId,
    name,
    content,
    createdAt: Date.now()
  })
}

export default createDocument;
