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
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  return (
    <section className="bg-gradient-to-b from-surface-sunken/50 to-background">
      <div className="container py-4 md:py-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/80 via-surface-sunken to-muted/40">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid min-h-[240px] items-center gap-4 p-6 md:min-h-[360px] md:grid-cols-2 md:gap-8 md:p-10 lg:p-14"
            >
              {/* Text */}
              <div>
                <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-primary-foreground">
                  {slide.tag}
                </span>
                <h1 className="text-2xl font-extrabold leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-1.5 text-base font-semibold text-primary md:text-lg">{slide.subtitle}</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{slide.desc}</p>
                <div className="mt-3 text-xl font-extrabold text-foreground md:text-2xl">{slide.price}</div>
                <Link
                  to={slide.ctaLink}
                  className="mt-4 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:bg-primary/90 active:scale-[0.97]"
                >
                  {slide.cta}
                </Link>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-40 w-auto max-w-full rounded-xl object-contain drop-shadow-lg md:h-56 lg:h-64"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-5">
            <button
              onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + slides.length) % slides.length); }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:h-8 md:w-8"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-1.5 bg-foreground/15 hover:bg-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % slides.length); }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:h-8 md:w-8"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
