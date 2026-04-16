import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PHONE = "254721997879";
const MESSAGE = "Hi GadgetsKenya! I need help with...";

const WhatsAppButton = () => (
  <motion.a
    href={`https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="h-6 w-6" fill="white" />
  </motion.a>
);

export default WhatsAppButton;
