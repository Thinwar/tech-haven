import { Star } from "lucide-react";
import { reviews } from "@/data/products";
import ScrollReveal from "./ScrollReveal";

const ReviewSection = () => {
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-surface-sunken/50 py-12 md:py-16">
      <div className="container">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h2 className="text-lg font-bold text-foreground md:text-xl">What Our Customers Say</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Real reviews from real people — no filter, no fluff</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {featured.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="mb-3 flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                  ))}
                </div>
                <h4 className="mb-1.5 text-sm font-semibold text-foreground">{review.title}</h4>
                <p className="mb-5 text-[13px] leading-relaxed text-muted-foreground">{review.content}</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-foreground">{review.author}</div>
                    {review.verified && <div className="text-[10px] font-medium text-success">✓ Verified Buyer</div>}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
