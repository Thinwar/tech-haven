import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const statusOptions = ["pending", "processing", "shipped", "completed", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-primary/10 text-primary",
  shipped: "bg-blue-100 text-blue-700",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Order status changed to ${status}` });
      fetchOrders();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage and track all customer orders.</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">No orders found.</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden md:block rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Items</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Payment</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => {
                  const items = Array.isArray(order.items) ? order.items : [];
                  return (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">#{order.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{items.length} item(s)</td>
                      <td className="px-4 py-3 font-semibold">KES {Number(order.total).toLocaleString()}</td>
                      <td className="px-4 py-3">{order.payment_method || "—"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-4 space-y-3 md:hidden">
            {orders.map((order) => {
              const items = Array.isArray(order.items) ? order.items : [];
              return (
                <div key={order.id} className="rounded-xl border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[order.status] || "bg-muted text-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</span>
                    <span className="font-bold text-foreground">KES {Number(order.total).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{items.length} item(s) · {order.payment_method || "—"}</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
