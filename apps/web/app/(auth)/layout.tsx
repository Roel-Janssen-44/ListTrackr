"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { account } from "@/lib/client/appwrite";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        await account.get();
        router.replace("/dashboard");
      } catch {
        setChecking(false);
      }
    }
    checkUser();
  }, [router]);

  if (checking) {
    return null;
  }

  return <>{children}</>;
}
