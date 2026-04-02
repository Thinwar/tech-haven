import { Star } from "lucide-react";
import { reviews } from "@/data/products";

const ReviewSection = () => {
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-surface-sunken/50 py-10 md:py-12">
      <div className="container">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-foreground md:text-xl">What Our Customers Say</h2>
          <p className="mt-0.5 text-[13px] text-muted-foreground">Real reviews from real people — no filter, no fluff</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {featured.map((review) => (
            <div key={review.id} className="relative rounded-xl border border-border/50 bg-card p-5 shadow-card">
              <div className="mb-2.5 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
              <h4 className="mb-1 text-sm font-semibold text-foreground">{review.title}</h4>
              <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">{review.content}</p>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">{review.author}</div>
                  {review.verified && <div className="text-[10px] font-medium text-success">✓ Verified Buyer</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
