const brands = ["Apple", "Samsung", "Sony", "Dell", "Logitech", "Nintendo", "Google", "JBL"];

const BrandLogos = () => {
  return (
    <section className="border-y border-border/40 bg-surface-sunken/50 py-6">
      <div className="container">
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
          Trusted Brands We Stock
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-bold text-foreground/30 transition-colors hover:text-foreground/60"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
