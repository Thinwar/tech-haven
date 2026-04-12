import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Wishlist = () => {
  const { wishlist } = useCart();
  const wishlistProducts = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
            <Heart className="h-16 w-16 text-muted-foreground/20" />
          </motion.div>
          <h2 className="text-lg font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-[13px] text-muted-foreground">Save products you love for later</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <h1 className="mb-6 text-xl font-bold text-foreground md:text-2xl">Wishlist ({wishlistProducts.length})</h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {wishlistProducts.map((p, i) => p && <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Wishlist;
