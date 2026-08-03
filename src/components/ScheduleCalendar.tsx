"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Lock, Plus, Trash2, X } from "lucide-react";

type ScheduleEntry = { id: string; date: string; time: string; duration: string; company: string; topic: string; createdAt: string };

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

function todayKey() {
  const n = new Date();
  return ymd(n.getFullYear(), n.getMonth() + 1, n.getDate());
}
function todayDateInputValue() {
  return todayKey();
}

const emptyForm = { date: todayDateInputValue(), time: "10:00", duration: "", company: "", topic: "", password: "" };

export function ScheduleCalendar({ initialEvents }: { initialEvents: ScheduleEntry[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [events, setEvents] = useState<ScheduleEntry[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteState, setDeleteState] = useState<{ id: string; password: string; error: string } | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
    } finally {
      setLoading(false);
    }
  }, []);

  function shift(delta: number) {
    const next = new Date(year, month - 1 + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth() + 1);
    setSelectedDay(null);
  }
  function goToday() {
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
    setSelectedDay(null);
  }

  const eventsByDay = useMemo(() => {
    const map = new Map<string, ScheduleEntry[]>();
    for (const ev of events) {
      if (!map.has(ev.date)) map.set(ev.date, []);
      map.get(ev.date)!.push(ev);
    }
    for (const list of map.values()) list.sort((a, b) => a.time.localeCompare(b.time));
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const first = new Date(year, month - 1, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [year, month]);

  const tKey = todayKey();
  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) || [] : [];

  function openForm(dateKey?: string) {
    setForm({ ...emptyForm, date: dateKey || (selectedDay ?? todayDateInputValue()) });
    setFormError("");
    setShowForm(true);
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.message || "등록에 실패했습니다.");
        return;
      }
      setShowForm(false);
      const [y, m] = form.date.split("-").map(Number);
      setYear(y);
      setMonth(m);
      setSelectedDay(form.date);
      await refresh();
    } catch {
      setFormError("등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete(id: string) {
    if (!deleteState || deleteState.id !== id) return;
    try {
      const res = await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: deleteState.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDeleteState({ ...deleteState, error: data.message || "삭제에 실패했습니다." });
        return;
      }
      setDeleteState(null);
      await refresh();
    } catch {
      setDeleteState({ ...deleteState, error: "삭제 중 오류가 발생했습니다." });
    }
  }

  useEffect(() => {
    if (showForm) {
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") setShowForm(false);
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [showForm]);

  return (
    <div className="cal">
      <div className="cal__toolbar">
        <div className="cal__nav">
          <button onClick={() => shift(-1)} aria-label="이전 달"><ChevronLeft size={20} /></button>
          <strong>{year}년 {pad(month)}월</strong>
          <button onClick={() => shift(1)} aria-label="다음 달"><ChevronRight size={20} /></button>
          <button className="cal__today" onClick={goToday}>오늘</button>
        </div>
        <button type="button" className="button button--primary button--small" onClick={() => openForm()}>
          <Plus size={16} /> 일정 추가
        </button>
      </div>

      <div className="cal__grid cal__head">
        {WEEKDAYS.map((w, i) => <div key={w} className={i === 0 ? "is-sun" : i === 6 ? "is-sat" : ""}>{w}</div>)}
      </div>
      <div className="cal__grid cal__body">
        {cells.map((d) => {
          const key = ymd(d.getFullYear(), d.getMonth() + 1, d.getDate());
          const inMonth = d.getMonth() + 1 === month;
          const dayEvents = eventsByDay.get(key) || [];
          return (
            <div key={key} className={`cal__cell${inMonth ? "" : " is-out"}${key === tKey ? " is-today" : ""}`} onClick={() => setSelectedDay(key)}>
              <span className={`cal__date${d.getDay() === 0 ? " is-sun" : d.getDay() === 6 ? " is-sat" : ""}`}>{d.getDate()}</span>
              <div className="cal__events">
                {dayEvents.slice(0, 3).map((ev) => (
                  <button key={ev.id} className="cal__event" onClick={(e) => { e.stopPropagation(); setSelectedDay(key); }} title={`${ev.time}${ev.duration ? ` · ${ev.duration}` : ""} · ${ev.company} · ${ev.topic}`}>
                    <b>{ev.time}{ev.duration ? ` · ${ev.duration}` : ""}</b>
                    <span>{ev.company}</span>
                  </button>
                ))}
                {dayEvents.length > 3 && <span className="cal__more">+{dayEvents.length - 3}개 더보기</span>}
              </div>
            </div>
          );
        })}
      </div>
      {loading && <p className="cal__loading">불러오는 중...</p>}

      {selectedDay && (
        <div className="cal__daypanel">
          <div className="cal__daypanel-head">
            <strong>{selectedDay.replace(/-/g, ". ")} 일정</strong>
            <div className="cal__daypanel-actions">
              <button type="button" className="text-link" onClick={() => openForm(selectedDay)}><Plus size={15} /> 이 날짜에 추가</button>
              <button onClick={() => setSelectedDay(null)}>닫기</button>
            </div>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="cal__empty">등록된 일정이 없습니다.</p>
          ) : (
            selectedEvents.map((ev) => (
              <div key={ev.id} className="cal__dayitem">
                <div>
                  <b>{ev.time}{ev.duration ? ` · ${ev.duration}` : ""}</b>
                  <strong>{ev.company}</strong>
                  <small>{ev.topic}</small>
                </div>
                {deleteState?.id === ev.id ? (
                  <div className="cal__delete-confirm">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={deleteState.password}
                      onChange={(e) => setDeleteState({ ...deleteState, password: e.target.value, error: "" })}
                    />
                    <button type="button" onClick={() => confirmDelete(ev.id)}>확인</button>
                    <button type="button" onClick={() => setDeleteState(null)}><X size={14} /></button>
                    {deleteState.error && <small className="cal__form-error">{deleteState.error}</small>}
                  </div>
                ) : (
                  <button type="button" className="cal__delete-btn" onClick={() => setDeleteState({ id: ev.id, password: "", error: "" })} aria-label="일정 삭제">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {showForm && (
        <div className="lightbox" onClick={() => setShowForm(false)}>
          <div className="cal__form-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cal__form-head">
              <strong>강의 일정 추가</strong>
              <button type="button" onClick={() => setShowForm(false)} aria-label="닫기"><X size={18} /></button>
            </div>
            <form onSubmit={submitForm} className="cal__form">
              <label>날짜<input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
              <label>시작 시간<input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
              <label>교육 시간<input type="text" required placeholder="예: 3시간, 7시간, 2일" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></label>
              <label>회사명<input type="text" required placeholder="예: 한국○○공사" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></label>
              <label>교육 주제<input type="text" required placeholder="예: AI 보고서 작성 실무" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} /></label>
              <label><Lock size={13} /> 비밀번호<input type="password" required placeholder="등록 비밀번호" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
              {formError && <p className="cal__form-error">{formError}</p>}
              <button type="submit" className="button button--primary" disabled={submitting}>{submitting ? "등록 중..." : "등록하기"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
