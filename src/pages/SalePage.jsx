import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, Search, User } from 'lucide-react';
import { PRODUCTS, CUSTOMERS, stockStatus } from '../data/data';

function SalePage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const list = PRODUCTS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const add = (p) => {
    if (!selectedCustomer) {
      setToastMessage("Please select a customer first before adding products to the bill.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...p, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((c) => {
      const updated = c.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i));
      return updated.filter(i => i.qty > 0);
    });
  };

  const clearAll = () => setCart([]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal;

  return (
    <div className="h-[calc(100vh-6rem)] p-4 lg:p-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT: PRODUCTS */}
      <div className="flex-1 flex flex-col min-w-0 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header & Search */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Products</h2>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 focus-within:border-gray-300 focus-within:bg-white transition-colors">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                className="w-full bg-transparent outline-none text-sm text-gray-700 font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {list.map((p) => {
              const outOfStock = stockStatus(p) === "Out of Stock";
              return (
                <button
                  key={p.id}
                  onClick={() => !outOfStock && add(p)}
                  disabled={outOfStock}
                  className={`bg-white rounded-[24px] p-5 border border-transparent transition-all flex flex-col items-center text-center relative overflow-hidden ${outOfStock ? 'cursor-not-allowed' : 'hover:border-gray-200 hover:shadow-xl group'
                    }`}
                >
                  <div className={`w-full flex flex-col items-center transition-all ${outOfStock ? 'opacity-90 blur-[1px]' : ''}`}>
                    <div className="w-full h-36 flex items-center justify-center mb-4">
                      <img src={p.image} alt={p.name} className={`max-h-full object-contain drop-shadow-md transition-transform duration-500 ${!outOfStock && 'group-hover:scale-110'}`} />
                    </div>
                    <div className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{p.name}</div>
                    <div className="text-[11px] text-gray-400 font-semibold mb-3">{p.size}</div>
                    <div className="text-xl font-black text-gray-900 mt-auto">₹{p.price}</div>
                  </div>

                  {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-[#FCE8E8] text-[#D97777] text-[12px] font-bold px-4 py-2 rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: BILLING */}
      <div className="w-full lg:w-[420px] flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
        {/* Customer Selection */}
        <div className="p-6 border-b border-gray-100 bg-[#F9F9F9]">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Details</h2>
          {selectedCustomer ? (
            <div className="flex items-center gap-4 bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-gray-300 transition-colors group" onClick={() => setSelectedCustomer(null)}>
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <User size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Customer</div>
                <div className="text-sm font-extrabold text-gray-900">{selectedCustomer.name}</div>
              </div>
              <div className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-100">Change</div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm">
              <div className="text-[12px] font-bold text-red-500 mb-2">Select Customer (Required)</div>
              <select
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-semibold rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedCustomer(CUSTOMERS.find(c => c.id === e.target.value));
                  }
                }}
                value=""
              >
                <option value="" disabled>Choose a customer...</option>
                {CUSTOMERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><ShoppingCart size={20} /> Current Order</h3>
            {cart.length > 0 && <button onClick={clearAll} className="text-[11px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">Clear All</button>}
          </div>

          {cart.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-gray-400 text-center mt-10">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-gray-300" />
              </div>
              <p className="text-base font-bold text-gray-900 mb-1">Cart is empty</p>
              <p className="text-xs font-medium text-gray-500">Select products to add them to the bill.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div className="w-14 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 p-1 shadow-sm">
                    <img src={i.image} alt={i.name} className="h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold text-gray-900 leading-tight mb-1 truncate">{i.name}</div>
                    <div className="text-[11px] text-gray-500 font-semibold font-mono">₹{i.price}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-[15px] font-black text-gray-900">
                      ₹{i.price * i.qty}
                    </div>
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <button onClick={() => changeQty(i.id, -1)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"><Minus size={14} /></button>
                      <span className="w-6 text-center text-xs font-bold font-mono">{i.qty}</span>
                      <button onClick={() => changeQty(i.id, 1)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals & Checkout */}
        <div className="p-6 border-t border-gray-100 bg-[#F9F9F9]">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">SubTotal</span>
              <span className="text-3xl font-black text-gray-900 tracking-tight">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full py-5 rounded-2xl font-bold text-white text-lg disabled:opacity-50 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex justify-center items-center gap-2"
            style={{ background: "#111827" }}
          >
            Charge ₹{total.toLocaleString()} <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ease-out transform ${toastMessage ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 border-4 border-red-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {toastMessage || "Please select a customer first before adding products to the bill."}
        </div>
      </div>
    </div>
  );
}

export default SalePage;
