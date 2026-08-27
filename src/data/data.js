import { LayoutDashboard, Package, Boxes, ShoppingCart, Users, ClipboardList, FileText, BarChart3 } from "lucide-react";
import imgBlue from '../assets/images/blue-removebg.png';
import imgGreen from '../assets/images/green-removebg.png';
import imgPink from '../assets/images/pink-removebg.png';

const LINE_COLOR = {
  Shampoo: "#2FA79A",
  Conditioner: "#C97AA6",
  Styling: "#3E4E9E",
  Treatment: "#B98230",
};

const STATUS_STYLE = {
  "In Stock": { bg: "#EAF4EC", fg: "#2F7A3D" },
  "Low Stock": { bg: "#FBF0DF", fg: "#B98230" },
  "Out of Stock": { bg: "#FBEAE7", fg: "#C1442E" },
  Completed: { bg: "#EAF4EC", fg: "#2F7A3D" },
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
  { id: "CH-001", name: "Argan Nourish Shampoo", line: "Shampoo", size: "150 ml", sku: "ARG-SH-150", price: 450, stock: 42, reorder: 15, sold30: 118, image: imgBlue },
  { id: "CH-002", name: "Argan Nourish Conditioner", line: "Conditioner", size: "150 ml", sku: "ARG-CN-150", price: 480, stock: 8, reorder: 15, sold30: 96, image: imgGreen },
  { id: "CH-003", name: "Curl Defining Cream", line: "Styling", size: "150 ml", sku: "CRL-CC-150", price: 550, stock: 0, reorder: 10, sold30: 74, image: imgPink },
  { id: "CH-004", name: "Argan Repair Hair Mask", line: "Treatment", size: "200 ml", sku: "ARG-HM-200", price: 620, stock: 25, reorder: 10, sold30: 41, image: imgBlue },
  { id: "CH-005", name: "Curl Refresh Mist", line: "Styling", size: "200 ml", sku: "CRL-RM-200", price: 390, stock: 30, reorder: 12, sold30: 58, image: imgGreen },
  { id: "CH-006", name: "Anti-Frizz Serum", line: "Conditioner", size: "100 ml", sku: "ARG-FS-100", price: 410, stock: 13, reorder: 10, sold30: 63, image: imgPink },
];

const stockStatus = (p) => (p.stock === 0 ? "Out of Stock" : p.stock <= p.reorder ? "Low Stock" : "In Stock");

const CUSTOMERS = [
  { id: "C-101", name: "Ananya Verma", phone: "98200 11234", visits: 14, spent: 12840, last: "24 Aug 2026", tier: "VIP" },
  { id: "C-102", name: "Rohit Malhotra", phone: "98192 44521", visits: 6, spent: 4320, last: "20 Aug 2026", tier: "Regular" },
  { id: "C-103", name: "Kavya Nair", phone: "90040 88213", visits: 2, spent: 1580, last: "12 Aug 2026", tier: "New" },
  { id: "C-104", name: "Farhan Sheikh", phone: "98673 20981", visits: 21, spent: 19650, last: "26 Aug 2026", tier: "VIP" },
  { id: "C-105", name: "Priya Deshmukh", phone: "97690 55210", visits: 9, spent: 7040, last: "22 Aug 2026", tier: "Regular" },
  { id: "C-106", name: "Arjun Kapoor", phone: "99870 12456", visits: 1, spent: 650, last: "18 Aug 2026", tier: "New" },
  { id: "C-107", name: "Sana Iqbal", phone: "98330 76542", visits: 11, spent: 9870, last: "25 Aug 2026", tier: "Regular" },
];

const ORDERS = [
  { id: "ORD-1042", date: "27 Aug 2026", customer: "Ananya Verma", items: "Haircut, Argan Shampoo", amount: 1150, mode: "UPI", status: "Completed" },
  { id: "ORD-1041", date: "27 Aug 2026", customer: "Rohit Malhotra", items: "Beard Trim", amount: 300, mode: "Cash", status: "Completed" },
  { id: "ORD-1040", date: "26 Aug 2026", customer: "Farhan Sheikh", items: "Curl Defining Cream x2", amount: 1100, mode: "Card", status: "Pending" },
  { id: "ORD-1039", date: "26 Aug 2026", customer: "Sana Iqbal", items: "Hair Color, Conditioner", amount: 2380, mode: "UPI", status: "Completed" },
  { id: "ORD-1038", date: "25 Aug 2026", customer: "Kavya Nair", items: "Anti-Frizz Serum", amount: 410, mode: "Cash", status: "Cancelled" },
  { id: "ORD-1037", date: "24 Aug 2026", customer: "Priya Deshmukh", items: "Shave, Hair Mask", amount: 920, mode: "Card", status: "Completed" },
];

const INVOICES = [
  { id: "INV-2026-081", customer: "Ananya Verma", date: "27 Aug 2026", amount: 1150, status: "Paid" },
  { id: "INV-2026-080", customer: "Rohit Malhotra", date: "27 Aug 2026", amount: 300, status: "Paid" },
  { id: "INV-2026-079", customer: "Farhan Sheikh", date: "26 Aug 2026", amount: 1100, status: "Due" },
  { id: "INV-2026-078", customer: "Sana Iqbal", date: "26 Aug 2026", amount: 2380, status: "Paid" },
  { id: "INV-2026-077", customer: "Kavya Nair", date: "20 Aug 2026", amount: 410, status: "Overdue" },
  { id: "INV-2026-076", customer: "Priya Deshmukh", date: "24 Aug 2026", amount: 920, status: "Paid" },
];

const REVENUE_TREND = [
  { day: "Mon", revenue: 8200 }, { day: "Tue", revenue: 6400 }, { day: "Wed", revenue: 9100 },
  { day: "Thu", revenue: 7600 }, { day: "Fri", revenue: 11200 }, { day: "Sat", revenue: 15800 },
  { day: "Sun", revenue: 13400 },
];

const CATEGORY_SPLIT = [
  { name: "Shampoo", value: 118, color: LINE_COLOR.Shampoo },
  { name: "Conditioner", value: 96, color: LINE_COLOR.Conditioner },
  { name: "Styling", value: 132, color: LINE_COLOR.Styling },
  { name: "Treatment", value: 41, color: LINE_COLOR.Treatment },
];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Product", icon: Package },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "sale", label: "Sale", icon: ShoppingCart },
  { key: "customers", label: "Customers", icon: Users },
  { key: "orders", label: "Sales / Orders", icon: ClipboardList },
];

export {
  LINE_COLOR, STATUS_STYLE, PRODUCTS, CUSTOMERS, ORDERS, INVOICES, REVENUE_TREND, CATEGORY_SPLIT, NAV, stockStatus
};
