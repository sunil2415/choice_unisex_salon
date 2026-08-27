import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '../components/ui';
import { LINE_COLOR, CUSTOMERS } from '../data/data';

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="p-5 lg:p-8 space-y-5 relative">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
          style={{ background: LINE_COLOR.Styling }}
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#F8F9FA] text-gray-500 font-medium">
              <th className="py-3 px-4 rounded-l-xl">Customer</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Total spent</th>
              <th className="py-3 px-4 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? filteredCustomers.map((c) => (
              <tr 
                key={c.id} 
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0" style={{ background: LINE_COLOR.Styling }}>
                    {c.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div className="font-bold text-base text-gray-900">{c.name}</div>
                </td>
                <td className="py-4 px-4 font-mono text-gray-600 font-medium">{c.phone}</td>
                <td className="py-4 px-4 text-gray-600 truncate max-w-[250px]">{c.address || "Not provided"}</td>
                <td className="py-4 px-4 font-bold text-gray-900 font-mono">₹{c.spent.toLocaleString()}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 group-hover:bg-gray-200 transition-colors"
                      onClick={(e) => { e.stopPropagation(); setEditingCustomer(c); }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
                      onClick={(e) => { e.stopPropagation(); setCustomerToDelete(c); }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Customer Modal */}
      {(isAddModalOpen || editingCustomer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setEditingCustomer(null); }}>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{editingCustomer ? "Edit Customer" : "Add New Customer"}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setEditingCustomer(null); }} className="text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" defaultValue={editingCustomer?.name || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="e.g. John Doe" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" defaultValue={editingCustomer?.phone || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address (Optional)</label>
                  <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="mail@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address (Optional)</label>
                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow min-h-[100px] resize-none" placeholder="Enter customer address..."></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => { setIsAddModalOpen(false); setEditingCustomer(null); }} className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-3 rounded-xl bg-gray-900 font-bold text-white hover:bg-black transition-colors" onClick={() => { setIsAddModalOpen(false); setEditingCustomer(null); }}>
                {editingCustomer ? "Update Customer" : "Save Customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Customer Confirmation Modal */}
      {customerToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setCustomerToDelete(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Customer?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <strong>{customerToDelete.name}</strong>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setCustomerToDelete(null)}>Cancel</button>
              <button className="flex-1 py-3 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 transition-colors" onClick={() => setCustomerToDelete(null)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
