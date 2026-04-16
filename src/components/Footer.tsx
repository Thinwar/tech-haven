import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70">
      <div className="container py-12 md:py-14">
        <ScrollReveal direction="up" duration={0.4}>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
            <div>
              <Link to="/" className="font-display text-xl font-extrabold text-background">
                Gadgets<span className="text-primary">Kenya</span>
              </Link>
              <p className="mt-3 text-[13px] leading-relaxed text-background/40">
                Your trusted online tech store in Kenya. Genuine, brand new products with official warranty.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-background/50">Quick Links</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><Link to="/shop" className="transition-colors hover:text-background">All Products</Link></li>
                <li><Link to="/deals" className="transition-colors hover:text-background">Today's Deals</Link></li>
                <li><Link to="/shop?category=smartphones" className="transition-colors hover:text-background">Smartphones</Link></li>
                <li><Link to="/shop?category=laptops" className="transition-colors hover:text-background">Laptops</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-background/50">Customer Care</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><a href="#" className="transition-colors hover:text-background">Shipping & Delivery</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Returns & Refunds</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Warranty Info</a></li>
                <li><a href="#" className="transition-colors hover:text-background">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-background/50">Contact Us</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> +254 700 123 456</li>
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0" /> hello@gadgetskenya.co.ke</li>
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> Nairobi, Kenya</li>
                <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0" /> Mon–Sat: 8am–8pm</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-[11px] text-background/30 md:flex-row">
          <span>© {new Date().getFullYear()} Fast Tech Solutions. All rights reserved.</span>
          <div className="flex gap-4 font-medium">
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
