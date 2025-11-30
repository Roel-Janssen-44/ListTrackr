"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

async function requestOTP(formData: any) {
  const email = formData.get("email");

  const { account } = await createAdminClient();

  const token = await account.createEmailToken({
    userId: ID.unique(),
    email,
  });

  redirect(`/verify?userId=${token.userId}`);
}

async function verifyOTP(formData: any) {
  const userId = formData.get("userId");
  const otp = formData.get("otp");

  const { account } = await createAdminClient();

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

export { verifyOTP, requestOTP };
