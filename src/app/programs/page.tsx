import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionHeading } from "@/components/SectionHeading";
import { programs } from "@/data/programs";

export const metadata: Metadata = { title: "교육과정" };
export default function ProgramsPage() { return <main><section className="sub-hero"><div className="container"><span className="eyebrow">PROGRAMS</span><h1>교육이 끝난 날,<br />업무 결과물이 남습니다.</h1><p>기본 과정은 출발점입니다. 기관의 실제 문서, 대상자의 수준, 교육시간에 따라 사례와 실습을 재설계합니다.</p></div></section><section className="section section--soft"><div className="container"><SectionHeading eyebrow="CORE PROGRAM" title="대표 교육과정 9종" description="과정을 선택하면 세부 모듈, 추천 대상, 교육 결과물을 확인할 수 있습니다." /></div><div className="container program-grid">{programs.map((program) => <ProgramCard key={program.slug} program={program} />)}</div></section>
    <section className="section section--white"><div className="container"><SectionHeading eyebrow="CURRICULUM LIBRARY" title="주제별 커리큘럼 다운로드" description="각 과정의 상세 커리큘럼을 PDF로 내려받을 수 있습니다." /><div className="curriculum-downloads">{programs.map((program) => <a key={program.slug} href={`/downloads/curriculum/${program.slug}.pdf`} download className="curriculum-download"><div><span>{program.category}</span><strong>{program.title}</strong></div><Download size={20} /></a>)}</div></div></section></main>; }
