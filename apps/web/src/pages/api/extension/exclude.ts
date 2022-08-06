import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Extension, Exclude } from "./types";
import { client as mongoClient } from "lib/mongodb";
import { ObjectId } from "bson";
import { findUser } from "lib/db";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send("Unauthorized");
  }

  const email = session?.user?.email as string;
  const user = await findUser({ email });

  if (!user) {
    res.status(401).send("Invalid user");
  }

  const userId = user?._id as ObjectId;

  const client = await mongoClient;
  const db = await client.db();
  const extensions = await db.collection<Extension>("extensions");
  const extension = await extensions.findOne({ userId });
  
  if (extension === null) {
    await extensions.insertOne({ userId, excludedWebsites: [] })
  }

  const excludedWebsites = await extension?.excludedWebsites;
   
  if (req.method === "GET") {
    res.json(excludedWebsites);
    return;
  } else if (req.method === "POST") {
    const { url } = req.body;
    
    if (excludedWebsites?.filter(website => website?.url === url).length !== 0) {
      res.status(412).send("Already exists");
      return;
    }  

    excludedWebsites?.push({ url });
    
    const exclude = await extensions.updateOne(
      { userId },
      { $set: { excludedWebsites: excludedWebsites } }
    ); 
    
    res.json(exclude);
    return;
  } else if (req.method === "DELETE") {
    const { url } = req.body;
    
    if ((excludedWebsites || [])?.filter(website => website?.url === url).length === 0) {
      res.status(404).send("Doesn't exists");
      return;
    }

    const deletedWebsite = await extensions.updateOne({ userId }, {
      $set: {
        excludedWebsites: excludedWebsites.filter(website => website?.url !== url)
      }
    });


    res.json(deletedWebsite);
    return;
  }

  res.status(404).send("Invalid HTTP Method");
};

export default handler;
