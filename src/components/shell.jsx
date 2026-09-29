import React, { useState, useEffect } from 'react';
import {
  Search, Bell, Settings, Menu, X, ChevronLeft, ChevronRight,
  LayoutGrid, Sparkles, ShoppingBag, Users, Package, Banknote,
  LogOut, ChevronDown, ChevronUp, FileText, Receipt, Tag, CreditCard
} from 'lucide-react';
import { BrandMark } from './ui';

function Sidebar({ page, setPage, mobileOpen, setMobileOpen, onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Accordion state for Orders
  const [isOrdersOpen, setIsOrdersOpen] = useState(
    page.startsWith('orders') || page === 'orders-all' || page === 'orders-details'
  );

  useEffect(() => {
    if (page.startsWith('orders')) {
      setIsOrdersOpen(true);
    }
  }, [page]);

  const isDashboardActive = page === 'dashboard';
  const isAiActive = page === 'ai-assistant';
  const isOrdersActive = page.startsWith('orders');
  const isCustomersActive = page === 'customers';
  const isProductsActive = page === 'products';
  const isFinanceActive = page === 'finance';
  const isSettingsActive = page === 'settings';

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed lg:sticky z-50 top-0 left-0 h-screen shrink-0 flex flex-col bg-[#E6E8E6] text-[#2C342C] transition-all duration-300 overflow-hidden border-r border-gray-200/60 font-sans ${mobileOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          } ${isCollapsed ? "w-[84px]" : "w-[270px]"}`}
      >
        {/* Logo Header */}
        <div className={`flex items-center ${isCollapsed ? "flex-col justify-center gap-4 py-6" : "justify-between px-6 py-6"}`}>
          <div className="flex items-center gap-3.5">
            <button className="lg:hidden text-gray-600 hover:text-gray-900 mr-1" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6A8E56] via-[#486538] to-[#2E4828] flex items-center justify-center text-white shadow-md shadow-emerald-950/20 shrink-0">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className="w-4 h-4 rounded-full border-2 border-white/90 animate-ping absolute" />
                <span className="w-3.5 h-3.5 bg-white rounded-full relative" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col leading-tight whitespace-nowrap">
                <span className="font-bold text-xl text-gray-900 tracking-tight">Likewise</span>
                {/* <span className="text-[11px] text-gray-500 font-medium">Admin HTML template</span> */}
              </div>
            )}
          </div>
          <button
            className="text-gray-400 hidden lg:block hover:text-gray-700 transition-colors p-1"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Section Header */}
        {!isCollapsed && (
          <div className="px-6 pt-2 pb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            MAIN
          </div>
        )}

        {/* Navigation List */}
        <nav className={`flex-1 ${isCollapsed ? "px-3" : "px-4"} space-y-1.5 overflow-y-auto pb-6 scrollbar-thin`}>

          {/* Dashboard */}
          <button
            onClick={() => { setPage('dashboard'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isDashboardActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Dashboard" : undefined}
          >
            <LayoutGrid size={20} className={isDashboardActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>Dashboard</span>}
          </button>

          {/* AI Assistant */}
          <button
            onClick={() => { setPage('ai-assistant'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isAiActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "AI Assistant" : undefined}
          >
            <Sparkles size={20} className={isAiActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>AI Assistant</span>}
          </button>

          {/* Orders Group (Accordion) */}
          <div className={`rounded-[22px] transition-colors ${isOrdersOpen && !isCollapsed ? "bg-black/5 p-1.5 space-y-1" : ""}`}>
            <button
              onClick={() => {
                if (isCollapsed) {
                  setPage('orders-all');
                  setMobileOpen(false);
                } else {
                  setIsOrdersOpen(!isOrdersOpen);
                }
              }}
              className={`w-full flex items-center justify-between ${isCollapsed ? "justify-center px-0 py-3" : "px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isOrdersActive && !isOrdersOpen
                ? "bg-[#385433] text-[#A8D39E]"
                : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
                }`}
              title={isCollapsed ? "Orders" : undefined}
            >
              <div className="flex items-center gap-3.5">
                <ShoppingBag size={20} className={isOrdersActive ? "text-[#385433]" : "text-gray-500"} />
                {!isCollapsed && <span>Orders</span>}
              </div>
              {!isCollapsed && (
                <div className="text-gray-500">
                  {isOrdersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              )}
            </button>

            {/* Sub-items for Orders */}
            {isOrdersOpen && !isCollapsed && (
              <div className="pl-3 pr-1 space-y-1">
                <button
                  onClick={() => { setPage('orders-all'); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${page === 'orders-all' || page === 'orders'
                    ? "bg-[#385433] text-white shadow-sm font-semibold"
                    : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
                    }`}
                >
                  <Package size={16} className={page === 'orders-all' || page === 'orders' ? "text-[#A8D39E]" : "text-gray-400"} />
                  <span>All Orders</span>
                </button>

                <button
                  onClick={() => { setPage('orders-details'); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${page === 'orders-details'
                    ? "bg-[#385433] text-white shadow-sm font-semibold"
                    : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
                    }`}
                >
                  <FileText size={16} className={page === 'orders-details' ? "text-[#A8D39E]" : "text-gray-400"} />
                  <span>Order Details</span>
                </button>
              </div>
            )}
          </div>

          {/* Customers */}
          <button
            onClick={() => { setPage('customers'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isCustomersActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Customers" : undefined}
          >
            <Users size={20} className={isCustomersActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>Customers</span>}
          </button>

          {/* Products */}
          <button
            onClick={() => { setPage('products'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isProductsActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Products" : undefined}
          >
            <Package size={20} className={isProductsActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>Products</span>}
          </button>

          {/* Finance (Single Direct Tab) */}
          <button
            onClick={() => { setPage('finance'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isFinanceActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Finance" : undefined}
          >
            <Banknote size={20} className={isFinanceActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>Finance</span>}
          </button>

          {/* Settings */}
          <button
            onClick={() => { setPage('settings'); setMobileOpen(false); }}
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-0 py-3" : "gap-3.5 px-4 py-3"} rounded-[20px] text-sm font-semibold transition-all ${isSettingsActive
              ? "bg-[#385433] text-[#A8D39E] shadow-md shadow-emerald-950/15"
              : "text-gray-600 hover:bg-black/5 hover:text-gray-900"
              }`}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings size={20} className={isSettingsActive ? "text-[#A8D39E]" : "text-gray-500"} />
            {!isCollapsed && <span>Settings</span>}
          </button>

        </nav>

        {/* Footer / Logout */}
        <div className={`p-4 mt-auto border-t border-gray-200/50 ${isCollapsed ? "flex justify-center" : ""}`}>
          <button
            className={`w-full flex items-center ${isCollapsed ? "justify-center p-3" : "gap-3.5 px-4 py-3"} rounded-2xl text-sm font-semibold transition-all text-gray-500 hover:bg-red-50 hover:text-red-600`}
            title={isCollapsed ? "Logout" : undefined}
            onClick={onLogout}
          >
            <LogOut size={isCollapsed ? 22 : 18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, user, setMobileOpen }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-transparent gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button className="lg:hidden text-gray-800 bg-white p-2 sm:p-2.5 rounded-2xl shadow-sm border border-gray-200/80 shrink-0" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="font-bold text-lg sm:text-2xl text-gray-900 tracking-tight truncate">{title || "Dashboard"}</h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate hidden xs:block">Manage your e-commerce store & performance</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white rounded-full px-4 py-2.5 w-64 lg:w-72 shadow-sm border border-gray-200/80">
          <Search size={16} className="text-gray-400" />
          <input placeholder="Search orders, products..." className="bg-transparent outline-none text-sm w-full text-gray-700" />
          <div className="w-5 h-5 rounded-md bg-gray-100 text-[10px] font-mono text-gray-400 flex items-center justify-center">⌘K</div>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm border border-gray-200/80 hover:bg-gray-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* Settings Quick Link */}
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm border border-gray-200/80 hover:bg-gray-50 transition-colors">
          <Settings size={18} />
        </button>

        {/* User Profile */}
        <div className="hidden sm:flex items-center gap-3 bg-white rounded-full p-1.5 pr-4 shadow-sm border border-gray-200/80 ml-1">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="User avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20" />
          <div className="leading-tight">
            <div className="text-sm font-bold text-gray-900">{user}</div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Store Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Sidebar, Topbar };
