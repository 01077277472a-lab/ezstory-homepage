import type { Metadata } from "next";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { listScheduleEntries } from "@/lib/schedule-store";

export const metadata: Metadata = { title: "강의 일정" };
export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const events = await listScheduleEntries();

  return (
    <main>
      <section className="sub-hero sub-hero--ai">
        <div className="container">
          <span className="eyebrow eyebrow--light">LIVE SCHEDULE</span>
          <h1>강의 일정을<br />실시간으로 확인하세요.</h1>
          <p>확정·예정 교육 일정을 한눈에 보여드립니다. 일정 등록은 비밀번호를 아는 담당자만 가능합니다.</p>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <ScheduleCalendar initialEvents={events} />
        </div>
      </section>
    </main>
  );
}
