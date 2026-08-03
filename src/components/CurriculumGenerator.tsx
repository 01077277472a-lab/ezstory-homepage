"use client";

import { FormEvent, useState } from "react";
import { Bot, LoaderCircle, Sparkles } from "lucide-react";
import { programs } from "@/data/programs";

type Result = {
  title: string;
  strategy: string;
  outcomes: string[];
  modules: { session: number; title: string; method: string; time: string }[];
  note: string;
  mode: "claude" | "local";
};

export function CurriculumGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setResult(null);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/ai/curriculum", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "생성에 실패했습니다.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally { setLoading(false); }
  }

  return (
    <div className="generator-grid">
      <form className="generator-form" onSubmit={submit}>
        <div className="generator-icon"><Bot size={28} /></div>
        <h2>맞춤 커리큘럼 조건</h2>
        <label>기관 유형<input name="organizationType" required placeholder="예: 공공기관, 제조기업" /></label>
        <label>교육 대상<input name="audience" required placeholder="예: 기획부서 7~9급 25명" /></label>
        <label>교육 주제
          <select name="topic" required defaultValue="">
            <option value="" disabled>선택</option>
            {programs.map((program) => <option key={program.slug}>{program.title}</option>)}
            <option>복합 맞춤 과정</option>
          </select>
        </label>
        <label>교육 시간<input name="duration" required placeholder="예: 7시간" /></label>
        <label>교육 목표<textarea name="goal" rows={3} required placeholder="예: AI를 활용해 기관장 보고용 1페이지 보고서 완성" /></label>
        <label>중점 요구<textarea name="focus" rows={3} placeholder="예: 실습 60%, 공공데이터 조사, PPT 시각화 포함" /></label>
        <button className="button button--primary button--large" disabled={loading}>
          {loading ? <LoaderCircle className="spin" size={19} /> : <Sparkles size={19} />}
          {loading ? "설계 중..." : "커리큘럼 자동 설계"}
        </button>
      </form>
      <div className="generator-result">
        {!result && !loading && <div className="generator-placeholder"><Sparkles size={34} /><h3>기관 맞춤 과정 미리보기</h3><p>조건을 입력하면 과정명, 교육목표, 모듈, 운영방식을 자동으로 설계합니다.</p></div>}
        {loading && <div className="generator-placeholder"><LoaderCircle className="spin" size={34} /><h3>실무 중심 과정으로 설계하고 있습니다.</h3></div>}
        {error && <p className="form-message form-message--error">{error}</p>}
        {result && (
          <article className="generated-curriculum">
            <span className="mode-badge">{result.mode === "claude" ? "CLAUDE AI" : "SMART TEMPLATE"}</span>
            <h2>{result.title}</h2><p>{result.strategy}</p>
            <h3>교육 성과</h3><ul>{result.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>운영 모듈</h3>
            <div className="module-list">
              {result.modules.map((module) => <div key={module.session}><b>{String(module.session).padStart(2, "0")}</b><span><strong>{module.title}</strong><small>{module.method} · {module.time}</small></span></div>)}
            </div>
            <p className="generated-note">{result.note}</p>
            <a href="/contact" className="button button--dark">이 구성으로 정식 제안 요청</a>
          </article>
        )}
      </div>
    </div>
  );
}
