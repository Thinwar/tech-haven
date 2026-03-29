import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getDeals } from "@/data/products";

const Deals = () => {
  const deals = getDeals();

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground">Today's Deals 🔥</h1>
        <p className="mt-1 text-sm text-muted-foreground">Limited time offers — grab them before they're gone</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
