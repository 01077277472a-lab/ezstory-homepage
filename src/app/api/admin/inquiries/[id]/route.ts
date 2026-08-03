import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
const schema = z.object({ status: z.enum(["new", "reviewing", "quoted", "confirmed", "closed"]) });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await isAdmin())) return NextResponse.json({ message: "권한이 없습니다." }, { status: 401 }); const { id } = await params; const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ message: "상태값 오류" }, { status: 400 }); const supabase = getSupabaseAdmin(); if (!supabase) return NextResponse.json({ message: "Supabase 미설정" }, { status: 500 }); const { error } = await supabase.from("inquiries").update({ status: parsed.data.status }).eq("id", id); if (error) return NextResponse.json({ message: error.message }, { status: 500 }); return NextResponse.json({ ok: true }); }
