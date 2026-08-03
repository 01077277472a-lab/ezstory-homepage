import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BriefcaseBusiness, CalendarDays, GraduationCap, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PhotoGallery } from "@/components/PhotoGallery";
import { expertise, stats } from "@/data/site";
import { lecturePhotos, personalPhotos } from "@/data/gallery";

const SCHEDULE_POST_URL = "https://blog.naver.com/alsemffp234/224102502021";

export const metadata: Metadata = { title: "회사소개" };

export default function AboutPage() {
  return <main><section className="sub-hero"><div className="container"><span className="eyebrow">ABOUT EZSTORY</span><h1>실무자의 문서가<br />조직의 성과로 이어지도록</h1><p>이지스토리는 AI 활용·비즈니스 라이팅·공공정책기획 실무교육과 컨설팅을 제공하는 전문 교육기관입니다.</p></div></section>
    <section className="section section--white"><div className="container about-grid"><div className="about-portrait"><Image src="/images/about-hero-lecturing.jpg" alt="강신정 대표 강의 진행 모습" fill sizes="(max-width: 800px) 100vw, 38vw" /></div><div className="about-copy"><span className="eyebrow">강신정 · 이지스토리 대표</span><h2>문서 작성법보다 먼저,<br />생각을 구조화하는 법을 설계합니다.</h2><p>이지스토리는 보고서·기획·공문서·보도자료·PPT 시각화·AI 업무혁신을 하나의 흐름으로 연결합니다. 문장을 다듬는 데서 끝내지 않고, 자료를 찾고 핵심을 구조화하며 한 장으로 시각화하고 AI로 반복 업무를 줄이는 전 과정을 교육 안에 담아 현장에서 바로 적용되도록 설계합니다.</p><p>AI 시대에는 더 빠른 초안보다 더 정확한 질문, 근거 검증, 조직 맥락에 맞는 판단이 중요합니다. 트렌드를 읽고, 논리로 설계하고, AI로 완성하는 실무 교육으로 기업과 공공기관의 문서 품질과 업무 생산성을 함께 높입니다.</p><div className="about-actions"><Link href="/downloads/ezstory-profile.pdf" className="button button--dark" target="_blank">교수진 프로필 PDF</Link><a href={SCHEDULE_POST_URL} className="button button--outline" target="_blank" rel="noreferrer"><CalendarDays size={17} /> 강의일정</a><Link href="/contact" className="text-link">교육 문의 <ArrowRight size={17} /></Link></div>
      <div className="about-personal"><span>대표 프로필 더 보기 · 사진을 누르면 원본을 볼 수 있어요</span><PhotoGallery photos={personalPhotos} variant="row" /></div>
      </div></div></section>
    <section className="stats-section"><div className="container stats-grid">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>
    <section className="section section--soft"><div className="container"><SectionHeading eyebrow="CAREER & EXPERTISE" title="교육·기획·홍보·AI를 연결하는 융합 전문성" /></div><div className="container profile-cards"><article><BriefcaseBusiness /><h3>현직</h3><p>이지스토리 대표<br />플랜업 코칭센터 대표<br />한국사회복지협의회 최우수강사<br />국가과학기술인력개발원 객원교수</p></article><article><GraduationCap /><h3>교육·연구</h3><p>고려대학교 언론대학원 석사(홍보 PR 전공)<br />전 대전보건대학교 겸임교수<br />전 마케팅칼리지 IMC 담당·컨설턴트</p></article><article><Award /><h3>프로젝트</h3><p>GS그룹 프로모션 기획·문화마케팅<br />포스텍 정부사업 1,700억 프로젝트 컨설팅<br />대한전선 칼럼니스트</p></article><article><MessageCircle /><h3>강의 강점</h3><p>개념을 명확히 구분하는 설명<br />실제 사례와 즉시 적용 가능한 TIP<br />발랄하고 몰입도 높은 실습 진행</p></article></div></section>
    <section className="section section--white"><div className="container"><SectionHeading eyebrow="LECTURE GALLERY" title="교육 현장 갤러리" description="공공기관·기업 실무교육 현장의 다양한 순간들입니다. 사진을 누르면 원본을 크게 보고 저장할 수 있습니다." /><PhotoGallery photos={lecturePhotos} variant="grid" /></div></section>
    <section className="section section--soft"><div className="container"><SectionHeading eyebrow="SPECIALTY" title="핵심 교육 분야" align="center" /><div className="expertise-tags expertise-tags--large">{expertise.map((item) => <span key={item}>{item}</span>)}</div></div></section>
  </main>;
}
