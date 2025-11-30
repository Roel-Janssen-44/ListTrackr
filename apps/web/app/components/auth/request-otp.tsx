import { requestOTP } from "@server/mutations";

export function RequestOTP() {
  return (
    <form className="flex flex-col gap-4" action={requestOTP}>
      <input
        name="email"
        type="email"
        defaultValue={"roeljanssen2002@gmail.com"}
        placeholder="Email"
        required
      />
      <button type="submit" className="cursor-pointer bg-green-400 px-4 py-2">
        Send OTP
      </button>
    </form>
  );
}
