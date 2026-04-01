import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

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
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">Shop by Category</h2>
        <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="h-16 w-16 overflow-hidden rounded-lg">
                <img
                  src={categoryImages[cat.id] || ""}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-semibold text-foreground md:text-sm">{cat.name}</span>
              <span className="text-[10px] text-muted-foreground">{cat.count} items</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
