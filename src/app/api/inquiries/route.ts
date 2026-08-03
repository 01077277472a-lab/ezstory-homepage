import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const parsed = inquirySchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "입력 내용을 확인해 주세요." }, { status: 400 });
    const input = parsed.data;
    if (input.website) return NextResponse.json({ message: "접수되었습니다." });

    const record = {
      organization: input.organization, contact_name: input.contactName, email: input.email, phone: input.phone,
      organization_type: input.organizationType, audience: input.audience, topic: input.topic, duration: input.duration,
      preferred_date: input.preferredDate, delivery_format: input.deliveryFormat, participants: input.participants,
      requirements: input.requirements, privacy_agreed: input.privacy,
    };

    const supabase = getSupabaseAdmin();
    let stored = false;
    if (supabase) {
      const { error } = await supabase.from("inquiries").insert(record);
      if (error) throw new Error(`문의 저장 실패: ${error.message}`);
      stored = true;
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_TO_EMAIL;
    if (resendKey && to) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({ from: process.env.INQUIRY_FROM_EMAIL || "이지스토리 홈페이지 <onboarding@resend.dev>", to: [to], reply_to: input.email, subject: `[이지스토리 교육문의] ${input.organization} · ${input.topic}`, html: `<h2>새 교육 문의</h2><p><b>기관:</b> ${input.organization}</p><p><b>담당자:</b> ${input.contactName}</p><p><b>연락:</b> ${input.email} / ${input.phone}</p><p><b>주제:</b> ${input.topic}</p><p><b>대상:</b> ${input.audience || "미입력"}</p><p><b>시간·일정:</b> ${input.duration || "미정"} / ${input.preferredDate || "미정"}</p><p><b>요구사항:</b><br>${input.requirements.replace(/\n/g, "<br>")}</p>` }),
      });
      if (!emailResponse.ok) console.error("Resend failure", await emailResponse.text());
    }

    if (!stored && !(resendKey && to)) {
      console.info("[DEMO INQUIRY]", record);
      return NextResponse.json({ message: "현재 데모 모드입니다. 운영 전 Supabase 또는 이메일 알림을 연결해 주세요." });
    }
    return NextResponse.json({ message: "문의가 접수되었습니다. 확인 후 연락드리겠습니다." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "문의 접수 중 오류가 발생했습니다. 이메일 또는 전화로 문의해 주세요." }, { status: 500 });
  }
}
