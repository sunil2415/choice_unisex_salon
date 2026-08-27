import React, { useState } from 'react';
import { Search, Package, TrendingUp, CheckCircle2, Clock, Eye, Download, CreditCard, Banknote, Smartphone, Scissors, Phone, Mail, MapPin, Globe, User, Wallet, Lock, Instagram, Facebook, MessageCircle, Crown, X } from 'lucide-react';
import { Badge } from '../components/ui';
import { LINE_COLOR, ORDERS, CUSTOMERS, PRODUCTS } from '../data/data';

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = ORDERS.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerPhone = (name) => {
    const c = CUSTOMERS.find(cust => cust.name === name);
    return c ? c.phone : "N/A";
  };

  const getProductImage = (itemsString) => {
    const firstItem = itemsString.split(",")[0].trim();
    const product = PRODUCTS.find(p => p.name.includes(firstItem) || firstItem.includes(p.name.split(" ")[0]));
    return product ? product.image : null;
  };

  const getProductDetails = (itemName) => {
    const product = PRODUCTS.find(p => p.name.includes(itemName.trim()) || itemName.trim().includes(p.name.split(" ")[0]));
    return product || { name: itemName.trim(), line: "Service", sku: "SRV001", price: 450, image: null };
  };

  const totalRevenue = ORDERS.reduce((sum, o) => sum + o.amount, 0);
  const completedCount = ORDERS.filter(o => o.status === "Completed").length;
  const pendingCount = ORDERS.filter(o => o.status === "Pending").length;

  const getPaymentIcon = (mode) => {
    // Note: Using external URLs for now so the app doesn't crash. 
    // You can replace these with your downloaded local images from src/assets/images/ later!
    const upiImg = "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/upi-payment-icon.png";
    const cardImg = "https://cdn-icons-png.flaticon.com/512/4341/4341764.png";
    const cashImg = "https://cdn-icons-png.flaticon.com/512/2489/2489756.png";

    if (mode === "UPI") return <img src={upiImg} alt="UPI" className="w-5 h-5 object-contain" />;
    if (mode === "Card") return <img src={cardImg} alt="Card" className="w-5 h-5 object-contain" />;
    return <img src={cashImg} alt="Cash" className="w-5 h-5 object-contain" />;
  };

  return (
    <div className="p-5 lg:p-8 space-y-5 relative">
      {/* Search Header */}


      {/* 4 Stat Cards matching ProductsPage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-2">
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
              <Package size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{ORDERS.length}</div>
              <div className="text-sm font-semibold text-gray-500">Total Orders</div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-sm font-semibold text-gray-500">Total Revenue</div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-purple-100 text-purple-600">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{completedCount}</div>
              <div className="text-sm font-semibold text-gray-500">Completed</div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-orange-100 text-orange-500">
              <Clock size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{pendingCount}</div>
              <div className="text-sm font-semibold text-gray-500">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead>
            <tr className="bg-[#F8F9FA] text-gray-500 font-medium">
              <th className="py-3 px-4 rounded-l-xl">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map((o) => {
              const phone = getCustomerPhone(o.customer);
              const firstItem = o.items.split(",")[0];
              const moreCount = Math.max(0, o.items.split(",").length - 1);
              const itemImg = getProductImage(o.items);

              return (
                <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900">{o.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-600">{o.date}</div>
                    <div className="text-xs text-gray-400 mt-0.5">11:25 AM</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0" style={{ background: LINE_COLOR.Styling }}>
                        {o.customer.split(" ").map((s) => s[0]).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[13px]">{o.customer}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {itemImg ? (
                        <div className="w-10 h-10 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <img src={itemImg} className="w-full h-full object-cover" alt="item" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 text-gray-400">
                          <Package size={16} />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-700 text-[13px]">{firstItem}</div>
                        {moreCount > 0 && <div className="text-xs text-gray-400 mt-0.5">+{moreCount} more</div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900 text-[15px]">₹{o.amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 font-bold text-gray-700 text-[13px]">
                      {getPaymentIcon(o.mode)} {o.mode}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge label={o.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
                        title="Preview Order"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-full bg-blue-50 text-blue-500 hover:text-blue-700 hover:bg-blue-100 transition-colors" title="Download Invoice">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="8" className="py-12 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:p-8 overflow-y-auto" onClick={() => setSelectedOrder(null)}>
          <div
            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col my-auto border border-[#D6B56F]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start p-8 lg:p-10 border-b border-[#D6B56F]/30 bg-gradient-to-b from-orange-50/30 to-white">
              {/* Logo */}
              <div className="flex flex-col items-center mb-6 md:mb-0">
                <Scissors size={32} className="text-[#D6B56F] mb-2 transform -rotate-45" />
                <h1 className="text-4xl font-display font-bold text-[#0B1A30] tracking-[0.15em] uppercase">CHOICE</h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-px bg-[#D6B56F] w-8"></div>
                  <span className="text-[#D6B56F] text-[10px] tracking-[0.2em] uppercase font-bold">Unisex Saloon</span>
                  <div className="h-px bg-[#D6B56F] w-8"></div>
                </div>
                <p className="mt-3 text-[#4A5D78] font-serif italic text-lg" style={{ fontFamily: "Georgia, serif" }}>Care that defines you</p>
              </div>

              {/* Contact Info */}
              <div className="text-[13px] text-[#4A5D78] space-y-3 font-medium mb-6 md:mb-0">
                <div className="flex items-center gap-3"><Phone size={16} className="text-[#0B1A30]" /> +91 98200 11234</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-[#0B1A30]" /> info@choicesaloon.com</div>
                <div className="flex items-start gap-3"><MapPin size={16} className="text-[#0B1A30] mt-0.5" /> <div>shop 22 Sudarshan gold ,<br />opp Hyundai service center science city road sola<br /> Ahmedabad 380060 @choice_unisex.salon</div></div>
                <div className="flex items-center gap-3"><Globe size={16} className="text-[#0B1A30]" /> @choice_unisex.salon</div>
              </div>

              {/* Invoice Meta */}
              <div className="flex flex-col w-full md:w-auto">
                <div className="bg-[#0B1A30] text-white text-center py-2.5 px-8 rounded-lg font-bold tracking-[0.2em] text-lg mb-4">
                  INVOICE
                </div>
                <table className="text-[13px] text-[#0B1A30] font-bold">
                  <tbody>
                    <tr><td className="pr-4 pb-2 text-[#4A5D78] font-medium">Invoice No.</td><td className="pb-2">: INV-{selectedOrder.id.split("-")[1]}</td></tr>
                    <tr><td className="pr-4 pb-2 text-[#4A5D78] font-medium">Order No.</td><td className="pb-2">: {selectedOrder.id}</td></tr>
                    <tr><td className="pr-4 pb-2 text-[#4A5D78] font-medium">Date</td><td className="pb-2">: {selectedOrder.date}</td></tr>
                    <tr><td className="pr-4 text-[#4A5D78] font-medium">Time</td><td>: 11:25 AM</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Middle Section: Bill To, Payment, Sale By */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 lg:p-10 border-b border-[#D6B56F]/20">
              {/* Bill To */}
              <div>
                <h3 className="text-[#D6B56F] text-[11px] font-bold uppercase tracking-wider mb-4">Bill To</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <User size={20} />
                  </div>
                  <div className="text-[13px] text-[#4A5D78] space-y-1.5">
                    <div className="font-bold text-[#0B1A30] text-base">{selectedOrder.customer}</div>
                    <div className="flex items-center gap-2"><Phone size={12} /> {getCustomerPhone(selectedOrder.customer)}</div>
                    <div className="flex items-center gap-2"><Mail size={12} /> {selectedOrder.customer.split(" ")[0].toLowerCase()}@email.com</div>
                    <div className="flex items-center gap-2"><MapPin size={12} /> Mumbai, Maharashtra</div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100/50 h-full">
                  <h3 className="text-[#D6B56F] text-[11px] font-bold uppercase tracking-wider mb-3">Payment Method</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D6B56F] shadow-sm shrink-0">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-[#0B1A30] text-base">{selectedOrder.mode}</div>
                      <div className="text-[#4A5D78] text-xs mt-1">Payment ID</div>
                      <div className="text-[#0B1A30] text-[13px] font-medium">{selectedOrder.customer.split(" ")[0].toLowerCase()}@{selectedOrder.mode.toLowerCase()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sale By */}
              <div>
                <h3 className="text-[#D6B56F] text-[11px] font-bold uppercase tracking-wider mb-4">Sale By</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0B1A30] text-base">Choice curl specialist</div>
                    <div className="text-[#4A5D78] text-[13px] mt-0.5">Shop Owner</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="p-8 lg:p-10">
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-[#0B1A30] text-white text-[10px] uppercase tracking-wider font-bold">
                      <th className="py-3 px-6 w-12 text-center">#</th>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4 text-center">Qty</th>
                      <th className="py-3 px-4 text-right">Unit Price</th>
                      <th className="py-3 px-4 text-right">Discount</th>
                      <th className="py-3 px-6 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.split(",").map((item, idx) => {
                      const prod = getProductDetails(item);
                      // Give it a fake quantity of 1 or 2 based on index
                      const qty = idx % 2 === 0 ? 1 : 2;
                      const total = prod.price * qty;

                      return (
                        <tr key={idx} className="border-b border-dashed border-gray-200 last:border-0">
                          <td className="py-4 px-6 text-center text-[#4A5D78] font-medium">{idx + 1}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-10 rounded overflow-hidden bg-gray-50 shrink-0">
                                {prod.image ? <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" /> : <Package size={16} className="m-auto text-gray-400 h-full" />}
                              </div>
                              <div>
                                <div className="font-bold text-[#0B1A30]">{prod.name}</div>
                                <div className="text-[#4A5D78] text-xs mt-0.5">{prod.line}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-[#4A5D78]">{prod.sku}</td>
                          <td className="py-4 px-4 text-center font-medium text-[#0B1A30]">{qty}</td>
                          <td className="py-4 px-4 text-right text-[#4A5D78]">₹{prod.price}</td>
                          <td className="py-4 px-4 text-right text-[#4A5D78]">₹0</td>
                          <td className="py-4 px-6 text-right font-bold text-[#0B1A30]">₹{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex flex-col md:flex-row justify-between items-start mt-8 gap-8">
                {/* Notes */}
                <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100/50 max-w-sm w-full flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shrink-0 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[#D6B56F] text-[11px] font-bold uppercase tracking-wider mb-1">Notes</h4>
                    <p className="text-[#4A5D78] text-[13px] leading-relaxed">Thank you for choosing Choice. We truly appreciate your trust in us!</p>
                  </div>
                </div>

                {/* Calculation */}
                <div className="w-full md:w-80">
                  <table className="w-full text-right text-[13px] text-[#0B1A30]">
                    <tbody>
                      <tr><td className="py-2 text-[#4A5D78]">Subtotal</td><td className="py-2 font-bold">₹{selectedOrder.amount + 180 - 148}</td></tr>
                      <tr><td className="py-2 text-red-500">Discount</td><td className="py-2 font-bold text-red-500">- ₹180</td></tr>
                      <tr><td className="py-2 text-[#4A5D78]">Tax (5%)</td><td className="py-2 font-bold">₹148</td></tr>
                      <tr className="border-t-2 border-gray-900"><td className="py-3 font-bold text-base">TOTAL</td><td className="py-3 font-bold text-xl">₹{selectedOrder.amount}</td></tr>
                    </tbody>
                  </table>
                  <div className="bg-[#0B1A30] text-white rounded-lg flex justify-between items-center px-4 py-2 mt-2">
                    <span className="text-[13px]">You Saved</span>
                    <span className="font-bold">₹180</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="px-8 lg:px-10 py-8 relative flex flex-col md:flex-row justify-between items-center md:items-end border-t border-[#D6B56F]/20 mt-4">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="text-[#D6B56F] text-4xl mb-1" style={{ fontFamily: "Brush Script MT, cursive" }}>Thank You! <span className="text-xl">♡</span></div>
                <div className="text-[#0B1A30] text-[10px] font-bold tracking-[0.2em] uppercase">For your purchase</div>
              </div>

              {/* Center Badge */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-48 h-24 bg-orange-50/50 rounded-t-full flex flex-col items-center justify-end pb-4 hidden md:flex border-t border-x border-orange-100/50">
                <Crown size={24} className="text-[#D6B56F] mb-1" />
                <div className="text-[#0B1A30] text-[10px] font-bold tracking-[0.1em] uppercase">Premium Hair Care</div>
                <div className="text-[#4A5D78] text-[9px] tracking-wider mt-0.5">• Since 2010 •</div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-[#0B1A30] text-[11px] font-bold mb-2">Follow us</div>
                <div className="flex justify-center md:justify-end gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#0B1A30] text-white flex items-center justify-center"><Instagram size={14} /></div>
                  <div className="w-7 h-7 rounded-full bg-[#0B1A30] text-white flex items-center justify-center"><Facebook size={14} /></div>
                  <div className="w-7 h-7 rounded-full bg-[#0B1A30] text-white flex items-center justify-center"><MessageCircle size={14} /></div>
                </div>
                <div className="text-[#4A5D78] text-[11px]">For any queries, contact us<br /><span className="text-[#0B1A30] font-medium">+91 98200 11234</span></div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#0B1A30] text-white/80 text-[10px] py-2.5 text-center flex items-center justify-center gap-1.5 w-full">
              <Lock size={10} /> This is a computer generated invoice and does not require signature.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
