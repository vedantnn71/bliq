import type { Db } from "mongodb";
import { User } from "./types";
import { client as mongoClient } from "../mongodb";

interface FindUserParams {
  email: string;
}

const findUser = async ({ email }: FindUserParams) => {
  const client = await mongoClient;
  const database: Db = await client.db();
  const users = await database.collection<User>("users");
  const user = await users.findOne({ email });

  return user;
}

export default findUser;
