import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { Document } from "lib/db/types";
import { BSONTypeError } from "bson";
import { getSession } from "next-auth/react";
import { findUser } from "lib/db";
import { client as mongoClient } from "lib/mongodb";
import { Db } from "mongodb";
import { ObjectId } from "bson";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (req.method !== "GET") {
    res.status(404).send("Not found")
  }

  if (!session) {
    res.status(403).send("Unauthorized");
    return;
  }

  const email = session?.user?.email as string;
  const user = await findUser({ email });

  if (!user) {
    res.status(401).send("Invalid user");
    return;
  }

  const userId = user._id;

  const client = await mongoClient;
  const database: Db = await client.db();
  const documents = await database.collection<Document>("documents");

  const docs = await documents.find<Document>({ userId }).toArray();

  res.json(docs);
};

export default handler;
