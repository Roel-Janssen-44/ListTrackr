"use server";

import { createAdminClient } from "@/server/appwrite";

async function getTasks() {
  const { databases } = await createAdminClient();

  try {
    const response = await databases.listDocuments("listtrackr", "tasks");
    return response.documents.map((doc: any) => doc);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export { getTasks };
