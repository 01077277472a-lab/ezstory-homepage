import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

export function FloatingContact() {
  return <Link href="/contact" className="floating-contact"><MessageCircleMore size={21} /><span>교육 문의</span></Link>;
}
