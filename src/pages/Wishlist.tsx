import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useCart();
  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <Heart className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="text-xl font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-sm text-muted-foreground">Save products you love for later</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Wishlist ({wishlistProducts.length})</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((p, i) => p && <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
