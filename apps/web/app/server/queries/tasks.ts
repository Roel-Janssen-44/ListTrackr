"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getTasks() {
  const { databases } = await createAdminClient();

  try {
    const response = await databases.listDocuments("listtrackr", "tasks");
    return response.documents.map((doc: any) => doc);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export { getTasks };

// "use server";

// import { createAdminClient } from "@/lib/server/appwrite";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// async function verifyOTP(formData: any) {
//   const userId = formData.get("userId");
//   const otp = formData.get("otp");

//   const { account } = await createAdminClient();

//   // Finalize OTP login
//   const session = await account.createSession({
//     userId: userId,
//     secret: otp,
//   });

//   const cookiesStore = await cookies();
//   cookiesStore.set("my-custom-session", session.secret, {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/dashboard");
// }

// export { verifyOTP };
