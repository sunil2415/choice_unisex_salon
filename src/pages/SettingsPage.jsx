import React, { useState } from 'react';
import { Settings, Store, Bell, Lock, Shield, Save, Check } from 'lucide-react';

function SettingsPage() {
  const [storeName, setStoreName] = useState("eCommUIUX Flagship Store");
  const [supportEmail, setSupportEmail] = useState("support@ecommuiux.com");
  const [currency, setCurrency] = useState("INR (₹)");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="px-8 pb-10 max-w-full mx-auto space-y-6">

      {/* Settings Form Container */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 space-y-7 max-w-4xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin Store Settings</h2>
            <p className="text-xs text-gray-500">Configure global preferences, store profile, and security</p>
          </div>
          {isSaved && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
              <Check size={14} /> Changes Saved Successfully
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* General Profile Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Store size={18} className="text-[#385433]" /> Store Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700">Support Contact Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700">Store Currency Format</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full mt-1.5 p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
              >
                <option>INR (₹) - Indian Rupee</option>
                <option>USD ($) - US Dollar</option>
                <option>EUR (€) - Euro</option>
                <option>GBP (£) - British Pound</option>
              </select>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Bell size={18} className="text-[#385433]" /> Notification Preferences
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-gray-900">Instant Order Email Notifications</div>
                  <div className="text-[11px] text-gray-500">Receive an email whenever a customer places an order</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-4 h-4 accent-[#385433]"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-gray-900">Low Inventory Warnings</div>
                  <div className="text-[11px] text-gray-500">Get notified when any product stock drops below reorder threshold</div>
                </div>
                <input
                  type="checkbox"
                  checked={stockAlerts}
                  onChange={() => setStockAlerts(!stockAlerts)}
                  className="w-4 h-4 accent-[#385433]"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-md"
            >
              <Save size={16} /> Save Configuration
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default SettingsPage;
