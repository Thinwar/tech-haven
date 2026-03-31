import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

const badgeStyles = {
  sale: "bg-badge-sale text-badge-sale-foreground",
  new: "bg-badge-new text-badge-new-foreground",
  bestseller: "bg-primary text-primary-foreground",
};

const categoryLabels: Record<string, string> = {
  smartphones: "MOBILE",
  laptops: "COMPUTING",
  audio: "AUDIO",
  gaming: "GAMING",
  accessories: "WEARABLES",
  tablets: "TABLETS",
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute left-3 top-3 z-10 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeStyles[product.badge]}`}>
          {product.badge}
        </span>
      )}

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
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[10px] font-semibold tracking-wider text-primary">
          {categoryLabels[product.category] || product.category.toUpperCase()}
        </span>
        <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground transition-colors hover:text-primary line-clamp-2">
          {product.name}
        </Link>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground opacity-0 transition-all group-hover:opacity-100 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
