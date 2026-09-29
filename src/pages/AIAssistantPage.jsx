import React, { useState } from 'react';
import {
  Sparkles, Send, Smile, Paperclip, BarChart2, TrendingUp,
  Package, AlertTriangle, CheckCheck, Check, MoreVertical
} from 'lucide-react';
import { PRODUCTS, p1, p2, p3, p4, p5, p6, p7 } from '../data/data';

const CHIPS = [
  { id: "report", label: "Suggest latest report", icon: BarChart2 },
  { id: "chart", label: "Order Summary Chart", icon: TrendingUp },
  { id: "trending", label: "Suggest trending products table", icon: Package },
  { id: "inventory", label: "Suggest product inventory details", icon: Package },
  { id: "lowstock", label: "Check low stock alerts", icon: AlertTriangle },
];

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your eCommerce AI Assistant. I can help you analyze revenue, check stock levels, view trending items, or generate reports. How can I help you today?",
      time: "09:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      text: "Can you show me a product inventory summary of our top items?",
      time: "09:32 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "ai",
      time: "09:33 AM",
      type: "inventory_table",
      title: "Product Inventory Summary:"
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend, customType = null) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text",
        text: "Here is the information based on your store analytics."
      };

      if (customType === 'report' || text.toLowerCase().includes('report')) {
        aiMsg = {
          ...aiMsg,
          type: "text",
          text: "📊 **Latest Sales Report Summary (September 2026)**:\n\n• Gross Revenue: **₹12,48,500** (+18.4% WoW)\n• Total Completed Orders: **1,482 orders**\n• Top Performing Product: **Likewise Green Tea & Matcha Moisturizer** (210 units sold)\n• Customer Retention Rate: **78.2%**"
        };
      } else if (customType === 'chart' || text.toLowerCase().includes('chart') || text.toLowerCase().includes('summary')) {
        aiMsg = {
          ...aiMsg,
          type: "chart_summary",
          title: "Order Summary Metrics:"
        };
      } else if (customType === 'inventory' || text.toLowerCase().includes('inventory')) {
        aiMsg = {
          ...aiMsg,
          type: "inventory_table",
          title: "Product Inventory Summary:"
        };
      } else if (customType === 'trending' || text.toLowerCase().includes('trending')) {
        aiMsg = {
          ...aiMsg,
          type: "trending_table",
          title: "Top Trending Products:"
        };
      } else if (customType === 'lowstock' || text.toLowerCase().includes('stock') || text.toLowerCase().includes('alert')) {
        aiMsg = {
          ...aiMsg,
          type: "lowstock_table",
          title: "Low Stock Alert Notice:"
        };
      }

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C] font-sans">
      
      {/* Main Chat Thread Area */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-1">
            
            {/* Sender Label */}
            {msg.sender === 'ai' && (
              <div className="text-xs font-semibold text-[#5A704D] px-1 mb-1">
                AI Assistant
              </div>
            )}

            {/* Bubble Content */}
            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'user' ? (
                /* User Message Bubble */
                <div className="bg-[#486538] text-white px-4 sm:px-5 py-3 rounded-[20px] max-w-[88%] sm:max-w-xl text-xs sm:text-sm font-medium shadow-sm">
                  {msg.text}
                </div>
              ) : (
                /* AI Message Bubble Container */
                <div className="bg-[#E2E6E2]/90 backdrop-blur-md text-gray-900 px-4 sm:px-6 py-4 rounded-[24px] w-full max-w-full sm:max-w-3xl border border-black/5 shadow-sm space-y-3">
                  
                  {msg.type === 'text' && (
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                  )}

                  {/* AI Inventory Summary Table */}
                  {msg.type === 'inventory_table' && (
                    <div className="space-y-3">
                      <div className="font-bold text-xs sm:text-sm text-gray-900">{msg.title}</div>
                      <div className="overflow-x-auto rounded-2xl bg-white/60 border border-black/5 -mx-1 sm:mx-0">
                        <table className="w-full min-w-[480px] text-xs text-left">
                          <thead>
                            <tr className="text-gray-500 font-semibold border-b border-black/5">
                              <th className="py-2.5 px-3">Product</th>
                              <th className="py-2.5 px-3">Category</th>
                              <th className="py-2.5 px-3">Stock</th>
                              <th className="py-2.5 px-3">Price</th>
                              <th className="py-2.5 px-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5">
                            <tr className="hover:bg-white/50">
                              <td className="py-2.5 px-3 font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#5C7C52] text-white font-bold text-[10px] flex items-center justify-center shrink-0">GM</span>
                                Likewise Green Tea & Matcha Moisturizer
                              </td>
                              <td className="py-2.5 px-3 text-gray-600">Moisturizer</td>
                              <td className="py-2.5 px-3 font-bold text-rose-700">48 (15 Left)</td>
                              <td className="py-2.5 px-3 font-bold text-gray-900">₹590</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B6D6A6] text-[#2C4A21]">Active</span>
                              </td>
                            </tr>

                            <tr className="hover:bg-white/50">
                              <td className="py-2.5 px-3 font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#5C7C52] text-white font-bold text-[10px] flex items-center justify-center shrink-0">VC</span>
                                Likewise Vitamin C Face Wash
                              </td>
                              <td className="py-2.5 px-3 text-gray-600">Face Wash</td>
                              <td className="py-2.5 px-3 font-bold text-rose-700">24 (15 Left)</td>
                              <td className="py-2.5 px-3 font-bold text-gray-900">₹349</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B6D6A6] text-[#2C4A21]">Active</span>
                              </td>
                            </tr>

                            <tr className="hover:bg-white/50">
                              <td className="py-2.5 px-3 font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-[#7C5252] text-white font-bold text-[10px] flex items-center justify-center shrink-0">ST</span>
                                Likewise Strawberry Face Wash
                              </td>
                              <td className="py-2.5 px-3 text-gray-600">Face Wash</td>
                              <td className="py-2.5 px-3 font-bold text-rose-700">0 (0 Left)</td>
                              <td className="py-2.5 px-3 font-bold text-gray-900">₹329</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F2D6D6] text-[#8C2A2A]">Inactive</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* AI Trending Products Table */}
                  {msg.type === 'trending_table' && (
                    <div className="space-y-3">
                      <div className="font-bold text-xs sm:text-sm text-gray-900">{msg.title}</div>
                      <div className="overflow-x-auto rounded-2xl bg-white/60 border border-black/5 -mx-1 sm:mx-0">
                        <table className="w-full min-w-[480px] text-xs text-left">
                          <thead>
                            <tr className="text-gray-500 font-semibold border-b border-black/5">
                              <th className="py-2.5 px-3">Product Name</th>
                              <th className="py-2.5 px-3">Category</th>
                              <th className="py-2.5 px-3">Sold (30d)</th>
                              <th className="py-2.5 px-3">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5">
                            {PRODUCTS.slice(0, 4).map((p) => (
                              <tr key={p.id} className="hover:bg-white/50">
                                <td className="py-2 px-3 font-bold text-gray-900 flex items-center gap-2">
                                  <img src={p.image} alt={p.name} className="w-7 h-7 rounded-lg object-contain bg-white p-0.5 border" />
                                  {p.name}
                                </td>
                                <td className="py-2 px-3 text-gray-600">{p.category}</td>
                                <td className="py-2 px-3 font-bold text-emerald-700">{p.sold30} units</td>
                                <td className="py-2 px-3 font-bold text-gray-900">₹{p.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* AI Low Stock Alert Table */}
                  {msg.type === 'lowstock_table' && (
                    <div className="space-y-3">
                      <div className="font-bold text-xs sm:text-sm text-rose-800">{msg.title}</div>
                      <div className="overflow-x-auto rounded-2xl bg-white/60 border border-black/5 -mx-1 sm:mx-0">
                        <table className="w-full min-w-[480px] text-xs text-left">
                          <thead>
                            <tr className="text-gray-500 font-semibold border-b border-black/5">
                              <th className="py-2.5 px-3">Product</th>
                              <th className="py-2.5 px-3">Current Stock</th>
                              <th className="py-2.5 px-3">Reorder Point</th>
                              <th className="py-2.5 px-3">Urgency</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/5">
                            <tr className="hover:bg-white/50">
                              <td className="py-2 px-3 font-bold text-gray-900">Likewise Strawberry Face Wash</td>
                              <td className="py-2 px-3 font-bold text-rose-600">0 units</td>
                              <td className="py-2 px-3 text-gray-600">12 units</td>
                              <td className="py-2 px-3 font-bold text-rose-700">Immediate Restock</td>
                            </tr>
                            <tr className="hover:bg-white/50">
                              <td className="py-2 px-3 font-bold text-gray-900">Likewise Tea Tree Face Wash</td>
                              <td className="py-2 px-3 font-bold text-amber-600">8 units</td>
                              <td className="py-2 px-3 text-gray-600">10 units</td>
                              <td className="py-2 px-3 font-bold text-amber-700">Low Inventory</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* AI Chart Summary */}
                  {msg.type === 'chart_summary' && (
                    <div className="space-y-2">
                      <div className="font-bold text-xs sm:text-sm text-gray-900">{msg.title}</div>
                      <div className="p-3 bg-white/70 rounded-xl text-xs space-y-1">
                        <div>📈 Total Order Volume: <span className="font-bold text-emerald-700">2,501 Completed Orders (+1.11%)</span></div>
                        <div>💰 Total Revenue: <span className="font-bold text-gray-900">₹12,48,500</span></div>
                        <div>📦 Average Order Size: <span className="font-bold text-gray-900">2.4 items / cart</span></div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Time Stamp Below Bubble */}
            <div className={`flex text-[10px] text-gray-500 px-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-center gap-1">
                {msg.sender === 'user' && <CheckCheck size={13} className="text-emerald-700" />}
                <span>{msg.time}</span>
              </div>
            </div>

          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-500 italic px-2">
            <span className="w-2 h-2 rounded-full bg-[#486538] animate-ping" />
            AI Assistant is generating response...
          </div>
        )}
      </div>

      {/* ================= BOTTOM PRESET CHIPS & INPUT CARD ================= */}
      <div className="max-w-5xl mx-auto bg-[#E2E6E2]/95 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 space-y-4 mt-6 sm:mt-8">
        
        {/* Tip Text */}
        <div className="text-[11px] sm:text-xs text-gray-600 font-medium px-1">
          Tip: Try Selecting chips/tags below to preview analytics and reports.
        </div>

        {/* Action Preset Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => handleSendMessage(chip.label, chip.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#385433] hover:bg-[#2E4828] text-white rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm shrink-0"
              >
                <Icon size={14} />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Text Area Container */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="space-y-3">
          <div className="bg-white/80 rounded-2xl border border-black/10 p-3 flex flex-col justify-between focus-within:bg-white focus-within:border-[#385433] transition-all">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none text-xs text-gray-800 placeholder-gray-500 resize-none"
            />

            {/* Sub-bar Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-black/5">
              <div className="flex items-center gap-2 text-gray-500">
                <button type="button" className="p-1.5 hover:text-gray-900 rounded-lg hover:bg-black/5 transition-colors">
                  <Smile size={18} />
                </button>
                <button type="button" className="p-1.5 hover:text-gray-900 rounded-lg hover:bg-black/5 transition-colors">
                  <Paperclip size={18} />
                </button>
              </div>

              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-[#385433] hover:bg-[#2E4828] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-sm shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </form>

      </div>

    </div>
  );
}

export default AIAssistantPage;
