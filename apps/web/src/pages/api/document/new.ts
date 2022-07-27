import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { findUser, createDocument } from "lib/db";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method !== "POST") {
    res.status(404).send("Invalid HTTP Method");
  }

  if (!session) {
    res.status(403).send("Unauthorized");
  }

  const { email } = session?.user;
  const user = await findUser({ email });

  if (!user) {
    res.status(401).send("Invalid user");
  }

  const userId = user?._id;

  const doc = await createDocument({
    userId
  })

  res.json(doc);
}

export default handler;
