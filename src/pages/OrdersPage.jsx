import React, { useState } from 'react';
import {
  ShoppingBag, Truck, Home, RotateCcw, Search, SlidersHorizontal,
  Plus, Calendar, Eye, Pencil, Trash2, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, ChevronDown, CheckCircle2, Clock,
  Printer, Download, MapPin, Mail, Phone, CreditCard, ShieldCheck,
  PackageCheck, ArrowLeft, ExternalLink, RefreshCw, AlertTriangle,
  DollarSign, Package
} from 'lucide-react';
import { PRODUCTS, p1, p2, p3, p4, p5, p6, p7 } from '../data/data';

// --- INITIAL ORDERS DATASET ---
const INITIAL_ORDERS = [
  {
    id: "#ODR115753",
    dotColor: "bg-blue-500",
    customer: "Alexandra Guzman",
    email: "alexandra@testgmail.com",
    phone: "+1 (555) 234-5678",
    initials: "AG",
    avatarBg: "bg-blue-200 text-blue-800",
    products: [
      { id: "LW-101", name: "Likewise Green Tea & Matcha Moisturizer", qty: 2, price: 590, img: p1, sku: "LW-GTM-50" },
      { id: "LW-102", name: "Likewise Vitamin C Face Wash", qty: 1, price: 349, img: p2, sku: "LW-VTC-100" }
    ],
    extraCount: "+1",
    type: "USA Shipping",
    address: "742 Evergreen Terrace, Springfield, OR 97477, United States",
    price: 1529,
    formattedPrice: "₹ 1,529.00",
    paymentStatus: "Paid",
    discount: "₹ 75.00, 🏷️ 5%",
    date: "8 Feb 2026",
    time: "11:13:00 PM",
    status: "Accepted",
    statusBg: "bg-[#B6D6A6] text-[#2C4A21]",
    courier: "FedEx Express (TRK-984021)",
    returnDetails: null
  },
  {
    id: "#ODR115743",
    dotColor: "bg-[#486538]",
    customer: "Caroline Murphy",
    email: "caroline@testgmail.com",
    phone: "+34 612 345 678",
    initials: "CM",
    avatarBg: "bg-emerald-200 text-emerald-800",
    products: [
      { id: "LW-103", name: "Likewise D-Tan Face Wash", qty: 1, price: 375, img: p3, sku: "LW-DTN-100" },
      { id: "LW-104", name: "Likewise Rice Water Face Wash", qty: 1, price: 399, img: p4, sku: "LW-RCW-100" }
    ],
    extraCount: null,
    type: "Spain Shipping",
    address: "Calle de Alcalá 42, 28014 Madrid, Spain",
    price: 774,
    formattedPrice: "₹ 774.00",
    paymentStatus: "Paid",
    discount: "₹ 30.00, 🏷️ 8%",
    date: "6 March 2026",
    time: "1:13:00 AM",
    status: "Ready to Ship",
    statusBg: "bg-teal-100 text-teal-800",
    courier: "DHL Express (TRK-984022)",
    returnDetails: null
  },
  {
    id: "#ODR115560",
    dotColor: "bg-blue-500",
    customer: "Roy Smith",
    email: "roy@testgmail.com",
    phone: "+1 (416) 555-0198",
    initials: "RS",
    avatarBg: "bg-sky-200 text-sky-800",
    products: [
      { id: "LW-105", name: "Likewise Super Bright Sunscreen", qty: 1, price: 649, img: p5, sku: "LW-SUN-70" },
      { id: "LW-106", name: "Likewise Tea Tree Face Wash", qty: 1, price: 349, img: p6, sku: "LW-TTR-100" }
    ],
    extraCount: "+2",
    type: "Canada Shipping",
    address: "100 Queen St W, Toronto, ON M5H 2N2, Canada",
    price: 998,
    formattedPrice: "₹ 998.00",
    paymentStatus: "Paid",
    discount: "₹ 50.00, 🏷️ 8%",
    date: "25 March 2026",
    time: "12:13:00 PM",
    status: "Order Placed",
    statusBg: "bg-blue-100 text-blue-800",
    courier: "Canada Post (TRK-984023)",
    returnDetails: null
  },
  {
    id: "#ODR115463",
    dotColor: "bg-gray-700",
    customer: "Grace Washington",
    email: "grace@testgmail.com",
    phone: "+33 1 42 68 55 00",
    initials: "GW",
    avatarBg: "bg-purple-200 text-purple-800",
    products: [
      { id: "LW-101", name: "Likewise Green Tea & Matcha Moisturizer", qty: 2, price: 590, img: p1, sku: "LW-GTM-50" },
      { id: "LW-104", name: "Likewise Rice Water Face Wash", qty: 1, price: 399, img: p4, sku: "LW-RCW-100" }
    ],
    extraCount: "+2",
    type: "France Shipping",
    address: "15 Rue de la Paix, 75002 Paris, France",
    price: 1579,
    formattedPrice: "₹ 1,579.00",
    paymentStatus: "Paid",
    discount: "₹ 60.00, 🏷️ 10%",
    date: "14 March 2026",
    time: "12:13:00 PM",
    status: "Delivered",
    statusBg: "bg-gray-200 text-gray-800",
    courier: "La Poste Chronopost (TRK-984024)",
    returnDetails: null
  },
  {
    id: "#ODR115352",
    dotColor: "bg-[#8C2A2A]",
    customer: "Bella Leach",
    email: "bella@testgmail.com",
    phone: "+1 (604) 555-7821",
    initials: "BL",
    avatarBg: "bg-teal-200 text-teal-800",
    products: [
      { id: "LW-102", name: "Likewise Vitamin C Face Wash", qty: 1, price: 349, img: p2, sku: "LW-VTC-100" },
      { id: "LW-107", name: "Likewise Strawberry Face Wash", qty: 1, price: 329, img: p7, sku: "LW-STW-100" }
    ],
    extraCount: "+3",
    type: "Canada Shipping",
    address: "650 W Georgia St, Vancouver, BC V6B 4N9, Canada",
    price: 678,
    formattedPrice: "₹ 678.00",
    paymentStatus: "Paid",
    discount: "₹ 20.00, 🏷️ 6%",
    date: "2 March 2026",
    time: "04:13:00 PM",
    status: "Returned",
    statusBg: "bg-[#F2D6D6] text-[#8C2A2A]",
    courier: "UPS Ground (TRK-984025)",
    returnDetails: {
      reason: "Damaged in Transit / Outer Seal Broken",
      refundStatus: "Refund Processed",
      refundAmount: "₹ 678.00",
      restocked: true,
      returnDate: "5 March 2026"
    }
  },
  {
    id: "#ODR115224",
    dotColor: "bg-blue-500",
    customer: "Audrey Hardin",
    email: "audrey@testgmail.com",
    phone: "+43 1 51543",
    initials: "AH",
    avatarBg: "bg-amber-200 text-amber-800",
    products: [
      { id: "LW-103", name: "Likewise D-Tan Face Wash", qty: 1, price: 375, img: p3, sku: "LW-DTN-100" },
      { id: "LW-106", name: "Likewise Tea Tree Face Wash", qty: 1, price: 349, img: p6, sku: "LW-TTR-100" }
    ],
    extraCount: "+1",
    type: "Austria Shipping",
    address: "Kärntner Straße 26, 1010 Wien, Austria",
    price: 724,
    formattedPrice: "₹ 724.00",
    paymentStatus: "Paid",
    discount: "₹ 40.00, 🏷️ 10%",
    date: "4 March 2026",
    time: "02:15:00 PM",
    status: "Shipped",
    statusBg: "bg-amber-100 text-amber-800",
    courier: "Austrian Post (TRK-984026)",
    returnDetails: null
  },
];

const ORDER_STATUS_FLOW = [
  "Order Placed",
  "Accepted",
  "Ready to Ship",
  "Shipped",
  "Delivered",
  "Returned"
];

function OrdersPage({ viewMode = 'all', setPage }) {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState("#ODR115753");
  const [searchTerm, setSearchTerm] = useState("");

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Function to update status of an order dynamically
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id === orderId) {
          let updatedBg = "bg-blue-100 text-blue-800";
          if (newStatus === "Accepted") updatedBg = "bg-[#B6D6A6] text-[#2C4A21]";
          else if (newStatus === "Ready to Ship") updatedBg = "bg-teal-100 text-teal-800";
          else if (newStatus === "Shipped") updatedBg = "bg-amber-100 text-amber-800";
          else if (newStatus === "Delivered") updatedBg = "bg-[#B6D6A6] text-[#2C4A21]";
          else if (newStatus === "Returned") updatedBg = "bg-[#F2D6D6] text-[#8C2A2A]";

          let returnData = ord.returnDetails;
          if (newStatus === "Returned" && !returnData) {
            returnData = {
              reason: "Damaged in Transit / Seal Broken",
              refundStatus: "Refund Pending",
              refundAmount: ord.formattedPrice,
              restocked: true,
              returnDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            };
          }

          return {
            ...ord,
            status: newStatus,
            statusBg: updatedBg,
            returnDetails: returnData
          };
        }
        return ord;
      })
    );
  };

  // Function to confirm refund for returned orders
  const handleConfirmRefund = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((ord) => {
        if (ord.id === orderId && ord.returnDetails) {
          return {
            ...ord,
            returnDetails: {
              ...ord.returnDetails,
              refundStatus: "Refund Processed"
            }
          };
        }
        return ord;
      })
    );
  };

  const filteredOrders = orders.filter((ord) =>
    ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ord.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ord.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C] font-sans">

      {/* ================= VIEW MODE 1: ALL ORDERS ================= */}
      {viewMode === 'all' && (
        <>
          {/* BREADCRUMB & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
                <span>🏠 Dashboard</span>
                <span>&gt;</span>
                <span className="text-gray-900 font-bold">Orders</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/70 backdrop-blur-md rounded-2xl border border-black/10 text-xs font-semibold text-gray-700 shadow-sm">
                <span>19/05/2026 - 25/06/2026</span>
                <Calendar size={14} className="text-gray-500" />
              </div>

              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-md">
                <Plus size={16} /> Create
              </button>
            </div>
          </div>

          {/* TOP METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Orders</h3>
                  <p className="text-[11px] text-gray-500">No. of Orders Received</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="text-3xl font-extrabold text-gray-900">648</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-100/80">5 ▲ 4.13%</span>
              </div>
            </div>

            <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Processed</h3>
                  <p className="text-[11px] text-gray-500">Order Accepted</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="text-3xl font-extrabold text-gray-900">234</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-100/80">25 ▲ 4.13%</span>
              </div>
            </div>

            <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <Home size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Delivered</h3>
                  <p className="text-[11px] text-gray-500">Courier reached</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="text-3xl font-extrabold text-gray-900">852</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-700 bg-emerald-100/80">124 ▲ 4.13%</span>
              </div>
            </div>

            <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <RotateCcw size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Return</h3>
                  <p className="text-[11px] text-gray-500">Loss due to returns</p>
                </div>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <div className="text-3xl font-extrabold text-gray-900">₹1,580.00</div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-rose-700 bg-rose-100/80">530.00 ▲ 4.13%</span>
              </div>
            </div>
          </div>

          {/* ALL ORDERS TABLE CONTAINER */}
          <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900">All Orders</h3>
                  <p className="text-xs text-gray-500">Received new <span className="font-bold text-gray-700">65 orders</span> to be processed</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-white/60 border border-black/10 rounded-2xl px-4 py-2 flex-1 sm:w-60 shadow-inner">
                  <Search size={16} className="text-gray-500 shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search order..."
                    className="bg-transparent outline-none text-xs w-full text-gray-800 placeholder-gray-500 min-w-0"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/60 border border-black/10 rounded-2xl text-xs font-semibold text-gray-700 shrink-0">
                  <span>All</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </div>
                <button className="w-10 h-10 rounded-2xl bg-white/60 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-white transition-colors shrink-0">
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[850px] text-sm text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-black/10">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Product(s)</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Price/Discount</th>
                    <th className="py-3 px-3">Sales</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredOrders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-white/40 transition-colors">
                      <td className="py-4 px-3 font-bold text-xs text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${ord.dotColor}`} />
                          <span>{ord.id}</span>
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-full ${ord.avatarBg} font-bold text-xs flex items-center justify-center shrink-0`}>
                            {ord.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-gray-900 truncate max-w-[140px]">{ord.customer}</div>
                            <div className="text-[11px] text-gray-500 truncate max-w-[140px]">{ord.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center -space-x-2">
                          {ord.products.map((p, i) => (
                            <img key={i} src={p.img} alt="Product" className="w-9 h-9 rounded-full object-contain bg-white p-0.5 border-2 border-white shrink-0 shadow-sm" />
                          ))}
                          {ord.extraCount && (
                            <div className="w-8 h-8 rounded-full bg-[#486538] text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shrink-0 shadow-sm">
                              {ord.extraCount}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-bold text-xs text-gray-900">{ord.type.split(" ")[0]}</div>
                        <div className="text-[11px] text-gray-500">Shipping</div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-gray-900">{ord.formattedPrice}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${ord.paymentStatus === 'Paid' ? 'bg-[#B6D6A6] text-[#2C4A21]' : 'bg-[#F2D6D6] text-[#8C2A2A]'
                            }`}>
                            {ord.paymentStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{ord.discount}</div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-bold text-xs text-gray-900">{ord.date}</div>
                        <div className="text-[11px] text-gray-500">{ord.time}</div>
                      </td>

                      <td className="py-4 px-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${ord.statusBg}`}>
                          {ord.status}
                        </span>
                      </td>

                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-500">
                          <button
                            onClick={() => {
                              setSelectedOrderId(ord.id);
                              if (setPage) setPage('orders-details');
                            }}
                            className="hover:text-gray-900 p-1 flex items-center gap-1 text-xs font-semibold"
                            title="Preview"
                          >
                            <Eye size={15} /> <span className="hidden xl:inline">Preview</span>
                          </button>
                          <button className="hover:text-gray-900 p-1" title="Edit"><Pencil size={15} /></button>
                          <button className="hover:text-rose-600 p-1" title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-gray-500">
              <div>Showing 1 to {filteredOrders.length} of {orders.length} entries</div>
              <div className="flex items-center gap-1">
                <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsLeft size={16} /></button>
                <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
                <button className="w-7 h-7 rounded-full bg-[#385433] text-white font-bold flex items-center justify-center">1</button>
                <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
                <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsRight size={16} /></button>
              </div>
            </div>
          </div>
        </>
      )}


      {/* ================= VIEW MODE 2: ORDER DETAILS INSPECTOR ================= */}
      {viewMode === 'details' && (
        <div className="space-y-6">

          {/* Breadcrumb Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
                <button onClick={() => { if (setPage) setPage('orders-all'); }} className="hover:underline flex items-center gap-1">
                  <ArrowLeft size={12} /> Back to All Orders
                </button>
                <span>&gt;</span>
                <span className="text-gray-900 font-bold">Order Details Inspector</span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{currentOrder.id}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentOrder.statusBg}`}>
                  {currentOrder.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-3.5 py-2 bg-white/80 hover:bg-white text-gray-800 rounded-2xl text-xs font-bold transition-all border border-black/10 shadow-sm">
                <Printer size={15} /> Print Receipt
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-md">
                <Download size={15} /> Download Invoice
              </button>
            </div>
          </div>

          {/* Details Grid: Order Selector Sidebar + Main Details & Lifecycle Manager */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Column 1: Order Selector Panel */}
            <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-sm text-gray-900">Select Order ({orders.length})</h3>
                <span className="text-[10px] text-gray-500 font-medium">Click to inspect</span>
              </div>

              <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] gap-2 lg:gap-2 pb-2 lg:pb-0 pr-1 scrollbar-thin">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border min-w-[200px] lg:min-w-0 shrink-0 lg:shrink ${selectedOrderId === ord.id
                        ? "bg-[#385433] text-white border-[#385433] shadow-md"
                        : "bg-white/60 hover:bg-white text-gray-800 border-black/5"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{ord.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${selectedOrderId === ord.id ? "bg-white/20 text-white" : ord.statusBg
                        }`}>
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{ord.customer}</div>
                    <div className={`text-[11px] mt-1 ${selectedOrderId === ord.id ? "text-white/80" : "text-gray-500"}`}>
                      {ord.formattedPrice} • {ord.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2, 3 & 4: Main Order Details & Status Lifecycle Manager */}
            <div className="lg:col-span-3 space-y-6">

              {/* Dynamic Status Lifecycle Bar */}
              <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">Order Fulfillment Lifecycle Status</h3>
                    <p className="text-xs text-gray-500">Change status to update tracking and move through workflow</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700">Set Status:</span>
                    <select
                      value={currentOrder.status}
                      onChange={(e) => handleUpdateStatus(currentOrder.id, e.target.value)}
                      className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold border-2 outline-none cursor-pointer shadow-sm ${currentOrder.statusBg}`}
                    >
                      {ORDER_STATUS_FLOW.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Visual Step Progress Bar */}
                <div className="flex sm:grid sm:grid-cols-6 overflow-x-auto gap-2 pt-2 pb-1 scrollbar-thin">
                  {ORDER_STATUS_FLOW.map((step, idx) => {
                    const currentIdx = ORDER_STATUS_FLOW.indexOf(currentOrder.status);
                    const isPassed = idx <= currentIdx && currentOrder.status !== 'Returned';
                    const isCurrent = step === currentOrder.status;

                    return (
                      <div
                        key={step}
                        onClick={() => handleUpdateStatus(currentOrder.id, step)}
                        className={`p-2.5 rounded-2xl text-center text-xs font-bold cursor-pointer transition-all border min-w-[110px] sm:min-w-0 shrink-0 sm:shrink ${isCurrent
                            ? step === 'Returned'
                              ? 'bg-[#F2D6D6] text-[#8C2A2A] border-rose-300 shadow-md scale-105'
                              : 'bg-[#385433] text-white border-[#385433] shadow-md scale-105'
                            : isPassed
                              ? 'bg-[#B6D6A6] text-[#2C4A21] border-emerald-300'
                              : 'bg-white/50 text-gray-400 border-black/5'
                          }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider opacity-70">Step {idx + 1}</div>
                        <div className="truncate mt-0.5">{step}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RETURN & REFUND CASE MANAGEMENT BOX */}
              {currentOrder.status === 'Returned' && (
                <div className="bg-[#F2D6D6]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-rose-300 space-y-4 text-[#8C2A2A]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-rose-200 text-rose-800 flex items-center justify-center shrink-0">
                      <RotateCcw size={20} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg">Return & Refund Management Case</h3>
                      <p className="text-xs text-rose-700">This order is marked as Returned. Process customer refund and inventory restock.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 bg-white/80 rounded-2xl border border-rose-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">Return Reason</span>
                      <div className="font-bold text-xs text-gray-900">
                        {currentOrder.returnDetails?.reason || "Damaged in Transit / Outer Seal Broken"}
                      </div>
                    </div>

                    <div className="p-3.5 bg-white/80 rounded-2xl border border-rose-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">Refund Status</span>
                      <div className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className={currentOrder.returnDetails?.refundStatus === 'Refund Processed' ? 'text-emerald-700' : 'text-amber-600'} />
                        {currentOrder.returnDetails?.refundStatus || 'Refund Pending'}
                      </div>
                    </div>

                    <div className="p-3.5 bg-white/80 rounded-2xl border border-rose-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">Inventory Restock</span>
                      <div className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                        <Package size={14} className="text-emerald-700" />
                        Restocked to Stock
                      </div>
                    </div>
                  </div>

                  {currentOrder.returnDetails?.refundStatus !== 'Refund Processed' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleConfirmRefund(currentOrder.id)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md"
                      >
                        <DollarSign size={16} /> Confirm Refund ({currentOrder.formattedPrice})
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Purchased Items & Financial Breakdown */}
              <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-4">
                <h3 className="font-bold text-base text-gray-900">Purchased Items ({currentOrder.products.length})</h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <table className="w-full min-w-[500px] text-xs text-left">
                    <thead>
                      <tr className="text-gray-500 font-semibold border-b border-black/10">
                        <th className="py-2.5 px-3">Product Name</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Price</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {currentOrder.products.map((p, idx) => (
                        <tr key={idx} className="hover:bg-white/40">
                          <td className="py-3 px-3 font-bold text-gray-900 flex items-center gap-3">
                            <img src={p.img} alt={p.name} className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-black/10 shrink-0" />
                            <span className="truncate max-w-[200px] sm:max-w-none">{p.name}</span>
                          </td>
                          <td className="py-3 px-3 text-gray-500 font-mono">{p.sku}</td>
                          <td className="py-3 px-3 font-semibold text-gray-800">₹{p.price}</td>
                          <td className="py-3 px-3 font-bold text-gray-900">{p.qty}</td>
                          <td className="py-3 px-3 font-bold text-gray-900 text-right">₹{(p.price * p.qty).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Subtotal & Taxes Breakdown */}
                <div className="pt-4 border-t border-black/10 space-y-2 text-xs max-w-xs ml-auto">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-gray-900">{currentOrder.formattedPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount Savings:</span>
                    <span className="font-bold text-emerald-700">- ₹75.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Express Shipping:</span>
                    <span className="font-bold text-emerald-700">FREE</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-black/10 text-sm font-extrabold text-gray-900">
                    <span>Grand Total Paid:</span>
                    <span className="text-[#385433] text-base">{currentOrder.formattedPrice}</span>
                  </div>
                </div>
              </div>

              {/* Customer Profile & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-4">
                  <h3 className="font-bold text-base text-gray-900">Customer Details</h3>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${currentOrder.avatarBg} font-bold text-sm flex items-center justify-center shrink-0`}>
                      {currentOrder.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{currentOrder.customer}</div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">VIP Buyer</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs pt-2 border-t border-black/10">
                    <div className="flex items-center gap-2 text-gray-700 truncate">
                      <Mail size={14} className="text-gray-500 shrink-0" /> {currentOrder.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone size={14} className="text-gray-500 shrink-0" /> {currentOrder.phone}
                    </div>
                  </div>
                </div>

                <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-3">
                  <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                    <MapPin size={18} className="text-[#385433]" /> Shipping Address
                  </h3>
                  <div className="text-xs text-gray-700 leading-relaxed bg-white/60 p-3.5 sm:p-4 rounded-2xl border border-black/5">
                    <div className="font-bold text-gray-900 mb-1">{currentOrder.customer}</div>
                    {currentOrder.address}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default OrdersPage;
