"use client";

import React, { useEffect, useState } from "react";
import { account, client } from "@/lib/client/appwrite";
import { useSearchParams } from "next/navigation";

export function VerrifyClientLogin() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  if (!userId) return "null";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const otp = (form.elements.namedItem("otp") as HTMLInputElement).value;
    const secret = otp;

    if (!userId) {
      return;
    }

    try {
      const result = await account.createSession({
        userId,
        secret,
      });

      console.log("Verification successful:", result);
    } catch (err: any) {
      console.error("Error during verification:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="otp" type="text" placeholder="Enter OTP" required />

      <input type="hidden" name="userId" value={userId!} />

      <button type="submit">Verify OTP</button>
    </form>
  );
}

export function CheckUserLoggedIn() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const accountData = await account.get();
        // @ts-expect-error
        setUser(accountData);
      } catch (err) {
        setUser(null);
        setError(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div>Checking login status...</div>;
  if (!user) return <div>User is NOT logged in.</div>;
  // @ts-expect-error
  return <div>Welcome, {user.name || user.email}!</div>;
}
