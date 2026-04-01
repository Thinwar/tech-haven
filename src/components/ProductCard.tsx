import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const badgeStyles = {
  sale: "bg-badge-sale text-badge-sale-foreground",
  new: "bg-badge-new text-badge-new-foreground",
  bestseller: "bg-primary text-primary-foreground",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart } = useCart();
  const kesPrice = product.price * 130;
  const kesOriginal = product.originalPrice ? product.originalPrice * 130 : null;
  const discount = kesOriginal ? Math.round(((kesOriginal - kesPrice) / kesOriginal) * 100) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute left-2 top-2 z-10 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}>
          {product.badge === "sale" && discount ? `-${discount}%` : product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-destructive">
        <Heart className="h-4 w-4" />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-surface-sunken p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-foreground transition-colors hover:text-primary line-clamp-2 leading-snug">
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-primary">KES {kesPrice.toLocaleString()}</span>
          </div>
          {kesOriginal && (
            <span className="text-xs text-muted-foreground line-through">KES {kesOriginal.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary/5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
