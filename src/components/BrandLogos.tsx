import ScrollReveal from "./ScrollReveal";

const brands = ["Apple", "Samsung", "Sony", "Dell", "Logitech", "Nintendo", "Google", "JBL"];

const BrandLogos = () => {
  return (
    <section className="border-y border-border/40 bg-surface-sunken/30 py-8 md:py-10">
      <div className="container">
        <ScrollReveal>
          <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
            Trusted Brands We Stock
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-14">
          {brands.map((brand, i) => (
            <ScrollReveal key={brand} delay={i * 0.05} direction="none">
              <span className="text-sm font-bold text-foreground/25 transition-all duration-300 hover:text-foreground/60 hover:scale-105 cursor-default md:text-base">
                {brand}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
