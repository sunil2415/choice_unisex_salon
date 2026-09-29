import React, { useState } from 'react';
import {
  Package, Search, SlidersHorizontal, Plus, Calendar, Eye,
  Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft,
  ChevronsRight, ChevronDown, X, UploadCloud, Check, Bold,
  Italic, Underline, List, Tag
} from 'lucide-react';
import { PRODUCTS, p1, p2, p3, p4, p5, p6, p7 } from '../data/data';

// --- INVENTORY TABLE DATA (Using Likewise Products) ---
const INITIAL_PRODUCTS = [
  {
    id: "LW-101",
    name: "Likewise Green Tea & Matcha Moisturizer",
    category: "Moisturizer",
    subcat: "50 g",
    orders: 210,
    stock: 48,
    stockLeft: null,
    price: "₹ 590.00",
    rawPrice: 590,
    discountPrice: "₹ 88.00",
    discountPct: "15%",
    sales: "210",
    duration: "1 yr 2 mo",
    status: "Active",
    img: p1,
    desc: "Soothing | Matting | Calming for Oily & Acne-Prone Skin"
  },
  {
    id: "LW-102",
    name: "Likewise Vitamin C Face Wash",
    category: "Face Wash",
    subcat: "100 mL",
    orders: 175,
    stock: 24,
    stockLeft: null,
    price: "₹ 349.00",
    rawPrice: 349,
    discountPrice: "₹ 35.00",
    discountPct: "10%",
    sales: "175",
    duration: "0 yr 9 mo",
    status: "Active",
    img: p2,
    desc: "Cleanses | Refreshes | Brightens with Vitamin C & Orange Extract"
  },
  {
    id: "LW-103",
    name: "Likewise D-Tan Face Wash",
    category: "Face Wash",
    subcat: "100 mL",
    orders: 142,
    stock: 12,
    stockLeft: "4 Left",
    price: "₹ 375.00",
    rawPrice: 375,
    discountPrice: "₹ 56.00",
    discountPct: "15%",
    sales: "142",
    duration: "1 yr 5 mo",
    status: "Active",
    img: p3,
    desc: "Cleanses | Removes Tan | Brightens with Vitamin C"
  },
  {
    id: "LW-104",
    name: "Likewise Rice Water Face Wash",
    category: "Face Wash",
    subcat: "100 mL",
    orders: 98,
    stock: 30,
    stockLeft: null,
    price: "₹ 399.00",
    rawPrice: 399,
    discountPrice: "₹ 48.00",
    discountPct: "12%",
    sales: "98",
    duration: "2 yr 1 mo",
    status: "Active",
    img: p4,
    desc: "Nourishes | Smoothens | Brightens with Rice Water Extract & Niacinamide"
  },
  {
    id: "LW-105",
    name: "Likewise Super Bright Sunscreen SPF 50",
    category: "Sun Care",
    subcat: "70 g",
    orders: 165,
    stock: 55,
    stockLeft: null,
    price: "₹ 649.00",
    rawPrice: 649,
    discountPrice: "₹ 65.00",
    discountPct: "10%",
    sales: "165",
    duration: "1 yr 0 mo",
    status: "Active",
    img: p5,
    desc: "Water Light Fluid Sunscreen with Vitamin C & Niacinamide"
  },
  {
    id: "LW-106",
    name: "Likewise Tea Tree Face Wash",
    category: "Face Wash",
    subcat: "100 mL",
    orders: 89,
    stock: 8,
    stockLeft: "2 Left",
    price: "₹ 349.00",
    rawPrice: 349,
    discountPrice: "₹ 87.00",
    discountPct: "25%",
    sales: "89",
    duration: "0 yr 6 mo",
    status: "Active",
    img: p6,
    desc: "Cleanses | Prevents Acne | Controls Oil with Tea Tree Extract & Aloe Vera"
  },
  {
    id: "LW-107",
    name: "Likewise Strawberry Face Wash",
    category: "Face Wash",
    subcat: "100 mL",
    orders: 64,
    stock: 0,
    stockLeft: "0 - empty",
    price: "₹ 329.00",
    rawPrice: 329,
    discountPrice: "₹ 66.00",
    discountPct: "20%",
    sales: "64",
    duration: "1 yr 8 mo",
    status: "Inactive",
    img: p7,
    desc: "Cleanses | Refreshes | Brightens with Strawberry Extract"
  },
];

function ProductsPage() {
  const [productList, setProductList] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add / Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Face Wash");
  const [netSize, setNetSize] = useState("100 mL");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState([p1, p2, p3, p4]);

  const openAddModal = () => {
    setEditItem(null);
    setTitle("");
    setCategory("Face Wash");
    setNetSize("100 mL");
    setPrice("");
    setStock("");
    setDescription("");
    setUploadedImages([p1, p2, p3, p4]);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setTitle(item.name);
    setCategory(item.category);
    setNetSize(item.subcat);
    setPrice(item.rawPrice);
    setStock(item.stock);
    setDescription(item.desc);
    setUploadedImages([item.img, p1, p2, p3]);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editItem) {
      setProductList((prev) =>
        prev.map((item) =>
          item.id === editItem.id
            ? {
              ...item,
              name: title,
              category,
              subcat: netSize,
              rawPrice: Number(price) || item.rawPrice,
              price: `₹ ${(Number(price) || item.rawPrice).toLocaleString()}.00`,
              stock: Number(stock) || item.stock,
              desc: description || item.desc,
              status: Number(stock) > 0 ? "Active" : "Inactive"
            }
            : item
        )
      );
    } else {
      const newProd = {
        id: `LW-10${productList.length + 1}`,
        name: title,
        category,
        subcat: netSize,
        orders: 0,
        stock: Number(stock) || 50,
        stockLeft: null,
        price: `₹ ${(Number(price) || 499).toLocaleString()}.00`,
        rawPrice: Number(price) || 499,
        discountPrice: "₹ 50.00",
        discountPct: "10%",
        sales: "0",
        duration: "0 yr 1 mo",
        status: "Active",
        img: uploadedImages[0] || p1,
        desc: description || "Fresh new skincare product formulation"
      };
      setProductList((prev) => [newProd, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProductList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = productList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory !== "All") {
      return matchesSearch && item.category === selectedCategory;
    }
    return matchesSearch;
  });

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C] font-sans">

      {/* ================= BREADCRUMB & HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
            <span>🏠 Dashboard</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">Products</span>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#385433] hover:bg-[#2E4828] text-white rounded-2xl text-xs font-bold transition-all shadow-md"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* ================= PRODUCT INVENTORY TABLE CONTAINER ================= */}
      <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 space-y-6">

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900">Product Inventory ({productList.length} products)</h3>
              <p className="text-xs text-gray-500">All top performing product <span className="font-bold text-gray-700">{productList.length} items</span></p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white/60 border border-black/10 rounded-2xl px-4 py-2 flex-1 sm:w-60 shadow-inner">
              <Search size={16} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product..."
                className="bg-transparent outline-none text-xs w-full text-gray-800 placeholder-gray-500 min-w-0"
              />
            </div>

            {/* Category Select Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white/60 border border-black/10 rounded-2xl text-xs font-semibold text-gray-700 outline-none shrink-0"
            >
              <option value="All">All Categories</option>
              <option value="Face Wash">Face Wash</option>
              <option value="Moisturizer">Moisturizer</option>
              <option value="Sun Care">Sun Care</option>
            </select>

            <button className="w-10 h-10 rounded-2xl bg-white/60 border border-black/10 flex items-center justify-center text-gray-600 hover:bg-white transition-colors shrink-0">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[750px] text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-black/10">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Order/Stock</th>
                <th className="py-3 px-3">Price/Discount</th>
                <th className="py-3 px-3">Sales</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredProducts.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/40 transition-colors">

                  {/* Product */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.img} alt={item.name} className="w-11 h-11 rounded-2xl object-contain bg-white p-1 shrink-0 border border-black/10 shadow-sm" />
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-gray-900 truncate max-w-[200px] sm:max-w-none">{item.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.category}</div>
                    <div className="text-[11px] text-gray-500">{item.subcat}</div>
                  </td>

                  {/* Order/Stock */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.orders}</div>
                    <div className={`text-[11px] font-medium ${item.stockLeft ? "text-rose-600 font-semibold" : "text-gray-500"}`}>
                      {item.stockLeft || `${item.stock} in stock`}
                    </div>
                  </td>

                  {/* Price/Discount */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.price}</div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                      <span>{item.discountPrice}</span>
                      <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold">
                        <Tag size={10} /> {item.discountPct}
                      </span>
                    </div>
                  </td>

                  {/* Sales */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-gray-900">{item.sales}</div>
                    <div className="text-[11px] text-gray-500">{item.duration}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${item.status === 'Active'
                      ? 'bg-[#B6D6A6] text-[#2C4A21]'
                      : 'bg-[#F2D6D6] text-[#8C2A2A]'
                      }`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500">
                      <button onClick={() => openEditModal(item)} className="hover:text-gray-900 p-1" title="View / Edit"><Eye size={16} /></button>
                      <button onClick={() => openEditModal(item)} className="hover:text-gray-900 p-1" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => handleDeleteProduct(item.id)} className="hover:text-rose-600 p-1" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-gray-500">
          <div>Showing 1 to {filteredProducts.length} of {productList.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsLeft size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronLeft size={16} /></button>
            <button className="w-7 h-7 rounded-full bg-[#385433] text-white font-bold flex items-center justify-center">1</button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronRight size={16} /></button>
            <button className="p-1 text-gray-400 hover:text-gray-700"><ChevronsRight size={16} /></button>
          </div>
        </div>

      </div>

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#E2E6E2]/95 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 max-w-3xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-black/10 my-auto">

            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <h3 className="font-extrabold text-xl text-gray-900">
                  {editItem ? `Edit Product (${editItem.id})` : "Add New Skincare Product"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Fill in product details, description, and upload product images</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-1">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">

              {/* Title & Basic Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="font-bold text-gray-800">Product Title / Name</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Likewise Green Tea & Matcha Moisturizer"
                    className="w-full mt-1.5 p-3 bg-white/80 border border-black/10 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-800">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1.5 p-3 bg-white/80 border border-black/10 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                  >
                    <option value="Face Wash">Face Wash</option>
                    <option value="Moisturizer">Moisturizer</option>
                    <option value="Sun Care">Sun Care</option>
                  </select>
                </div>
              </div>

              {/* Price, Net Size & Stock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-800">Net Size / Volume</label>
                  <input
                    type="text"
                    required
                    value={netSize}
                    onChange={(e) => setNetSize(e.target.value)}
                    placeholder="e.g. 100 mL or 50 g"
                    className="w-full mt-1.5 p-3 bg-white/80 border border-black/10 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-800">Unit Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="349"
                    className="w-full mt-1.5 p-3 bg-white/80 border border-black/10 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-800">Initial Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="48"
                    className="w-full mt-1.5 p-3 bg-white/80 border border-black/10 rounded-2xl outline-none text-xs text-gray-800 focus:bg-white focus:border-[#385433] transition-all"
                  />
                </div>
              </div>

              {/* Description Rich Text Editor Box (Matching Screenshot 2) */}
              <div className="bg-white/70 rounded-2xl border border-black/10 p-4 space-y-2">
                <div className="font-bold text-xs text-gray-900">Description</div>
                <p className="text-[11px] text-gray-500">Marketing Description with well structured details and SEO friendly keywords.</p>

                {/* Toolbar formatting buttons */}
                <div className="flex items-center gap-2 border-b border-black/10 pb-2 pt-1 text-gray-600">
                  <button type="button" className="p-1 hover:bg-black/5 rounded"><Bold size={14} /></button>
                  <button type="button" className="p-1 hover:bg-black/5 rounded"><Italic size={14} /></button>
                  <button type="button" className="p-1 hover:bg-black/5 rounded"><Underline size={14} /></button>
                  <span className="h-4 w-px bg-gray-300 mx-1" />
                  <button type="button" className="p-1 hover:bg-black/5 rounded"><List size={14} /></button>
                </div>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type product description, ingredients, benefits, and usage instructions..."
                  className="w-full bg-transparent outline-none text-xs text-gray-800 placeholder-gray-400 resize-none pt-2"
                />
              </div>

              {/* Upload Product Images Box (Matching Screenshot 2) */}
              <div className="bg-white/70 rounded-2xl border border-black/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-gray-900">Upload Product Images</div>
                  <span className="text-[11px] font-semibold text-[#385433]">
                    {uploadedImages.length} Images uploaded
                  </span>
                </div>

                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-black/15 hover:border-[#385433] rounded-2xl p-6 text-center cursor-pointer bg-white/40 transition-colors">
                  <UploadCloud size={32} className="mx-auto text-[#385433] mb-2" />
                  <div className="font-bold text-xs text-gray-800">Drag and Drop or Click here to upload</div>
                  <div className="text-[10px] text-gray-500 mt-1">Upload only .jpeg, .png, .mp4 file format max file size 6MB</div>
                </div>

                {/* Preview Thumbnails Row */}
                <div className="flex items-center gap-3 overflow-x-auto pt-1">
                  {uploadedImages.map((imgSrc, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-2xl bg-white p-1.5 border border-black/10 shrink-0 relative group">
                      <img src={imgSrc} alt="Preview" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-black/10">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#385433] hover:bg-[#2E4828] text-white text-xs font-bold rounded-2xl transition-all shadow-md"
                >
                  Continue →
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-bold text-rose-700 hover:underline px-4 py-2"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductsPage;
