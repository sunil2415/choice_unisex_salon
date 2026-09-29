import React from 'react';
import {
  Banknote, BarChart2, Calendar, TrendingUp, TrendingDown,
  MoreVertical, ShieldCheck, DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';

// --- DATA DEFINITIONS FOR FINANCE PAGE ---

const SUMMARY_BAR_DATA = [
  { month: "Jan", val1: 1200, val2: 1800 },
  { month: "Feb", val1: 800, val2: 1200 },
  { month: "Mar", val1: 2200, val2: 2800 },
  { month: "Apr", val1: 1500, val2: 1900 },
  { month: "May", val1: 2400, val2: 3100 },
  { month: "Jun", val1: 1100, val2: 1600 },
  { month: "Jul", val1: 900, val2: 1400 },
  { month: "Aug", val1: 1700, val2: 2200 },
];

const REVENUE_LINE_DATA = [
  { month: "Jan", series1: 10500, series2: 12500 },
  { month: "Feb", series1: 7200, series2: 9800 },
  { month: "Mar", series1: 9800, series2: 11200 },
  { month: "Apr", series1: 6400, series2: 7800 },
  { month: "May", series1: 11500, series2: 12800 },
  { month: "Jun", series1: 12000, series2: 12500 },
  { month: "Jul", series1: 8500, series2: 9200 },
  { month: "Aug", series1: 10800, series2: 11500 },
];

function FinancePage() {
  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-12 max-w-full mx-auto space-y-6 text-[#2C342C] font-sans">

      {/* ================= BREADCRUMB & HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
            <span>🏠 Dashboard</span>
            <span>&gt;</span>
            <span>Finance</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-bold">Finance Billing</span>
          </div>
        </div>

        {/* Right Header Control */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-white/70 backdrop-blur-md rounded-2xl border border-black/10 text-xs font-semibold text-gray-700 shadow-sm shrink-0">
          <span>19/05/2026 - 25/06/2026</span>
          <Calendar size={14} className="text-gray-500" />
        </div>
      </div>

      {/* ================= TOP ROW: 4 METRIC DONUT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* CARD 1: Revenue */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Donut Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90">
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#CAD3CA" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#486538" strokeWidth="5" fill="transparent" strokeDasharray="138" strokeDashoffset="20" strokeLinecap="round" />
                
                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#486538" strokeWidth="6" fill="transparent" strokeDasharray="157" strokeDashoffset="24" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="text-[10px] font-bold text-gray-900">85%</div>
                <div className="text-[8px] text-gray-500">Ready</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500">Revenue</span>
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">$12,501.00</div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-1">
                ▲ 2.75%
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Expense */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Donut Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90">
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#CAD3CA" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#D67C8C" strokeWidth="5" fill="transparent" strokeDasharray="138" strokeDashoffset="48" strokeLinecap="round" />

                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#D67C8C" strokeWidth="6" fill="transparent" strokeDasharray="157" strokeDashoffset="55" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="text-[10px] font-bold text-gray-900">65%</div>
                <div className="text-[8px] text-gray-500">Done</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500">Expense</span>
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">$3,134.00</div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-1">
                ▼ 1.50%
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: Return Cost */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Donut Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90">
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#CAD3CA" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#6B7867" strokeWidth="5" fill="transparent" strokeDasharray="138" strokeDashoffset="90" strokeLinecap="round" />

                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#6B7867" strokeWidth="6" fill="transparent" strokeDasharray="157" strokeDashoffset="102" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="text-[10px] font-bold text-gray-900">35%</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500">Return Cost</span>
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">$134.00</div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full mt-1">
                ▼ 1.50%
              </span>
            </div>
          </div>
        </div>

        {/* CARD 4: Shipping Cost */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Donut Ring */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 transform -rotate-90">
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#CAD3CA" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" className="sm:hidden" stroke="#486538" strokeWidth="5" fill="transparent" strokeDasharray="138" strokeDashoffset="117" strokeLinecap="round" />

                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#CAD3CA" strokeWidth="6" fill="transparent" />
                <circle cx="32" cy="32" r="25" className="hidden sm:block" stroke="#486538" strokeWidth="6" fill="transparent" strokeDasharray="157" strokeDashoffset="133" strokeLinecap="round" />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="text-[10px] font-bold text-gray-900">15%</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500">Shipping Cost</span>
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">$3,000.00</div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-full mt-1">
                ▼ 2.65%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MIDDLE ROW: SUMMARY BAR & REVENUE GENERATED ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* CARD 1: Summary (Bar Chart) */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Summary</h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                    Product Sales Growth
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">▲ 2.11%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">$2501.00</div>
              <div className="text-xs font-semibold text-gray-800 mt-0.5">Open order amount</div>
              <div className="text-[11px] text-gray-500">$1500.50 received - 65% prepaid orders</div>
            </div>
          </div>

          {/* Vertical Bar Chart */}
          <div className="h-48 sm:h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUMMARY_BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6A7569" }} dy={5} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: '#385433', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="val1" fill="#486538" radius={[6, 6, 0, 0]} barSize={14} />
                <Bar dataKey="val2" fill="#9EBF3B" radius={[6, 6, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CARD 2: Revenue Generated */}
        <div className="bg-[#E2E6E2]/90 backdrop-blur-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-sm border border-black/5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shrink-0">
                  <Banknote size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Revenue Generated</h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-rose-700">
                    Total decreased from previous <span className="text-[10px]">▼ 0.86%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">$12,501.00</div>
              <div className="text-xs font-semibold text-gray-500 mt-0.5">Total Order Completed</div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-36 sm:h-40 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_LINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6A7569" }} dy={5} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: '#385433', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="series1" stroke="#3D5634" strokeWidth={2} dot={{ r: 3, fill: "#3D5634" }} />
                <Line type="monotone" dataKey="series2" stroke="#8A9E7A" strokeWidth={2} dot={{ r: 3, fill: "#8A9E7A" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom Comparison Blocks */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-2">
            <div className="bg-[#385433] text-white p-4 rounded-2xl shadow-sm">
              <div className="text-xl sm:text-2xl font-extrabold">$12,501.00</div>
              <div className="text-xs text-[#A8D39E] font-medium mt-0.5">Income ↑ 11.5%</div>
            </div>

            <div className="bg-white/60 p-4 rounded-2xl border border-black/5 text-gray-900">
              <div className="text-xl sm:text-2xl font-extrabold">$3,134.50</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">Expense ↑ 11.5%</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default FinancePage;
