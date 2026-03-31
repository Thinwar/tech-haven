import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    tag: "NEW ARRIVAL",
    title: "Premium\nHeadphones",
    desc: "Experience crystal sound with our industry-leading noise cancellation and spatial audio technology.",
    cta: "Shop Now",
    ctaLink: "/shop?category=audio",
    cta2: "View Specs",
    cta2Link: "/shop",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=600&fit=crop",
    gradient: "from-purple-900/40 via-secondary/90 to-secondary",
  },
  {
    tag: "BEST SELLER",
    title: "MacBook Air\nM3 Chip",
    desc: "Supercharged performance in the world's thinnest laptop. Up to 18 hours of battery life.",
    cta: "Shop Now",
    ctaLink: "/product/macbook-air-m3",
    cta2: "Compare",
    cta2Link: "/shop?category=laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=600&fit=crop",
    gradient: "from-blue-900/40 via-secondary/90 to-secondary",
  },
  {
    tag: "GAMING",
    title: "PlayStation 5\nSlim Edition",
    desc: "Next-gen gaming with lightning-fast loading, stunning 4K graphics, and immersive DualSense.",
    cta: "Shop Now",
    ctaLink: "/product/ps5-slim",
    cta2: "See Games",
    cta2Link: "/shop?category=gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&h=600&fit=crop",
    gradient: "from-indigo-900/40 via-secondary/90 to-secondary",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </motion.div>
      </AnimatePresence>

      <div className="container relative grid min-h-[420px] items-center py-16 md:min-h-[480px] md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <span className="mb-4 inline-block rounded bg-primary/80 px-3 py-1 text-xs font-semibold tracking-widest text-primary-foreground">
              {slide.tag}
            </span>
            <h1 className="whitespace-pre-line text-4xl font-extrabold leading-[1.05] text-secondary-foreground md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-secondary-foreground/60 md:text-base">
              {slide.desc}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={slide.ctaLink}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {slide.cta}
              </Link>
              <Link
                to={slide.cta2Link}
                className="rounded-lg border border-secondary-foreground/20 px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-foreground/10"
              >
                {slide.cta2}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="absolute bottom-6 right-4 flex items-center gap-3 md:right-8">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-secondary-foreground" : "w-1.5 bg-secondary-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary-foreground/20 text-secondary-foreground/60 transition-colors hover:bg-secondary-foreground/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary-foreground/20 text-secondary-foreground/60 transition-colors hover:bg-secondary-foreground/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
