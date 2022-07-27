import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { Document } from "lib/db/types"; 
import { BSONTypeError } from "bson";
import { getSession } from "next-auth/react";
import { findUser } from "lib/db";
import { client as mongoClient } from "lib/mongodb";
import { ObjectId, Db } from "mongodb";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { id } = req.query;

  if (req.method !== "GET") {
    res.status(404).send("Invalid HTTP Method");
  }

  if (!session) {
    res.status(403).send("Unauthorized");
  }

  if (!id) {
    res.status(401).send("Id is required");
  }

  const email = session?.user?.email as string;
  const user = await findUser({ email });

  if (!user) {
    res.status(401).send("Invalid user");
  }

  try {
    let objId = new ObjectId(id as string);
  } catch (error) {
    if (error instanceof BSONTypeError) {
      res.status(401).send("Invalid ID");
      return;
    }
    
    return;
  }

  const objectId = new ObjectId(id as string);

  const client = await mongoClient;
  const database: Db = await client.db();
  const documents = await database.collection<Document>("documents");
  const doc = await documents.findOne({ _id: objectId });

  if (!doc) {
    res.status(404).send("Document not found");
    return;
  }

  res.json(doc);
}

export default handler;
