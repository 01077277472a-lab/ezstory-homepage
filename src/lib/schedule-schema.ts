import { z } from "zod";

export const scheduleEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식을 확인해 주세요."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "시간 형식을 확인해 주세요."),
  duration: z.string().trim().min(1, "교육 시간을 입력해 주세요.").max(20),
  company: z.string().trim().min(1, "회사명을 입력해 주세요.").max(80),
  topic: z.string().trim().min(1, "교육 주제를 입력해 주세요.").max(120),
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export type ScheduleEntryInput = z.infer<typeof scheduleEntrySchema>;
