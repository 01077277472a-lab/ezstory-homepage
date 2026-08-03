import { z } from "zod";

export const inquirySchema = z.object({
  organization: z.string().trim().min(2, "기관·회사명을 입력해 주세요.").max(100),
  contactName: z.string().trim().min(2, "담당자명을 입력해 주세요.").max(50),
  email: z.email("이메일 형식을 확인해 주세요."),
  phone: z.string().trim().min(8, "연락처를 확인해 주세요.").max(30),
  organizationType: z.string().trim().max(50).optional().default(""),
  audience: z.string().trim().max(150).optional().default(""),
  topic: z.string().trim().min(2, "교육 주제를 선택하거나 입력해 주세요.").max(200),
  duration: z.string().trim().max(50).optional().default(""),
  preferredDate: z.string().trim().max(100).optional().default(""),
  deliveryFormat: z.string().trim().max(50).optional().default(""),
  participants: z.coerce.number().int().min(1).max(5000).optional(),
  requirements: z.string().trim().min(10, "교육 목적과 요구사항을 10자 이상 입력해 주세요.").max(5000),
  privacy: z.literal(true, { error: "개인정보 수집·이용 동의가 필요합니다." }),
  website: z.string().max(0).optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
