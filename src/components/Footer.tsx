import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { navigation, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLogo inverse />
          <p className="footer-slogan">{siteConfig.slogan}</p>
          <p className="footer-description">보고서·기획·공문서·보도자료·PPT 시각화·AI 업무혁신 실무교육</p>
        </div>
        <div>
          <strong>메뉴</strong>
          <div className="footer-links">
            {navigation.slice(0, 5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <strong>문의</strong>
          <div className="footer-links">
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || siteConfig.contactEmail}`}>이메일 문의</a>
            <a href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || siteConfig.contactPhone}`}>전화 문의</a>
            <a href={process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/"} target="_blank" rel="noreferrer">카카오톡 문의</a>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/admin/login">관리자</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ezstory. All rights reserved.</span>
        <span>사업자 정보 및 개인정보처리방침은 공개 전 실제 정보로 교체하세요.</span>
      </div>
    </footer>
  );
}
