import SMSLogin from "@components/auth/sms-login";

export default async function Login() {
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
