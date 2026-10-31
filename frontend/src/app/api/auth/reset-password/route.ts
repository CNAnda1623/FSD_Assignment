import { NextResponse } from "next/server";
import { z } from "zod";
import {
  findUserByEmail,
  verifyVerificationCode,
  updateUserPassword,
} from "@/server/db/store";
import { hashPassword } from "@/server/auth/passwords";

const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4),
  newPassword: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, code, newPassword } = result.data;
    const isCodeValid = verifyVerificationCode(email, code, "reset-password");
    if (!isCodeValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "User not found with this email." },
        { status: 404 }
      );
    }

    const newHash = await hashPassword(newPassword);
    await updateUserPassword(email, newHash);

    return NextResponse.json({
      success: true,
      message: "Password has been successfully reset.",
    });
  } catch (err) {
    console.error("reset-password error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
