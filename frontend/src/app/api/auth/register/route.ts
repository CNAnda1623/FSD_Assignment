import { NextResponse } from "next/server";
import { z } from "zod";
import {
  findUserByEmail,
  createUser,
  verifyVerificationCode,
} from "@/server/db/store";
import { hashPassword } from "@/server/auth/passwords";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  region: z.string().min(1),
  role: z.string().min(1),
  code: z.string().min(4),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid registration data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, region, role, code } =
      result.data;

    // Verify emailed code
    const isCodeValid = verifyVerificationCode(email, code, "register");
    if (!isCodeValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    // Hash password & store user
    const passwordHash = await hashPassword(password);
    await createUser({
      email,
      passwordHash,
      firstName,
      lastName,
      region,
      role,
    });

    return NextResponse.json({
      success: true,
      message: "Registration Successful",
    });
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
