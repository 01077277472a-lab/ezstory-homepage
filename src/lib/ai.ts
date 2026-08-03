import type { Program } from "@/data/programs";

export type CurriculumInput = {
  organizationType: string;
  audience: string;
  topic: string;
  duration: string;
  goal: string;
  focus: string;
};

export function localCurriculum(input: CurriculumInput, related?: Program) {
  const hours = Number.parseInt(input.duration, 10) || 7;
  const blocks = hours <= 3 ? 3 : hours <= 7 ? 5 : 7;
  const base = related?.modules.flatMap((module) => module.details.map((detail) => `${module.title}: ${detail}`)) || [
    "현업 문제와 교육 목표 진단",
    "핵심 개념과 우수·개선 사례 비교",
    "표준 구조와 체크리스트 적용",
    "AI 도구 활용 실습과 결과 검증",
    "개인·팀별 결과물 작성",
    "피드백과 업무 적용 계획 수립",
    "기관 맞춤 템플릿 정리",
  ];

  return {
    title: `${input.audience} 대상 ${input.topic} 맞춤 실무과정`,
    strategy: `${input.organizationType || "조직"}의 실제 업무 상황을 반영하고, 이론보다 사례·실습·피드백 중심으로 구성합니다.`,
    outcomes: [
      input.goal || "업무에 바로 적용할 수 있는 결과물을 완성합니다.",
      "핵심 개념을 구분하고 문서 구조를 스스로 설계합니다.",
      "AI와 실무 도구를 안전하고 정확하게 활용합니다.",
    ],
    modules: Array.from({ length: blocks }, (_, index) => ({
      session: index + 1,
      title: base[index % base.length],
      method: index === 0 ? "진단·사례" : index === blocks - 1 ? "발표·피드백" : "설명·실습",
      time: `${Math.max(40, Math.round((hours * 60) / blocks / 10) * 10)}분`,
    })),
    note: input.focus ? `중점 반영: ${input.focus}` : "기관의 기존 문서와 사례를 제공하면 맞춤도가 더 높아집니다.",
  };
}

export async function generateWithClaude(input: CurriculumInput, fallback: ReturnType<typeof localCurriculum>) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL;
  if (!apiKey || !model) return { ...fallback, mode: "local" as const };

  const prompt = `당신은 17년차 기업·공공기관 실무교육 과정개발 전문가입니다. 다음 조건으로 교육 커리큘럼을 설계하세요.\n\n기관유형: ${input.organizationType}\n교육대상: ${input.audience}\n교육주제: ${input.topic}\n교육시간: ${input.duration}\n교육목표: ${input.goal}\n중점요구: ${input.focus}\n\n반드시 유효한 JSON만 출력하세요. 스키마: {"title":"", "strategy":"", "outcomes":[""], "modules":[{"session":1,"title":"","method":"","time":""}], "note":""}. 한국어, 두괄식, 실습 중심, 과장 금지.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": process.env.ANTHROPIC_API_VERSION || "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 2500,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error("Anthropic error", response.status, await response.text());
    return { ...fallback, mode: "local" as const };
  }

  const data = await response.json();
  const text = data?.content?.find((item: { type?: string }) => item.type === "text")?.text;
  if (!text) return { ...fallback, mode: "local" as const };

  try {
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    return { ...JSON.parse(cleaned), mode: "claude" as const };
  } catch {
    return { ...fallback, mode: "local" as const };
  }
}
