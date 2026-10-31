import { NextResponse } from "next/server";
import { z } from "zod";
import {
  findUserByEmail,
  verifyVerificationCode,
  createUser,
} from "@/server/db/store";
import { hashPassword } from "@/server/auth/passwords";
import { setAuthCookies } from "@/server/auth/cookies";

const loginCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4),
  rememberMe: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginCodeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { email, code, rememberMe } = result.data;
    const isCodeValid = verifyVerificationCode(email, code, "login");
    if (!isCodeValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    let user = await findUserByEmail(email);
    if (!user) {
      // Auto-provision user for email code login if not registered yet
      const placeholderHash = await hashPassword("Welcome123!");
      user = await createUser({
        email,
        passwordHash: placeholderHash,
        firstName: email.split("@")[0] || "User",
        lastName: "",
        region: "India",
        role: "For Home",
      });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`.trim() || user.email.split("@")[0] || "User",
      role: user.role,
    };

    await setAuthCookies(tokenPayload, rememberMe);

    return NextResponse.json({
      success: true,
      user: tokenPayload,
    });
  } catch (err) {
    console.error("login-code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
