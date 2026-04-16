import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, tax, total, clearCart } = useCart();
  const navigate = useNavigate();

  const kesSubtotal = subtotal * 130;
  const kesTax = tax * 130;
  const kesTotal = total * 130;
  const freeShipping = kesSubtotal > 5000;

  if (items.length === 0) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ShoppingBag className="h-16 w-16 text-muted-foreground/20" />
          </motion.div>
          <h2 className="text-lg font-bold text-foreground">Your cart is empty</h2>
          <p className="text-[13px] text-muted-foreground">Add some products to get started!</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">Shopping Cart ({items.length})</h1>
          <button onClick={clearCart} className="text-[13px] text-muted-foreground hover:text-destructive transition-colors">
            Clear cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
          {/* Items */}
          <div className="space-y-3 lg:col-span-2">
            {items.map((item, i) => {
              const kesPrice = item.product.price * 130;
              return (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md md:gap-5 md:p-5"
                >
                  <Link to={`/product/${item.product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-sunken md:h-24 md:w-24">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="text-[13px] font-semibold text-foreground hover:text-primary line-clamp-1 md:text-sm">
                        {item.product.name}
                      </Link>
                      <div className="text-[11px] text-muted-foreground">{item.product.brand}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-[13px] font-medium text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">KES {(kesPrice * item.quantity).toLocaleString()}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:sticky lg:top-24"
          >
            <h3 className="mb-5 text-base font-bold text-foreground">Order Summary</h3>
            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>KES {kesSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={freeShipping ? "font-medium text-success" : ""}>
                  {freeShipping ? "Free" : "KES 500"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (16%)</span>
                <span>KES {kesTax.toLocaleString()}</span>
              </div>
              <div className="border-t border-border/60 pt-3">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>KES {(kesTotal + (freeShipping ? 0 : 500)).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
            <Link to="/shop" className="mt-3 flex items-center justify-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3" /> Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Cart;
