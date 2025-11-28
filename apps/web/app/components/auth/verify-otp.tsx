"use client";

import { verifyOTP } from "@server/mutations/auth";
import { useSearchParams } from "next/navigation";

export function VerifyOTPForm() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  return (
    <form action={verifyOTP}>
      <input name="otp" type="text" placeholder="Enter OTP" required />

      <input type="hidden" name="userId" value={userId!} />

      <button type="submit">Verify OTP</button>
    </form>
  );
}
