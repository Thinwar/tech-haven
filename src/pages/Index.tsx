import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import { getFeaturedProducts, getDeals } from "@/data/products";

const Index = () => {
  const featured = getFeaturedProducts();
  const deals = getDeals();

  return (
    <div className="min-h-screen">
      <Hero />
      <PromoBanner />
      <CategoryGrid />

      {/* Trending Products */}
      <section className="container pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
            <p className="mt-1 text-sm text-muted-foreground">Most popular picks this week</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="bg-surface-sunken py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Hot Deals 🔥</h2>
              <p className="mt-1 text-sm text-muted-foreground">Limited time offers you don't want to miss</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {deals.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
