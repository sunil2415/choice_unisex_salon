import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Menu, X, ChevronLeft, ChevronRight, LayoutDashboard, List, Scissors, Box, Users, UserCircle, Calendar as CalendarIcon, MessageCircle, Check, ShoppingCart, FileText, TrendingUp, Tag, LogOut } from 'lucide-react';
import { BrandMark } from './ui';
import mark1 from '../assets/images/mark1.png';
import mark2 from '../assets/images/mark2.png';
import mark3 from '../assets/images/mark3.png';

const NAV_CATEGORIES = [
  {
    title: "Main Menu",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { key: "products", label: "Product", icon: Box },

      { key: "sale", label: "Sale", icon: Tag },
      { key: "customers", label: "Customers", icon: Users },
      { key: "orders", label: "Sales/Orders", icon: ShoppingCart },
    ]
  }
];

function Sidebar({ page, setPage, mobileOpen, setMobileOpen, onLogout }) {
  const [currentMarkIdx, setCurrentMarkIdx] = useState(0);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const marks = [mark1, mark2, mark3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMarkIdx((prev) => (prev + 1) % marks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky z-50 top-4 left-4 h-[calc(100vh-2rem)] shrink-0 flex flex-col bg-white rounded-3xl transition-all duration-300 overflow-hidden shadow-sm
        ${mobileOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0 lg:ml-4 my-4"}
        ${isCollapsed ? "w-[88px]" : "w-[260px]"}`}
      >
        <div className={`flex items-center ${isCollapsed ? "flex-col justify-center gap-6 py-6" : "justify-between px-6 py-8"}`}>
          <div className="flex items-center gap-3">
            <BrandMark size={32} className="shrink-0" />
            {!isCollapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-display font-bold text-xl text-gray-900 tracking-tight leading-none">CHOICE</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Unisex Saloon</span>
              </div>
            )}
          </div>
          <button 
            className="text-gray-400 hidden lg:block hover:text-gray-600 transition-transform"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          {!isCollapsed && (
            <button className="ml-auto lg:hidden text-gray-500" onClick={() => setMobileOpen(false)}>
              <X size={18} />
            </button>
          )}
        </div>

        <nav className={`flex-1 ${isCollapsed ? "px-3" : "px-4"} space-y-6 overflow-y-auto pb-4`}>
          {NAV_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              {cat.title && !isCollapsed && <div className="px-3 mb-2 text-xs font-semibold text-gray-500">{cat.title}</div>}
              {cat.title && isCollapsed && <div className="mb-2 border-t border-gray-100 mx-2"></div>}
              <div className="space-y-1">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const active = page === item.key || (page === 'dashboard' && item.key === 'dashboard');
                  return (
                    <button
                      key={item.key}
                      onClick={() => { setPage(item.key); setMobileOpen(false); }}
                      className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3 px-4 py-3"} rounded-2xl text-sm font-medium transition-all ${active
                        ? "bg-[#FFF8F3] text-orange-600"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon size={isCollapsed ? 22 : 18} className={active ? "text-orange-500" : "text-gray-400"} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!isCollapsed && (
            <div 
              className="mt-8 px-2 cursor-pointer group"
              onClick={() => setPreviewOpen(true)}
            >
              <img
                src={marks[currentMarkIdx]}
                alt="Promotional Banner"
                className="w-full h-[300px] rounded-3xl object-cover shadow-sm transition-all duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )}
        </nav>

        <div className={`p-4 mt-auto ${isCollapsed ? "flex justify-center" : ""}`}>
          <button 
            className={`w-full flex items-center ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"} rounded-2xl text-sm font-medium transition-all text-gray-500 hover:bg-red-50 hover:text-red-600`}
            title={isCollapsed ? "Logout" : undefined}
            onClick={onLogout}
          >
            <LogOut size={isCollapsed ? 22 : 18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewOpen(false)}
        >
          <button 
            className="fixed top-6 right-6 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-3 backdrop-blur-md z-50"
            onClick={() => setPreviewOpen(false)}
          >
            <X size={28} />
          </button>
          
          <div 
            className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={marks[currentMarkIdx]} 
              alt="Promotional Banner Preview" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

function Topbar({ title, user, setMobileOpen }) {
  return (
    <header className="flex items-center justify-between px-8 py-8">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-800 bg-white p-2 rounded-xl shadow-sm" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <h1 className="font-bold text-2xl text-gray-900 hidden sm:block tracking-tight">Welcome Boss</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-white rounded-full px-4 py-2.5 w-64 shadow-sm border border-gray-100">
          <Search size={16} className="text-gray-400" />
          <input placeholder="Search here..." className="bg-transparent outline-none text-sm w-full text-gray-700" />
          <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          <Bell size={18} />
        </button>

        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          <Settings size={18} />
        </button>

        <div className="hidden sm:flex items-center gap-3 bg-white rounded-full p-1.5 pr-4 shadow-sm border border-gray-100 ml-2">
          <img src="https://i.pravatar.cc/100?img=11" alt="User profile" className="w-8 h-8 rounded-full object-cover" />
          <div className="leading-tight">
            <div className="text-sm font-bold text-gray-900">{user}</div>
            <div className="text-[10px] text-gray-500 font-medium">Shop owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Sidebar, Topbar };
