import Link from "next/link";
export default function NotFound() { return <main className="not-found"><span>404</span><h1>페이지를 찾을 수 없습니다.</h1><Link href="/" className="button button--primary">홈으로 이동</Link></main>; }
