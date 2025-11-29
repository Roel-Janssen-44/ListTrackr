import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  const cookiesStore = await cookies();
  cookiesStore.delete("my-custom-session");
  await account.deleteSession({ sessionId: "current" });

  redirect("/login");
}

export default async function HomePage() {
  const user = await getLoggedInUser();

  return (
    <>
      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>ID: </strong> {user.$id}
        </li>
      </ul>

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
