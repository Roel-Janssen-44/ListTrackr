"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    console.log(error);
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check your email for the OTP");
};

export const verifyOTP = async (formData: FormData) => {
  "use server";
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error(error);
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/");
};
