import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useCart();
  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <Heart className="h-14 w-14 text-muted-foreground/30" />
          <h2 className="text-lg font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-[13px] text-muted-foreground">Save products you love for later</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-8">
        <h1 className="mb-5 text-xl font-bold text-foreground md:text-2xl">Wishlist ({wishlistProducts.length})</h1>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 lg:gap-3">
          {wishlistProducts.map((p, i) => p && <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
