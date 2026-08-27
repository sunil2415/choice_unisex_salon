import React from 'react';
import { LINE_COLOR, STATUS_STYLE } from '../data/data';

/** Brand mark: silhouette + afro, echoing the CHOICE tube artwork */
function BrandMark({ size = 34, ring = "#F7F6F3" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="31" fill="#171410" stroke={ring} strokeWidth="1" />
      <g fill={ring}>
        <circle cx="24" cy="20" r="6" />
        <circle cx="32" cy="16" r="7" />
        <circle cx="40" cy="20" r="6" />
        <circle cx="42" cy="27" r="5.5" />
        <circle cx="22" cy="27" r="5.5" />
        <circle cx="32" cy="24" r="8" />
        <path d="M25 26c0 4 1 8-1 12-1.5 3-3 5-3 8v6h9v-9c0-2 .5-4 1.5-6h1c1 2 1.5 4 1.5 6v9h9v-6c0-3-1.5-5-3-8-2-4-1-8-1-12z" />
      </g>
    </svg>
  );
}

/** Signature product "tube" card — mirrors the real packaging structure */
function ProductTube({ line, name, sub, size, compact }) {
  const color = LINE_COLOR[line] || "#171410";
  return (
    <div className={`flex flex-col items-center ${compact ? "w-16" : "w-24"}`}>
      <div
        className={`w-full rounded-t-md ${compact ? "h-2" : "h-3"}`}
        style={{ background: "#fff", border: "1px solid #e7e3dc", borderBottom: "none" }}
      />
      <div
        className={`w-full flex items-center justify-center text-center px-1 ${compact ? "h-10" : "h-16"}`}
        style={{ background: color }}
      >
        <span
          className="font-display text-white leading-none"
          style={{ fontSize: compact ? 7 : 9, fontWeight: 600 }}
        >
          {line}
        </span>
      </div>
      <div
        className={`w-full flex flex-col items-center justify-center px-1 ${compact ? "h-8" : "h-12"}`}
        style={{ background: "#fff", border: "1px solid #e7e3dc", borderTop: "none", borderBottom: "none" }}
      >
        <span className="font-mono text-ink" style={{ fontSize: compact ? 6 : 7.5, fontWeight: 600, lineHeight: 1.15, textAlign: "center" }}>
          {name}
        </span>
        {sub && !compact && <span className="text-[6.5px] text-stone mt-0.5">{sub}</span>}
      </div>
      <div
        className={`w-full rounded-b-md ${compact ? "h-2.5" : "h-3.5"}`}
        style={{ background: "#171410" }}
      />
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

function LineTag({ line }) {
  const color = LINE_COLOR[line] || "#171410";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wide"
      style={{ color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {line}
    </span>
  );
}

export { BrandMark, ProductTube, Badge, LineTag };
