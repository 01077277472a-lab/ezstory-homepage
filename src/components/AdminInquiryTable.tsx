"use client";

import { useState } from "react";

type Inquiry = {
  id: string; created_at: string; organization: string; contact_name: string; email: string; phone: string;
  topic: string; preferred_date?: string; participants?: number; requirements: string; status: string;
};

export function AdminInquiryTable({ initialItems }: { initialItems: Inquiry[] }) {
  const [items, setItems] = useState(initialItems);

  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }),
    });
    if (response.ok) setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead><tr><th>접수일</th><th>기관·담당자</th><th>주제</th><th>요청사항</th><th>연락</th><th>상태</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.created_at).toLocaleDateString("ko-KR")}</td>
              <td><strong>{item.organization}</strong><br />{item.contact_name}</td>
              <td>{item.topic}<br /><small>{item.preferred_date || "일정 미정"} · {item.participants || "?"}명</small></td>
              <td className="admin-requirements">{item.requirements}</td>
              <td><a href={`mailto:${item.email}`}>{item.email}</a><br /><a href={`tel:${item.phone}`}>{item.phone}</a></td>
              <td><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}><option value="new">신규</option><option value="reviewing">검토중</option><option value="quoted">견적발송</option><option value="confirmed">확정</option><option value="closed">종료</option></select></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && <p className="empty-state">접수된 문의가 없습니다.</p>}
    </div>
  );
}
