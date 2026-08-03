import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type ScheduleEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: string; // e.g. "3시간"
  company: string;
  topic: string;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "schedule-events.json");

function readLocal(): ScheduleEntry[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: ScheduleEntry[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf8");
}

export async function listScheduleEntries(): Promise<ScheduleEntry[]> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("schedule_events")
      .select("id, event_date, event_time, duration, company, topic, created_at")
      .order("event_date", { ascending: true });
    if (!error && data) {
      return data.map((r) => ({ id: r.id, date: r.event_date, time: r.event_time, duration: r.duration || "", company: r.company, topic: r.topic, createdAt: r.created_at }));
    }
  }
  return readLocal()
    .map((e) => ({ ...e, duration: e.duration ?? "" }))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export async function addScheduleEntry(input: { date: string; time: string; duration: string; company: string; topic: string }): Promise<ScheduleEntry> {
  const entry: ScheduleEntry = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("schedule_events").insert({
      id: entry.id, event_date: entry.date, event_time: entry.time, duration: entry.duration, company: entry.company, topic: entry.topic, created_at: entry.createdAt,
    });
    if (!error) return entry;
  }

  const entries = readLocal();
  entries.push(entry);
  writeLocal(entries);
  return entry;
}

export async function deleteScheduleEntry(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("schedule_events").delete().eq("id", id);
    if (!error) return;
  }
  writeLocal(readLocal().filter((e) => e.id !== id));
}

export function checkSchedulePassword(input: string): boolean {
  const expected = process.env.SCHEDULE_EDIT_PASSWORD || "2966";
  return input === expected;
}
