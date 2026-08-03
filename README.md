# 이지스토리 홈페이지

강신정 강사의 **기업·공공기관 실무교육 및 컨설팅 문의 확보**를 목표로 구성한 Next.js 홈페이지입니다.

## 1. 포함 기능

- 기업 전문형 60% + AI 혁신형 40% 디자인
- 반응형 메인·강사소개·교육과정·교육성과·인사이트·VOD·브리핑·문의 페이지
- 대표 교육과정 7종 및 과정별 상세 페이지
- 교육후기·만족도·주요 출강기관 영역
- 네이버 블로그 RSS 자동 연동
- 맞춤 커리큘럼 자동 생성(Claude API 선택 연결)
- 문의 폼 → Supabase 저장 + 이메일 알림
- 관리자 로그인 및 문의 상태 관리
- SEO 메타데이터, 구조화 데이터, 사이트맵, robots.txt

## 2. 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 3. 배포 권장 구성

- 호스팅: Vercel
- DB: Supabase
- 이메일: Resend
- AI: Anthropic API
- 운영 도메인: `https://easystory.kr`

## 4. Supabase 설정

1. Supabase 프로젝트 생성
2. `supabase/schema.sql`을 SQL Editor에서 실행
3. `.env.local`에 URL, anon key, service role key 입력
4. Vercel에도 동일 환경변수 등록

## 5. Claude 자동화

`ANTHROPIC_API_KEY`와 `ANTHROPIC_MODEL`을 입력하면 `/curriculum`에서 기관 맞춤형 커리큘럼을 생성합니다. 키가 없으면 내장 규칙으로 데모 커리큘럼을 생성합니다.

모델명은 코드에 고정하지 않고 환경변수로 분리했습니다. Claude에서 현재 사용 가능한 모델명을 확인해 입력하세요.

## 6. 홈페이지 공개 전에 반드시 확정할 정보

- 카카오톡 채널 URL
- 도메인 DNS 연결 및 SSL 정상 작동 확인
- 사업자명·대표자·사업자등록번호·주소·통신판매업 신고 여부
- 개인정보처리방침의 개인정보보호 책임자 및 보유기간
- 프로필 PDF 최종본
- 기관 로고 사용 허가 여부
- VOD 판매 여부, 가격, 환불 규정, 결제 수단
- 교육후기 원문 공개 범위와 기관명·개인정보 비식별 처리

## 7. 확정된 공개 연락처

- 이메일: `alsemffp24@hanmail.net`
- 전화: `010-7727-7472`
- 도메인: `https://easystory.kr`
- 경력 지표: `9,000여 건의 누적 출강·교육 경험`

## 8. 주요 콘텐츠 수정 위치

- 사이트 기본정보: `src/data/site.ts`
- 교육과정: `src/data/programs.ts`
- 후기: `src/data/testimonials.ts`
- 주요기관: `src/data/clients.ts`
- 예비 인사이트 링크: `src/data/insights.ts`
- 전체 디자인: `src/app/globals.css`

## 9. 이미지

현재 폴더에는 사용자가 제공한 프로필·성과 이미지와 홈페이지용으로 생성한 전문 이미지를 포함했습니다. 공개 전 실제 본인 사진과 비교하여 최종 승인한 이미지만 사용하세요.
