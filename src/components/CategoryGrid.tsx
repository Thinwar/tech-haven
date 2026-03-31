import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

const CategoryGrid = () => {
  return (
    <section className="container py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">Find exactly what you're looking for</p>
        </div>
        <Link to="/shop" className="text-sm font-medium text-primary hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/shop?category=${cat.id}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-foreground">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} products</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
