import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const statusOptions = ["pending", "processing", "shipped", "completed", "cancelled"];

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
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

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
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage and track all customer orders.</p>

      <div className="mt-6 rounded-xl border border-border bg-card">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No orders found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">#{order.id.slice(0, 8)}</TableCell>
                    <TableCell className="text-sm">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm">{items.length} item(s)</TableCell>
                    <TableCell className="font-semibold">${Number(order.total).toFixed(2)}</TableCell>
                    <TableCell className="text-sm">{order.payment_method || "—"}</TableCell>
                    <TableCell>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Orders;
