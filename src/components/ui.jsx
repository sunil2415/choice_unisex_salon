import React from 'react';
import { STATUS_STYLE } from '../data/data';
import { ShoppingBag } from 'lucide-react';

/** eCommUIUX Brand Mark Icon */
function BrandMark({ size = 34, className = "" }) {
  return (
    <div 
      style={{ width: size, height: size }}
      className={`rounded-xl bg-gradient-to-tr from-[#2E4828] via-[#486538] to-[#6A8E56] flex items-center justify-center text-white font-bold shadow-md shadow-emerald-900/10 ${className}`}
    >
      <ShoppingBag size={Math.max(16, Math.floor(size * 0.55))} className="text-white" />
    </div>
  );
}

function Badge({ label }) {
  const s = STATUS_STYLE[label] || { bg: "#EFEDE8", fg: "#171410" };
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
}

function CategoryTag({ category }) {
  const colors = {
    Electronics: "bg-blue-50 text-blue-700 border-blue-200",
    Apparel: "bg-purple-50 text-purple-700 border-purple-200",
    Accessories: "bg-teal-50 text-teal-700 border-teal-200",
    Cosmetics: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const styleClass = colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-[11px] font-semibold tracking-wide ${styleClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {category}
    </span>
  );
}

export { BrandMark, Badge, CategoryTag };
