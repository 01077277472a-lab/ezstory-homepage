import { NextResponse } from "next/server";
import { getNaverFeed } from "@/lib/naver";
export const revalidate = 3600;
export async function GET() { return NextResponse.json(await getNaverFeed(12)); }
