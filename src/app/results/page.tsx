import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCards } from "@/components/TestimonialCards";
import { evidenceMetrics } from "@/data/testimonials";

export const metadata: Metadata = { title: "교육성과" };
const evidenceImages = [
  { src: "/images/evidence-1.png", title: "11개 기수 평균 만족도 4.89점", description: "기수가 거듭될수록 높은 만족도를 기록한 공문서 과정 사례" },
  { src: "/images/evidence-2.png", title: "과정 총점 98.5점", description: "내용·강사·교재 각 100점, 강사 NPS 100% 사례" },
  { src: "/images/evidence-3.png", title: "보고서 작성 교육 후기", description: "보고서 오류 찾기, 8하원칙, 1문장 1정보 등 실습 후기" },
  { src: "/images/evidence-4.png", title: "직접 전달된 장문 후기", description: "경력자도 다시 성장할 수 있었다는 프로포절 교육 피드백" },
  { src: "/images/evidence-5.png", title: "교육담당자 피드백", description: "만족 이상 99%와 실무 적용성에 대한 정성 의견" },
];
export default function ResultsPage() { return <main><section className="sub-hero"><div className="container"><span className="eyebrow">RESULTS & REVIEWS</span><h1>숫자로 확인하고,<br />후기로 검증합니다.</h1><p>만족도, NPS, 교육담당자 메시지와 교육생의 구체적인 적용 후기를 함께 정리했습니다.</p></div></section>
  <section className="section section--white"><div className="container evidence-metrics evidence-metrics--large">{evidenceMetrics.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></div>)}</div></section>
  <section className="section section--soft"><div className="container"><SectionHeading eyebrow="EVIDENCE" title="교육담당자와 교육생이 보내온 실제 평가" description="기관명과 개인정보는 비식별 처리한 자료를 사용합니다." /></div><div className="container evidence-gallery">{evidenceImages.map((item) => <article key={item.src}><div><Image src={item.src} alt={item.title} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
  <section className="section section--testimonial"><div className="container"><SectionHeading eyebrow="REVIEWS" title="가장 많이 언급된 교육 강점" description="개념 구분, 실제 사례, 한 장 보고서, PPT 기능, 즉시 적용 가능한 피드백" align="center" /><TestimonialCards /></div></section></main>; }
