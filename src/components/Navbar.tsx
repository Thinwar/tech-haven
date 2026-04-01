import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Heart, Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products, categories } from "@/data/products";

const Navbar = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const suggestions = searchQuery.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-topbar text-topbar-foreground">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +254 700 123 456</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> info@fasttechsolutions.co.ke</span>
          </div>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-end">
            <span>Free delivery on orders over KES 5,000</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline flex items-center gap-1"><MapPin className="h-3 w-3" /> Nairobi, Kenya</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm">
        <div className="container flex h-16 items-center gap-4">
          {/* Logo */}
          <Link to="/" className="shrink-0 font-display text-xl font-extrabold text-foreground">
            Fast<span className="text-primary">Tech</span>
          </Link>

          {/* Search Bar */}
          <div className="relative mx-4 hidden flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for phones, laptops, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-sunken py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-border bg-card p-2 shadow-xl z-50">
                {suggestions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { navigate(`/product/${p.id}`); setSearchQuery(""); }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs font-semibold text-primary">KES {(p.price * 130).toLocaleString()}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link
              to={user ? "/account" : "/auth"}
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted md:flex"
            >
              <User className="h-5 w-5" />
              <span className="text-xs font-medium">{user ? "Account" : "Sign In"}</span>
            </Link>

            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
            >
              <Heart className="h-5 w-5" />
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-semibold">{cartCount > 0 ? cartCount : "Cart"}</span>
            </Link>

            <button
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Category Nav */}
        <div className="hidden border-t border-border bg-background md:block">
          <div className="container flex items-center gap-1">
            <Link
              to="/shop"
              className="flex items-center gap-1 rounded-t-md px-4 py-2.5 text-sm font-semibold text-primary-foreground bg-primary"
            >
              <Menu className="h-4 w-4" />
              All Categories
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/deals" className="ml-auto px-3 py-2.5 text-sm font-bold text-destructive">
              🔥 Hot Deals
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background p-4 md:hidden">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-sunken py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <nav className="flex flex-col gap-0.5">
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">All Products</Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
              <Link to="/deals" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-bold text-destructive transition-colors hover:bg-muted">🔥 Hot Deals</Link>
              <Link to={user ? "/account" : "/auth"} onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {user ? "My Account" : "Sign In / Register"}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
