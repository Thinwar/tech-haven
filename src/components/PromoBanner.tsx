import { Truck, ShieldCheck, Lock, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, label: "Fast Delivery", desc: "Same day shipping on all orders" },
  { icon: ShieldCheck, label: "1 Year Warranty", desc: "Full coverage and tech support" },
  { icon: Lock, label: "Secure Payments", desc: "Encrypted checkout experience" },
  { icon: Headphones, label: "24/7 Support", desc: "Experts available anytime" },
];

const PromoBanner = () => {
  return (
    <section className="bg-secondary/95 border-t border-secondary-foreground/10">
      <div className="container py-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-foreground/10">
                <perk.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-secondary-foreground">{perk.label}</div>
                <div className="text-xs text-secondary-foreground/50">{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
