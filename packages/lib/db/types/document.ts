import { ObjectId } from "mongodb";

interface Document {
  userId: ObjectId;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export default Document;
