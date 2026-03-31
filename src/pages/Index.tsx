import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import Hero from "@/components/Hero";
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

      {/* Featured Tech */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Featured Tech</h2>
            <p className="mt-1 text-sm text-muted-foreground">Curated performance gadgets for the modern professional.</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View Catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Deals */}
      {deals.length > 0 && (
        <section className="bg-surface-sunken py-16">
          <div className="container">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Hot Deals</h2>
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
      )}

      {/* Newsletter + Refurbished Hub */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Newsletter */}
          <div className="rounded-2xl bg-secondary p-8 md:p-10">
            <h3 className="text-xl font-bold text-secondary-foreground md:text-2xl">
              Stay at the cutting edge.
            </h3>
            <p className="mt-2 text-sm text-secondary-foreground/60">
              Join our journal to receive weekly insights on upcoming tech trends and exclusive early access to product launches.
            </p>
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-secondary-foreground/10 px-4 py-2.5 text-sm text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Subscribe
              </button>
            </div>
          </div>

          {/* Refurbished Hub */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-sunken p-8 text-center md:p-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Refurbished Hub</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Sustainable tech solutions that don't compromise on quality.
            </p>
            <Link
              to="/shop"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Explore Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
