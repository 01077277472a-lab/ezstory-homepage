import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getNaverFeed } from "@/lib/naver";
import { formatDate } from "@/lib/utils";
export const metadata: Metadata = { title: "비즈스킬" };
export default async function InsightsPage() { const items = await getNaverFeed(18); return <main><section className="sub-hero"><div className="container"><span className="eyebrow">BIZ SKILL</span><h1>보고서·기획·AI 실무<br />비즈스킬을 꾸준히 공유합니다.</h1><p>네이버 블로그에 새 글이 올라오면 실시간으로 연결되고, 최근 글에는 <b>NEW</b> 표시가 함께 붙습니다.</p></div></section><section className="section section--soft"><div className="container insight-grid insight-grid--full">{items.map((item, index) => <a href={item.url} target="_blank" rel="noreferrer" className="insight-card" key={`${item.url}-${index}`}>{item.isNew && <em className="new-badge">NEW</em>}<span>{item.category || "비즈스킬"}</span><h3>{item.title}</h3><p>{item.description || "이지스토리의 실무교육과 문서작성 노하우를 확인하세요."}</p><small>{formatDate(item.date)} · 네이버 블로그</small><ArrowUpRight /></a>)}</div></section></main>; }
