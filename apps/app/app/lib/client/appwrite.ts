import { Client, Account } from "appwrite";

export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  realtimeEndpoint: process.env.NEXT_PUBLIC_APPWRITE_REALTIME_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
