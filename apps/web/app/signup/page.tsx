import SMSLogin from "@components/auth/sms-login";

export default async function Signup() {
  return (
    <div>
      <SMSLogin
        searchParams={{
          message: "asjdsa",
        }}
      />
    </div>
  );
}
