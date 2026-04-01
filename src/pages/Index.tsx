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
      <section className="container pb-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground md:text-2xl">Featured Products</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked by our team, loved by our customers</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <Link to="/shop" className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline sm:hidden">
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Hot Deals */}
      {deals.length > 0 && (
        <section className="bg-surface-sunken py-12">
          <div className="container">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-destructive" />
                  <h2 className="text-xl font-bold text-foreground md:text-2xl">Today's Deals</h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Limited time offers — grab them before they're gone</p>
              </div>
              <Link to="/deals" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
                See All Deals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
              {deals.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">New Arrivals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fresh off the shelf — just landed in our store</p>
            </div>
            <Link to="/shop" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-5">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <BrandLogos />

      {/* Newsletter */}
      <section className="container py-12">
        <div className="rounded-2xl bg-primary p-8 text-center md:p-14">
          <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">
            Don't Miss Out on Exclusive Deals
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-primary-foreground/70">
            Join 12,000+ Kenyans who get our weekly deals, new arrivals, and tech tips straight to their inbox.
          </p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-lg bg-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
            <button className="rounded-lg bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-primary-foreground/50">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      <ReviewSection />
      <Footer />
    </div>
  );
};

export default Index;
