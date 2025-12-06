"use server";

import { createAdminClient } from "@/server/appwrite";

async function getTasks() {
  const { databases } = await createAdminClient();

  try {
    const response = await databases.listDocuments(
      "692f35d50020eb18445f",
      "692f35df00138a2df0b2",
    );
    return response.documents.map((doc: any) => doc);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export { getTasks };
