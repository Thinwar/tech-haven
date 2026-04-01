import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-xl font-extrabold text-background">
              Fast<span className="text-primary">Tech</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-background/50">
              Your trusted online tech store in Kenya. We stock genuine, brand new products with official warranty.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-background/60">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><Link to="/shop" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link to="/deals" className="hover:text-background transition-colors">Today's Deals</Link></li>
              <li><Link to="/shop?category=smartphones" className="hover:text-background transition-colors">Smartphones</Link></li>
              <li><Link to="/shop?category=laptops" className="hover:text-background transition-colors">Laptops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-background/60">Customer Care</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li><a href="#" className="hover:text-background transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Warranty Info</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-background/60">Contact Us</h4>
            <ul className="space-y-2 text-sm text-background/50">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +254 700 123 456</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> info@fasttechsolutions.co.ke</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Nairobi, Kenya</li>
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Mon–Sat: 8am–8pm</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 text-xs text-background/40 md:flex-row">
          <span>© {new Date().getFullYear()} FastTech Solutions Kenya. All rights reserved.</span>
          <div className="flex gap-4">
            <span>M-Pesa</span>
            <span>Visa</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
