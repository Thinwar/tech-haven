import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Package, Settings, LogOut, ChevronRight, Edit2, Save } from "lucide-react";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
}

interface Order {
  id: string;
  status: string;
  items: any;
  total: number;
  created_at: string;
}

const Account = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"profile" | "orders">("profile");
  const [profile, setProfile] = useState<Profile>({ full_name: null, phone: null, address: null, city: null, country: null });
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoadingData(true);
      const [profileRes, ordersRes] = await Promise.all([
        supabase.from("profiles").select("full_name, phone, address, city, country").eq("user_id", user.id).single(),
        supabase.from("orders").select("id, status, items, total, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (profileRes.data) setProfile(profileRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
      setLoadingData(false);
    };
    fetchData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").update(profile).eq("user_id", user.id);
    setSaving(false);
    setEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Account</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg bg-muted p-1">
          <button
            onClick={() => setTab("profile")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "profile" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Profile
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "orders" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            Orders
          </button>
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : tab === "profile" ? (
          /* Profile Tab */
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              <button
                onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {editing ? <Save className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
                {saving ? "Saving..." : editing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Full Name", key: "full_name" as const, placeholder: "John Doe" },
                { label: "Phone", key: "phone" as const, placeholder: "+1 234 567 890" },
                { label: "Address", key: "address" as const, placeholder: "123 Main St" },
                { label: "City", key: "city" as const, placeholder: "New York" },
                { label: "Country", key: "country" as const, placeholder: "United States" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile[key] || ""}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
                      {profile[key] || <span className="text-muted-foreground">Not set</span>}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                <p className="rounded-lg bg-muted px-3 py-2 text-sm text-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          /* Orders Tab */
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Package className="mx-auto mb-3 h-12 w-12 text-muted-foreground/40" />
                <h3 className="text-lg font-medium text-foreground">No orders yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Your order history will appear here</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
                >
                  Start Shopping <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <div key={order.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.name} × {item.quantity}</span>
                          <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-border pt-3 text-right text-sm font-semibold text-foreground">
                      Total: ${Number(order.total).toFixed(2)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
