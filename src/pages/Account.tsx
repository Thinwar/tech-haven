import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Package, LogOut, ChevronRight, Edit2, Save } from "lucide-react";

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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    processing: "bg-blue-50 text-blue-700 border border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border border-purple-200",
    delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container max-w-3xl py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">My Account</h1>
            <p className="text-[13px] text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-lg bg-muted/70 p-1">
          <button
            onClick={() => setTab("profile")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium transition-all ${
              tab === "profile" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Profile
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium transition-all ${
              tab === "orders" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-3.5 w-3.5" />
            Orders
          </button>
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : tab === "profile" ? (
          <div className="rounded-xl border border-border/60 bg-card p-5 shadow-card md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Personal Information</h2>
              <button
                onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {editing ? <Save className="h-3.5 w-3.5" /> : <Edit2 className="h-3.5 w-3.5" />}
                {saving ? "Saving..." : editing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {[
                { label: "Full Name", key: "full_name" as const, placeholder: "John Doe" },
                { label: "Phone", key: "phone" as const, placeholder: "+254 700 000 000" },
                { label: "Address", key: "address" as const, placeholder: "123 Kenyatta Ave" },
                { label: "City", key: "city" as const, placeholder: "Nairobi" },
                { label: "Country", key: "country" as const, placeholder: "Kenya" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">{label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={profile[key] || ""}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                    />
                  ) : (
                    <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">
                      {profile[key] || <span className="text-muted-foreground/50">Not set</span>}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Email</label>
                <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="rounded-xl border border-border/60 bg-card p-10 text-center shadow-card">
                <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                <h3 className="text-base font-bold text-foreground">No orders yet</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">Your order history will appear here</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Start Shopping <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const orderItems = Array.isArray(order.items) ? order.items : [];
                return (
                  <div key={order.id} className="rounded-xl border border-border/60 bg-card p-4 shadow-card md:p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[13px] font-medium text-foreground">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {orderItems.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-[13px]">
                          <span className="text-foreground">{item.name} × {item.quantity}</span>
                          <span className="text-muted-foreground">KES {(item.price * item.quantity * 130).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-border/40 pt-2.5 text-right text-sm font-bold text-foreground">
                      Total: KES {(Number(order.total) * 130).toLocaleString()}
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
