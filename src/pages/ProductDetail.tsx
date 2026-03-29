import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronRight, Truck, Shield, ArrowLeft } from "lucide-react";
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
        <h2 className="text-xl font-bold text-foreground">Product not found</h2>
        <Link to="/shop" className="text-sm text-accent hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
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
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-colors ${i === selectedImage ? "border-accent" : "border-border"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="flex flex-col gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">{product.brand}</div>
              <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="rounded-md bg-badge-sale px-2 py-0.5 text-xs font-semibold text-badge-sale-foreground">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className={`flex items-center gap-2 text-sm font-medium ${product.inStock ? "text-success" : "text-destructive"}`}>
              <span className={`h-2 w-2 rounded-full ${product.inStock ? "bg-success" : "bg-destructive"}`} />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center rounded-lg border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">−</button>
                <span className="min-w-[2rem] text-center text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">+</button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${isInWishlist(product.id) ? "border-badge-sale bg-badge-sale/10 text-badge-sale" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Perks */}
            <div className="mt-2 space-y-2 rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" /> Free shipping on orders over $99
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" /> 2-year manufacturer warranty
              </div>
            </div>

            {/* Specs */}
            <div className="mt-2">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Key Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-border py-2 text-sm last:border-0">
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
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-foreground">Customer Reviews</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {productReviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-2 flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">{review.title}</h4>
                  <p className="mb-3 text-sm text-muted-foreground">{review.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{review.author}</span>
                    {review.verified && <span className="text-success">✓ Verified</span>}
                    <span>· {review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pb-8">
            <h2 className="mb-6 text-xl font-bold text-foreground">You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
