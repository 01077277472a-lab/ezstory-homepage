export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { AdminInquiryTable } from "@/components/AdminInquiryTable";
import { isAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
export default async function AdminInquiriesPage() { if (!(await isAdmin())) redirect("/admin/login"); const supabase = getSupabaseAdmin(); let items: any[] = []; let setupError = ""; if (supabase) { const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(200); if (error) setupError = error.message; else items = data || []; } else setupError = "Supabase 환경변수가 설정되지 않았습니다."; return <main className="admin-page"><div className="container admin-header"><div><span className="eyebrow">ADMIN</span><h1>교육 문의 관리</h1></div><form action="/api/admin/logout" method="post"><button className="button button--dark">로그아웃</button></form></div><div className="container">{setupError ? <p className="form-message form-message--error">{setupError}</p> : <AdminInquiryTable initialItems={items} />}</div></main>; }
