import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearAuthCookies } from "@/server/auth/cookies";
import { revokeRefreshToken } from "@/server/db/store";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const rtCookie = cookieStore.get("sg_rt")?.value;
    if (rtCookie) {
      const [jti] = rtCookie.split(":");
      if (jti) {
        revokeRefreshToken(jti);
      }
    }
    await clearAuthCookies();
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
