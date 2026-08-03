import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { siteConfig } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: { icon: "/ezstory-mark.svg", shortcut: "/ezstory-mark.svg", apple: "/ezstory-mark.svg" },
  keywords: ["AI 보고서 교육", "사업기획서 교육", "공문서 작성", "보도자료 작성", "PPT 시각화", "강신정 강사", "이지스토리"],
  openGraph: { title: siteConfig.title, description: siteConfig.description, url: siteUrl, siteName: siteConfig.name, locale: "ko_KR", type: "website", images: ["/images/hero-consultant.png"] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/images/hero-consultant.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    founder: { "@type": "Person", name: "강신정", jobTitle: "실무교육 강사·컨설턴트" },
    areaServed: "KR",
    email: siteConfig.contactEmail,
    telephone: siteConfig.contactPhone,
    sameAs: [siteConfig.naverBlog],
  };
  return (
    <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><Header />{children}<Footer /><FloatingContact /></body></html>
  );
}
