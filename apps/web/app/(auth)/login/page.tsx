// import { OTP } from "@components/auth/otp";
import { RequestOTP } from "@components/auth/request-otp";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div>
        {/* <OTP /> */}
        <h1 className="mb-8 text-2xl font-bold">Login page</h1>
        <RequestOTP />
      </div>
    </div>
  );
}
