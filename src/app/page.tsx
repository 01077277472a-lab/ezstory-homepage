import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Check, Download, FileText, MessageSquareText, Presentation, Sparkles, Target } from "lucide-react";
import { ClientCloud } from "@/components/ClientCloud";
import { InquiryForm } from "@/components/InquiryForm";
import { ProgramCard } from "@/components/ProgramCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCards } from "@/components/TestimonialCards";
import { programs } from "@/data/programs";
import { evidenceMetrics } from "@/data/testimonials";
import { expertise, processSteps, siteConfig, stats } from "@/data/site";
import { getNaverFeed } from "@/lib/naver";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const insights = await getNaverFeed(3);
  return (
    <main>
      <section className="hero">
        <Image src="/images/hero-consultant.png" alt="이지스토리 강신정 강사" fill priority className="hero__image" />
        <video className="hero__video" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
        <div className="hero__sweep" />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <div className="hero__copy">
            <p className="hero__slogan">{siteConfig.slogan}</p>
            <h1>{siteConfig.heroTitle}</h1>
            <p className="hero__description">{siteConfig.heroDescription}</p>
            <div className="hero__actions">
              <Link href="/contact" className="button button--primary button--large">맞춤 교육 문의 <ArrowRight size={18} /></Link>
              <Link href="/programs" className="button button--glass button--large">대표 과정 보기</Link>
            </div>
            <div className="hero__chips">{expertise.slice(0, 5).map((item) => <span key={item}><Check size={14} /> {item}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="stats-section"><div className="container stats-grid">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>

      <section className="section section--white">
        <div className="container split-intro">
          <div><span className="eyebrow">WHY EZSTORY</span><h2>좋은 문서는 정보를 나열하지 않고,<br />의사결정의 흐름을 설계합니다.</h2></div>
          <div><p>이지스토리는 문장만 다듬는 교육을 넘어, 자료를 찾고 핵심을 구조화하며 한 장으로 시각화하고 AI로 반복 업무를 줄이는 전 과정을 연결합니다.</p><Link href="/about" className="text-link">강사와 교육 철학 보기 <ArrowRight size={17} /></Link></div>
        </div>
        <div className="container capability-grid">
          <article><FileText /><h3>문서 구조</h3><p>두괄식·개조식·표준 위계와 보고 흐름을 명확히 설계합니다.</p></article>
          <article><Target /><h3>기획 논리</h3><p>배경–문제–목표–전략–성과가 끊김 없이 연결되게 만듭니다.</p></article>
          <article><Presentation /><h3>시각화</h3><p>표·그래프·도식과 PPT 기능으로 한눈에 이해되는 문서를 만듭니다.</p></article>
          <article><Bot /><h3>AI 자동화</h3><p>자료조사·초안·검토·콘텐츠 전환을 안전하고 효율적으로 자동화합니다.</p></article>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container"><SectionHeading eyebrow="PROGRAM" title="현장에서 바로 쓰는 대표 교육과정" description="교육 대상과 시간, 실제 업무과제를 기준으로 과정별 모듈과 실습 비중을 맞춤 설계합니다." /></div>
        <div className="container program-grid">{programs.map((program) => <ProgramCard key={program.slug} program={program} />)}</div>
      </section>

      <section className="section section--dark">
        <div className="container"><SectionHeading eyebrow="EZSTORY METHOD" title="설명에서 끝나지 않는 4단계 실무교육" description="교육 전 진단부터 교육 후 업무 적용까지 하나의 흐름으로 설계합니다." /></div>
        <div className="container process-grid">{processSteps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </section>

      <section className="section section--white">
        <div className="container evidence-layout">
          <div className="evidence-image"><Image src="/images/evidence-natural-1.jpg" alt="이지스토리 실무교육 장면" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div><SectionHeading eyebrow="PROVEN RESULTS" title="점수보다 강한 것은 현업에서 다시 쓰이는 교육입니다." description="교육 만족도와 정성 후기를 함께 공개해 강의의 실제 효과를 보여드립니다." />
            <div className="evidence-metrics">{evidenceMetrics.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span><small>{item.detail}</small></div>)}</div>
            <Link href="/results" className="button button--dark">교육성과 자세히 보기 <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--testimonial"><div className="container"><SectionHeading eyebrow="VOICE OF LEARNERS" title="실무자들이 직접 말한 교육의 변화" align="center" /></div><div className="container"><TestimonialCards /></div></section>

      <section className="section section--white"><div className="container"><SectionHeading eyebrow="CLIENTS" title="공공기관과 기업이 다시 찾는 실무교육" description="중앙부처·지자체·공공기관·금융·제조·유통·협회 등 다양한 조직의 업무 맥락에 맞춰 교육해 왔습니다." align="center" /><ClientCloud /></div></section>

      <section className="section automation-section">
        <div className="container automation-grid">
          <div><span className="eyebrow eyebrow--light">SMART EDUCATION SYSTEM</span><h2>교육 문의부터<br />맞춤 제안까지 연결합니다.</h2><p>기관 정보를 입력하면 맞춤 커리큘럼을 미리 설계하고, 문의 내용을 저장·관리하며, 최신 블로그 인사이트를 자동으로 연결합니다.</p><div className="automation-actions"><Link href="/curriculum" className="button button--white">맞춤 커리큘럼 생성</Link><Link href="/contact" className="button button--outline-light">정식 제안 요청</Link></div></div>
          <div className="automation-cards"><article><Sparkles /><b>커리큘럼 생성</b><span>대상·시간·목표 기반</span></article><article><MessageSquareText /><b>문의고객 관리</b><span>접수·검토·견적·확정</span></article><article><Download /><b>교육제안 연계</b><span>요구사항 기반 초안</span></article><article><FileText /><b>최신 인사이트</b><span>네이버 블로그 연동</span></article></div>
        </div>
      </section>

      <section className="section section--soft"><div className="container insight-header"><SectionHeading eyebrow="BIZ SKILL" title="이지스토리 최신 비즈스킬" description="블로그에 새 글이 올라오면 실시간으로 연결되고, 최근 글에는 NEW가 표시됩니다." /><Link href="/insights" className="text-link">전체 보기 <ArrowRight size={17} /></Link></div><div className="container insight-grid">{insights.map((item, index) => <a href={item.url} target="_blank" rel="noreferrer" className="insight-card" key={`${item.url}-${index}`}>{item.isNew && <em className="new-badge">NEW</em>}<span>{item.category || "비즈스킬"}</span><h3>{item.title}</h3><p>{item.description || "실무교육과 문서작성에 바로 활용할 수 있는 이지스토리 콘텐츠입니다."}</p><small>{formatDate(item.date)} · 네이버 블로그</small></a>)}</div></section>

      <section className="section contact-preview"><div className="container contact-preview__grid"><div><span className="eyebrow">CONTACT</span><h2>교육 목적만 알려주세요.<br />과정 구성은 이지스토리가 설계합니다.</h2><p>교육 대상, 시간, 일정, 추가 요구사항을 남기면 기관 상황에 맞는 과정과 운영안을 검토해 연락드립니다.</p></div><InquiryForm compact /></div></section>
    </main>
  );
}
