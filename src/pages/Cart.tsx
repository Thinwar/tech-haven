import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, tax, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <h2 className="text-xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground">Add some products to get started!</p>
          <Link
            to="/shop"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Shopping Cart ({items.length})</h1>
          <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive">
            Clear cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-3 lg:col-span-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <Link to={`/product/${item.product.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-sunken">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.product.id}`} className="text-sm font-semibold text-foreground hover:text-accent">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{item.product.brand}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-success font-medium">{subtotal > 99 ? "Free" : "$9.99"}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>${(total + (subtotal > 99 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]">
              Proceed to Checkout
            </button>
            <Link to="/shop" className="mt-3 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
