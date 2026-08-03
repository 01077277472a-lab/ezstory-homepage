import type { Metadata } from "next";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return <main><section className="sub-hero"><div className="container"><span className="eyebrow">PRIVACY</span><h1>개인정보처리방침</h1><p>아래 내용은 구축용 초안입니다. 홈페이지 공개 전 실제 사업자 정보와 운영 기준에 맞게 법률 검토 후 확정하세요.</p></div></section><section className="section section--white"><article className="container privacy-content"><h2>1. 수집 항목</h2><p>기관·회사명, 담당자명, 이메일, 연락처, 교육 관련 요청사항 및 사용자가 문의 과정에서 직접 입력한 정보</p><h2>2. 이용 목적</h2><p>교육·컨설팅 문의 확인, 맞춤 과정과 견적 제안, 일정 협의, 문의 이력 관리</p><h2>3. 보유 기간</h2><p><strong>[운영자가 확정할 기간]</strong> 동안 보유한 후 지체 없이 파기합니다. 계약이 성립된 경우 관련 법령과 계약 관리 기준에 따라 별도 보관할 수 있습니다.</p><h2>4. 제3자 제공과 처리위탁</h2><p>문의 저장·이메일 알림을 위해 Supabase, Vercel, Resend 등 외부 서비스를 이용할 수 있습니다. 실제 이용 서비스와 국외 이전 사항을 공개 전 정확히 기재해야 합니다.</p><h2>5. 이용자의 권리</h2><p>이용자는 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.</p><h2>6. 개인정보보호 책임자</h2><p>성명: <strong>[입력 필요]</strong><br />이메일: <strong>[입력 필요]</strong><br />전화: <strong>[입력 필요]</strong></p></article></section></main>;
}
