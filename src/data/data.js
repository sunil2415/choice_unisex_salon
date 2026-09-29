import { LayoutDashboard, Sparkles, ShoppingBag, Users, Package, Banknote, Zap, Settings } from "lucide-react";
import p1 from '../assets/images/p1.png';
import p2 from '../assets/images/p2.png';
import p3 from '../assets/images/p3.png';
import p4 from '../assets/images/p4.png';
import p5 from '../assets/images/p5.png';
import p6 from '../assets/images/p6.png';
import p7 from '../assets/images/p7.png';

const LINE_COLOR = {
  "Face Wash": "#385433",
  Moisturizer: "#2FA79A",
  "Sun Care": "#B98230",
  "Serums & Kits": "#C97AA6",
};

const STATUS_STYLE = {
  "In Stock": { bg: "#EAF4EC", fg: "#2F7A3D" },
  "Low Stock": { bg: "#FBF0DF", fg: "#B98230" },
  "Out of Stock": { bg: "#FBEAE7", fg: "#C1442E" },
  Completed: { bg: "#EAF4EC", fg: "#2F7A3D" },
  Processing: { bg: "#EAF1FB", fg: "#3E4E9E" },
  "In Transit": { bg: "#FBF0DF", fg: "#B98230" },
  Paid: { bg: "#EAF4EC", fg: "#2F7A3D" },
  Pending: { bg: "#FBF0DF", fg: "#B98230" },
  Due: { bg: "#FBF0DF", fg: "#B98230" },
  Overdue: { bg: "#FBEAE7", fg: "#C1442E" },
  Cancelled: { bg: "#FBEAE7", fg: "#C1442E" },
  VIP: { bg: "#F1E9F4", fg: "#7A4E96" },
  Regular: { bg: "#EAF1FB", fg: "#3E4E9E" },
  New: { bg: "#EAF4EC", fg: "#2F7A3D" },
};

const PRODUCTS = [
  { id: "LW-101", name: "Likewise Green Tea & Matcha Moisturizer", line: "Moisturizer", category: "Moisturizer", subcat: "50 g", sku: "LW-GTM-50", price: 590, stock: 48, reorder: 15, sold30: 210, image: p1, desc: "Soothing | Matting | Calming for Oily & Acne-Prone Skin" },
  { id: "LW-102", name: "Likewise Vitamin C Face Wash", line: "Face Wash", category: "Face Wash", subcat: "100 mL", sku: "LW-VTC-100", price: 349, stock: 24, reorder: 15, sold30: 175, image: p2, desc: "Cleanses | Refreshes | Brightens with Orange Extract" },
  { id: "LW-103", name: "Likewise D-Tan Face Wash", line: "Face Wash", category: "Face Wash", subcat: "100 mL", sku: "LW-DTN-100", price: 375, stock: 12, reorder: 10, sold30: 142, image: p3, desc: "Cleanses | Removes Tan | Brightens with Vitamin C" },
  { id: "LW-104", name: "Likewise Rice Water Face Wash", line: "Face Wash", category: "Face Wash", subcat: "100 mL", sku: "LW-RCW-100", price: 399, stock: 30, reorder: 10, sold30: 98, image: p4, desc: "Nourishes | Smoothens | Brightens with Niacinamide" },
  { id: "LW-105", name: "Likewise Super Bright Sunscreen SPF 50 PA++++", line: "Sun Care", category: "Sun Care", subcat: "70 g", sku: "LW-SUN-70", price: 649, stock: 55, reorder: 12, sold30: 165, image: p5, desc: "Water Light Fluid Sunscreen with Vitamin C & Niacinamide" },
  { id: "LW-106", name: "Likewise Tea Tree Face Wash", line: "Face Wash", category: "Face Wash", subcat: "100 mL", sku: "LW-TTR-100", price: 349, stock: 8, reorder: 10, sold30: 89, image: p6, desc: "Cleanses | Prevents Acne | Controls Oil with Aloe Vera" },
  { id: "LW-107", name: "Likewise Strawberry Face Wash", line: "Face Wash", category: "Face Wash", subcat: "100 mL", sku: "LW-STW-100", price: 329, stock: 0, reorder: 12, sold30: 64, image: p7, desc: "Cleanses | Refreshes | Brightens with Strawberry Extract" },
];

const stockStatus = (p) => (p.stock === 0 ? "Out of Stock" : p.stock <= p.reorder ? "Low Stock" : "In Stock");

const CUSTOMERS = [
  { id: "CUST-801", name: "Ananya Verma", email: "ananya.v@gmail.com", phone: "+91 98200 11234", orders: 18, spent: 48900, last: "28 Sep 2026", tier: "VIP", location: "Mumbai, MH" },
  { id: "CUST-802", name: "Rohit Malhotra", email: "rohit.m@outlook.com", phone: "+91 98192 44521", orders: 9, spent: 22450, last: "26 Sep 2026", tier: "Regular", location: "Delhi, DL" },
  { id: "CUST-803", name: "Kavya Nair", email: "kavya.nair@yahoo.com", phone: "+91 90040 88213", orders: 3, spent: 8990, last: "22 Sep 2026", tier: "New", location: "Bengaluru, KA" },
  { id: "CUST-804", name: "Farhan Sheikh", email: "farhan.s@techcorp.io", phone: "+91 98673 20981", orders: 27, spent: 89400, last: "29 Sep 2026", tier: "VIP", location: "Hyderabad, TS" },
  { id: "CUST-805", name: "Priya Deshmukh", email: "priya.d@gmail.com", phone: "+91 97690 55210", orders: 11, spent: 31200, last: "25 Sep 2026", tier: "Regular", location: "Pune, MH" },
  { id: "CUST-806", name: "Arjun Kapoor", email: "arjun.k@digital.in", phone: "+91 99870 12456", orders: 2, spent: 3290, last: "18 Sep 2026", tier: "New", location: "Ahmedabad, GJ" },
  { id: "CUST-807", name: "Sana Iqbal", email: "sana.iqbal@design.com", phone: "+91 98330 76542", orders: 14, spent: 42100, last: "27 Sep 2026", tier: "VIP", location: "Chennai, TN" },
];

const ORDERS = [
  { id: "ORD-9421", date: "29 Sep 2026", customer: "Farhan Sheikh", items: "Green Tea & Matcha Moisturizer, Super Bright Sunscreen", amount: 1239, mode: "Credit Card", status: "Completed", tracking: "TRK-984021" },
  { id: "ORD-9420", date: "28 Sep 2026", customer: "Ananya Verma", items: "Vitamin C Face Wash x2", amount: 698, mode: "UPI", status: "Completed", tracking: "TRK-984020" },
  { id: "ORD-9419", date: "27 Sep 2026", customer: "Sana Iqbal", items: "Rice Water Face Wash", amount: 399, mode: "Apple Pay", status: "Completed", tracking: "TRK-984019" },
  { id: "ORD-9418", date: "26 Sep 2026", customer: "Rohit Malhotra", items: "D-Tan Face Wash, Tea Tree Face Wash", amount: 724, mode: "Credit Card", status: "Processing", tracking: "TRK-984018" },
  { id: "ORD-9417", date: "25 Sep 2026", customer: "Priya Deshmukh", items: "Strawberry Face Wash, Sunscreen", amount: 978, mode: "UPI", status: "In Transit", tracking: "TRK-984017" },
  { id: "ORD-9416", date: "24 Sep 2026", customer: "Kavya Nair", items: "Green Tea & Matcha Moisturizer", amount: 590, mode: "Net Banking", status: "Completed", tracking: "TRK-984016" },
  { id: "ORD-9415", date: "22 Sep 2026", customer: "Arjun Kapoor", items: "Tea Tree Face Wash", amount: 349, mode: "Cash on Delivery", status: "Cancelled", tracking: "TRK-984015" },
];

const INVOICES = [
  { id: "INV-2026-1042", customer: "Farhan Sheikh", date: "29 Sep 2026", dueDate: "13 Oct 2026", amount: 1239, status: "Paid", method: "Credit Card" },
  { id: "INV-2026-1041", customer: "Ananya Verma", date: "28 Sep 2026", dueDate: "12 Oct 2026", amount: 698, status: "Paid", method: "UPI" },
  { id: "INV-2026-1040", customer: "Rohit Malhotra", date: "26 Sep 2026", dueDate: "10 Oct 2026", amount: 724, status: "Due", method: "Credit Card" },
  { id: "INV-2026-1039", customer: "Sana Iqbal", date: "27 Sep 2026", dueDate: "11 Oct 2026", amount: 399, status: "Paid", method: "Apple Pay" },
  { id: "INV-2026-1038", customer: "Kavya Nair", date: "20 Sep 2026", dueDate: "04 Oct 2026", amount: 590, status: "Overdue", method: "Net Banking" },
  { id: "INV-2026-1037", customer: "Priya Deshmukh", date: "25 Sep 2026", dueDate: "09 Oct 2026", amount: 978, status: "Paid", method: "UPI" },
];

const DISCOUNTS = [
  { id: "COUPON-GLOW25", code: "GLOW25", discount: "25% OFF", type: "Percentage", usage: "342 used", expiry: "15 Oct 2026", status: "Active" },
  { id: "COUPON-WELCOME100", code: "WELCOME100", discount: "₹100 Flat", type: "Fixed Amount", usage: "890 used", expiry: "31 Dec 2026", status: "Active" },
  { id: "COUPON-FREESHIP", code: "FREESHIP", discount: "Free Express Shipping", type: "Shipping", usage: "1,240 used", expiry: "30 Nov 2026", status: "Active" },
  { id: "COUPON-VIPPREMIUM", code: "VIPPREMIUM", discount: "30% OFF for VIPs", type: "Percentage", usage: "156 used", expiry: "20 Oct 2026", status: "Active" },
  { id: "COUPON-SUMMER30", code: "SUMMER30", discount: "30% OFF", type: "Percentage", usage: "500 used", expiry: "31 Aug 2026", status: "Expired" },
];

const BILLING_SUMMARY = {
  currentPlan: "Enterprise Pro Admin",
  billingCycle: "Monthly (Billed on 1st)",
  nextInvoiceDate: "01 Oct 2026",
  monthlyAmount: "₹14,999 / mo",
  paymentMethod: "Visa ending in **** 8829",
  transactionCount: 1482,
  payoutPending: "₹1,84,200",
  grossRevenueMonth: "₹12,48,500",
};

const REVENUE_TREND = [
  { day: "Mon", revenue: 42000, orders: 18 },
  { day: "Tue", revenue: 58000, orders: 24 },
  { day: "Wed", revenue: 79000, orders: 36 },
  { day: "Thu", revenue: 64000, orders: 29 },
  { day: "Fri", revenue: 98000, orders: 45 },
  { day: "Sat", revenue: 135000, orders: 62 },
  { day: "Sun", revenue: 112000, orders: 51 },
];

const CATEGORY_SPLIT = [
  { name: "Face Wash", value: 55, color: LINE_COLOR["Face Wash"] },
  { name: "Moisturizer", value: 20, color: LINE_COLOR.Moisturizer },
  { name: "Sun Care", value: 15, color: LINE_COLOR["Sun Care"] },
  { name: "Serums & Kits", value: 10, color: LINE_COLOR["Serums & Kits"] },
];

export {
  LINE_COLOR, STATUS_STYLE, PRODUCTS, CUSTOMERS, ORDERS, INVOICES, DISCOUNTS, BILLING_SUMMARY, REVENUE_TREND, CATEGORY_SPLIT, stockStatus, p1, p2, p3, p4, p5, p6, p7
};
