create extension if not exists pgcrypto;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  organization text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  organization_type text,
  audience text,
  topic text not null,
  duration text,
  preferred_date text,
  delivery_format text,
  participants integer,
  requirements text not null,
  source text default 'website',
  status text not null default 'new' check (status in ('new','reviewing','quoted','confirmed','closed')),
  privacy_agreed boolean not null default true
);

alter table public.inquiries enable row level security;

-- Public visitors cannot directly query or insert. The Next.js server route uses the service-role key.
-- Add authenticated policies only if a full Supabase Auth admin is introduced later.

create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
create index if not exists inquiries_status_idx on public.inquiries(status);

-- 강의 일정: 홈페이지에서 비밀번호로 직접 등록하는 캘린더 (Supabase 미설정 시 로컬 JSON 파일로 자동 대체됨)
create table if not exists public.schedule_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_date date not null,
  event_time text not null,
  duration text not null default '',
  company text not null,
  topic text not null
);

alter table public.schedule_events add column if not exists duration text not null default '';

alter table public.schedule_events enable row level security;

create index if not exists schedule_events_date_idx on public.schedule_events(event_date);
