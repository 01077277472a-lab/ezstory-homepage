import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock3, Download, Users } from "lucide-react";
import { programs, getProgram } from "@/data/programs";

export function generateStaticParams() { return programs.map((program) => ({ slug: program.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const program = getProgram(slug); return { title: program?.title || "교육과정" }; }

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const program = getProgram(slug); if (!program) notFound();
  return <main><section className={`program-hero program-hero--${program.accent}`}><div className="container"><span>{program.category}</span><h1>{program.title}</h1><p>{program.summary}</p><div className="program-hero__meta"><span><Users /> {program.audience.join(" · ")}</span><span><Clock3 /> {program.duration.join(" · ")}</span></div><div className="program-hero__actions"><Link href="/contact" className="button button--white button--large">이 과정 문의하기 <ArrowRight size={18} /></Link><a href={`/downloads/curriculum/${program.slug}.pdf`} download className="button button--glass button--large"><Download size={18} /> 커리큘럼 PDF 다운로드</a></div></div></section>
    <section className="section section--white"><div className="container program-detail-grid"><aside><h2>교육 결과물</h2>{program.outcomes.map((item) => <p key={item}><CheckCircle2 size={19} /> {item}</p>)}<div className="program-note">교육 대상과 실제 문서를 확인한 뒤 사례·실습·피드백 비중을 최종 조정합니다.</div></aside><div><h2>세부 교육 모듈</h2><div className="detail-modules">{program.modules.map((module, index) => <article key={module.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{module.title}</h3><ul>{module.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article>)}</div></div></div></section>
    <section className="section simple-cta"><div className="container"><div><h2>같은 과정도 조직마다 달라야 합니다.</h2><p>교육대상·시간·현업 과제를 알려주시면 맞춤 운영안을 제안합니다.</p></div><Link href="/curriculum" className="button button--primary">맞춤 커리큘럼 미리 만들기</Link></div></section></main>;
}
