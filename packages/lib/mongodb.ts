import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;
let client: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    // @ts-ignore
    client = new MongoClient(uri);
    // @ts-ignore
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  client = globalWithMongoClientPromise._mongoClientPromise;
} else {
  // @ts-ignore
  client = new MongoClient(uri);
  // @ts-ignore
  client = client.connect();
}

export { client };
