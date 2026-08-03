import type { Metadata } from "next";
import { CurriculumGenerator } from "@/components/CurriculumGenerator";
export const metadata: Metadata = { title: "맞춤 커리큘럼 자동 설계" };
export default function CurriculumPage() { return <main><section className="sub-hero sub-hero--ai"><div className="container"><span className="eyebrow">AI CURRICULUM BUILDER</span><h1>조건을 입력하면<br />교육과정의 뼈대를 설계합니다.</h1><p>자동 생성 결과는 사전 검토용입니다. 실제 제안은 기관 자료와 교육 목적을 확인한 뒤 강사가 직접 고도화합니다.</p></div></section><section className="section section--soft"><div className="container"><CurriculumGenerator /></div></section></main>; }
