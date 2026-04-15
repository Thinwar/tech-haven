import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronRight, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { reviews } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, getById } = useProducts();
  const product = getById(id || "");
  const productReviews = reviews.filter((r) => r.productId === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

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
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-5 md:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-3"
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface-sunken">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-all duration-200 md:h-20 md:w-20 ${i === selectedImage ? "border-primary shadow-md" : "border-border/60 hover:border-border"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="text-[13px] font-medium text-muted-foreground">{product.brand}</div>
              <h1 className="mt-1 text-xl font-bold text-foreground md:text-2xl lg:text-3xl">{product.name}</h1>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-px">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                ))}
              </div>
              <span className="text-[13px] text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-foreground md:text-3xl">KES {kesPrice.toLocaleString()}</span>
              {kesOriginal && (
                <>
                  <span className="text-base text-muted-foreground line-through">KES {kesOriginal.toLocaleString()}</span>
                  <span className="rounded-lg bg-badge-sale px-2.5 py-1 text-[11px] font-bold text-badge-sale-foreground">
                    Save KES {(kesOriginal - kesPrice).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">{product.description}</p>

            <div className={`flex items-center gap-2 text-[13px] font-medium ${product.inStock ? "text-success" : "text-destructive"}`}>
              <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-success animate-pulse" : "bg-destructive"}`} />
              {product.inStock ? "In Stock — Ready to ship" : "Out of Stock"}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center rounded-xl border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">−</button>
                <span className="min-w-[2.5rem] text-center text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">+</button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97] hover:shadow-md"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 ${isInWishlist(product.id) ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-border text-muted-foreground hover:text-foreground hover:border-border"}`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Perks */}
            <div className="mt-2 space-y-2.5 rounded-2xl border border-border/60 bg-surface-sunken/50 p-4">
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                <Truck className="h-4 w-4 text-primary/60" /> Free shipping on orders over KES 5,000
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                <Shield className="h-4 w-4 text-primary/60" /> 1-year manufacturer warranty
              </div>
            </div>

            {/* Specs */}
            <div className="mt-2">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Key Specifications</h3>
              <div className="space-y-0 rounded-xl border border-border/60 overflow-hidden">
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div key={key} className={`flex justify-between px-4 py-2.5 text-[13px] ${i % 2 === 0 ? "bg-surface-sunken/30" : "bg-card"}`}>
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
          <section className="mt-14 md:mt-20">
            <ScrollReveal>
              <h2 className="mb-6 text-lg font-bold text-foreground">Customer Reviews</h2>
            </ScrollReveal>
            <div className="grid gap-4 md:grid-cols-2">
              {productReviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 0.08}>
                  <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-md md:p-6">
                    <div className="mb-2 flex items-center gap-px">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                      ))}
                    </div>
                    <h4 className="mb-1.5 text-sm font-semibold text-foreground">{review.title}</h4>
                    <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{review.content}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{review.author}</span>
                      {review.verified && <span className="text-success font-medium">✓ Verified</span>}
                      <span>· {review.date}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14 pb-8 md:mt-20">
            <ScrollReveal>
              <h2 className="mb-6 text-lg font-bold text-foreground">You Might Also Like</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </PageTransition>
  );
};

export default ProductDetail;
