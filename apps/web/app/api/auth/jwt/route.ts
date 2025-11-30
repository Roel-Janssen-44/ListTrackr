import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";

// Create JWT token for client SDK of appwrite of the logged-in user
export async function GET() {
  // TODO: check security implications of JWT creation endpoint
  try {
    const { account } = await createSessionClient();

    const jwt = await account.createJWT();

    return NextResponse.json({ jwt: jwt.jwt });
  } catch (err) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
