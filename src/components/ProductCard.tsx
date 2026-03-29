import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const badgeStyles = {
  sale: "bg-badge-sale text-badge-sale-foreground",
  new: "bg-badge-new text-badge-new-foreground",
  bestseller: "bg-accent text-accent-foreground",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeStyles[product.badge]}`}>
          {product.badge === "sale" ? `-${discount}%` : product.badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-muted"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${isInWishlist(product.id) ? "fill-badge-sale text-badge-sale" : "text-muted-foreground"}`}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-surface-sunken">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs font-medium text-muted-foreground">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground transition-colors hover:text-accent line-clamp-2">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">{product.shortDescription}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
