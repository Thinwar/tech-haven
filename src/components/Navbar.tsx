import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products, categories } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { lovable } from "@/integrations/lovable/index";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = searchQuery.length > 1 && searchFocused
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleGoogleSignIn = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      console.error("Google sign-in error:", result.error);
      return;
    }
    if (result.redirected) {
      // Browser will redirect to Google - just return and let it happen
      return;
    }
    // Tokens were returned and session is already set - user is authenticated
    // Refresh the page to update auth state
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Top Bar — slim, informational */}
      <div className="bg-topbar text-topbar-foreground">
        <div className="container flex h-8 items-center justify-between text-[11px] font-medium">
          <div className="hidden items-center gap-5 sm:flex">
            <a href="tel:+254700123456" className="flex items-center gap-1 transition-opacity hover:opacity-80">
              <Phone className="h-3 w-3" /> +254 700 123 456
            </a>
            <a href="mailto:hello@fasttech.co.ke" className="flex items-center gap-1 transition-opacity hover:opacity-80">
              <Mail className="h-3 w-3" /> hello@fasttech.co.ke
            </a>
          </div>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-end">
            <span>Free delivery on orders over KES 5,000</span>
            <span className="hidden items-center gap-1 sm:flex">
              <MapPin className="h-3 w-3" /> Nairobi, Kenya
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
        <div className="container flex h-[60px] items-center gap-4">
          {/* Logo */}
          <Link to="/" className="shrink-0 font-display text-[22px] font-extrabold tracking-tight text-foreground">
            Fast<span className="text-primary">Tech</span>
          </Link>

          {/* Search Bar */}
          <div ref={searchRef} className="relative mx-6 hidden flex-1 lg:block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:bg-background focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lift z-50"
                >
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { navigate(`/product/${p.id}`); setSearchQuery(""); setSearchFocused(false); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted/60"
                    >
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover bg-surface-sunken" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-sm">{p.name}</div>
                        <div className="text-xs font-semibold text-primary">KES {(p.price * 130).toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            {!user ? (
              <button
                onClick={handleGoogleSignIn}
                className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted hover:border-primary/30 active:scale-[0.97] lg:flex"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[13px]">Sign in</span>
              </button>
            ) : (
              <Link
                to="/account"
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
              >
                <User className="h-[18px] w-[18px]" />
                <span className="text-[13px] font-medium">Account</span>
              </Link>
            )}

            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Heart className="h-[18px] w-[18px]" />
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              <span className="text-[13px]">{cartCount > 0 ? cartCount : "Cart"}</span>
            </Link>

            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Category Nav — Desktop */}
        <div className="hidden border-t border-border/40 lg:block">
          <div className="container flex items-center">
            <Link
              to="/shop"
              className="flex items-center gap-1.5 bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Menu className="h-3.5 w-3.5" />
              All Categories
            </Link>
            <nav className="flex items-center">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="px-3.5 py-2.5 text-[13px] font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
            <Link to="/deals" className="ml-auto flex items-center gap-1 px-3 py-2.5 text-[13px] font-bold text-destructive transition-opacity hover:opacity-80">
              🔥 Hot Deals
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border/40 bg-background lg:hidden"
            >
              <div className="container py-4">
                {/* Mobile search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                </div>
                <nav className="flex flex-col gap-0.5">
                  <Link to="/shop" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">All Products</Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.id}`}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    >
                      {cat.icon} {cat.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border/40" />
                  <Link to="/deals" className="rounded-lg px-3 py-2.5 text-sm font-bold text-destructive hover:bg-muted">🔥 Hot Deals</Link>
                  <Link to={user ? "/account" : "/auth"} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted">
                    {user ? "My Account" : "Sign In / Register"}
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
