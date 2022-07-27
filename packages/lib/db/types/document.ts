import { ObjectId } from "mongodb";

interface Document {
  userId: ObjectId;
  name: string;
  content: string;
  createdAt: Date | number;
  updatedAt?: Date | number;
}

export default Document;
