import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getDeals } from "@/data/products";
import { Timer } from "lucide-react";

const Deals = () => {
  const deals = getDeals();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-destructive" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Today's Deals</h1>
        </div>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Limited time offers — grab them before they're gone</p>
        <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Deals;
