export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  inStock: boolean;
  badge?: "sale" | "new" | "bestseller";
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export const categories = [
  { id: "smartphones", name: "Smartphones", icon: "📱", count: 24 },
  { id: "laptops", name: "Laptops", icon: "💻", count: 18 },
  { id: "audio", name: "Audio", icon: "🎧", count: 32 },
  { id: "gaming", name: "Gaming", icon: "🎮", count: 15 },
  { id: "accessories", name: "Accessories", icon: "⌚", count: 45 },
  { id: "tablets", name: "Tablets", icon: "📲", count: 12 },
];

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "smartphones",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 2847,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
    ],
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and an advanced camera system for stunning photos and videos.",
    shortDescription: "A17 Pro chip • Titanium • 48MP Camera",
    specs: { Display: "6.7\" Super Retina XDR", Chip: "A17 Pro", Camera: "48MP Main", Battery: "Up to 29h video", Storage: "256GB / 512GB / 1TB" },
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air 15\" M3",
    brand: "Apple",
    category: "laptops",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 1563,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
    ],
    description: "Supercharged by M3 chip. The remarkably thin and light MacBook Air with a stunning 15-inch Liquid Retina display.",
    shortDescription: "M3 chip • 15\" Liquid Retina • 18h battery",
    specs: { Display: "15.3\" Liquid Retina", Chip: "Apple M3", Memory: "8GB / 16GB / 24GB", Storage: "256GB / 512GB / 1TB SSD", Battery: "Up to 18 hours" },
    inStock: true,
    badge: "sale",
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "audio",
    price: 348,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 4231,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    ],
    description: "Industry-leading noise cancellation with Auto NC Optimizer, crystal clear hands-free calling, and up to 30 hours battery life.",
    shortDescription: "Industry-leading ANC • 30h battery",
    specs: { Driver: "30mm", ANC: "Auto NC Optimizer", Battery: "30 hours", Connectivity: "Bluetooth 5.2", Weight: "250g" },
    inStock: true,
    badge: "sale",
  },
  {
    id: "ps5-slim",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "gaming",
    price: 449,
    rating: 4.6,
    reviewCount: 8924,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=800&fit=crop",
    ],
    description: "Experience lightning-fast loading, deeper immersion with haptic feedback, and stunning 4K gaming on the slimmer PS5.",
    shortDescription: "4K Gaming • 1TB SSD • DualSense",
    specs: { CPU: "AMD Zen 2 8-core", GPU: "10.28 TFLOPS RDNA 2", Storage: "1TB SSD", Resolution: "Up to 4K 120fps", "Ray Tracing": "Hardware-accelerated" },
    inStock: true,
    badge: "new",
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "smartphones",
    price: 1299,
    originalPrice: 1419,
    rating: 4.7,
    reviewCount: 3156,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop",
    ],
    description: "The ultimate Galaxy experience with Galaxy AI, titanium frame, built-in S Pen, and a 200MP camera system.",
    shortDescription: "Galaxy AI • 200MP Camera • S Pen",
    specs: { Display: "6.8\" Dynamic AMOLED 2X", Chip: "Snapdragon 8 Gen 3", Camera: "200MP Main", Battery: "5000mAh", Storage: "256GB / 512GB / 1TB" },
    inStock: true,
    badge: "bestseller",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "audio",
    price: 249,
    rating: 4.8,
    reviewCount: 12450,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fdes852?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fdes852?w=800&h=800&fit=crop",
    ],
    description: "Rebuilt from the sound up. AirPods Pro feature up to 2x more Active Noise Cancellation and Adaptive Audio.",
    shortDescription: "Adaptive Audio • USB-C • MagSafe",
    specs: { ANC: "2x more active", Chip: "H2", Battery: "6h (30h with case)", Connectivity: "Bluetooth 5.3", "Dust/Water": "IP54" },
    inStock: true,
  },
  {
    id: "dell-xps-16",
    name: "Dell XPS 16 (2024)",
    brand: "Dell",
    category: "laptops",
    price: 1899,
    originalPrice: 2199,
    rating: 4.5,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=800&fit=crop",
    ],
    description: "A stunning 16-inch OLED display in a compact form, powered by Intel Core Ultra processors and NVIDIA GeForce RTX graphics.",
    shortDescription: "Intel Core Ultra • RTX 4070 • OLED",
    specs: { Display: "16\" 4K OLED", CPU: "Intel Core Ultra 9", GPU: "NVIDIA RTX 4070", Memory: "32GB DDR5", Storage: "1TB PCIe 4.0 SSD" },
    inStock: true,
    badge: "sale",
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "accessories",
    price: 799,
    rating: 4.8,
    reviewCount: 2103,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    description: "The most capable Apple Watch for extreme adventures with the brightest always-on display and precision dual-frequency GPS.",
    shortDescription: "49mm Titanium • 3000 nits • GPS",
    specs: { Case: "49mm Titanium", Display: "3000 nits OLED", Chip: "S9 SiP", Battery: "Up to 36 hours", "Water Resistance": "100m" },
    inStock: true,
    badge: "new",
  },
  {
    id: "nintendo-switch-oled",
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    category: "gaming",
    price: 349,
    rating: 4.7,
    reviewCount: 15672,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&h=800&fit=crop",
    ],
    description: "Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen. Enhanced audio and a wide adjustable stand.",
    shortDescription: "7\" OLED • 64GB • Enhanced Audio",
    specs: { Display: "7\" OLED", Storage: "64GB", Battery: "4.5–9 hours", Connectivity: "Wi-Fi, Bluetooth 4.1", Weight: "420g" },
    inStock: true,
  },
  {
    id: "samsung-galaxy-buds3-pro",
    name: "Galaxy Buds3 Pro",
    brand: "Samsung",
    category: "audio",
    price: 249,
    originalPrice: 279,
    rating: 4.4,
    reviewCount: 1893,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&h=800&fit=crop",
    ],
    description: "Premium sound with 2-way speakers, intelligent ANC with real-time adjustment, and seamless Galaxy AI integration.",
    shortDescription: "2-way speakers • AI ANC • 360 Audio",
    specs: { Driver: "Dual (10.5mm + 6.1mm)", ANC: "Intelligent AI-powered", Battery: "7h (30h with case)", Connectivity: "Bluetooth 5.4", Codec: "SSC HiFi" },
    inStock: true,
    badge: "sale",
  },
  {
    id: "ipad-pro-m4",
    name: "iPad Pro M4 12.9\"",
    brand: "Apple",
    category: "tablets",
    price: 1099,
    rating: 4.9,
    reviewCount: 945,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop",
    ],
    description: "The thinnest, most powerful iPad ever with the breakthrough M4 chip, Ultra Retina XDR display, and Apple Pencil Pro support.",
    shortDescription: "M4 chip • Ultra Retina XDR • 5.1mm thin",
    specs: { Display: "13\" Ultra Retina XDR", Chip: "Apple M4", Camera: "12MP Wide", Storage: "256GB–2TB", Connectivity: "Wi-Fi 6E / 5G" },
    inStock: true,
    badge: "new",
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "accessories",
    price: 99,
    rating: 4.8,
    reviewCount: 7823,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
    ],
    description: "The iconic master of workflow with an 8K DPI sensor, quiet clicks, MagSpeed scroll, and multi-device connectivity.",
    shortDescription: "8K DPI • Quiet Clicks • Multi-device",
    specs: { Sensor: "8000 DPI", Battery: "70 days", Connectivity: "Bluetooth + USB-C", "Multi-device": "Up to 3", Compatibility: "macOS, Windows, Linux" },
    inStock: true,
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "iphone-15-pro", author: "Sarah M.", avatar: "SM", rating: 5, date: "2024-12-15", title: "Best iPhone upgrade in years", content: "The titanium design feels incredible in hand. Camera is a massive step up, especially the 5x zoom. Battery easily lasts all day.", verified: true },
  { id: "r2", productId: "iphone-15-pro", author: "James K.", avatar: "JK", rating: 4, date: "2024-11-28", title: "Great phone, pricey though", content: "Performance is outstanding and the camera system is phenomenal. Only downside is the price, but you get what you pay for.", verified: true },
  { id: "r3", productId: "macbook-air-m3", author: "Alex T.", avatar: "AT", rating: 5, date: "2024-10-20", title: "Perfect everyday laptop", content: "Silent, fast, and the battery lasts forever. The 15-inch screen is perfect for productivity. Best laptop I've owned.", verified: true },
  { id: "r4", productId: "sony-wh1000xm5", author: "Maria L.", avatar: "ML", rating: 5, date: "2024-09-14", title: "Noise cancellation is unreal", content: "I use these daily for commuting and work calls. The ANC blocks everything and the sound quality is superb. So comfortable too.", verified: true },
  { id: "r5", productId: "ps5-slim", author: "David R.", avatar: "DR", rating: 5, date: "2024-12-01", title: "Next-gen gaming at its finest", content: "The PS5 Slim is everything I wanted. Loading times are instant, graphics are stunning, and the DualSense controller adds real immersion.", verified: true },
  { id: "r6", productId: "galaxy-s24-ultra", author: "Priya S.", avatar: "PS", rating: 4, date: "2024-11-10", title: "Galaxy AI is a game changer", content: "The AI features are genuinely useful — live translate, circle to search, and the photo editing tools. Camera quality is exceptional.", verified: true },
];

export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.category === categoryId);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getReviewsByProductId = (productId: string) =>
  reviews.filter((r) => r.productId === productId);

export const getFeaturedProducts = () =>
  products.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);

export const getDeals = () =>
  products.filter((p) => p.originalPrice && p.originalPrice > p.price);
