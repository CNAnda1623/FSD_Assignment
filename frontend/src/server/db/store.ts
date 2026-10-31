import fs from "fs";
import path from "path";
import crypto from "crypto";
import { hashCode } from "../auth/codes";
import { hashPassword } from "../auth/passwords";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  region: string;
  role: string;
  createdAt: string;
}

export interface VerificationCodeRecord {
  email: string;
  codeHash: string;
  purpose: string;
  expiresAt: number;
  lastSentAt: number;
  attempts: number;
}

export interface RefreshTokenRecord {
  jti: string;
  userId: string;
  tokenHash: string;
  expiresAt: number;
}

interface DBState {
  users: Record<string, UserRecord>;
  codes: Record<string, VerificationCodeRecord>;
  tokens: Record<string, RefreshTokenRecord>;
}

const DB_FILE = path.join(process.cwd(), ".sungrow_store.json");

function loadFromDisk(): DBState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Could not load local db file:", err);
  }
  return { users: {}, codes: {}, tokens: {} };
}

function saveToDisk(state: DBState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not save to local db file:", err);
  }
}

// Global in-memory cache to survive HMR in dev
declare global {
  // eslint-disable-next-line no-var
  var __sungrowDbState: DBState | undefined;
}

if (!global.__sungrowDbState) {
  global.__sungrowDbState = loadFromDisk();

  // Seed demo user if no users exist
  const existingUsers = Object.keys(global.__sungrowDbState.users);
  if (existingUsers.length === 0) {
    hashPassword("Password123!").then((hashed) => {
      const seedUser: UserRecord = {
        id: "seed-user-1",
        email: "jane@example.com",
        passwordHash: hashed,
        firstName: "Jane",
        lastName: "Doe",
        region: "India",
        role: "For Home",
        createdAt: new Date().toISOString(),
      };
      if (global.__sungrowDbState) {
        global.__sungrowDbState.users["jane@example.com"] = seedUser;
        saveToDisk(global.__sungrowDbState);
      }
    });
  }
}

const state = global.__sungrowDbState;

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalized = email.trim().toLowerCase();
  return state.users[normalized] || null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  for (const user of Object.values(state.users)) {
    if (user.id === id) return user;
  }
  return null;
}

export async function createUser(
  data: Omit<UserRecord, "id" | "createdAt">
): Promise<UserRecord> {
  const normalized = data.email.trim().toLowerCase();
  const id = crypto.randomUUID();
  const user: UserRecord = {
    ...data,
    id,
    email: normalized,
    createdAt: new Date().toISOString(),
  };
  state.users[normalized] = user;
  saveToDisk(state);
  return user;
}

export async function updateUserPassword(
  email: string,
  newPasswordHash: string
): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const user = state.users[normalized];
  if (!user) return false;
  user.passwordHash = newPasswordHash;
  saveToDisk(state);
  return true;
}

export async function deleteUser(id: string): Promise<boolean> {
  for (const [email, user] of Object.entries(state.users)) {
    if (user.id === id) {
      delete state.users[email];
      saveToDisk(state);
      return true;
    }
  }
  return false;
}

export function canSendCode(
  email: string,
  purpose: string
): { allowed: boolean; waitSeconds?: number } {
  const normalized = email.trim().toLowerCase();
  const key = `${normalized}:${purpose}`;
  const existing = state.codes[key];
  if (!existing) return { allowed: true };

  const now = Date.now();
  const elapsed = (now - existing.lastSentAt) / 1000;
  if (elapsed < 60) {
    return { allowed: false, waitSeconds: Math.ceil(60 - elapsed) };
  }
  return { allowed: true };
}

export function saveVerificationCode(
  email: string,
  code: string,
  purpose: string
): void {
  const normalized = email.trim().toLowerCase();
  const key = `${normalized}:${purpose}`;
  const codeHash = hashCode(code, purpose, normalized);
  state.codes[key] = {
    email: normalized,
    codeHash,
    purpose,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    lastSentAt: Date.now(),
    attempts: 0,
  };
  saveToDisk(state);
}

export function verifyVerificationCode(
  email: string,
  code: string,
  purpose: string
): boolean {
  const normalized = email.trim().toLowerCase();
  const key = `${normalized}:${purpose}`;
  const record = state.codes[key];
  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    delete state.codes[key];
    saveToDisk(state);
    return false;
  }

  record.attempts += 1;
  const hash = hashCode(code, purpose, normalized);
  if (record.codeHash === hash) {
    delete state.codes[key];
    saveToDisk(state);
    return true;
  }

  if (record.attempts >= 5) {
    delete state.codes[key];
  }
  saveToDisk(state);
  return false;
}

export function saveRefreshToken(
  jti: string,
  userId: string,
  token: string,
  expiresAt: number
): void {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  state.tokens[jti] = { jti, userId, tokenHash, expiresAt };
  saveToDisk(state);
}

export async function verifyAndConsumeRefreshToken(
  jti: string,
  token: string
): Promise<UserRecord | null> {
  const record = state.tokens[jti];
  if (!record) return null;

  delete state.tokens[jti];
  saveToDisk(state);

  if (Date.now() > record.expiresAt) return null;

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  if (tokenHash !== record.tokenHash) return null;

  return findUserById(record.userId);
}

export function revokeRefreshToken(jti: string): void {
  if (state.tokens[jti]) {
    delete state.tokens[jti];
    saveToDisk(state);
  }
}
