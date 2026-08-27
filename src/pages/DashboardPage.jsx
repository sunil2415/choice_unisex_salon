import React from 'react';
import {
  ShoppingCart, Package, TrendingUp, AlertTriangle,
  RefreshCw, FileText, Filter, MoreVertical, CreditCard, CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const imgBlue = "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&h=150&fit=crop";
const imgGreen = "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=150&h=150&fit=crop";
const imgPink = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&h=150&fit=crop";

const OVERVIEW_STATS = [
  { label: "Orders", value: "32", icon: ShoppingCart, bgColor: "bg-blue-100", iconColor: "text-blue-600", meta: "+12% from yesterday", metaColor: "text-green-600", metaIcon: TrendingUp },
  { label: "Products Sold", value: "87", icon: Package, bgColor: "bg-purple-100", iconColor: "text-purple-600", meta: "+24% this week", metaColor: "text-green-600", metaIcon: TrendingUp },
  { label: "Revenue", value: "₹24,500", icon: TrendingUp, bgColor: "bg-green-100", iconColor: "text-green-600", meta: "+18% from last month", metaColor: "text-green-600", metaIcon: TrendingUp },
  { label: "Low Stock", value: "5 Products", icon: AlertTriangle, bgColor: "bg-red-100", iconColor: "text-red-500", meta: "Needs immediate restock", metaColor: "text-red-500", metaIcon: AlertTriangle },
];

const SALES_DATA = [
  { day: "Mon", sales: 12500 },
  { day: "Tue", sales: 15200 },
  { day: "Wed", sales: 9800 },
  { day: "Thu", sales: 18400 },
  { day: "Fri", sales: 24500 },
];

const TOP_PRODUCTS = [
  { name: "Argan Nourish Shampoo", units: 118, revenue: "₹53,100", image: imgBlue },
  { name: "Argan Nourish Conditioner", units: 96, revenue: "₹46,080", image: imgGreen },
  { name: "Curl Defining Cream", units: 74, revenue: "₹40,700", image: imgPink },
];

const RECENT_SALES = [
  { id: "INV-1024", customer: "Riya", amount: "₹2,500", mode: "UPI", status: "Paid" },
  { id: "INV-1023", customer: "Krina", amount: "₹1,200", mode: "Cash", status: "Paid" },
  { id: "INV-1022", customer: "Rahul", amount: "₹3,450", mode: "Card", status: "Paid" },
];

export function StatCard({ label, value, icon: Icon, bgColor, iconColor, meta, metaColor, metaIcon: MetaIcon }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between group">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bgColor}`}>
          <Icon size={24} className={iconColor} />
        </div>
        <div>
          <div className="font-bold text-2xl text-gray-900 leading-tight">{value}</div>
          <div className="text-sm font-medium text-gray-500">{label}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <MetaIcon size={14} className={metaColor} />
          <span className={`text-xs font-bold ${metaColor}`}>{meta}</span>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="px-8 pb-8 max-w-full mx-auto space-y-6">

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Today's Sales
          </button>

        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#171410] rounded-full shadow-sm text-sm font-semibold text-white hover:bg-black transition-colors">
          <FileText size={16} />
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {OVERVIEW_STATS.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-bold text-lg text-gray-900">Sales Overview</h2>
              <p className="text-sm text-gray-500">Revenue across the week</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-bold text-gray-900">Today</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-semibold transition-colors">7 Days</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-semibold transition-colors">30 Days</button>
              <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-semibold transition-colors">Custom</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sales-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  cursor={{ stroke: '#F3F4F6', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#sales-gradient)" activeDot={{ r: 6, fill: '#16A34A', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-gray-900">Top Selling Products</h2>
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {TOP_PRODUCTS.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 overflow-hidden relative shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.units} Units Sold</div>
                  </div>
                </div>
                <div className="font-bold text-sm text-gray-900">{product.revenue}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            View All Products
          </button>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-bold text-lg text-gray-900">Recent Sales</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[#F8F9FA] text-gray-500 font-medium rounded-xl">
                <th className="py-3 px-4 first:rounded-l-xl">Invoice</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 last:rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SALES.map((sale, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900">{sale.id}</td>
                  <td className="py-4 px-4 text-gray-700 font-medium">{sale.customer}</td>
                  <td className="py-4 px-4 font-bold text-gray-900">{sale.amount}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">
                      <CreditCard size={12} /> {sale.mode}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700">
                      <CheckCircle2 size={12} /> {sale.status}
                    </span>
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

export default DashboardPage;
