import { SignJWT, jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET ||
    "sungrow_jwt_access_secret_key_minimum_32_characters_dev_2026_super_safe"
);

const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ||
    "sungrow_jwt_refresh_secret_key_minimum_32_characters_dev_2026_super_safe"
);

export interface TokenUserPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export async function signAccessToken(payload: TokenUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(ACCESS_SECRET);
}

export async function verifyAccessToken(token: string): Promise<TokenUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    return payload as unknown as TokenUserPayload;
  } catch {
    return null;
  }
}

export async function signRefreshToken(payload: { id: string; jti: string }): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(REFRESH_SECRET);
}

export async function verifyRefreshToken(
  token: string
): Promise<{ id: string; jti: string } | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload as unknown as { id: string; jti: string };
  } catch {
    return null;
  }
}
