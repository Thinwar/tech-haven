import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { useProducts } from "@/hooks/useProducts";
import { Timer } from "lucide-react";

const Deals = () => {
  const { deals, loading } = useProducts();

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <ScrollReveal duration={0.3}>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Today's Deals</h1>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">Limited time offers — grab them before they're gone</p>
        </ScrollReveal>
        {loading ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {deals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Deals;
