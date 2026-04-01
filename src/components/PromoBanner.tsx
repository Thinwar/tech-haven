import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, label: "Free Delivery", desc: "Orders over KES 5,000" },
  { icon: ShieldCheck, label: "1 Year Warranty", desc: "Genuine products only" },
  { icon: CreditCard, label: "Secure Payment", desc: "M-Pesa & Card accepted" },
  { icon: Headphones, label: "24/7 Support", desc: "Call or WhatsApp us" },
];

const PromoBanner = () => {
  return (
    <section className="border-y border-border bg-background">
      <div className="container py-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <perk.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{perk.label}</div>
                <div className="text-xs text-muted-foreground">{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
