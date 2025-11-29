"use client";

import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@hooks";
import Link from "next/link";

export function OTP() {
  const { current, loading, login, logout, register } = useAuth();

  const [email, setEmail] = useState("roeljanssen2002@gmail.com");
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("request"); // request | verify

  // 1️⃣ Send OTP email
  const sendOtp = async () => {
    try {
      const result = await account.createEmailToken({
        userId: ID.unique(), // must be saved for verification step
        email,
      });

      setUserId(result.userId);
      setStage("verify");
      console.log("OTP sent:", result);
    } catch (err) {
      console.error(err);
    }
  };

  // 2️⃣ Verify OTP and create session
  const verifyOtp = async () => {
    try {
      const session = await account.createSession({
        userId,
        secret: otp,
      });

      console.log("Logged in:", session);
      alert("OTP verified! You are now logged in.");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  console.log("current");
  console.log(current);

  return (
    <div>
      <h1>OTP Login</h1>
      <nav className="main-header u-padding-inline-end-0">
        <h3 className="u-stretch eyebrow-heading-1">Idea Tracker</h3>
        {current ? (
          <div className="main-header-end u-margin-inline-end-16">
            <p>{current.providerUid}</p>
            <button
              className="bg-red-500 px-4 py-2"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="u-margin-inline-end-16 bg-green-500 px-4 py-2"
          >
            Login
          </Link>
        )}
      </nav>

      {stage === "request" && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      )}

      {stage === "verify" && (
        <>
          <p>OTP sent to {email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="button" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
