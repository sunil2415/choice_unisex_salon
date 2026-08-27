import os
import re

with open(".backup/ChoiceSaloonDashboard.jsx", "r") as f:
    content = f.read()

# Extract imports at the top
imports = re.search(r'^(import.*?)(?=\n/\* -)', content, re.DOTALL).group(1).strip()

sections = re.split(r'/\* -{70} \*/\n/\* (.*?)\s*\*/\n/\* -{70} \*/', content)

components_dir = "src/components"
pages_dir = "src/pages"
data_dir = "src/data"
os.makedirs(components_dir, exist_ok=True)
os.makedirs(pages_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

sections_dict = {}
for i in range(1, len(sections), 2):
    sections_dict[sections[i].strip()] = sections[i+1].strip()

# data.js
data_js = f"""// data.js
{sections_dict['THEME + BRAND ASSETS']}

{sections_dict['MOCK DATA']}

export {{
  LINE_COLOR, STATUS_STYLE, PRODUCTS, CUSTOMERS, ORDERS, INVOICES, REVENUE_TREND, CATEGORY_SPLIT, NAV, stockStatus
}};
"""
with open(f"{data_dir}/data.js", "w") as f:
    f.write(data_js)

# ui components
ui_js = f"""import React from 'react';
import {{ LINE_COLOR, STATUS_STYLE }} from '../data/data';

{sections_dict['THEME + BRAND ASSETS'].replace('const LINE_COLOR', '// const LINE_COLOR').replace('const STATUS_STYLE', '// const STATUS_STYLE')}

export {{ BrandMark, ProductTube, Badge, LineTag }};
"""
with open(f"{components_dir}/ui.jsx", "w") as f:
    f.write(ui_js)

# login page
login_js = f"""import React, {{{{ useState }}}} from 'react';
import {{ Mail, Lock }} from 'lucide-react';
import {{ BrandMark, ProductTube }} from '../components/ui';
import {{ LINE_COLOR }} from '../data/data';

{sections_dict['LOGIN PAGE']}
export default LoginPage;
"""
with open(f"{pages_dir}/LoginPage.jsx", "w") as f:
    f.write(login_js)

# shell
shell_js = f"""import React from 'react';
import {{ Search, Bell, LogOut, Menu, X, ChevronRight }} from 'lucide-react';
import {{ BrandMark }} from './ui';
import {{ LINE_COLOR, NAV }} from '../data/data';

{sections_dict['SHELL: SIDEBAR + TOPBAR']}
export {{ Sidebar, Topbar }};
"""
with open(f"{components_dir}/shell.jsx", "w") as f:
    f.write(shell_js)


# Helper function to generate page content
def gen_page(name, key, extra_imports=""):
    code = sections_dict[key]
    return f"""import React, {{{{ useState }}}} from 'react';
{extra_imports}
import {{ ProductTube, Badge, LineTag }} from '../components/ui';
import {{ LINE_COLOR, PRODUCTS, CUSTOMERS, ORDERS, INVOICES, REVENUE_TREND, CATEGORY_SPLIT, stockStatus }} from '../data/data';

{code}
export default {name};
"""

with open(f"{pages_dir}/DashboardPage.jsx", "w") as f:
    f.write(gen_page("DashboardPage", "PAGE: DASHBOARD", "import { ShoppingCart, Users, Package, AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';\nimport { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';\n\nexport " + sections_dict['PAGE: DASHBOARD'].split('function DashboardPage')[0].strip() + "\n\nfunction DashboardPage" + sections_dict['PAGE: DASHBOARD'].split('function DashboardPage')[1]))

with open(f"{pages_dir}/ProductsPage.jsx", "w") as f:
    f.write(gen_page("ProductsPage", "PAGE: PRODUCTS", "import { Plus } from 'lucide-react';"))

with open(f"{pages_dir}/InventoryPage.jsx", "w") as f:
    f.write(gen_page("InventoryPage", "PAGE: INVENTORY"))

with open(f"{pages_dir}/SalePage.jsx", "w") as f:
    f.write(gen_page("SalePage", "PAGE: SALE (POS)", "import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';"))

with open(f"{pages_dir}/CustomersPage.jsx", "w") as f:
    f.write(gen_page("CustomersPage", "PAGE: CUSTOMERS"))

with open(f"{pages_dir}/OrdersPage.jsx", "w") as f:
    f.write(gen_page("OrdersPage", "PAGE: SALES / ORDERS", "import { Eye } from 'lucide-react';"))

with open(f"{pages_dir}/InvoicesPage.jsx", "w") as f:
    f.write(gen_page("InvoicesPage", "PAGE: INVOICES", "import { Download } from 'lucide-react';"))

with open(f"{pages_dir}/ReportsPage.jsx", "w") as f:
    f.write(gen_page("ReportsPage", "PAGE: REPORTS & ANALYSIS", "import { TrendingUp, ShoppingCart, Users, CheckCircle2 } from 'lucide-react';\nimport { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';\nimport { StatCard } from './DashboardPage';"))

# App.jsx
app_js = f"""import React, {{ useState, useMemo }} from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';
import SalePage from './pages/SalePage';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import InvoicesPage from './pages/InvoicesPage';
import ReportsPage from './pages/ReportsPage';
import {{ Sidebar, Topbar }} from './components/shell';

{sections_dict['APP SHELL'].split('export default')[0]}

export default {sections_dict['APP SHELL'].split('export default')[1]}
"""
with open("src/App.jsx", "w") as f:
    f.write(app_js)

print("Split completed.")
