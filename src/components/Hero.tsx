import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
    gradient: "from-orange-50 via-amber-50/50 to-background",
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
    gradient: "from-blue-50 via-slate-50/50 to-background",
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
    gradient: "from-indigo-50 via-purple-50/30 to-background",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    <ScrollReveal direction="none" duration={0.6}>
      <section className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative"
          >
            {/* Background Image */}
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-95`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="container relative z-10">
              <div className="flex min-h-[280px] items-center py-10 md:min-h-[420px] md:py-16 lg:min-h-[480px] lg:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="max-w-2xl"
                >
                  <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-primary-foreground backdrop-blur-sm">
                    {slide.tag}
                  </span>
                  <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-lg font-semibold text-primary drop-shadow md:text-xl">{slide.subtitle}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/90 drop-shadow md:text-base">{slide.desc}</p>
                  <div className="mt-4 text-2xl font-extrabold text-foreground drop-shadow-lg md:mt-5 md:text-3xl">{slide.price}</div>
                  <Link
                    to={slide.ctaLink}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl hover:bg-primary/90 active:scale-[0.97] md:text-base"
                  >
                    {slide.cta}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 md:bottom-6">
          <button
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-background hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === current ? "w-7 bg-primary" : "w-2 bg-foreground/15 hover:bg-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-background hover:shadow-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default Hero;
