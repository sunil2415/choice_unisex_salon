import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Package, Boxes, IndianRupee, AlertTriangle } from 'lucide-react';
import { ProductTube, Badge, LineTag } from '../components/ui';
import { LINE_COLOR, PRODUCTS, CUSTOMERS, ORDERS, INVOICES, REVENUE_TREND, CATEGORY_SPLIT, stockStatus } from '../data/data';

function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const lines = ["All", ...new Set(PRODUCTS.map((p) => p.line))];
  const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.line === filter);

  return (
    <div className="p-5 lg:p-8 space-y-5 relative">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
          style={{ background: LINE_COLOR.Styling }}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-2">
        {/* Total Products */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
              <Package size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{PRODUCTS.length}</div>
              <div className="text-sm font-semibold text-gray-500">Total Products</div>
            </div>
          </div>
        </div>
        {/* Total Stock Units */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-purple-100 text-purple-600">
              <Boxes size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{PRODUCTS.reduce((sum, p) => sum + p.stock, 0)}</div>
              <div className="text-sm font-semibold text-gray-500">Total Stock Units</div>
            </div>
          </div>
        </div>
        {/* Inventory Value */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600">
              <IndianRupee size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">₹{PRODUCTS.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString()}</div>
              <div className="text-sm font-semibold text-gray-500">Inventory Value</div>
            </div>
          </div>
        </div>
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center group h-36">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-red-100 text-red-500">
              <AlertTriangle size={28} />
            </div>
            <div>
              <div className="font-bold text-3xl text-gray-900 leading-tight mb-1">{PRODUCTS.filter(p => p.stock <= p.reorder).length}</div>
              <div className="text-sm font-semibold text-gray-500">Low Stock Alerts</div>
            </div>
          </div>
        </div>
      </div>



      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#F8F9FA] text-gray-500 font-medium">
              <th className="py-3 px-4 rounded-l-xl">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">SKU / Size</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock (Reorder)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 relative shrink-0">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="scale-50 origin-top-left -ml-2 -mt-2">
                          <ProductTube line={p.line} name={p.name.toUpperCase()} sub={p.size} />
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-base text-gray-900">{p.name}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <LineTag line={p.line} />
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-900 font-mono font-medium">{p.sku}</div>
                  <div className="text-xs text-gray-500">{p.size}</div>
                </td>
                <td className="py-4 px-4 font-mono text-base font-bold text-gray-900">
                  ₹{p.price}
                </td>
                <td className="py-4 px-4">
                  <div className="font-mono font-medium text-gray-900">{p.stock} units</div>
                  <div className="text-xs text-gray-500">Reorder: {p.reorder}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge label={stockStatus(p)} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-gray-900 group-hover:bg-gray-200 transition-colors"
                      onClick={(e) => { e.stopPropagation(); setEditingProduct(p); }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
                      onClick={(e) => { e.stopPropagation(); setProductToDelete(p); }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative p-4">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ProductTube line={selectedProduct.line} name={selectedProduct.name.toUpperCase()} sub={selectedProduct.size} />
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <LineTag line={selectedProduct.line} />
                <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
              <p className="text-sm text-gray-500 font-mono mb-6">SKU: {selectedProduct.sku} | Size: {selectedProduct.size}</p>

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div className="text-3xl font-bold text-gray-900 font-mono">₹{selectedProduct.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <Badge label={stockStatus(selectedProduct)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="text-xs text-gray-500 font-semibold mb-1">Current Stock</div>
                  <div className="text-xl font-bold text-gray-900">{selectedProduct.stock} Units</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="text-xs text-gray-500 font-semibold mb-1">30-Day Sales</div>
                  <div className="text-xl font-bold text-gray-900">{selectedProduct.sold30} Units</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input type="text" defaultValue={editingProduct?.name || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="e.g. Smoothing Serum" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select defaultValue={editingProduct?.line || "Styling"} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow">
                    <option>Styling</option>
                    <option>Shampoo</option>
                    <option>Conditioner</option>
                    <option>Treatment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">SKU / Size</label>
                  <input type="text" defaultValue={editingProduct ? `${editingProduct.sku} / ${editingProduct.size}` : ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="e.g. STY-001 / 250ml" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" defaultValue={editingProduct?.price || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{editingProduct ? "Update Stock" : "Initial Stock"}</label>
                  <input type="number" defaultValue={editingProduct?.stock || ""} className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow" placeholder="0" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button className="px-6 py-3 rounded-xl bg-gray-900 font-bold text-white hover:bg-black transition-colors" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}>{editingProduct ? "Update Product" : "Save Product"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setProductToDelete(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <strong>{productToDelete.name}</strong>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setProductToDelete(null)}>Cancel</button>
              <button className="flex-1 py-3 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 transition-colors" onClick={() => setProductToDelete(null)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductsPage;
