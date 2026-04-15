import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

function mapDbProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    image: row.image,
    images: Array.isArray(row.images) ? row.images as string[] : [],
    description: row.description ?? "",
    shortDescription: row.short_description ?? "",
    specs: (row.specs as Record<string, string>) ?? {},
    inStock: row.in_stock ?? true,
    badge: row.badge as Product["badge"],
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("db_products")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts((data || []).map(mapDbProduct));
      setLoading(false);
    };
    fetch();
  }, []);

  const featured = products.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 4);
  const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4);
  const getByCategory = (cat: string) => products.filter((p) => p.category === cat);
  const getById = (id: string) => products.find((p) => p.id === id);

  return { products, loading, featured, deals, newArrivals, getByCategory, getById };
}
