import { NextResponse } from "next/server";
import { setAdminCookie, verifyAdminPassword } from "@/lib/admin";
export async function POST(request: Request) { const form = await request.formData(); const password = String(form.get("password") || ""); if (!verifyAdminPassword(password)) return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303); await setAdminCookie(); return NextResponse.redirect(new URL("/admin/inquiries", request.url), 303); }
