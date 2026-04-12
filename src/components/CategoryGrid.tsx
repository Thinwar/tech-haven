import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import ScrollReveal from "./ScrollReveal";

const categoryImages: Record<string, string> = {
  smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
  gaming: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300&h=200&fit=crop",
  accessories: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
  tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
};

const CategoryGrid = () => {
  return (
    <section className="container py-8 md:py-12">
      <ScrollReveal>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground md:text-xl">Shop by Category</h2>
            <p className="mt-1 text-[13px] text-muted-foreground">Find exactly what you're looking for</p>
          </div>
          <Link to="/shop" className="hidden text-[13px] font-semibold text-primary hover:underline sm:block">
            View all →
          </Link>
        </div>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.id} delay={i * 0.06}>
            <Link
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
            >
              <div className="h-14 w-14 overflow-hidden rounded-xl">
                <img
                  src={categoryImages[cat.id] || ""}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-semibold text-foreground md:text-[13px]">{cat.name}</span>
              <span className="text-[10px] text-muted-foreground">{cat.count} items</span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
