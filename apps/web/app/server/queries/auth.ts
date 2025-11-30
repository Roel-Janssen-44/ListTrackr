"use server";

import { createSessionClient } from "@/server/appwrite";

export async function getLoggedInUser(): Promise<any | null> {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
