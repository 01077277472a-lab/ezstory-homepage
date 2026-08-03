import type { Metadata } from "next";
export const metadata: Metadata = { title: "관리자 로그인" };
export default function AdminLoginPage() { return <main className="admin-login-page"><form action="/api/admin/login" method="post" className="admin-login-card"><h1>이지스토리 관리자</h1><p>문의고객 관리 화면에 접속합니다.</p><label>관리자 비밀번호<input type="password" name="password" required /></label><button className="button button--primary button--large">로그인</button><small>환경변수 ADMIN_PASSWORD가 필요합니다.</small></form></main>; }
