import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialCards({ limit = testimonials.length }: { limit?: number }) {
  return (
    <div className="testimonial-scroll">
      {testimonials.slice(0, limit).map((item, index) => (
        <article className="testimonial-card" key={`${item.category}-${index}`}>
          <Quote size={28} />
          <p>“{item.quote}”</p>
          <footer>
            <strong>{item.source}</strong>
            <span>{item.category}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}
