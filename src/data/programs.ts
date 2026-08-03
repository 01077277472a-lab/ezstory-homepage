export type Program = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  audience: string[];
  duration: string[];
  outcomes: string[];
  modules: { title: string; details: string[] }[];
  accent: string;
};

export const programs: Program[] = [
  {
    slug: "ai-report-writing",
    category: "AI × REPORT",
    title: "AI 보고서 작성 실무",
    summary: "자료조사부터 목차, 초안, 검토, 시각화까지 AI와 사람의 판단을 결합해 보고서 완성도를 높입니다.",
    audience: ["공공기관 실무자", "기업 기획·관리직", "AI 업무혁신 담당자"],
    duration: ["3시간", "7시간", "14시간"],
    outcomes: ["업무보고서 1건", "직무별 프롬프트", "검토 체크리스트"],
    modules: [
      { title: "보고 목적과 독자 정의", details: ["보고 유형 진단", "핵심 메시지 도출", "의사결정 질문 설계"] },
      { title: "AI 자료조사와 구조화", details: ["신뢰도 높은 자료 탐색", "근거 분류", "목차·스토리라인 생성"] },
      { title: "초안·문장 개선", details: ["개조식·두괄식", "1문장 1정보", "용어와 수치 검증"] },
      { title: "표·그래프·PPT 시각화", details: ["차트 선택", "원페이지 보고서", "도형 병합·레이아웃"] },
    ],
    accent: "blue",
  },
  {
    slug: "strategy-planning",
    category: "STRATEGY",
    title: "기획·전략 수립 실무",
    summary: "시장·정책·트렌드를 읽어 전략 방향을 세우고, 실행 가능한 사업·업무 전략으로 구조화합니다.",
    audience: ["기획·전략부서", "정책기획자", "팀장·중간관리자"],
    duration: ["7시간", "14시간", "2일 과정"],
    outcomes: ["전략 캔버스 1건", "전략과제 도출표", "실행 로드맵"],
    modules: [
      { title: "환경·시장 분석", details: ["내·외부 환경 진단", "3C·SWOT·PEST", "데이터 기반 시장분석"] },
      { title: "전략 방향 설정", details: ["비전·목표 정렬", "핵심 이슈 도출", "전략 옵션 비교"] },
      { title: "전략 과제화", details: ["WHY–WHAT–HOW–IF", "우선순위 설정", "자원·역할 배분"] },
      { title: "실행·성과 관리", details: ["실행 로드맵", "KPI 설계", "리스크 대응"] },
    ],
    accent: "gold",
  },
  {
    slug: "business-planning",
    category: "PLANNING",
    title: "사업기획서·제안서 작성",
    summary: "배경–문제–목표–전략–실행–성과가 연결되는 설득력 있는 사업기획 구조를 실습합니다.",
    audience: ["기획부서", "공모사업 담당자", "신사업·정책 담당자"],
    duration: ["7시간", "14시간", "2일 과정"],
    outcomes: ["사업기획서 초안", "성과지표 체계", "기관장 예상 Q&A"],
    modules: [
      { title: "기획 논리 설계", details: ["WHY–WHAT–HOW–IF", "문제와 문제점 구분", "대안 비교"] },
      { title: "근거와 수요 확인", details: ["정책·시장 근거", "고객·기업 수요", "유사사업 분석"] },
      { title: "목표·성과지표", details: ["산출목표", "성과목표", "측정방법과 목표치"] },
      { title: "실행·예산·리스크", details: ["추진체계", "예산 타당성", "리스크 대응"] },
    ],
    accent: "red",
  },
  {
    slug: "official-document",
    category: "PUBLIC WRITING",
    title: "공문서 작성 및 공공언어",
    summary: "행정문서의 형식과 위계, 명확한 공공언어, 협조·요청 문장의 원칙을 실제 사례로 익힙니다.",
    audience: ["공무원", "공공기관 신입·실무자", "행정·총무 담당자"],
    duration: ["3시간", "7시간"],
    outcomes: ["공문서 교정본", "문장 표현집", "항목·들여쓰기 템플릿"],
    modules: [
      { title: "공문서 기본 체계", details: ["수신·경유·제목·본문", "붙임과 발신명의", "항목 번호와 들여쓰기"] },
      { title: "명확한 행정문장", details: ["주어·서술어 호응", "중복 표현 제거", "쉬운 공공언어"] },
      { title: "요청·안내·회신문", details: ["협조 요청", "자료 제출", "외부위원·민원 회신"] },
      { title: "AI 교정 실습", details: ["보안 원칙", "문장 검토 프롬프트", "최종 책임 검증"] },
    ],
    accent: "navy",
  },
  {
    slug: "press-release",
    category: "PR WRITING",
    title: "보도자료·홍보문 작성",
    summary: "언론이 바로 사용할 수 있는 제목, 리드, 본문, 인용문과 채널별 콘텐츠 변환법을 익힙니다.",
    audience: ["홍보담당자", "정책·사업 담당자", "기관 SNS 운영자"],
    duration: ["3시간", "7시간"],
    outcomes: ["보도자료 1건", "제목 5종", "SNS·블로그 변환본"],
    modules: [
      { title: "뉴스가치 발굴", details: ["핵심 성과", "숫자와 사례", "독자 관점"] },
      { title: "제목과 리드", details: ["한 줄 핵심", "5W1H", "과장 없는 흡입력"] },
      { title: "본문과 인용문", details: ["역피라미드", "기관장 인용", "팩트체크"] },
      { title: "채널별 재가공", details: ["카드뉴스", "블로그", "SNS 숏폼 문구"] },
    ],
    accent: "cyan",
  },
  {
    slug: "ppt-visualization",
    category: "VISUAL REPORT",
    title: "PPT 문서 시각화 전략 및 스킬",
    summary: "복잡한 문장을 한 장의 표·도식·그래프로 전환하고, 의사결정이 쉬운 화면을 설계합니다.",
    audience: ["보고서 작성자", "기획·영업·마케팅", "프레젠테이션 담당자"],
    duration: ["4시간", "7시간", "14시간"],
    outcomes: ["원페이지 슬라이드", "도식화 템플릿", "PPT 기능 실습본"],
    modules: [
      { title: "정보 구조화", details: ["1장 1메시지", "시선 흐름", "위계와 정렬"] },
      { title: "표·그래프 선택", details: ["비교·추이·비중", "강조 기준", "데이터 정리"] },
      { title: "도식화", details: ["프로세스", "추진체계", "문제–해결 구조"] },
      { title: "PPT 실전 기능", details: ["도형 병합", "그림 서식", "정렬·간격·아이콘"] },
    ],
    accent: "purple",
  },
  {
    slug: "trend-planning",
    category: "TREND & INNOVATION",
    title: "트렌드 기반 신사업 기획",
    summary: "사회·기술·정책 변화를 읽고 기관과 기업의 실행 가능한 사업 아이디어로 연결합니다.",
    audience: ["신사업 담당자", "정책기획자", "마케팅·전략부서"],
    duration: ["4시간", "7시간", "2일 워크숍"],
    outcomes: ["트렌드 맵", "사업 아이디어", "우선순위 평가표"],
    modules: [
      { title: "트렌드 탐색", details: ["PEST·STEEP", "정책·기술 시그널", "신뢰도 높은 소스"] },
      { title: "인사이트 도출", details: ["변화의 원인", "고객 영향", "기회·위협"] },
      { title: "아이디어 설계", details: ["문제 재정의", "융합 아이디어", "가치제안"] },
      { title: "사업화 우선순위", details: ["수요·실현성", "정책성", "성과·리스크"] },
    ],
    accent: "orange",
  },
  {
    slug: "business-writing",
    category: "BUSINESS WRITING",
    title: "비즈니스 글쓰기(홍보글)",
    summary: "짧고 분명한 문장으로 제품·서비스·기관의 가치를 전달하는 홍보성 비즈니스 글쓰기 습관을 만듭니다.",
    audience: ["신입사원", "전 직급 실무자", "고객 커뮤니케이션 담당자"],
    duration: ["3시간", "7시간"],
    outcomes: ["문장 교정 전후본", "업무 표현집", "자가진단 체크리스트"],
    modules: [
      { title: "문장 기본", details: ["결론 우선", "짧은 호흡", "능동형 문장"] },
      { title: "항목과 위계", details: ["표준 번호", "병렬 구조", "핵심어 강조"] },
      { title: "정확한 용어", details: ["유사 개념 구분", "전문어 풀이", "맞춤법·띄어쓰기"] },
      { title: "실무 문서 교정", details: ["이메일", "보고 메모", "안내·요청문"] },
    ],
    accent: "green",
  },
  {
    slug: "problem-solving",
    category: "PROBLEM SOLVING",
    title: "문제해결·의사결정 실무",
    summary: "문제를 정확히 정의하고 원인을 구조적으로 분석해, 실행 가능한 해결안과 의사결정을 이끌어냅니다.",
    audience: ["전 직급 실무자", "기획·관리자", "문제해결 TF"],
    duration: ["3시간", "7시간", "14시간"],
    outcomes: ["문제정의서", "원인분석 로직트리", "해결안 우선순위표"],
    modules: [
      { title: "문제 정의", details: ["문제와 문제점 구분", "As-Is·To-Be", "핵심 질문 설정"] },
      { title: "원인 분석", details: ["로직트리", "5Why", "데이터로 원인 검증"] },
      { title: "해결안 설계", details: ["아이디어 발산·수렴", "대안 비교", "실현 가능성 평가"] },
      { title: "의사결정·실행", details: ["의사결정 기준", "설득 보고", "실행계획 수립"] },
    ],
    accent: "teal",
  },
];

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}
