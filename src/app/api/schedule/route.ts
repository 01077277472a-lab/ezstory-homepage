import { NextResponse } from "next/server";
import { scheduleEntrySchema } from "@/lib/schedule-schema";
import { addScheduleEntry, checkSchedulePassword, listScheduleEntries } from "@/lib/schedule-store";

export async function GET() {
  const events = await listScheduleEntries();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  try {
    const parsed = scheduleEntrySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message || "입력 내용을 확인해 주세요." }, { status: 400 });
    }
    const { password, ...input } = parsed.data;
    if (!checkSchedulePassword(password)) {
      return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
    const entry = await addScheduleEntry(input);
    return NextResponse.json({ message: "일정이 등록되었습니다.", event: entry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "일정 등록 중 오류가 발생했습니다." }, { status: 500 });
  }
}
