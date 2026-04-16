import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, User, MessageCircle, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { user } = useAuth();
  const { items, subtotal, tax, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const kesSubtotal = subtotal * 130;
  const kesTax = tax * 130;
  const kesTotal = total * 130;
  const freeShipping = kesSubtotal > 5000;
  const shipping = freeShipping ? 0 : 500;
  const grandTotal = kesTotal + shipping;

  const isValid = form.fullName.trim() && form.phone.trim() && form.address.trim() && form.city.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !user) return;
    setSubmitting(true);

    try {
      // Save order to database
      const orderItems = items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      }));

      await supabase.from("orders").insert({
        user_id: user.id,
        items: orderItems as any,
        subtotal: kesSubtotal,
        tax: kesTax,
        shipping,
        total: grandTotal,
        status: "pending",
        shipping_address: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          notes: form.notes,
        } as any,
        payment_method: "whatsapp",
      });

      // Build WhatsApp message
      const itemLines = items
        .map((i) => `• ${i.product.name} × ${i.quantity} — KES ${(i.product.price * 130 * i.quantity).toLocaleString()}`)
        .join("\n");

      const message = encodeURIComponent(
        `🛒 *New Order from Fast Tech Solutions*\n\n` +
        `👤 *Customer:* ${form.fullName}\n` +
        `📞 *Phone:* ${form.phone}\n` +
        `📍 *Address:* ${form.address}, ${form.city}\n` +
        `📧 *Email:* ${user.email}\n\n` +
        `*Items:*\n${itemLines}\n\n` +
        `Subtotal: KES ${kesSubtotal.toLocaleString()}\n` +
        `Shipping: ${freeShipping ? "Free" : "KES 500"}\n` +
        `Tax (16%): KES ${kesTax.toLocaleString()}\n` +
        `*Total: KES ${grandTotal.toLocaleString()}*\n\n` +
        (form.notes ? `📝 Notes: ${form.notes}\n\n` : "") +
        `Thank you! 🙏`
      );

      const whatsappUrl = `https://wa.me/254721997879?text=${message}`;
      window.open(whatsappUrl, "_blank");

      clearCart();
      toast({ title: "Order placed!", description: "Redirecting to WhatsApp..." });
      navigate("/account");
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h2 className="text-lg font-bold text-foreground">Your cart is empty</h2>
          <button onClick={() => navigate("/shop")} className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container py-6 md:py-10">
        <button onClick={() => navigate("/cart")} className="mb-6 flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
        </button>

        <h1 className="mb-6 text-xl font-bold text-foreground md:text-2xl">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8"
            >
              <h2 className="mb-5 text-base font-bold text-foreground">Shipping Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full name *"
                    required
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number *"
                    required
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div className="relative sm:col-span-2">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/60" />
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Delivery address *"
                    required
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City / Town *"
                    required
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div>
                  <input
                    value="Kenya"
                    readOnly
                    className="w-full rounded-xl border border-border bg-muted/50 py-3 px-4 text-sm text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Order notes (optional)"
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              type="submit"
              disabled={!isValid || submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-[0.98] disabled:opacity-50 lg:hidden"
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Placing Order..." : "Order via WhatsApp"}
            </motion.button>
          </form>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="h-fit rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:sticky lg:top-24"
          >
            <h3 className="mb-4 text-base font-bold text-foreground">Order Summary</h3>

            <div className="mb-4 max-h-48 space-y-2 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">{item.product.name}</p>
                    <p className="text-[11px] text-muted-foreground">× {item.quantity}</p>
                  </div>
                  <p className="text-[13px] font-semibold text-foreground">
                    KES {(item.product.price * 130 * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-border/60 pt-3 text-[13px]">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>KES {kesSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className={freeShipping ? "font-medium text-green-600" : ""}>
                  {freeShipping ? "Free" : "KES 500"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (16%)</span>
                <span>KES {kesTax.toLocaleString()}</span>
              </div>
              <div className="border-t border-border/60 pt-2">
                <div className="flex justify-between text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>KES {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                const form = document.querySelector("form");
                if (form) form.requestSubmit();
              }}
              disabled={!isValid || submitting}
              className="mt-5 hidden w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-[0.98] disabled:opacity-50 lg:flex"
            >
              <MessageCircle className="h-4 w-4" />
              {submitting ? "Placing Order..." : "Order via WhatsApp"}
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3 w-3" />
              Secure order via WhatsApp
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Checkout;
