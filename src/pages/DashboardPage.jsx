import React, { useState } from 'react';
import {
  ShoppingBag, Banknote, Package, Tag, Briefcase, MoreVertical,
  Search, SlidersHorizontal, Eye, Pencil, Trash2, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell
} from 'recharts';

import { PRODUCTS, p1, p2, p3, p4, p5, p6, p7 } from '../data/data';

// --- DASHBOARD CHARTS & REVENUE DATA ---

const ORDER_SUMMARY_DATA = [
  { day: "1 Feb", orders: 2400 },
  { day: "2 Feb", orders: 600 },
  { day: "3 Feb", orders: 2200 },
  { day: "5 Feb", orders: 900 },
  { day: "6 Feb", orders: 2500 },
  { day: "7 Feb", orders: 2650 },
  { day: "8 Feb", orders: 1200 },
  { day: "9 Feb", orders: 1500 },
];

const REVENUE_GENERATED_DATA = [
  { month: "Jan", series1: 10500, series2: 12500 },
  { month: "Feb", series1: 7200, series2: 10800 },
  { month: "Mar", series1: 9800, series2: 6500 },
  { month: "Apr", series1: 10400, series2: 9800 },
  { month: "May", series1: 7800, series2: 7000 },
  { month: "Jun", series1: 9200, series2: 9900 },
  { month: "Jul", series1: 9000, series2: 9000 },
  { month: "Aug", series1: 6200, series2: 10800 },
];

// --- TOP SELLING PRODUCTS DATA (Exact product image titles) ---
const TOP_SELLING = [
  { id: "LW-101", name: "Likewise Green Tea & Matcha Moisturizer", price: "₹ 590", orders: "210 Orders", img: p1 },
  { id: "LW-102", name: "Likewise Vitamin C Face Wash", price: "₹ 349", orders: "175 Orders", img: p2 },
  { id: "LW-105", name: "Likewise Super Bright Sunscreen SPF 50", price: "₹ 649", orders: "165 Orders", img: p5 },
  { id: "LW-103", name: "Likewise D-Tan Face Wash", price: "₹ 375", orders: "142 Orders", img: p3 },
  { id: "LW-104", name: "Likewise Rice Water Face Wash", price: "₹ 399", orders: "98 Orders", img: p4 },
];

// --- MOST DISCOUNTED PRODUCTS DATA (Exact product image titles) ---
const MOST_DISCOUNTED = [
  { id: "LW-106", name: "Likewise Tea Tree Face Wash", price: "₹ 349", orders: "89 Orders", discount: "25% OFF", img: p6 },
  { id: "LW-107", name: "Likewise Strawberry Face Wash", price: "₹ 329", orders: "64 Orders", discount: "20% OFF", img: p7 },
  { id: "LW-103", name: "Likewise D-Tan Face Wash", price: "₹ 375", orders: "142 Orders", discount: "15% OFF", img: p3 },
  { id: "LW-104", name: "Likewise Rice Water Face Wash", price: "₹ 399", orders: "98 Orders", discount: "12% OFF", img: p4 },
  { id: "LW-105", name: "Likewise Super Bright Sunscreen SPF 50", price: "₹ 649", orders: "165 Orders", discount: "10% OFF", img: p5 },
];

// --- TOP CATEGORIES (Matching Likewise Product Lines) ---
const CATEGORY_PIE_DATA = [
  { name: "Face Wash", amount: "₹6,86,675", pct: "55%", value: 55, color: "#9EBF3B" },
  { name: "Moisturizer", amount: "₹2,49,700", pct: "20%", value: 20, color: "#879B54" },
  { name: "Sun Care", amount: "₹1,87,275", pct: "15%", value: 15, color: "#6A8042" },
  { name: "Serums & Kits", amount: "₹1,24,850", pct: "10%", value: 10, color: "#374E24" },
];

// --- INVENTORY TABLE DATA (Derived from PRODUCTS array with p1..p7 images) ---
const PRODUCT_INVENTORY = [
  { id: "LW-101", name: "Likewise Green Tea & Matcha Moisturizer", category: "Moisturizer", subcat: "50 g", orders: 210, stock: 48, price: "₹ 590", discountPrice: "₹ 88", discountPct: "15%", sales: "210", duration: "1 yr 2 mo", status: "Active", img: p1 },
  { id: "LW-102", name: "Likewise Vitamin C Face Wash", category: "Face Wash", subcat: "100 mL", orders: 175, stock: 24, price: "₹ 349", discountPrice: "₹ 35", discountPct: "10%", sales: "175", duration: "0 yr 9 mo", status: "Active", img: p2 },
  { id: "LW-103", name: "Likewise D-Tan Face Wash", category: "Face Wash", subcat: "100 mL", orders: 142, stock: 12, price: "₹ 375", discountPrice: "₹ 56", discountPct: "15%", sales: "142", duration: "1 yr 5 mo", status: "Active", img: p3 },
  { id: "LW-104", name: "Likewise Rice Water Face Wash", category: "Face Wash", subcat: "100 mL", orders: 98, stock: 30, price: "₹ 399", discountPrice: "₹ 48", discountPct: "12%", sales: "98", duration: "2 yr 1 mo", status: "Active", img: p4 },
  { id: "LW-105", name: "Likewise Super Bright Sunscreen SPF 50", category: "Sun Care", subcat: "70 g", orders: 165, stock: 55, price: "₹ 649", discountPrice: "₹ 65", discountPct: "10%", sales: "165", duration: "1 yr 0 mo", status: "Active", img: p5 },
  { id: "LW-106", name: "Likewise Tea Tree Face Wash", category: "Face Wash", subcat: "100 mL", orders: 89, stock: 8, price: "₹ 349", discountPrice: "₹ 87", discountPct: "25%", sales: "89", duration: "0 yr 6 mo", status: "Active", img: p6 },
  { id: "LW-107", name: "Likewise Strawberry Face Wash", category: "Face Wash", subcat: "100 mL", orders: 64, stock: 0, isEmpty: true, price: "₹ 329", discountPrice: "₹ 66", discountPct: "20%", sales: "64", duration: "1 yr 8 mo", status: "Inactive", img: p7 },
];

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = PRODUCT_INVENTORY.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C]">

      {/* ================= TOP ROW: ORDER SUMMARY & REVENUE GENERATED ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* CARD 1: Order Summary */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900">Order Summary</h3>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-700">
                    Order Received <span className="text-[10px]">▲</span> 1.11%
                  </div>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-900 p-1">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mt-3 sm:mt-4 mb-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">2501.00</div>
              <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1">Total Order Completed</div>
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-40 sm:h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ORDER_SUMMARY_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="orderSummaryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#738A65" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#738A65" stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6A7569" }} dy={5} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', background: '#385433', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="orders" stroke="#5A704D" strokeWidth={3} fillOpacity={1} fill="url(#orderSummaryGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CARD 2: Revenue Generated */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <Banknote size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900">Revenue Generated</h3>
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-rose-700">
                    Total decreased from previous <span className="text-[10px]">▼</span> 0.86%
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 mb-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">₹12,48,500</div>
              <div className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-1">Total Revenue Completed</div>
            </div>
          </div>

          {/* Dual Line Chart */}
          <div className="h-40 sm:h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_GENERATED_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6A7569" }} dy={5} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', background: '#385433', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="series1" stroke="#3D5634" strokeWidth={2} dot={{ r: 3, fill: "#3D5634" }} />
                <Line type="monotone" dataKey="series2" stroke="#8A9E7A" strokeWidth={2} dot={{ r: 3, fill: "#8A9E7A" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>


      {/* ================= MIDDLE ROW: 3 CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">

        {/* CARD 1: Top Selling Products */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                <Package size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Top selling products</h3>
                <p className="text-xs text-gray-500">New product in top 5 list <span className="font-bold text-gray-700">2 items</span></p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-3">
              {TOP_SELLING.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0 border border-black/10" />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">ID: {item.id}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <div className="font-bold text-gray-900">{item.price}</div>
                    <div className="text-[10px] text-gray-500">{item.orders}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Donut Summary */}
          <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#486538" strokeWidth="6" fill="transparent" strokeDasharray="138" strokeDashoffset="90" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[11px] font-bold text-gray-800">35%</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">₹4,89,200</div>
              <div className="text-xs text-gray-500">From total revenue made</div>
            </div>
          </div>
        </div>

        {/* CARD 2: Most Discounted */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                <Tag size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Most Discounted</h3>
                <p className="text-xs text-gray-500">Total decreased from previous <span className="text-rose-700 font-bold">▼ 0.86%</span></p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-3">
              {MOST_DISCOUNTED.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-xl object-contain bg-white p-1 shrink-0 border border-black/10" />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">ID: {item.id}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <div className="font-bold text-gray-900">{item.price}</div>
                    <div className="text-[10px] text-emerald-700 font-bold">{item.discount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Donut Summary */}
          <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#6B8054" strokeWidth="6" fill="transparent" strokeDasharray="138" strokeDashoffset="117" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[11px] font-bold text-gray-800">15%</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-gray-900">₹1,87,275</div>
              <div className="text-xs text-gray-500">From total revenue made</div>
            </div>
          </div>
        </div>

        {/* CARD 3: Top Categories */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between md:col-span-2 xl:col-span-1">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Top Categories</h3>
                <p className="text-xs text-gray-500">Top Categories earning Increased <span className="text-emerald-700 font-bold">▲ 1.15%</span></p>
              </div>
            </div>

            {/* Pie Chart Visual */}
            <div className="h-44 w-full flex items-center justify-center my-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CATEGORY_PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown List */}
            <div className="space-y-2 text-xs">
              {CATEGORY_PIE_DATA.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-gray-900">
                    <span>{cat.amount}</span>
                    <span className="w-8 text-right text-gray-600 font-semibold">{cat.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/5">
            <div className="text-2xl font-extrabold text-gray-900">₹12,48,500</div>
            <div className="text-xs text-gray-500">Top Categories Earning</div>
          </div>
        </div>

      </div>


      {/* ================= BOTTOM ROW: PRODUCT INVENTORY TABLE ================= */}
      <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-6">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">Product Inventory</h3>
              <p className="text-xs text-gray-500">All top performing product <span className="font-bold text-gray-700">7 items</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white/60 border border-black/10 rounded-2xl px-4 py-2 flex-1 sm:w-64 shadow-inner">
              <Search size={16} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="bg-transparent outline-none text-xs w-full text-gray-800 placeholder-gray-500 min-w-0"
              />
            </div>
            <button className="w-10 h-10 rounded-2xl bg-white/60 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-white transition-colors shrink-0">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[700px] text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-black/10">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Order/Stock</th>
                <th className="py-3 px-3">Price/Discount</th>
                <th className="py-3 px-3">Sales</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredInventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/40 transition-colors">
                  
                  {/* Product */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.img} alt={item.name} className="w-11 h-11 rounded-2xl object-contain bg-white p-1 shrink-0 border border-black/10" />
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-gray-900 truncate max-w-[200px] sm:max-w-none">{item.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.category}</div>
                    <div className="text-[11px] text-gray-500">{item.subcat}</div>
                  </td>

                  {/* Order/Stock */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.orders}</div>
                    <div className={`text-[11px] font-medium ${item.isEmpty ? "text-rose-600 font-semibold" : "text-gray-500"}`}>
                      {item.isEmpty ? "0 - empty" : item.stock}
                    </div>
                  </td>

                  {/* Price/Discount */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.price}</div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <span>{item.discountPrice}</span>
                      <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold">
                        <Tag size={10} /> {item.discountPct}
                      </span>
                    </div>
                  </td>

                  {/* Sales */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.sales}</div>
                    <div className="text-[11px] text-gray-500">{item.duration}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                      item.status === 'Active'
                        ? 'bg-[#B6D6A6] text-[#2C4A21]'
                        : 'bg-[#F2D6D6] text-[#8C2A2A]'
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <button className="hover:text-gray-900 p-1" title="View"><Eye size={16} /></button>
                      <button className="hover:text-gray-900 p-1" title="Edit"><Pencil size={16} /></button>
                      <button className="hover:text-rose-600 p-1" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-gray-500">
          <div>Showing 1 to {filteredInventory.length} of {PRODUCT_INVENTORY.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsLeft size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
            <button className="w-7 h-7 rounded-full bg-[#385433] text-white font-bold flex items-center justify-center">1</button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsRight size={16} /></button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;
