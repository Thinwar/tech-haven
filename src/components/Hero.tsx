import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    tag: "NEW ARRIVAL",
    title: "iPhone 15 Pro Max",
    subtitle: "Titanium. So strong. So light.",
    desc: "A17 Pro chip. 48MP camera system. Titanium design. The most powerful iPhone ever.",
    price: "KES 199,999",
    cta: "Shop Now",
    ctaLink: "/product/iphone-15-pro",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=500&fit=crop",
    bg: "from-foreground/5 to-surface-sunken",
  },
  {
    tag: "BEST SELLER",
    title: "MacBook Air M3",
    subtitle: "Supercharged for Pros.",
    desc: "Up to 18 hours of battery life. Stunning 15-inch Liquid Retina display.",
    price: "KES 168,999",
    cta: "Shop Now",
    ctaLink: "/product/macbook-air-m3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=500&fit=crop",
    bg: "from-foreground/5 to-surface-sunken",
  },
  {
    tag: "GAMING",
    title: "PlayStation 5 Slim",
    subtitle: "Next-gen gaming is here.",
    desc: "Lightning-fast loading. Stunning 4K graphics. Immersive DualSense controller.",
    price: "KES 58,999",
    cta: "Shop Now",
    ctaLink: "/product/ps5-slim",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=500&fit=crop",
    bg: "from-foreground/5 to-surface-sunken",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-sunken to-background">
      <div className="container py-6 md:py-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-muted to-surface-sunken">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid min-h-[280px] items-center gap-6 p-8 md:min-h-[380px] md:grid-cols-2 md:p-12"
            >
              {/* Text */}
              <div>
                <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
                  {slide.tag}
                </span>
                <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-1 text-lg font-semibold text-primary md:text-xl">{slide.subtitle}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{slide.desc}</p>
                <div className="mt-2 text-2xl font-extrabold text-foreground">{slide.price}</div>
                <Link
                  to={slide.ctaLink}
                  className="mt-4 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:bg-primary/90 active:scale-[0.98]"
                >
                  {slide.cta}
                </Link>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-48 w-auto max-w-full rounded-xl object-contain md:h-64"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            <button
              onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % slides.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-colors hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
