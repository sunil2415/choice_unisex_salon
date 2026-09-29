import React, { useState } from 'react';
import { Sliders, CheckCircle2, RefreshCw, Zap, Shield, ExternalLink, Key, Plus } from 'lucide-react';

const INTEGRATIONS = [
  { id: "shopify", name: "Shopify Store Sync", category: "E-Commerce Platform", desc: "Sync products, inventory levels, and orders seamlessly with your Shopify store.", connected: true, icon: "🛍️" },
  { id: "stripe", name: "Stripe Payments", category: "Payment Gateway", desc: "Accept global credit cards, Apple Pay, and local payment methods automatically.", connected: true, icon: "💳" },
  { id: "paypal", name: "PayPal Express", category: "Payment Gateway", desc: "Enable instant checkout with PayPal wallet and Buy Now Pay Later options.", connected: true, icon: "🅿️" },
  { id: "mailchimp", name: "Mailchimp Marketing", category: "Email & CRM", desc: "Automate cart abandonment emails, customer newsletter flows, and campaigns.", connected: false, icon: "🐵" },
  { id: "google-analytics", name: "Google Analytics 4", category: "Analytics & Tracking", desc: "Track conversions, buyer funnels, and real-time traffic events across pages.", connected: true, icon: "📊" },
  { id: "shipstation", name: "ShipStation Logistics", category: "Shipping & Fulfillment", desc: "Generate automated shipping labels, tracking codes, and dispatch notifications.", connected: false, icon: "📦" },
  { id: "zapier", name: "Zapier Automations", category: "Workflow Automation", desc: "Connect your e-commerce store with over 5,000+ web apps and automated zaps.", connected: true, icon: "⚡" },
  { id: "woocommerce", name: "WooCommerce Bridge", category: "E-Commerce Platform", desc: "Connect multiple WordPress WooCommerce storefronts into single admin dashboard.", connected: false, icon: "🏬" },
];

function IntegrationsPage() {
  const [integrationsList, setIntegrationsList] = useState(INTEGRATIONS);

  const toggleConnect = (id) => {
    setIntegrationsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
  };

  return (
    <div className="px-8 pb-10 max-w-full mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Integrations & App Ecosystem</h2>
          <p className="text-xs text-gray-500">Connect payment gateways, shipping providers, and marketing platforms</p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-sm self-start sm:self-auto">
          <Key size={16} /> Manage API Keys
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {integrationsList.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <button
                  onClick={() => toggleConnect(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${item.connected
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {item.connected ? "Connected" : "Connect"}
                </button>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.category}</span>
                <h3 className="font-bold text-sm text-gray-900 mt-0.5">{item.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">{item.connected ? "Syncing live" : "Not configured"}</span>
              <button className="text-[#385433] hover:underline font-bold flex items-center gap-1">
                Configure <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default IntegrationsPage;
