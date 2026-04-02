import { Link } from "react-router-dom";
import { ArrowRight, Zap, Timer } from "lucide-react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import CategoryGrid from "@/components/CategoryGrid";
import BrandLogos from "@/components/BrandLogos";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import { getFeaturedProducts, getDeals, products } from "@/data/products";

const Index = () => {
  const featured = getFeaturedProducts();
  const deals = getDeals();
  const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <PromoBanner />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="container pb-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-bold text-foreground md:text-xl">Featured Products</h2>
            </div>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Hand-picked by our team, loved by our customers</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-[13px] font-semibold text-primary hover:underline sm:flex">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:gap-3">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <Link to="/shop" className="mt-4 flex items-center justify-center gap-1 text-[13px] font-semibold text-primary hover:underline sm:hidden">
          View All Products <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* Hot Deals */}
      {deals.length > 0 && (
        <section className="bg-surface-sunken/50 py-10">
          <div className="container">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-destructive" />
                  <h2 className="text-lg font-bold text-foreground md:text-xl">Today's Deals</h2>
                </div>
                <p className="mt-0.5 text-[13px] text-muted-foreground">Limited time offers — grab them before they're gone</p>
              </div>
              <Link to="/deals" className="hidden items-center gap-1 text-[13px] font-semibold text-primary hover:underline sm:flex">
                See All Deals <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:gap-3">
              {deals.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground md:text-xl">New Arrivals</h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Fresh off the shelf — just landed in our store</p>
            </div>
            <Link to="/shop" className="hidden items-center gap-1 text-[13px] font-semibold text-primary hover:underline sm:flex">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:gap-3">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <BrandLogos />

      {/* Newsletter */}
      <section className="container py-10">
        <div className="rounded-2xl bg-primary p-7 text-center md:p-12">
          <h3 className="text-lg font-bold text-primary-foreground md:text-xl">
            Don't Miss Out on Exclusive Deals
          </h3>
          <p className="mx-auto mt-1.5 max-w-md text-[13px] text-primary-foreground/70">
            Join 12,000+ Kenyans who get our weekly deals, new arrivals, and tech tips straight to their inbox.
          </p>
          <div className="mx-auto mt-5 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full bg-primary-foreground/15 px-5 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <button className="rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-all hover:opacity-90 active:scale-[0.97]">
              Subscribe
            </button>
          </div>
          <p className="mt-2.5 text-[11px] text-primary-foreground/40">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
