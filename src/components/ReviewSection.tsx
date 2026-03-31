import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/products";

const ReviewSection = () => {
  const featured = reviews.slice(0, 3);

  return (
    <section className="bg-surface-sunken py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">What Our Customers Say</h2>
          <p className="mt-1 text-sm text-muted-foreground">Real reviews from verified buyers</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((review) => (
            <div key={review.id} className="relative rounded-xl border border-border bg-card p-6">
              <Quote className="absolute right-4 top-4 h-6 w-6 text-muted-foreground/20" />
              <div className="mb-3 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`} />
                ))}
              </div>
              <h4 className="mb-1 text-sm font-semibold text-foreground">{review.title}</h4>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{review.content}</p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">{review.author}</div>
                  {review.verified && <div className="text-[10px] text-success">✓ Verified Buyer</div>}
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
