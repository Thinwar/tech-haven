import { Link } from "react-router-dom";
import { Globe, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-lg font-bold text-secondary-foreground">
              Fast Tech Solutions
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/50">
              Engineering excellence for the modern digital era. We curate only the highest performing technology for your professional and personal life.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary-foreground/20 text-secondary-foreground/50 transition-colors hover:text-secondary-foreground">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary-foreground/20 text-secondary-foreground/50 transition-colors hover:text-secondary-foreground">
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary-foreground/70">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/50">
              <li><Link to="/shop" className="hover:text-secondary-foreground">Shop All</Link></li>
              <li><Link to="/shop" className="hover:text-secondary-foreground">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-secondary-foreground">Daily Deals</Link></li>
              <li><a href="#" className="hover:text-secondary-foreground">Tech Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary-foreground/70">Support</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/50">
              <li><a href="#" className="hover:text-secondary-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary-foreground">Shipping Info</a></li>
              <li><a href="#" className="hover:text-secondary-foreground">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary-foreground/70">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/50">
              <li>123 Innovation Way</li>
              <li>Silicon Valley, CA 94025</li>
              <li>contact@fasttechsolutions.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/40">
          © {new Date().getFullYear()} Fast Tech Solutions. Engineered for Excellence.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
