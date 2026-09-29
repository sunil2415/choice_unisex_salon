import React, { useState } from 'react';
import {
  Users, Search, Mail, Phone, MapPin, ShoppingBag, Download,
  Plus, SlidersHorizontal, Eye, Pencil, Trash2, ChevronLeft,
  ChevronRight, ChevronsLeft, ChevronsRight, X, Calendar, DollarSign,
  TrendingUp, RefreshCw
} from 'lucide-react';
import { CUSTOMERS, PRODUCTS, p1, p2, p3 } from '../data/data';

// --- CUSTOMER SUMMARY STATS ---
const CUSTOMER_STATS = [
  { label: "Total Customers", val: "842", sub: "+12.4% new signups this month", icon: Users, color: "text-[#385433] bg-[#385433]/10" },
  { label: "Total Orders Placed", val: "1,482", sub: "Avg 1.8 orders / customer", icon: ShoppingBag, color: "text-blue-700 bg-blue-100" },
  { label: "Total Lifetime Spend", val: "₹12,48,500", sub: "Avg ₹1,482 per customer", icon: DollarSign, color: "text-emerald-700 bg-emerald-100" },
  { label: "Repeat Buyer Rate", val: "78.4%", sub: "High customer retention", icon: TrendingUp, color: "text-purple-700 bg-purple-100" },
];

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredCustomers = CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C] font-sans">
      
      {/* ================= HEADER & TOP CONTROLS ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
            <span>🏠 Dashboard</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">Customers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/70 backdrop-blur-md rounded-2xl border border-black/10 text-xs font-semibold text-gray-700 shadow-sm hover:bg-white transition-colors">
            <Download size={14} /> Export CSV
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-md"
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* ================= SUMMARY STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CUSTOMER_STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-black/5 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{stat.label}</h3>
                  <p className="text-[11px] text-gray-500">{stat.sub}</p>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{stat.val}</div>
            </div>
          );
        })}
      </div>

      {/* ================= CUSTOMERS TABLE CONTAINER ================= */}
      <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-6">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">All Customers</h3>
              <p className="text-xs text-gray-500">Managing <span className="font-bold text-gray-700">{CUSTOMERS.length} registered accounts</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white/60 border border-black/10 rounded-2xl px-4 py-2 flex-1 sm:w-72 shadow-inner">
              <Search size={16} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, phone, location..."
                className="bg-transparent outline-none text-xs w-full text-gray-800 placeholder-gray-500 min-w-0"
              />
            </div>

            <button className="w-10 h-10 rounded-2xl bg-white/60 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-white transition-colors shrink-0">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[800px] text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-black/10">
                <th className="py-3 px-3">Customer ID & Name</th>
                <th className="py-3 px-3">Contact Info</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Total Orders</th>
                <th className="py-3 px-3">Total Spend</th>
                <th className="py-3 px-3">Last Purchase</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredCustomers.map((c) => {
                const initials = c.name.split(" ").map(n => n[0]).join("");
                return (
                  <tr key={c.id} className="hover:bg-white/40 transition-colors">

                    {/* Customer ID & Avatar Name */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#385433] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {initials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900">{c.name}</div>
                          <div className="text-[11px] text-gray-500 font-mono">{c.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-3 text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-medium text-gray-800">
                        <Mail size={12} className="text-gray-500 shrink-0" /> {c.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Phone size={12} className="text-gray-400 shrink-0" /> {c.phone}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-3 text-xs font-semibold text-gray-700">
                      <div className="flex items-center gap-1">
                        <MapPin size={13} className="text-[#385433] shrink-0" /> {c.location}
                      </div>
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-3 font-extrabold text-xs text-gray-900">{c.orders} Orders</td>

                    {/* Total Spend */}
                    <td className="py-4 px-3 font-extrabold text-xs text-[#385433]">₹{c.spent.toLocaleString()}</td>

                    {/* Last Purchase */}
                    <td className="py-4 px-3 text-xs text-gray-500">{c.last}</td>

                    {/* Account Status Badge */}
                    <td className="py-4 px-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#B6D6A6] text-[#2C4A21]">
                        Active
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-3 text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-500">
                        <button
                          onClick={() => setSelectedCustomer(c)}
                          className="px-3 py-1 bg-white hover:bg-black/5 text-gray-900 text-xs font-bold rounded-xl border border-black/10 transition-colors flex items-center gap-1"
                          title="View Profile"
                        >
                          <Eye size={14} /> Profile
                        </button>
                        <button className="hover:text-gray-900 p-1" title="Edit"><Pencil size={15} /></button>
                        <button className="hover:text-rose-600 p-1" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-gray-500">
          <div>Showing 1 to {filteredCustomers.length} of {CUSTOMERS.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsLeft size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
            <button className="w-7 h-7 rounded-full bg-[#385433] text-white font-bold flex items-center justify-center">1</button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsRight size={16} /></button>
          </div>
        </div>

      </div>

      {/* ================= CUSTOMER PROFILE MODAL ================= */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-[#2C342C] my-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#385433] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm shrink-0">
                  {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{selectedCustomer.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-gray-400 font-medium">Email Address:</span>
                <div className="font-bold text-gray-900 truncate">{selectedCustomer.email}</div>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Phone Number:</span>
                <div className="font-bold text-gray-900">{selectedCustomer.phone}</div>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Location:</span>
                <div className="font-bold text-gray-900">{selectedCustomer.location}</div>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Last Purchase:</span>
                <div className="font-bold text-gray-900">{selectedCustomer.last}</div>
              </div>
            </div>

            {/* Lifetime Stats */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#E2E6E2] text-gray-900">
                <div className="text-[11px] font-bold text-[#5C7C52] uppercase">Total Completed Orders</div>
                <div className="text-xl sm:text-2xl font-extrabold mt-1">{selectedCustomer.orders} Orders</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#E2E6E2] text-gray-900">
                <div className="text-[11px] font-bold text-[#5C7C52] uppercase">Total Lifetime Spend</div>
                <div className="text-xl sm:text-2xl font-extrabold mt-1 text-[#385433]">₹{selectedCustomer.spent.toLocaleString()}</div>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-6 py-2.5 bg-[#385433] hover:bg-[#2E4828] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD NEW CUSTOMER MODAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-[#2C342C] my-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-bold text-lg text-gray-900">Add New Customer</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700">Full Name</label>
                <input required placeholder="e.g. Rahul Sharma" className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div>
                <label className="font-bold text-gray-700">Email Address</label>
                <input type="email" required placeholder="rahul@gmail.com" className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div>
                <label className="font-bold text-gray-700">Phone Number</label>
                <input required placeholder="+91 98765 43210" className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>
              <div>
                <label className="font-bold text-gray-700">City & Location</label>
                <input required placeholder="Mumbai, MH" className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-[#385433] text-white rounded-xl font-bold">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CustomersPage;
