"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, Shuffle, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/gallery";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function PhotoGallery({ photos, variant = "grid" }: { photos: GalleryPhoto[]; variant?: "grid" | "row" }) {
  const [ordered, setOrdered] = useState(photos);
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    setOrdered(shuffle(photos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className={variant === "row" ? "photo-row" : "photo-grid"}>
      {variant === "grid" && (
        <button type="button" className="photo-shuffle" onClick={() => setOrdered(shuffle(photos))}>
          <Shuffle size={15} /> 다른 사진 보기
        </button>
      )}
      <div className={variant === "row" ? "photo-row__items" : "photo-grid__items"}>
        {ordered.map((photo) => (
          <button type="button" key={photo.id} className="photo-tile" onClick={() => setActive(photo)}>
            <Image src={photo.thumb} alt={photo.alt} fill sizes="(max-width: 800px) 45vw, 260px" />
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <div className="lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <img src={active.full} alt={active.alt} />
            <div className="lightbox__actions">
              <a href={active.full} download className="button button--white button--small">
                <Download size={16} /> 원본 저장
              </a>
              <button type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="닫기">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
