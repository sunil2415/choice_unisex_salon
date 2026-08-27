import React, { useState, useMemo, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import SalePage from './pages/SalePage';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import { Sidebar, Topbar } from './components/shell';

const TITLES = {
  dashboard: "Welcome to Dashboard",
  products: "Products",

  sale: "New Sale",
  customers: "Customers",
  orders: "Sales / Orders",
};



export default  function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [user, setUser] = useState(() => localStorage.getItem('user') || "Owner");
  const [page, setPage] = useState(() => localStorage.getItem('page') || "dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
    localStorage.setItem('user', user);
    localStorage.setItem('page', page);
  }, [loggedIn, user, page]);

  const handleLogin = (email) => {
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setUser(name || "Owner");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPage("dashboard");
    localStorage.clear();
  };

  const PageComponent = useMemo(() => {
    switch (page) {
      case "products": return <ProductsPage />;

      case "sale": return <SalePage />;
      case "customers": return <CustomersPage />;
      case "orders": return <OrdersPage />;
      default: return <DashboardPage setPage={setPage} />;
    }
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        * { font-family: 'Inter', sans-serif; }
        .text-ink { color: #171410; }
        .text-stone { color: #8D8477; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #E4DFD5; border-radius: 8px; }
        input:focus { outline: none; }
      `}</style>

      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} onLogout={handleLogout} />
          <div className="flex-1 min-w-0">
            <Topbar title={TITLES[page]} user={user} onLogout={handleLogout} setMobileOpen={setMobileOpen} />
            {PageComponent}
          </div>
        </div>
      )}
    </div>
  );
}
