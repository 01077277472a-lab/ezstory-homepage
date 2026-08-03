export type VodItem = { title: string; description: string; url?: string };

const defaultDescription = "핵심 개념, 실제 사례, 따라하기 실습, 업무 템플릿으로 구성됩니다.";

export const vods: VodItem[] = [
  { title: "AI 보고서 작성 마스터", description: defaultDescription },
  { title: "사업기획서 구조 설계", description: defaultDescription, url: "https://www.youtube.com/watch?v=ZKTMhrPAUyw" },
  { title: "공문서 문장과 위계", description: defaultDescription, url: "https://www.youtube.com/watch?v=2a-W-dBk3yo" },
  { title: "한장짜리 기획서 맥락 구성법", description: defaultDescription, url: "https://www.youtube.com/watch?v=J4Mh9vbfrqA" },
];
