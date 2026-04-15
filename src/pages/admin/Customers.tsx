import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      setCustomers(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center p-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground">Customers</h1>
      <p className="mt-1 text-sm text-muted-foreground">View all registered customers.</p>

      {customers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">No customers yet.</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden md:block rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">City</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Country</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{c.full_name || "—"}</td>
                    <td className="px-4 py-3">{c.phone || "—"}</td>
                    <td className="px-4 py-3">{c.city || "—"}</td>
                    <td className="px-4 py-3">{c.country || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-4 space-y-3 md:hidden">
            {customers.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-4">
                <div className="font-medium text-foreground">{c.full_name || "—"}</div>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {c.phone && <span>📱 {c.phone}</span>}
                  {c.city && <span>📍 {c.city}</span>}
                  {c.country && <span>🌍 {c.country}</span>}
                  <span>📅 {new Date(c.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Customers;
