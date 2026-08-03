import { NextResponse } from "next/server";
import { z } from "zod";
import { programs } from "@/data/programs";
import { generateWithClaude, localCurriculum } from "@/lib/ai";
const schema = z.object({ organizationType: z.string().min(1).max(100), audience: z.string().min(1).max(200), topic: z.string().min(1).max(200), duration: z.string().min(1).max(50), goal: z.string().min(5).max(1000), focus: z.string().max(1000).optional().default("") });
export async function POST(request: Request) { const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "입력값을 확인해 주세요." }, { status: 400 }); const related = programs.find((program) => parsed.data.topic.includes(program.title) || program.title.includes(parsed.data.topic)); const fallback = localCurriculum(parsed.data, related); const result = await generateWithClaude(parsed.data, fallback); return NextResponse.json(result); }
