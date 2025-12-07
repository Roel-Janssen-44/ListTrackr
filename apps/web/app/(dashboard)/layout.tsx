"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { account } from "@/lib/client/appwrite";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const loggedInUser: any = await account.get();
        setUser(loggedInUser);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  if (loading) return null;

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
