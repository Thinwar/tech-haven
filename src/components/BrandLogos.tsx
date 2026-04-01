const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=40&fit=crop" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=40&fit=crop" },
  { name: "Dell", logo: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=100&h=40&fit=crop" },
  { name: "Logitech", logo: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=40&fit=crop" },
  { name: "Nintendo", logo: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=100&h=40&fit=crop" },
];

const BrandLogos = () => {
  return (
    <section className="border-y border-border bg-surface-sunken py-8">
      <div className="container">
        <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted Brands We Stock
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
              <span className="text-sm font-bold text-foreground">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
