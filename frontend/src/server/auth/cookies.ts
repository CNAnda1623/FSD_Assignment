import { cookies } from "next/headers";
import crypto from "crypto";
import { signAccessToken, signRefreshToken, type TokenUserPayload } from "./jwt";
import { saveRefreshToken } from "../db/store";

export async function setAuthCookies(
  user: TokenUserPayload,
  rememberMe: boolean = false
): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  // 1. Access Token (15 minutes)
  const accessToken = await signAccessToken(user);
  cookieStore.set({
    name: "sg_at",
    value: accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  // 2. Refresh Token (30 days or 24 hours)
  const jti = crypto.randomUUID();
  const refreshToken = await signRefreshToken({ id: user.id, jti });
  const refreshMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

  saveRefreshToken(jti, user.id, refreshToken, Date.now() + refreshMaxAge * 1000);

  cookieStore.set({
    name: "sg_rt",
    value: `${jti}:${refreshToken}`,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: refreshMaxAge,
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  // Clear access token cookie at "/"
  cookieStore.set({
    name: "sg_at",
    value: "",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  cookieStore.delete("sg_at");

  // Clear refresh token cookie at "/api/auth"
  cookieStore.set({
    name: "sg_rt",
    value: "",
    path: "/api/auth",
    maxAge: 0,
    expires: new Date(0),
  });
  cookieStore.delete({
    name: "sg_rt",
    path: "/api/auth",
  });
  // Also delete at root path in case legacy cookie was set there
  cookieStore.delete("sg_rt");
}
