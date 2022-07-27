import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "utils/auth";
import { client as mongoClient } from "lib/mongodb";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
  }

  const client = await mongoClient;
  const db = await client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    return res.status(422).json({ message: "User exists already!" });
    client.close();
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    verified: false,
  });

  return res.status(201).json({ message: "Created user!" });
  client.close();
};

export default handler;
