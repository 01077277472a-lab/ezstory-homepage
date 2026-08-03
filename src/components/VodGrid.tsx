"use client";

import { useEffect, useState } from "react";
import { LockKeyhole, PlayCircle, X } from "lucide-react";
import type { VodItem } from "@/data/vod";

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    const match = u.pathname.match(/\/embed\/([^/?]+)/);
    if (match) return match[1];
  } catch {
    return null;
  }
  return null;
}

export function VodGrid({ items }: { items: VodItem[] }) {
  const [playing, setPlaying] = useState<VodItem | null>(null);
  const videoId = playing?.url ? extractYoutubeId(playing.url) : null;

  useEffect(() => {
    if (!playing) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPlaying(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <>
      <div className="container vod-grid">
        {items.map((item, index) => {
          const ytId = item.url ? extractYoutubeId(item.url) : null;
          return (
            <article key={item.title}>
              {ytId ? (
                <button
                  type="button"
                  className="vod-thumbnail vod-thumbnail--playable"
                  style={{ backgroundImage: `url(https://img.youtube.com/vi/${ytId}/hqdefault.jpg)` }}
                  onClick={() => setPlaying(item)}
                >
                  <PlayCircle size={52} />
                </button>
              ) : (
                <div className="vod-thumbnail">
                  <PlayCircle size={52} />
                  <span>COMING SOON</span>
                </div>
              )}
              <small>VOD {String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {ytId ? (
                <button type="button" className="text-link vod-watch-link" onClick={() => setPlaying(item)}>
                  <PlayCircle size={15} /> 지금 바로 보기
                </button>
              ) : (
                <span className="locked"><LockKeyhole size={15} /> 오픈 알림 준비 중</span>
              )}
            </article>
          );
        })}
      </div>

      {playing && videoId && (
        <div className="lightbox" onClick={() => setPlaying(null)}>
          <div className="vod-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox__close vod-modal__close" onClick={() => setPlaying(null)} aria-label="닫기">
              <X size={20} />
            </button>
            <div className="vod-modal__frame">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
