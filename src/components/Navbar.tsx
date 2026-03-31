import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";

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

  const navLinks = [
    { label: "Shop", to: "/shop" },
    { label: "Categories", to: "/shop" },
    { label: "Deals", to: "/deals" },
    { label: "Journal", to: "/" },
  ];

  // Hide navbar on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground">
      <div className="container flex h-14 items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0 font-display text-lg font-bold text-secondary-foreground">
          Fast Tech Solutions
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary-foreground ${
                location.pathname === link.to
                  ? "text-primary-foreground underline underline-offset-4 decoration-primary decoration-2"
                  : "text-secondary-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="relative hidden flex-1 max-w-xs md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-foreground/40" />
          <input
            type="text"
            placeholder="Search tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-secondary-foreground/10 py-2 pl-9 pr-3 text-sm text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-border bg-card p-2 shadow-lg z-50">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { navigate(`/product/${p.id}`); setSearchQuery(""); }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <img src={p.image} alt={p.name} className="h-8 w-8 rounded object-cover" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">${p.price}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={user ? "/account" : "/auth"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-secondary-foreground/70 transition-colors hover:text-secondary-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-secondary-foreground/10 bg-secondary p-4 md:hidden">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-foreground/40" />
            <input
              type="text"
              placeholder="Search tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-secondary-foreground/10 py-2 pl-9 pr-3 text-sm text-secondary-foreground placeholder:text-secondary-foreground/40 focus:outline-none"
            />
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary-foreground/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
