import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(32).optional(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  CODE_HMAC_SECRET: z.string().min(32).optional(),
  APP_ORIGIN: z.string().url().optional().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional().default("no-reply@sungrowpower.com"),
});

export const env = envSchema.parse(process.env);
