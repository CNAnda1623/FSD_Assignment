import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { verifyAccessToken } from "@/server/auth/jwt";
import { deleteUser, findUserByEmail, verifyVerificationCode } from "@/server/db/store";
import { clearAuthCookies } from "@/server/auth/cookies";

const deleteAccountSchema = z.object({
  email: z.string().email().optional(),
  code: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sg_at")?.value;
    let userId: string | null = null;

    if (token) {
      const payload = await verifyAccessToken(token);
      if (payload) {
        userId = payload.id;
      }
    }

    const body = await req.json().catch(() => ({}));
    const parsed = deleteAccountSchema.safeParse(body);

    if (!userId && parsed.success && parsed.data.email && parsed.data.code) {
      const isValid = verifyVerificationCode(
        parsed.data.email,
        parsed.data.code,
        "delete-account"
      );
      if (isValid) {
        const u = await findUserByEmail(parsed.data.email);
        if (u) userId = u.id;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized or invalid confirmation" },
        { status: 401 }
      );
    }

    await deleteUser(userId);
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
      message: "Account has been successfully deleted.",
    });
  } catch (err) {
    console.error("delete-account error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
