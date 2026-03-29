import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(36_96%_50%/0.15),transparent)]" />
      <div className="container relative grid min-h-[480px] items-center gap-8 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex w-fit items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground/90">
            <Zap className="h-3 w-3" /> Spring Sale — Up to 30% Off
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.1] text-primary-foreground md:text-5xl lg:text-6xl">
            Tech That
            <br />
            <span className="text-accent">Powers</span> Your Life
          </h1>
          <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
            Discover the latest smartphones, laptops, and gadgets from top brands. Free shipping on orders over $99.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Explore Deals
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden justify-center md:flex"
        >
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=500&fit=crop"
            alt="Featured laptop"
            className="max-h-[400px] rounded-2xl object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
