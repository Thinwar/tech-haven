import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-extrabold text-accent-foreground">V</span>
              Voltex
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your trusted destination for the latest tech. Quality products, competitive prices, fast delivery.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop?category=smartphones" className="hover:text-foreground">Smartphones</Link></li>
              <li><Link to="/shop?category=laptops" className="hover:text-foreground">Laptops</Link></li>
              <li><Link to="/shop?category=audio" className="hover:text-foreground">Audio</Link></li>
              <li><Link to="/shop?category=gaming" className="hover:text-foreground">Gaming</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-foreground">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground">Shipping Info</a></li>
              <li><a href="#" className="hover:text-foreground">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-foreground">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About Us</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Voltex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
