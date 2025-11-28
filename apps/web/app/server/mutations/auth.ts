"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function verifyOTP(formData: any) {
  const userId = formData.get("userId");
  const otp = formData.get("otp");

  const { account } = await createAdminClient();

  // Finalize OTP login
  const session = await account.createSession({
    userId: userId,
    secret: otp,
  });

  const cookiesStore = await cookies();
  cookiesStore.set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/dashboard");
}

export { verifyOTP };
