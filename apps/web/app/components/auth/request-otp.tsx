export function RequestOTP() {
  return (
    <form className="flex flex-col gap-4" action={requestOTP}>
      <input
        name="email"
        type="email"
        defaultValue={"roeljanssen2002@gmail.com"}
        placeholder="Email"
        required
      />
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

  const { account } = await createAdminClient();

  const token = await account.createEmailToken({
    userId: ID.unique(),
    email,
  });

  redirect(`/verify?userId=${token.userId}`);

  //   // Redirect to OTP input page
  //   redirect(`/verify?email=${encodeURIComponent(email)}`);
}
