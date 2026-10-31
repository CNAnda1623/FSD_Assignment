import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRefreshToken } from "@/server/auth/jwt";
import { verifyAndConsumeRefreshToken } from "@/server/db/store";
import { setAuthCookies } from "@/server/auth/cookies";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const rtCookie = cookieStore.get("sg_rt")?.value;
    if (!rtCookie) {
      return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
    }

    const [jti, token] = rtCookie.split(":");
    if (!jti || !token) {
      return NextResponse.json({ error: "Invalid refresh token format" }, { status: 401 });
    }

    const verified = await verifyRefreshToken(token);
    if (!verified || verified.jti !== jti) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await verifyAndConsumeRefreshToken(jti, token);
    if (!user) {
      return NextResponse.json({ error: "Token revoked or expired" }, { status: 401 });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role,
    };

    await setAuthCookies(tokenPayload, true);

    return NextResponse.json({ success: true, user: tokenPayload });
  } catch (err) {
    console.error("refresh error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
