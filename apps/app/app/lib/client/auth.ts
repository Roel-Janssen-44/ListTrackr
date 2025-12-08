import { account } from "./appwrite";

export async function getUser(): Promise<any> {
  try {
    const user = await account.get();

    console.log("Authenticated user:", user);
    return user;
  } catch {
    throw new Error("User is not authenticated");
  }
}
