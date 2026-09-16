import { setDefaultResultOrder, setServers } from "node:dns";
import { env } from "node:process";
import { MongoClient } from "mongodb";

setDefaultResultOrder("ipv4first");
setServers(["1.1.1.1", "8.8.8.8"]);

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
  mongoClientPromise?: Promise<MongoClient>;
};

function readMongoUri() {
  const raw = env.MONGODB_URI ?? env.MONGO_URI ?? "";
  const uri = raw.trim().replace(/^["']|["']$/g, "");
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (/^https?:\/\//i.test(uri)) {
    throw new Error("MONGODB_URI is a website URL, not a MongoDB connection string");
  }
  return uri;
}

function getClientPromise() {
  const uri = readMongoUri();

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 15_000,
      connectTimeoutMS: 15_000,
      tls: true,
    });
    globalForMongo.mongoClientPromise = client.connect().then((connected) => {
      globalForMongo.mongoClient = connected;
      return connected;
    }).catch((error) => {
      globalForMongo.mongoClientPromise = undefined;
      globalForMongo.mongoClient = undefined;
      throw error;
    });
  }

  return globalForMongo.mongoClientPromise;
}

export async function getDb() {
  const client = globalForMongo.mongoClient ?? (await getClientPromise());
  return client.db("shenu-afree");
}

export function mongoFailReason(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("MONGODB_URI is not set")) {
    return "missing_uri";
  }
  if (message.includes("website URL")) {
    return "invalid_uri";
  }
  if (/auth|authentication|bad auth|credentials|scram/i.test(message)) {
    return "auth_failed";
  }
  return "connect_failed";
}
