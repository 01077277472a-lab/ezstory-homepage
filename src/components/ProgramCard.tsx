import Link from "next/link";
import { ArrowUpRight, Clock3, Users } from "lucide-react";
import type { Program } from "@/data/programs";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={`/programs/${program.slug}`} className={`program-card program-card--${program.accent}`}>
      <div className="program-card__top">
        <span>{program.category}</span>
        <ArrowUpRight size={22} />
      </div>
      <h3>{program.title}</h3>
      <p>{program.summary}</p>
      <div className="program-card__meta">
        <span><Clock3 size={16} /> {program.duration.join(" · ")}</span>
        <span><Users size={16} /> {program.audience[0]}</span>
      </div>
    </Link>
  );
}
