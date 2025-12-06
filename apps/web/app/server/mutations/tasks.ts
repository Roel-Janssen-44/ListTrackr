"use server";

import { createAdminClient } from "@/server/appwrite";

export async function createTask(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;

  console.log("Creating task with title:", title);

  const { databases } = await createAdminClient();

  await databases.createDocument(
    "692f35d50020eb18445f",
    "692f35df00138a2df0b2",
    "unique()",
    {
      Title: title,
    },
  );

  return {
    message: `Created task: ${title}`,
  };
}
