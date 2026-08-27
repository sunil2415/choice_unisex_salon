import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Package, Boxes, ShoppingCart, Users, ClipboardList,
  FileText, BarChart3, LogOut, Search, Bell, Plus, Minus, Trash2,
  ChevronRight, TrendingUp, TrendingDown, Download, Eye, Mail, Lock,
  Menu, X, Scissors, ArrowUpRight, CheckCircle2, AlertTriangle, XCircle,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

/* ---------------------------------------------------------------------- */
/* THEME + BRAND ASSETS                                                    */
/* ---------------------------------------------------------------------- */

const LINE_COLOR = {
  Shampoo: "#2FA79A",
  Conditioner: "#C97AA6",
  Styling: "#3E4E9E",
  Treatment: "#B98230",
};

const STATUS_STYLE = {
  "In Stock": { bg: "#EAF4EC", fg: "#2F7A3D" },
  "Low Stock": { bg: "#FBF0DF", fg: "#B98230" },
  "Out of Stock": { bg: "#FBEAE7", fg: "#C1442E" },
  Completed: { bg: "#EAF4EC", fg: "#2F7A3D" },
  Paid: { bg: "#EAF4EC", fg: "#2F7A3D" },
  Pending: { bg: "#FBF0DF", fg: "#B98230" },
  Due: { bg: "#FBF0DF", fg: "#B98230" },
  Overdue: { bg: "#FBEAE7", fg: "#C1442E" },
  Cancelled: { bg: "#FBEAE7", fg: "#C1442E" },
  VIP: { bg: "#F1E9F4", fg: "#7A4E96" },
  Regular: { bg: "#EAF1FB", fg: "#3E4E9E" },
  New: { bg: "#EAF4EC", fg: "#2F7A3D" },
};

/** Brand mark: silhouette + afro, echoing the CHOICE tube artwork */
function BrandMark({ size = 34, ring = "#F7F6F3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="31" fill="#171410" stroke={ring} strokeWidth="1" />
      <g fill={ring}>
        <circle cx="24" cy="20" r="6" />
        <circle cx="32" cy="16" r="7" />
        <circle cx="40" cy="20" r="6" />
        <circle cx="42" cy="27" r="5.5" />
        <circle cx="22" cy="27" r="5.5" />
        <circle cx="32" cy="24" r="8" />
        <path d="M25 26c0 4 1 8-1 12-1.5 3-3 5-3 8v6h9v-9c0-2 .5-4 1.5-6h1c1 2 1.5 4 1.5 6v9h9v-6c0-3-1.5-5-3-8-2-4-1-8-1-12z" />
      </g>
    </svg>
  );
}

/** Signature product "tube" card — mirrors the real packaging structure */
function ProductTube({ line, name, sub, size, compact }) {
  const color = LINE_COLOR[line] || "#171410";
  return (
    <div className={`flex flex-col items-center ${compact ? "w-16" : "w-24"}`}>
      <div
        className={`w-full rounded-t-md ${compact ? "h-2" : "h-3"}`}
        style={{ background: "#fff", border: "1px solid #e7e3dc", borderBottom: "none" }}
      />
      <div
        className={`w-full flex items-center justify-center text-center px-1 ${compact ? "h-10" : "h-16"}`}
        style={{ background: color }}
      >
        <span
          className="font-display text-white leading-none"
          style={{ fontSize: compact ? 7 : 9, fontWeight: 600 }}
        >
          {line}
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center px-1 ${compact ? "h-8" : "h-12"}`}
        style={{ background: "#fff", border: "1px solid #e7e3dc", borderTop: "none", borderBottom: "none" }}
      >
        <span className="font-mono text-ink" style={{ fontSize: compact ? 6 : 7.5, fontWeight: 600, lineHeight: 1.15, textAlign: "center" }}>
          {name}
        </span>
        {sub && !compact && <span className="text-[6.5px] text-stone mt-0.5">{sub}</span>}
      </div>
      <div
        className={`w-full rounded-b-md ${compact ? "h-2.5" : "h-3.5"}`}
        style={{ background: "#171410" }}
      />
    </div>
  );
}

function Badge({ label }) {
  const s = STATUS_STYLE[label] || { bg: "#EFEDE8", fg: "#171410" };
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
}

function LineTag({ line }) {
  const color = LINE_COLOR[line] || "#171410";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide"
      style={{ color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {line}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* MOCK DATA                                                                */
/* ---------------------------------------------------------------------- */

const PRODUCTS = [
  { id: "CH-001", name: "Argan Nourish Shampoo", line: "Shampoo", size: "150 ml", sku: "ARG-SH-150", price: 450, stock: 42, reorder: 15, sold30: 118 },
  { id: "CH-002", name: "Argan Nourish Conditioner", line: "Conditioner", size: "150 ml", sku: "ARG-CN-150", price: 480, stock: 8, reorder: 15, sold30: 96 },
  { id: "CH-003", name: "Curl Defining Cream", line: "Styling", size: "150 ml", sku: "CRL-CC-150", price: 550, stock: 0, reorder: 10, sold30: 74 },
  { id: "CH-004", name: "Argan Repair Hair Mask", line: "Treatment", size: "200 ml", sku: "ARG-HM-200", price: 620, stock: 25, reorder: 10, sold30: 41 },
  { id: "CH-005", name: "Curl Refresh Mist", line: "Styling", size: "200 ml", sku: "CRL-RM-200", price: 390, stock: 30, reorder: 12, sold30: 58 },
  { id: "CH-006", name: "Anti-Frizz Serum", line: "Conditioner", size: "100 ml", sku: "ARG-FS-100", price: 410, stock: 13, reorder: 10, sold30: 63 },
];

const stockStatus = (p) => (p.stock === 0 ? "Out of Stock" : p.stock <= p.reorder ? "Low Stock" : "In Stock");

const CUSTOMERS = [
  { id: "C-101", name: "Ananya Verma", phone: "98200 11234", visits: 14, spent: 12840, last: "24 Aug 2026", tier: "VIP" },
  { id: "C-102", name: "Rohit Malhotra", phone: "98192 44521", visits: 6, spent: 4320, last: "20 Aug 2026", tier: "Regular" },
  { id: "C-103", name: "Kavya Nair", phone: "90040 88213", visits: 2, spent: 1580, last: "12 Aug 2026", tier: "New" },
  { id: "C-104", name: "Farhan Sheikh", phone: "98673 20981", visits: 21, spent: 19650, last: "26 Aug 2026", tier: "VIP" },
  { id: "C-105", name: "Priya Deshmukh", phone: "97690 55210", visits: 9, spent: 7040, last: "22 Aug 2026", tier: "Regular" },
  { id: "C-106", name: "Arjun Kapoor", phone: "99870 12456", visits: 1, spent: 650, last: "18 Aug 2026", tier: "New" },
  { id: "C-107", name: "Sana Iqbal", phone: "98330 76542", visits: 11, spent: 9870, last: "25 Aug 2026", tier: "Regular" },
];

const ORDERS = [
  { id: "ORD-1042", date: "27 Aug 2026", customer: "Ananya Verma", items: "Haircut, Argan Shampoo", amount: 1150, mode: "UPI", status: "Completed" },
  { id: "ORD-1041", date: "27 Aug 2026", customer: "Rohit Malhotra", items: "Beard Trim", amount: 300, mode: "Cash", status: "Completed" },
  { id: "ORD-1040", date: "26 Aug 2026", customer: "Farhan Sheikh", items: "Curl Defining Cream x2", amount: 1100, mode: "Card", status: "Pending" },
  { id: "ORD-1039", date: "26 Aug 2026", customer: "Sana Iqbal", items: "Hair Color, Conditioner", amount: 2380, mode: "UPI", status: "Completed" },
  { id: "ORD-1038", date: "25 Aug 2026", customer: "Kavya Nair", items: "Anti-Frizz Serum", amount: 410, mode: "Cash", status: "Cancelled" },
  { id: "ORD-1037", date: "24 Aug 2026", customer: "Priya Deshmukh", items: "Shave, Hair Mask", amount: 920, mode: "Card", status: "Completed" },
];

const INVOICES = [
  { id: "INV-2026-081", customer: "Ananya Verma", date: "27 Aug 2026", amount: 1150, status: "Paid" },
  { id: "INV-2026-080", customer: "Rohit Malhotra", date: "27 Aug 2026", amount: 300, status: "Paid" },
  { id: "INV-2026-079", customer: "Farhan Sheikh", date: "26 Aug 2026", amount: 1100, status: "Due" },
  { id: "INV-2026-078", customer: "Sana Iqbal", date: "26 Aug 2026", amount: 2380, status: "Paid" },
  { id: "INV-2026-077", customer: "Kavya Nair", date: "20 Aug 2026", amount: 410, status: "Overdue" },
  { id: "INV-2026-076", customer: "Priya Deshmukh", date: "24 Aug 2026", amount: 920, status: "Paid" },
];

const REVENUE_TREND = [
  { day: "Mon", revenue: 8200 }, { day: "Tue", revenue: 6400 }, { day: "Wed", revenue: 9100 },
  { day: "Thu", revenue: 7600 }, { day: "Fri", revenue: 11200 }, { day: "Sat", revenue: 15800 },
  { day: "Sun", revenue: 13400 },
];

const CATEGORY_SPLIT = [
  { name: "Shampoo", value: 118, color: LINE_COLOR.Shampoo },
  { name: "Conditioner", value: 96, color: LINE_COLOR.Conditioner },
  { name: "Styling", value: 132, color: LINE_COLOR.Styling },
  { name: "Treatment", value: 41, color: LINE_COLOR.Treatment },
];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Product", icon: Package },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "sale", label: "Sale", icon: ShoppingCart },
  { key: "customers", label: "Customers", icon: Users },
  { key: "orders", label: "Sales / Orders", icon: ClipboardList },
  { key: "invoices", label: "Invoices", icon: FileText },
  { key: "reports", label: "Report Analysis", icon: BarChart3 },
];

/* ---------------------------------------------------------------------- */
/* LOGIN PAGE                                                               */
/* ---------------------------------------------------------------------- */

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password to continue.");
      return;
    }
    setError("");
    onLogin(email);
  };

  return (
    <div className="min-h-screen w-full flex" style={{ background: "#F7F6F3" }}>
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: "#171410" }}
      >
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: LINE_COLOR.Styling }} />
        <div className="absolute -left-16 bottom-10 w-72 h-72 rounded-full opacity-[0.08]" style={{ background: LINE_COLOR.Shampoo }} />
        <div className="relative flex items-center gap-3">
          <BrandMark size={40} />
          <div>
            <div className="font-display text-2xl text-white tracking-wide">CHOICE</div>
            <div className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "#B9AFA0" }}>Curl Specialist</div>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-2 mb-6">
            <span className="h-1.5 w-10 rounded-full" style={{ background: LINE_COLOR.Shampoo }} />
            <span className="h-1.5 w-10 rounded-full" style={{ background: LINE_COLOR.Conditioner }} />
            <span className="h-1.5 w-10 rounded-full" style={{ background: LINE_COLOR.Styling }} />
          </div>
          <h1 className="font-display text-white text-4xl leading-tight max-w-md">
            Run the whole salon floor from one counter.
          </h1>
          <p className="text-sm mt-4 max-w-sm" style={{ color: "#B9AFA0" }}>
            Products, inventory, sales and customers for Choice Unisex Saloon — organised the way your shelves already are.
          </p>
        </div>

        <div className="relative flex items-end gap-4">
          <ProductTube line="Shampoo" name="ARGAN NOURISH" sub="150 ml" compact />
          <ProductTube line="Conditioner" name="ARGAN NOURISH" sub="150 ml" compact />
          <ProductTube line="Styling" name="CURL DEFINING" sub="150 ml" compact />
          <span className="text-[11px] pb-2" style={{ color: "#B9AFA0" }}>No sulphates · No parabens · No silicones</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <BrandMark size={36} />
            <div>
              <div className="font-display text-xl text-ink">CHOICE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-stone">Unisex Saloon</div>
            </div>
          </div>

          <div className="h-1.5 w-16 rounded-full mb-6" style={{ background: `linear-gradient(90deg, ${LINE_COLOR.Shampoo}, ${LINE_COLOR.Conditioner}, ${LINE_COLOR.Styling})` }} />

          <h2 className="font-display text-3xl text-ink mb-1">Welcome back</h2>
          <p className="text-sm text-stone mb-8">Sign in to manage Choice Unisex Saloon.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone mb-1.5">Email</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2.5 bg-white focus-within:ring-2" style={{ borderColor: "#E4DFD5" }}>
                <Mail size={16} className="text-stone" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@choiceunisex.com"
                  className="w-full outline-none text-sm bg-transparent text-ink"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone mb-1.5">Password</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2.5 bg-white" style={{ borderColor: "#E4DFD5" }}>
                <Lock size={16} className="text-stone" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none text-sm bg-transparent text-ink"
                />
              </div>
            </div>

            {error && <p className="text-sm" style={{ color: "#C1442E" }}>{error}</p>}

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-stone">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button type="button" className="font-semibold" style={{ color: LINE_COLOR.Styling }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#171410" }}
            >
              Sign in
            </button>
          </form>

          <p className="text-xs text-stone mt-8 text-center">
            Choice Unisex Saloon · Owner &amp; staff access only
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SHELL: SIDEBAR + TOPBAR                                                  */
/* ---------------------------------------------------------------------- */

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 flex flex-col transition-transform duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "#171410" }}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <BrandMark size={36} />
          <div>
            <div className="font-display text-lg text-white leading-none">CHOICE</div>
            <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8D8477" }}>Unisex Saloon</div>
          </div>
          <button className="ml-auto lg:hidden text-white/70" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = page === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setPage(item.key); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? "#F7F6F3" : "transparent",
                  color: active ? "#171410" : "#C9C1B4",
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {active && <ChevronRight size={15} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-xl" style={{ background: "#211D18" }}>
          <div className="flex gap-1.5 mb-2">
            <span className="h-1 w-6 rounded-full" style={{ background: LINE_COLOR.Shampoo }} />
            <span className="h-1 w-6 rounded-full" style={{ background: LINE_COLOR.Conditioner }} />
            <span className="h-1 w-6 rounded-full" style={{ background: LINE_COLOR.Styling }} />
          </div>
          <p className="text-[11px] leading-relaxed" style={{ color: "#8D8477" }}>
            Argan Nourish line · No sulphates, parabens or silicones.
          </p>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, user, onLogout, setMobileOpen }) {
  return (
    <header className="flex items-center gap-4 px-5 lg:px-8 py-4 border-b bg-white/70 backdrop-blur sticky top-0 z-30" style={{ borderColor: "#EDE9E1" }}>
      <button className="lg:hidden text-ink" onClick={() => setMobileOpen(true)}>
        <Menu size={22} />
      </button>
      <h1 className="font-display text-xl text-ink hidden sm:block">{title}</h1>

      <div className="ml-auto flex items-center gap-3 lg:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-[#F1EFE9] rounded-lg px-3 py-2 w-56">
          <Search size={15} className="text-stone" />
          <input placeholder="Search…" className="bg-transparent outline-none text-sm w-full text-ink" />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-[#F1EFE9] text-ink">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: LINE_COLOR.Conditioner }} />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l" style={{ borderColor: "#EDE9E1" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: LINE_COLOR.Styling }}>
            {user.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">{user}</div>
            <div className="text-[11px] text-stone">Shop owner</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: "#171410" }}
        >
          <LogOut size={15} />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: DASHBOARD                                                          */
/* ---------------------------------------------------------------------- */

function StatCard({ icon: Icon, label, value, delta, positive, accent }) {
  return (
    <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#EDE9E1" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}1A` }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
        {delta && (
          <span
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: positive ? "#2F7A3D" : "#C1442E" }}
          >
            {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {delta}
          </span>
        )}
      </div>
      <div className="font-mono text-2xl font-semibold text-ink">{value}</div>
      <div className="text-sm text-stone mt-1">{label}</div>
    </div>
  );
}

function DashboardPage({ setPage }) {
  const lowStock = PRODUCTS.filter((p) => stockStatus(p) !== "In Stock");
  return (
    <div className="p-5 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={ShoppingCart} label="Revenue today" value="₹11,150" delta="+18%" positive accent={LINE_COLOR.Styling} />
        <StatCard icon={Users} label="Total customers" value={CUSTOMERS.length} delta="+2 this week" positive accent={LINE_COLOR.Shampoo} />
        <StatCard icon={Package} label="Products listed" value={PRODUCTS.length} accent={LINE_COLOR.Conditioner} />
        <StatCard icon={AlertTriangle} label="Low / out of stock" value={lowStock.length} delta="Needs reorder" accent={LINE_COLOR.Treatment} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 border" style={{ borderColor: "#EDE9E1" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-ink">Revenue this week</h3>
            <button onClick={() => setPage("reports")} className="text-xs font-semibold flex items-center gap-1" style={{ color: LINE_COLOR.Styling }}>
              Full report <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_TREND}>
                <CartesianGrid vertical={false} stroke="#EDE9E1" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#8D8477" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#8D8477" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #EDE9E1", fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke={LINE_COLOR.Styling} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#EDE9E1" }}>
          <h3 className="font-display text-lg text-ink mb-4">Best sellers</h3>
          <div className="space-y-4">
            {[...PRODUCTS].sort((a, b) => b.sold30 - a.sold30).slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <ProductTube line={p.line} name={p.name.split(" ")[0].toUpperCase()} compact />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{p.name}</div>
                  <LineTag line={p.line} />
                </div>
                <div className="font-mono text-sm text-ink">{p.sold30}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border" style={{ borderColor: "#EDE9E1" }}>
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="font-display text-lg text-ink">Recent orders</h3>
          <button onClick={() => setPage("orders")} className="text-xs font-semibold flex items-center gap-1" style={{ color: LINE_COLOR.Styling }}>
            View all <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone text-xs uppercase tracking-wide">
                <th className="pb-3 font-semibold">Order</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 4).map((o) => (
                <tr key={o.id} className="border-t" style={{ borderColor: "#F1EFE9" }}>
                  <td className="py-3 font-mono text-ink">{o.id}</td>
                  <td className="py-3 text-ink">{o.customer}</td>
                  <td className="py-3 text-stone">{o.items}</td>
                  <td className="py-3 font-mono text-ink">₹{o.amount.toLocaleString()}</td>
                  <td className="py-3"><Badge label={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: PRODUCTS                                                           */
/* ---------------------------------------------------------------------- */

function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const lines = ["All", ...new Set(PRODUCTS.map((p) => p.line))];
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.line === filter);

  return (
    <div className="p-5 lg:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {lines.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className="px-4 py-2 rounded-full text-sm font-semibold border"
              style={{
                background: filter === l ? "#171410" : "#fff",
                color: filter === l ? "#fff" : "#171410",
                borderColor: filter === l ? "#171410" : "#EDE9E1",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: LINE_COLOR.Styling }}>
          <Plus size={16} /> Add product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border p-5 flex flex-col items-center text-center" style={{ borderColor: "#EDE9E1" }}>
            <ProductTube line={p.line} name={p.name.toUpperCase()} sub={p.size} />
            <div className="mt-4 w-full">
              <LineTag line={p.line} />
              <div className="font-display text-base text-ink mt-1">{p.name}</div>
              <div className="text-xs text-stone font-mono mt-0.5">{p.sku} · {p.size}</div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-lg font-semibold text-ink">₹{p.price}</span>
                <Badge label={stockStatus(p)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: INVENTORY                                                          */
/* ---------------------------------------------------------------------- */

function InventoryPage() {
  return (
    <div className="p-5 lg:p-8">
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#EDE9E1" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone text-xs uppercase tracking-wide bg-[#FAF9F6]">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">In stock</th>
                <th className="p-4 font-semibold">Reorder level</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="border-t" style={{ borderColor: "#F1EFE9" }}>
                  <td className="p-4 flex items-center gap-3">
                    <ProductTube line={p.line} name={p.name.split(" ")[0].toUpperCase()} compact />
                    <span className="font-medium text-ink">{p.name}</span>
                  </td>
                  <td className="p-4 font-mono text-stone">{p.sku}</td>
                  <td className="p-4"><LineTag line={p.line} /></td>
                  <td className="p-4 font-mono text-ink">{p.stock} units</td>
                  <td className="p-4 font-mono text-stone">{p.reorder} units</td>
                  <td className="p-4"><Badge label={stockStatus(p)} /></td>
                  <td className="p-4">
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border" style={{ borderColor: "#EDE9E1", color: LINE_COLOR.Styling }}>
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: SALE (POS)                                                         */
/* ---------------------------------------------------------------------- */

function SalePage() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const lines = ["All", ...new Set(PRODUCTS.map((p) => p.line))];
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.line === filter);

  const add = (p) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
  };
  const changeQty = (id, delta) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <div className="p-5 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {lines.map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className="px-4 py-2 rounded-full text-sm font-semibold border"
              style={{
                background: filter === l ? "#171410" : "#fff",
                color: filter === l ? "#fff" : "#171410",
                borderColor: filter === l ? "#171410" : "#EDE9E1",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((p) => (
            <button
              key={p.id}
              onClick={() => stockStatus(p) !== "Out of Stock" && add(p)}
              disabled={stockStatus(p) === "Out of Stock"}
              className="bg-white rounded-2xl border p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderColor: "#EDE9E1" }}
            >
              <ProductTube line={p.line} name={p.name.split(" ")[0].toUpperCase()} compact />
              <div className="text-xs font-semibold text-ink mt-3 leading-tight">{p.name}</div>
              <div className="font-mono text-sm font-semibold text-ink mt-1">₹{p.price}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-5 flex flex-col h-fit lg:sticky lg:top-24" style={{ borderColor: "#EDE9E1" }}>
        <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
          <ShoppingCart size={18} /> Current sale
        </h3>
        {cart.length === 0 ? (
          <p className="text-sm text-stone py-8 text-center">Tap a product to add it to the bill.</p>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((i) => (
              <div key={i.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{i.name}</div>
                  <div className="text-xs text-stone font-mono">₹{i.price} each</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => changeQty(i.id, -1)} className="w-6 h-6 rounded-full border flex items-center justify-center text-ink" style={{ borderColor: "#EDE9E1" }}><Minus size={12} /></button>
                  <span className="font-mono text-sm w-4 text-center">{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} className="w-6 h-6 rounded-full border flex items-center justify-center text-ink" style={{ borderColor: "#EDE9E1" }}><Plus size={12} /></button>
                </div>
                <button onClick={() => removeItem(i.id)} className="text-stone hover:text-[#C1442E]"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t space-y-2" style={{ borderColor: "#EDE9E1" }}>
          <div className="flex justify-between text-sm text-stone"><span>Subtotal</span><span className="font-mono">₹{subtotal}</span></div>
          <div className="flex justify-between text-sm text-stone"><span>Tax (5%)</span><span className="font-mono">₹{tax}</span></div>
          <div className="flex justify-between text-base font-semibold text-ink"><span>Total</span><span className="font-mono">₹{total}</span></div>
        </div>
        <button
          disabled={cart.length === 0}
          className="mt-4 w-full py-3 rounded-lg font-semibold text-white disabled:opacity-40"
          style={{ background: "#171410" }}
        >
          Complete sale
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: CUSTOMERS                                                          */
/* ---------------------------------------------------------------------- */

function CustomersPage() {
  return (
    <div className="p-5 lg:p-8">
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#EDE9E1" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone text-xs uppercase tracking-wide bg-[#FAF9F6]">
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Visits</th>
                <th className="p-4 font-semibold">Total spent</th>
                <th className="p-4 font-semibold">Last visit</th>
                <th className="p-4 font-semibold">Tier</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-t" style={{ borderColor: "#F1EFE9" }}>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: LINE_COLOR.Styling }}>
                      {c.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <span className="font-medium text-ink">{c.name}</span>
                  </td>
                  <td className="p-4 font-mono text-stone">{c.phone}</td>
                  <td className="p-4 font-mono text-ink">{c.visits}</td>
                  <td className="p-4 font-mono text-ink">₹{c.spent.toLocaleString()}</td>
                  <td className="p-4 text-stone">{c.last}</td>
                  <td className="p-4"><Badge label={c.tier} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: SALES / ORDERS                                                     */
/* ---------------------------------------------------------------------- */

function OrdersPage() {
  return (
    <div className="p-5 lg:p-8">
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#EDE9E1" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone text-xs uppercase tracking-wide bg-[#FAF9F6]">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-t" style={{ borderColor: "#F1EFE9" }}>
                  <td className="p-4 font-mono text-ink">{o.id}</td>
                  <td className="p-4 text-stone">{o.date}</td>
                  <td className="p-4 font-medium text-ink">{o.customer}</td>
                  <td className="p-4 text-stone">{o.items}</td>
                  <td className="p-4 font-mono text-ink">₹{o.amount.toLocaleString()}</td>
                  <td className="p-4 text-stone">{o.mode}</td>
                  <td className="p-4"><Badge label={o.status} /></td>
                  <td className="p-4"><button className="text-stone hover:text-ink"><Eye size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: INVOICES                                                           */
/* ---------------------------------------------------------------------- */

function InvoicesPage() {
  return (
    <div className="p-5 lg:p-8">
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#EDE9E1" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone text-xs uppercase tracking-wide bg-[#FAF9F6]">
                <th className="p-4 font-semibold">Invoice</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-t" style={{ borderColor: "#F1EFE9" }}>
                  <td className="p-4 font-mono text-ink">{inv.id}</td>
                  <td className="p-4 font-medium text-ink">{inv.customer}</td>
                  <td className="p-4 text-stone">{inv.date}</td>
                  <td className="p-4 font-mono text-ink">₹{inv.amount.toLocaleString()}</td>
                  <td className="p-4"><Badge label={inv.status} /></td>
                  <td className="p-4">
                    <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border" style={{ borderColor: "#EDE9E1", color: LINE_COLOR.Styling }}>
                      <Download size={13} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PAGE: REPORTS & ANALYSIS                                                 */
/* ---------------------------------------------------------------------- */

function ReportsPage() {
  const totalRevenue = REVENUE_TREND.reduce((s, d) => s + d.revenue, 0);
  const avgOrder = Math.round(ORDERS.reduce((s, o) => s + o.amount, 0) / ORDERS.length);

  return (
    <div className="p-5 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Revenue (7 days)" value={`₹${totalRevenue.toLocaleString()}`} delta="+12%" positive accent={LINE_COLOR.Styling} />
        <StatCard icon={ShoppingCart} label="Avg. order value" value={`₹${avgOrder}`} delta="+4%" positive accent={LINE_COLOR.Shampoo} />
        <StatCard icon={Users} label="New customers" value="2" delta="This week" accent={LINE_COLOR.Conditioner} />
        <StatCard icon={CheckCircle2} label="Repeat rate" value="68%" delta="+3%" positive accent={LINE_COLOR.Treatment} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 border" style={{ borderColor: "#EDE9E1" }}>
          <h3 className="font-display text-lg text-ink mb-4">Top products sold (30 days)</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTS} margin={{ left: -10 }}>
                <CartesianGrid vertical={false} stroke="#EDE9E1" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#8D8477" }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12, fill: "#8D8477" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #EDE9E1", fontSize: 12 }} />
                <Bar dataKey="sold30" radius={[6, 6, 0, 0]}>
                  {PRODUCTS.map((p, idx) => <Cell key={idx} fill={LINE_COLOR[p.line]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#EDE9E1" }}>
          <h3 className="font-display text-lg text-ink mb-4">Sales by category</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_SPLIT} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {CATEGORY_SPLIT.map((c, idx) => <Cell key={idx} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #EDE9E1", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {CATEGORY_SPLIT.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-stone"><span className="w-2 h-2 rounded-full" style={{ background: c.color }} />{c.name}</span>
                <span className="font-mono text-ink">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* APP SHELL                                                                */
/* ---------------------------------------------------------------------- */

const TITLES = {
  dashboard: "Welcome to Dashboard",
  products: "Products",
  inventory: "Inventory",
  sale: "New Sale",
  customers: "Customers",
  orders: "Sales / Orders",
  invoices: "Invoices",
  reports: "Report & Analysis",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("Owner");
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogin = (email) => {
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setUser(name || "Owner");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("dashboard");
  };

  const PageComponent = useMemo(() => {
    switch (page) {
      case "products": return <ProductsPage />;
      case "inventory": return <InventoryPage />;
      case "sale": return <SalePage />;
      case "customers": return <CustomersPage />;
      case "orders": return <OrdersPage />;
      case "invoices": return <InvoicesPage />;
      case "reports": return <ReportsPage />;
      default: return <DashboardPage setPage={setPage} />;
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen" style={{ background: "#F7F6F3" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        * { font-family: 'Inter', sans-serif; }
        .text-ink { color: #171410; }
        .text-stone { color: #8D8477; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #E4DFD5; border-radius: 8px; }
        input:focus { outline: none; }
      `}</style>

      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex-1 min-w-0">
            <Topbar title={TITLES[page]} user={user} onLogout={handleLogout} setMobileOpen={setMobileOpen} />
            {PageComponent}
          </div>
        </div>
      )}
    </div>
  );
}
