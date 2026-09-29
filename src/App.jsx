import React, { useState, useMemo, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AIAssistantPage from './pages/AIAssistantPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import FinancePage from './pages/FinancePage';
import SettingsPage from './pages/SettingsPage';
import { Sidebar, Topbar } from './components/shell';

const TITLES = {
  dashboard: "Dashboard Overview",
  "ai-assistant": "AI Store Assistant",
  orders: "All Orders",
  "orders-all": "All Orders",
  "orders-details": "Order Details Inspector",
  customers: "Customer Directory",
  products: "Product Catalog & Inventory",
  finance: "Billing & Finance Overview",
  settings: "Admin Settings",
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [user, setUser] = useState(() => localStorage.getItem('user') || "Admin Store Owner");
  const [page, setPage] = useState(() => localStorage.getItem('page') || "dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
    localStorage.setItem('user', user);
    localStorage.setItem('page', page);
  }, [loggedIn, user, page]);

  const handleLogin = (email) => {
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setUser(name || "Admin Store Owner");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("dashboard");
    localStorage.clear();
  };

  const PageComponent = useMemo(() => {
    switch (page) {
      case "ai-assistant":
        return <AIAssistantPage />;

      case "orders":
      case "orders-all":
        return <OrdersPage viewMode="all" setPage={setPage} />;
      case "orders-details":
        return <OrdersPage viewMode="details" setPage={setPage} />;

      case "customers":
        return <CustomersPage />;

      case "products":
        return <ProductsPage />;

      case "finance":
        return <FinancePage />;

      case "settings":
        return <SettingsPage />;

      default:
        return <DashboardPage setPage={setPage} />;
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6] text-gray-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        input:focus { outline: none; }
      `}</style>

      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar
            page={page}
            setPage={setPage}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            onLogout={handleLogout}
          />
          <div className="flex-1 min-w-0">
            <Topbar title={TITLES[page]} user={user} setMobileOpen={setMobileOpen} />
            {PageComponent}
          </div>
        </div>
      )}
    </div>
  );
}
