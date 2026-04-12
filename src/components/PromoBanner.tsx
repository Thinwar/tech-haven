import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const perks = [
  { icon: Truck, label: "Free Delivery", desc: "Orders over KES 5,000" },
  { icon: ShieldCheck, label: "1 Year Warranty", desc: "Genuine products only" },
  { icon: CreditCard, label: "Secure Payment", desc: "M-Pesa & Card" },
  { icon: Headphones, label: "24/7 Support", desc: "Call or WhatsApp" },
];

const PromoBanner = () => {
  return (
    <section className="border-y border-border/40 bg-background">
      <div className="container py-5 md:py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {perks.map((perk, i) => (
            <ScrollReveal key={perk.label} delay={i * 0.08} direction="up">
              <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-transform hover:scale-105">
                  <perk.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground">{perk.label}</div>
                  <div className="text-[11px] text-muted-foreground">{perk.desc}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
