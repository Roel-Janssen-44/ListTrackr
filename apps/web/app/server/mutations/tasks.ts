"use server";

import { createAdminClient } from "@/server/appwrite";

export async function createTask(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;

  console.log("Creating task with title:", title);

  const { databases } = await createAdminClient();

  await databases.createDocument("listtrackr", "tasks", "unique()", {
    Title: title,
  });

  return {
    message: `Created task: ${title}`,
  };
}
