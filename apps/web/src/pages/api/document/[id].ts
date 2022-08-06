import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { Document } from "lib/db/types";
import { BSONTypeError } from "bson";
import { getSession } from "next-auth/react";
import { findUser } from "lib/db";
import { client as mongoClient } from "lib/mongodb";
import { ObjectId, Db } from "mongodb";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  const { id } = req.query;

  if (!session) {
    res.status(403).send("Unauthorized");
    return;
  }

  if (!id) {
    res.status(401).send("Id is required");
    return;
  }

  const email = session?.user?.email as string;
  const user = await findUser({ email });

  if (!user) {
    res.status(401).send("Invalid user");
    return;
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
  const database: Db = client.db();
  const documents = database.collection<Document>("documents");

  if (req.method === "GET") {
    const doc = await documents.findOne({ _id: objectId });

    if (!doc) {
      res.status(404).send("Document not found");
      return;
    }

    res.json(doc);
    return;
  } else if (req.method === "PUT") {
    const { name, content } = req.body;
    let toUpdate: any = {};

    if (!name && !content) {
      res.status(400).send("Invalid data");
      return;
    }

    if (name) toUpdate.name = name;

    if (content) toUpdate.content = content;

    const doc = await documents.updateOne(
      { _id: objectId },
      { $set: toUpdate }
    );

    if (doc.matchedCount === 0) {
      res.status(404).send("Document not found");
      return;
    }

    res.send("Success");
    return;
  } else if (req.method === "DELETE") {
    const doc = await documents.deleteOne({ _id: objectId });

    if (doc.deletedCount === 0) {
      res.status(404).send("Document not found");
      return;
    }

    res.send("Success");
    return;
  }

  res.status(404).send("Invalid HTTP Method");
};

export default handler;
