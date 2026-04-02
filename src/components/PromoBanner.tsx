import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, label: "Free Delivery", desc: "Orders over KES 5,000" },
  { icon: ShieldCheck, label: "1 Year Warranty", desc: "Genuine products only" },
  { icon: CreditCard, label: "Secure Payment", desc: "M-Pesa & Card" },
  { icon: Headphones, label: "24/7 Support", desc: "Call or WhatsApp" },
];

const PromoBanner = () => {
  return (
    <section className="border-y border-border/40 bg-background">
      <div className="container py-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <perk.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground">{perk.label}</div>
                <div className="text-[11px] text-muted-foreground">{perk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
