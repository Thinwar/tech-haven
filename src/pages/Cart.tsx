import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, tax, total, clearCart } = useCart();

  const kesSubtotal = subtotal * 130;
  const kesTax = tax * 130;
  const kesTotal = total * 130;
  const freeShipping = kesSubtotal > 5000;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3">
          <ShoppingBag className="h-14 w-14 text-muted-foreground/30" />
          <h2 className="text-lg font-bold text-foreground">Your cart is empty</h2>
          <p className="text-[13px] text-muted-foreground">Add some products to get started!</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-8">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground md:text-2xl">Shopping Cart ({items.length})</h1>
          <button onClick={clearCart} className="text-[13px] text-muted-foreground hover:text-destructive transition-colors">
            Clear cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Items */}
          <div className="space-y-2.5 lg:col-span-2">
            {items.map((item) => {
              const kesPrice = item.product.price * 130;
              return (
                <div key={item.product.id} className="flex gap-3 rounded-xl border border-border/60 bg-card p-3.5 shadow-card md:gap-4 md:p-4">
                  <Link to={`/product/${item.product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-sunken md:h-24 md:w-24">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="text-[13px] font-semibold text-foreground hover:text-primary line-clamp-1">
                        {item.product.name}
                      </Link>
                      <div className="text-[11px] text-muted-foreground">{item.product.brand}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-[13px] font-medium text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-bold text-foreground">KES {(kesPrice * item.quantity).toLocaleString()}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-border/60 bg-card p-5 shadow-card">
            <h3 className="mb-4 text-base font-bold text-foreground">Order Summary</h3>
            <div className="space-y-2.5 text-[13px]">
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
              <div className="border-t border-border/60 pt-2.5">
                <div className="flex justify-between text-[15px] font-bold text-foreground">
                  <span>Total</span>
                  <span>KES {(kesTotal + (freeShipping ? 0 : 500)).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <button className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]">
              Proceed to Checkout
            </button>
            <Link to="/shop" className="mt-3 flex items-center justify-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
