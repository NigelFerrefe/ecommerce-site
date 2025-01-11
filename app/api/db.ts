import dotenv from "dotenv";
dotenv.config();

import { MongoClient, Db, ServerApiVersion } from "mongodb";

//We gonna create cachedclient to avoid creating a new client for each request
//Also cachedb to avoid creating a new db for each request
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
//Because if we have a connection stablished, we don't need to reastablish it again for each request

export async function connectToMongoDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.6im0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  // This is optional, but it is recommended to set the stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();

  cachedClient = client;
  cachedDb = client.db('ecommerce-netxjs');

  return { client, db: client.db('ecommerce-netxjs') };
}
//This function connects to the MongoDB database and closes the connection when the function finishes
//That's why we use try and finally to ensure that the client will close when we finish or error
