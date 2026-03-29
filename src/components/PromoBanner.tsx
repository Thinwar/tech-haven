import { Link } from "react-router-dom";
import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $99" },
  { icon: Shield, label: "2-Year Warranty", desc: "On all products" },
  { icon: RefreshCw, label: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, label: "24/7 Support", desc: "Chat or call anytime" },
];

const PromoBanner = () => {
  return (
    <section className="container py-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {perks.map((perk) => (
          <div key={perk.label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <perk.icon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{perk.label}</div>
              <div className="text-xs text-muted-foreground">{perk.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
