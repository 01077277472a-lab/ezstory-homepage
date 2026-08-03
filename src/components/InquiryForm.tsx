"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { programs } from "@/data/programs";

type FormState = { type: "idle" | "loading" | "success" | "error"; message?: string };

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<FormState>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const data: Record<string, unknown> = {
      ...raw,
      privacy: raw.privacy === "on",
      participants: raw.participants ? Number(raw.participants) : undefined,
    };

    setState({ type: "loading" });
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "문의 접수에 실패했습니다.");
      setState({ type: "success", message: result.message });
      form.reset();
    } catch (error) {
      setState({ type: "error", message: error instanceof Error ? error.message : "오류가 발생했습니다." });
    }
  }

  return (
    <form className={`inquiry-form ${compact ? "inquiry-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>기관·회사명<input name="organization" required placeholder="예: 한국○○공사" /></label>
        <label>담당자명<input name="contactName" required placeholder="성함" /></label>
        <label>이메일<input name="email" type="email" required placeholder="name@company.com" /></label>
        <label>연락처<input name="phone" required placeholder="010-0000-0000" /></label>
        <label>기관 유형
          <select name="organizationType" defaultValue="">
            <option value="">선택</option><option>중앙부처·지자체</option><option>공공기관·공기업</option><option>일반기업</option><option>대학·교육기관</option><option>협회·복지기관</option><option>개인·기타</option>
          </select>
        </label>
        <label>교육 주제
          <select name="topic" required defaultValue="">
            <option value="" disabled>선택</option>
            {programs.map((program) => <option key={program.slug}>{program.title}</option>)}
            <option>복합·맞춤 과정</option>
          </select>
        </label>
        <label>교육 대상<input name="audience" placeholder="예: 6~9급 실무자, 신입사원" /></label>
        <label>교육 인원<input name="participants" type="number" min="1" placeholder="예: 30" /></label>
        <label>희망 시간<input name="duration" placeholder="예: 3시간, 7시간, 2일" /></label>
        <label>희망 일정<input name="preferredDate" placeholder="예: 2027년 3월 중" /></label>
        <label>진행 방식
          <select name="deliveryFormat" defaultValue="">
            <option value="">선택</option><option>대면</option><option>비대면</option><option>대면+비대면</option><option>협의 필요</option>
          </select>
        </label>
      </div>
      <label className="form-full">교육 목적·추가 희망 내용·요구사항
        <textarea name="requirements" required rows={compact ? 4 : 7} placeholder="현재 어려움, 교육 후 원하는 결과물, 반드시 포함할 내용 등을 적어주세요." />
      </label>
      <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="checkbox-label"><input type="checkbox" name="privacy" required /> 문의 답변을 위한 개인정보 수집·이용에 동의합니다.</label>
      {state.message && <p className={`form-message form-message--${state.type}`}>{state.message}</p>}
      <button className="button button--primary button--large" disabled={state.type === "loading"}>
        {state.type === "loading" ? <LoaderCircle className="spin" size={19} /> : <Send size={19} />}
        {state.type === "loading" ? "접수 중..." : "맞춤 교육 문의 보내기"}
      </button>
    </form>
  );
}
