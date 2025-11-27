export function RequestOTP() {
  return (
    <form className="flex flex-col gap-4" action={requestOTP}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="name" type="text" placeholder="Name" required />
      <button type="submit" className="cursor-pointer bg-green-400 px-4 py-2">
        Send OTP
      </button>
    </form>
  );
}

import { createAdminClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import { redirect } from "next/navigation";

async function requestOTP(formData) {
  "use server";

  const email = formData.get("email");
  const name = formData.get("name");

  const { account } = await createAdminClient();

  // Create user (no password)
  await account.create(ID.unique(), email, null, name);

  // Create OTP session
  const token = await account.createEmailToken({
    userId: email, // Appwrite uses the email as identifier for tokens
    email,
  });

  // Redirect to OTP input page
  redirect(`/verify?email=${encodeURIComponent(email)}`);
}
