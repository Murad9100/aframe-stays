import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "af_admin";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET || "aframe-stays-secret";
  return crypto.createHash("sha256").update(`af:${password}:${secret}`).digest("hex");
}

export function expectedToken(): string {
  return makeToken(adminPassword());
}

export function verifyPassword(password: string): boolean {
  const a = Buffer.from(makeToken(password));
  const b = Buffer.from(expectedToken());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expectedToken();
}
