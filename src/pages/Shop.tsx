import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("featured");
  const { products, loading } = useProducts();

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <ScrollReveal duration={0.3}>
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {activeCategory === "all" ? "All Products" : categories.find((c) => c.id === activeCategory)?.name || "Shop"}
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground">{sorted.length} products available</p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} duration={0.3}>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSearchParams({})}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${activeCategory === "all" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams({ category: cat.id })}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-border bg-card px-3 py-2 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        {loading ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {sorted.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Shop;
