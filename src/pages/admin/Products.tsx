import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductForm {
  name: string;
  brand: string;
  category: string;
  price: string;
  original_price: string;
  image: string;
  description: string;
  short_description: string;
  in_stock: boolean;
  badge: string;
}

const emptyForm: ProductForm = {
  name: "", brand: "", category: "", price: "", original_price: "",
  image: "", description: "", short_description: "", in_stock: true, badge: "",
};

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("db_products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      image: form.image,
      description: form.description,
      short_description: form.short_description,
      in_stock: form.in_stock,
      badge: form.badge || null,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("db_products").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("db_products").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingId ? "Product updated" : "Product added" });
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchProducts();
    }
  };

  const startEdit = (p: any) => {
    setForm({
      name: p.name, brand: p.brand, category: p.category,
      price: String(p.price), original_price: p.original_price ? String(p.original_price) : "",
      image: p.image, description: p.description, short_description: p.short_description || "",
      in_stock: p.in_stock, badge: p.badge || "",
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("db_products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your product inventory.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">{editingId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input required type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                <input type="number" step="0.01" placeholder="Original price (optional)" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <input required placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              <input placeholder="Short description" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              <textarea required placeholder="Full description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="rounded" />
                  In Stock
                </label>
                <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option value="">No badge</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="bestseller">Bestseller</option>
                </select>
              </div>
              <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]">
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="mt-6 rounded-xl border border-border bg-card">
        {products.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No products in inventory. Click "Add Product" to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                      <div>
                        <div className="font-medium text-foreground">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.short_description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.brand}</TableCell>
                  <TableCell className="text-sm">{p.category}</TableCell>
                  <TableCell className="font-semibold">KSH {Number(p.price).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      p.in_stock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {p.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(p)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteProduct(p.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Products;
