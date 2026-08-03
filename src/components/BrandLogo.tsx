import Link from "next/link";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`} aria-label="이지스토리 홈">
      <span className="brand-logo__mark">ez</span>
      <span className="brand-logo__word">story</span>
    </Link>
  );
}
