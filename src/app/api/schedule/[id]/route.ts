import { NextResponse } from "next/server";
import { checkSchedulePassword, deleteScheduleEntry } from "@/lib/schedule-store";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  if (!checkSchedulePassword(password)) {
    return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  await deleteScheduleEntry(id);
  return NextResponse.json({ message: "일정이 삭제되었습니다." });
}
