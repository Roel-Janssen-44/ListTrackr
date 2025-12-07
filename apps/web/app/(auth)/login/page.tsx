import { ClientLogin } from "@components/auth/client-login";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div>
        <h1 className="mb-8 text-2xl font-bold">Client login page</h1>
        <ClientLogin />
      </div>
    </div>
  );
}
