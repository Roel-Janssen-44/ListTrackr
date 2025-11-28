import { VerifyOTPForm } from "@components/auth/verify-otp";

export default function VerifyOTPPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div>
        <h1 className="mb-8 text-2xl font-bold">Login page</h1>
        <VerifyOTPForm />
      </div>
    </div>
  );
}
