import type { Metadata } from "next";
import Link from "next/link";
import { VodGrid } from "@/components/VodGrid";
import { vods } from "@/data/vod";
export const metadata: Metadata = { title: "교육 VOD" };
export default function VodPage() { return <main><section className="sub-hero"><div className="container"><span className="eyebrow">EZSTORY VOD</span><h1>필요한 실무를<br />필요한 순간에 다시 학습하세요.</h1><p>VOD 과정은 단계적으로 오픈 예정입니다. 기업·기관 전용 온라인 과정도 별도 구성할 수 있습니다.</p></div></section><section className="section section--soft"><VodGrid items={vods} /><div className="container center-cta"><h2>기관 전용 VOD·라이브 혼합과정이 필요하신가요?</h2><Link href="/contact" className="button button--primary">맞춤 과정 문의</Link></div></section></main>; }
