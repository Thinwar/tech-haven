import { useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const badgeStyles = {
  sale: "bg-badge-sale text-badge-sale-foreground",
  new: "bg-badge-new text-badge-new-foreground",
  bestseller: "bg-primary text-primary-foreground",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart } = useCart();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const kesPrice = product.price * 130;
  const kesOriginal = product.originalPrice ? product.originalPrice * 130 : null;
  const discount = kesOriginal ? Math.round(((kesOriginal - kesPrice) / kesOriginal) * 100) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3), ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border hover:-translate-y-1"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute left-2.5 top-2.5 z-10 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}>
          {product.badge === "sale" && discount ? `-${discount}%` : product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:text-destructive hover:bg-background hover:scale-110">
        <Heart className="h-3.5 w-3.5" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-surface-sunken p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-600 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 pt-2.5 md:p-4 md:pt-3">
        <Link to={`/product/${product.id}`} className="text-[13px] font-medium leading-snug text-foreground transition-colors hover:text-primary line-clamp-2 md:text-sm">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-px">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-1">
          <span className="text-[15px] font-bold text-foreground md:text-base">KES {kesPrice.toLocaleString()}</span>
          {kesOriginal && (
            <span className="ml-1.5 text-xs text-muted-foreground line-through">KES {kesOriginal.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.96]"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
