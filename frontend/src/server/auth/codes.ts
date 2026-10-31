import crypto from "crypto";

export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export function hashCode(code: string, purpose: string, email: string): string {
  const secret =
    process.env.CODE_HMAC_SECRET ||
    "sungrow_code_hmac_secret_key_minimum_32_characters_dev_2026";
  const normalizedEmail = email.trim().toLowerCase();
  return crypto
    .createHmac("sha256", secret)
    .update(`${normalizedEmail}:${purpose}:${code.trim()}`)
    .digest("hex");
}
