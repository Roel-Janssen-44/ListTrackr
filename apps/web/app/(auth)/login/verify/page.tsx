import { VerrifyClientLogin } from "@components/auth/verify";

export default function VerifyClientLoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div>
        <h1 className="mb-8 text-2xl font-bold">verify client login page</h1>
        <VerrifyClientLogin />
      </div>
    </div>
  );
}
