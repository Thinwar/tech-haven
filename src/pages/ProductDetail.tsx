import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronRight, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { getProductById, getReviewsByProductId, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const productReviews = getReviewsByProductId(id || "");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-bold text-foreground">Product not found</h2>
        <Link to="/shop" className="text-[13px] text-primary hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const kesPrice = product.price * 130;
  const kesOriginal = product.originalPrice ? product.originalPrice * 130 : null;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-5 md:py-6">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="aspect-square overflow-hidden rounded-xl bg-surface-sunken">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${i === selectedImage ? "border-primary" : "border-border/60 hover:border-border"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3">
            <div>
              <div className="text-[13px] font-medium text-muted-foreground">{product.brand}</div>
              <h1 className="mt-0.5 text-xl font-bold text-foreground md:text-2xl">{product.name}</h1>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-px">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
              <span className="text-[13px] text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold text-foreground">KES {kesPrice.toLocaleString()}</span>
              {kesOriginal && (
                <>
                  <span className="text-base text-muted-foreground line-through">KES {kesOriginal.toLocaleString()}</span>
                  <span className="rounded-md bg-badge-sale px-2 py-0.5 text-[11px] font-bold text-badge-sale-foreground">
                    Save KES {(kesOriginal - kesPrice).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="text-[13px] leading-relaxed text-muted-foreground">{product.description}</p>

            <div className={`flex items-center gap-2 text-[13px] font-medium ${product.inStock ? "text-success" : "text-destructive"}`}>
              <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-success" : "bg-destructive"}`} />
              {product.inStock ? "In Stock — Ready to ship" : "Out of Stock"}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex items-center rounded-lg border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">−</button>
                <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">+</button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${isInWishlist(product.id) ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-border text-muted-foreground hover:text-foreground hover:border-border"}`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Perks */}
            <div className="mt-1 space-y-2 rounded-lg border border-border/60 bg-surface-sunken/50 p-3.5">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Truck className="h-4 w-4 text-primary/60" /> Free shipping on orders over KES 5,000
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Shield className="h-4 w-4 text-primary/60" /> 1-year manufacturer warranty
              </div>
            </div>

            {/* Specs */}
            <div className="mt-1">
              <h3 className="mb-2.5 text-sm font-semibold text-foreground">Key Specifications</h3>
              <div className="space-y-0">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border/40 py-2 text-[13px] last:border-0">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <section className="mt-12 md:mt-16">
            <h2 className="mb-5 text-lg font-bold text-foreground">Customer Reviews</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {productReviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border/60 bg-card p-5 shadow-card">
                  <div className="mb-2 flex items-center gap-px">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                    ))}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">{review.title}</h4>
                  <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{review.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{review.author}</span>
                    {review.verified && <span className="text-success font-medium">✓ Verified</span>}
                    <span>· {review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 pb-6 md:mt-16">
            <h2 className="mb-5 text-lg font-bold text-foreground">You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:gap-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
