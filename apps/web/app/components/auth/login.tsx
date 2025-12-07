"use client";

import { account } from "@/lib/client/appwrite";
import { Account, ID } from "appwrite";
import { useRouter } from "next/navigation";

export function ClientLogin() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;

    const result = await account.createEmailToken({
      userId: ID.unique(),
      email,
    });

    router.push(`/login/verify?userId=${result.userId}`);
  };

  return (
    <form className="flex flex-col gap-4" action={handleSubmit}>
      <input
        name="email"
        type="email"
        defaultValue={"roeljanssen2002@gmail.com"}
        placeholder="Email"
        required
      />
      <button type="submit" className="cursor-pointer bg-green-400 px-4 py-2">
        Login OTP
      </button>
    </form>
  );
}
