"use client";

import Link from "next/link";
import { signIn, verifyOTP } from "@/mutations";
import { useState, useEffect } from "react";

export default function SMSLogin({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-xl">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute top-8 left-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            className="inline-flex"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back
      </Link>
      <h1 className="text-4xl font-bold">Sign in using email number</h1>
      <p className="text-foreground">
        {searchParams.message || "Sign in to your account"}
      </p>
      <form
        action={async (formData) => {
          if (otpSent) {
            await verifyOTP(formData);
          } else {
            try {
              await signIn(formData);
              setOtpSent(true);
            } catch (e) {
              console.error(e);
            }
          }
        }}
        className="flex flex-col gap-2"
      >
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="text-foreground">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            className="mb-2 rounded-md border bg-inherit px-4 py-2"
            placeholder="you@example.com"
            defaultValue={"test@gmail.com"}
          />
        </label>
        <label
          htmlFor="token"
          className={`flex flex-col gap-1 ${otpSent ? "" : "hidden"}`}
        >
          <span className="text-foreground">Your OTP</span>
          <input
            type="text"
            name="token"
            id="token"
            required={otpSent}
            placeholder="123456"
            className={`mb-2 rounded-md border bg-inherit px-4 py-2`}
          />
        </label>
        <button
          type="submit"
          className="text-foreground mb-2 max-w-max rounded-md bg-green-700 px-4 py-2 hover:bg-green-600"
        >
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>
        {otpSent && <ExpirationTimer />}
      </form>
    </div>
  );
}

const ExpirationTimer = () => {
  const expirationTime = 60;
  const [timeLeft, setTimeLeft] = useState(expirationTime);

  let id: any = null;

  useEffect(() => {
    if (timeLeft > 0) {
      id = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-between">
      <p className="text-foreground text-sm">
        {timeLeft > 0 ? `OTP expires in ${timeLeft} seconds` : "OTP expired!"}
      </p>
      <button
        className="text-foreground disabled:text-foreground/50 text-sm underline disabled:cursor-not-allowed"
        formAction={async (formData) => {
          await signIn(formData);
          setTimeLeft(expirationTime);
        }}
        disabled={timeLeft > 0}
      >
        Resend OTP
      </button>
    </div>
  );
};
