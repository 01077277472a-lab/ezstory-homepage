import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "ezstory_admin";

function createToken(password: string) {
  const secret = process.env.ADMIN_COOKIE_SECRET || "development-secret";
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const a = Buffer.from(createToken(password));
  const b = Buffer.from(createToken(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function setAdminCookie() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD가 설정되지 않았습니다.");
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdmin() {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === createToken(expected);
}
