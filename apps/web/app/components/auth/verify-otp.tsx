export default function VerifyOTPForm({ email }) {
  return (
    <form action={verifyOTP}>
      <input name="otp" type="text" placeholder="Enter OTP" required />

      <input type="hidden" name="email" value={email} />

      <button type="submit">Verify OTP</button>
    </form>
  );
}

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function verifyOTP(formData) {
  "use server";

  const email = formData.get("email");
  const otp = formData.get("otp");

  const { account } = await createAdminClient();

  // Finalize OTP login
  const session = await account.createSession({
    userId: email,
    secret: otp,
  });

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/account");
}
