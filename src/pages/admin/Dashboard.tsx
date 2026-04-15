import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({ orders: 0, customers: 0, products: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        supabase.from("orders").select("id, total, status, created_at", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }),
        supabase.from("db_products").select("id", { count: "exact" }),
      ]);

      const revenue = (ordersRes.data || []).reduce((sum, o) => sum + Number(o.total), 0);

      setStats({
        orders: ordersRes.count || 0,
        customers: customersRes.count || 0,
        products: productsRes.count || 0,
        revenue,
      });

      setRecentOrders(
        (ordersRes.data || [])
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
      );
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Revenue", value: `KES ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "bg-primary/10 text-primary" },
    { label: "Orders", value: stats.orders.toString(), icon: ShoppingBag, color: "bg-success/10 text-success" },
    { label: "Customers", value: stats.customers.toString(), icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Products", value: stats.products.toString(), icon: Package, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your store performance.</p>

      <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">{c.label}</span>
              <div className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg ${c.color}`}>
                <c.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-lg sm:text-2xl font-bold text-foreground">{c.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-8 rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 sm:px-5 py-4">
          <h2 className="font-semibold text-foreground">Recent Orders</h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No orders yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-4 sm:px-5 py-3">
                <div>
                  <div className="text-sm font-medium text-foreground">#{order.id.slice(0, 8)}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">KES {Number(order.total).toLocaleString()}</div>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    order.status === "completed"
                      ? "bg-success/10 text-success"
                      : order.status === "cancelled"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
